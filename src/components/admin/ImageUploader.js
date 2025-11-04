'use client'

import { useState, useCallback } from 'react'
import { useUploadThing } from '../../lib/uploadthing'
import { TrashIcon, PhotoIcon } from '@heroicons/react/24/outline'
import NextImage from 'next/image'

// Configuration de compression
const MAX_WIDTH = 1200
const MAX_HEIGHT = 1200
const QUALITY = 0.8
const MAX_SIZE_MB = 2 // Taille cible après compression

// Fonction pour compresser une image
const compressImage = (file, maxWidth = MAX_WIDTH, maxHeight = MAX_HEIGHT, quality = QUALITY) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // Utilisation explicite de l'Image du DOM, pas de Next.js
    const img = document.createElement('img')
    
    img.onload = () => {
      // Calculer les nouvelles dimensions en gardant le ratio
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      // Redimensionner le canvas
      canvas.width = width
      canvas.height = height
      
      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convertir en blob avec compression
      canvas.toBlob(
        (blob) => {
          // Créer un nouveau fichier avec le nom original
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg', // Forcer en JPEG pour une meilleure compression
            lastModified: Date.now()
          })
          
          console.log(`🗜️ Compression: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`)
          resolve(compressedFile)
        },
        'image/jpeg',
        quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Fonction pour traiter et compresser plusieurs fichiers
const processFiles = async (files) => {
  const processedFiles = []
  
  for (const file of files) {
    // Vérifier si le fichier a besoin de compression
    const fileSizeMB = file.size / 1024 / 1024
    
    if (fileSizeMB > MAX_SIZE_MB || file.type !== 'image/jpeg') {
      console.log(`📦 Compression nécessaire pour: ${file.name} (${fileSizeMB.toFixed(2)}MB)`)
      const compressedFile = await compressImage(file)
      processedFiles.push(compressedFile)
    } else {
      console.log(`✅ ${file.name} déjà optimisé (${fileSizeMB.toFixed(2)}MB)`)
      processedFiles.push(file)
    }
  }
  
  return processedFiles
}

export default function ImageUploader({ 
  images = [], 
  onImagesChange, 
  maxFiles = 5,
  className = "" 
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { startUpload, isUploading: isUploadThingUploading } = useUploadThing(
    "productImageUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("✅ Upload terminé:", res);
        
        // Transformer les résultats en format attendu
        const newImages = res.map((file, index) => ({
          url: file.url || '',
          key: file.key || '',
          name: file.name || `Image ${Date.now()}-${index}`,
          size: file.size || 0
        }))
        
        // Filtrer les images avec des URLs valides
        const validImages = newImages.filter(img => img.url && img.url.startsWith('http'))
        
        if (validImages.length === 0) {
          console.error("❌ Aucune image valide retournée:", res);
          alert("Erreur: Aucune image valide retournée par le serveur")
          setIsUploading(false)
          setUploadProgress(0)
          return
        }
        
        // Ajouter les nouvelles images aux existantes
        const updatedImages = [...images, ...validImages]
        onImagesChange(updatedImages)
        
        setIsUploading(false)
        setUploadProgress(0)
      },
      onUploadError: (error) => {
        console.error("❌ Erreur d'upload:", error);
        
        // Messages d'erreur plus spécifiques
        let errorMessage = "Erreur d'upload inconnue"
        
        if (error.message) {
          if (error.message.includes("ResourceExhausted") || error.message.includes("connection limit exceeded")) {
            errorMessage = "Serveur UploadThing temporairement surchargé. Veuillez réessayer dans quelques instants."
          } else if (error.message.includes("XHR failed 400")) {
            errorMessage = "Erreur de configuration d'upload. Vérifiez le format et la taille du fichier."
          } else if (error.message.includes("File too large")) {
            errorMessage = "Fichier trop volumineux. Taille maximum : 4MB"
          } else if (error.message.includes("Invalid file type")) {
            errorMessage = "Type de fichier non supporté. Utilisez uniquement des images (JPG, PNG, WebP)"
          } else {
            errorMessage = error.message
          }
        }
        
        alert(`❌ ${errorMessage}`)
        setIsUploading(false)
        setUploadProgress(0)
      },
      onUploadBegin: () => {
        console.log("🚀 Début de l'upload");
        setIsUploading(true)
      },
      onUploadProgress: (progress) => {
        setUploadProgress(progress)
      },
    },
  );

  const handleFileSelect = useCallback(async (e) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length === 0) return
    
    // Vérifier les types de fichier
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const invalidFiles = files.filter(file => !validImageTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      alert(`❌ Types de fichier non supportés détectés: ${invalidFiles.map(f => f.name).join(', ')}\n\nTypes acceptés: JPG, PNG, WebP`)
      return
    }

    // Afficher un message de traitement si compression nécessaire
    const needsCompression = files.some(file => 
      file.size > (MAX_SIZE_MB * 1024 * 1024) || file.type !== 'image/jpeg'
    )
    
    if (needsCompression) {
      console.log("🗜️ Compression automatique en cours...")
      setIsUploading(true)
      setUploadProgress(10) // Progression pour la compression
    }

    try {
      // Compresser automatiquement les fichiers si nécessaire
      const processedFiles = await processFiles(files)
      
      if (needsCompression) {
        setUploadProgress(30) // Compression terminée
      }

      // Vérifier la taille des fichiers après compression (sécurité supplémentaire)
      const maxSize = 4 * 1024 * 1024 // 4MB
      const stillOversizedFiles = processedFiles.filter(file => file.size > maxSize)
      
      if (stillOversizedFiles.length > 0) {
        alert(`❌ Fichiers toujours trop volumineux après compression: ${stillOversizedFiles.map(f => f.name).join(', ')}\n\nVeuillez utiliser des images plus petites.`)
        setIsUploading(false)
        setUploadProgress(0)
        return
      }

      // Si maxFiles = 1 et qu'il y a déjà une image, remplacer l'image existante
      if (maxFiles === 1 && images.length > 0) {
        // Supprimer l'image existante avant d'ajouter la nouvelle
        const existingImage = images[0]
        if (existingImage.key) {
          try {
            await fetch('/api/uploadthing/delete', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ fileKey: existingImage.key }),
            })
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'image existante:', error)
          }
        }
        // Vider la liste d'images
        onImagesChange([])
      }
      // Vérifier le nombre maximum de fichiers (sauf si maxFiles = 1, déjà géré ci-dessus)
      else if (maxFiles > 1 && images.length + processedFiles.length > maxFiles) {
        alert(`Vous ne pouvez pas ajouter plus de ${maxFiles} image${maxFiles > 1 ? 's' : ''}`)
        setIsUploading(false)
        setUploadProgress(0)
        return
      }

      // Démarrer l'upload avec les fichiers traités
      startUpload(processedFiles)
      
    } catch (error) {
      console.error('❌ Erreur lors du traitement des fichiers:', error)
      alert('Erreur lors du traitement des images. Veuillez réessayer.')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [images, maxFiles, startUpload, onImagesChange])

  const handleRemoveImage = async (index) => {
    const imageToRemove = images[index]
    
    // Si l'image a une clé UploadThing, la supprimer du serveur
    if (imageToRemove.key) {
      try {
        const response = await fetch('/api/uploadthing/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileKey: imageToRemove.key }),
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression')
        }

        console.log('✅ Image supprimée du serveur UploadThing')
      } catch (error) {
        console.error('❌ Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression de l\'image')
        return
      }
    }

    // Supprimer l'image de la liste locale
    const updatedImages = images.filter((_, i) => i !== index)
    onImagesChange(updatedImages)
  }

  return (
    <div className={className}>
      {/* Zone d'upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images du produit ({images.length}/{maxFiles})
        </label>
        
        {images.length < maxFiles && (
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading || isUploadThingUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors ${
              isUploading || isUploadThingUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {isUploading || isUploadThingUploading 
                    ? uploadProgress <= 30 
                      ? `🗜️ Compression des images... ${uploadProgress}%`
                      : `⬆️ Upload en cours... ${uploadProgress}%`
                    : 'Cliquez pour sélectionner des images ou glissez-déposez'
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF jusqu'à 4MB • Compression automatique si nécessaire
                </p>
                {!isUploading && !isUploadThingUploading && (
                  <p className="text-xs text-blue-600 mt-1">
                    💡 Les images seront automatiquement optimisées pour le web
                  </p>
                )}
              </div>
            </div>
            
            {/* Barre de progression */}
            {(isUploading || isUploadThingUploading) && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Aperçu des images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => {
            console.log(`🖼️  Image ${index}:`, image)
            return (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  {image.url ? (
                    <NextImage
                      src={image.url}
                      alt={image.name || `Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('❌ Erreur de chargement d\'image:', image.url)
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Bouton de suppression */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                
                {/* Informations de l'image */}
                <div className="mt-1 text-xs text-gray-500 truncate">
                  {image.name || 'Image'}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}