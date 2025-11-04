import { NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'
import { UTApi } from 'uploadthing/server'

export async function GET() {
  try {
    // Récupérer tous les produits avec leurs images
    const products = await prisma.product.findMany({
      select: {
        images: true,
        imageKeys: true
      }
    })

    // Extraire toutes les clés d'images
    const allImageKeys = []
    const imageUrls = []
    
    products.forEach(product => {
      if (product.imageKeys && Array.isArray(product.imageKeys)) {
        allImageKeys.push(...product.imageKeys)
      }
      if (product.images && Array.isArray(product.images)) {
        imageUrls.push(...product.images)
      }
    })

    // Statistiques de base
    const stats = {
      totalFiles: allImageKeys.length,
      totalSize: 0,
      quotaUsed: null,
      filesByType: {},
      lastUpdated: new Date().toISOString(),
      filesDetails: []
    }

    // Essayer de récupérer des informations détaillées via l'API UploadThing
    try {
      if (process.env.UPLOADTHING_TOKEN && allImageKeys.length > 0) {
        const utapi = new UTApi()
        
        // Récupérer les informations des fichiers par batch (max 100 à la fois)
        const batchSize = 100
        let totalSize = 0
        const filesByType = {}
        const filesDetails = []

        for (let i = 0; i < allImageKeys.length; i += batchSize) {
          const batch = allImageKeys.slice(i, i + batchSize)
          
          try {
            // Note: L'API UploadThing ne permet pas de récupérer les métadonnées facilement
            // Nous allons utiliser une estimation basée sur les URLs
            batch.forEach(key => {
              const correspondingUrl = imageUrls.find(url => url.includes(key))
              if (correspondingUrl) {
                const extension = correspondingUrl.split('.').pop()?.toLowerCase() || 'unknown'
                
                // Estimation de la taille basée sur le type de fichier
                let estimatedSize = 500 * 1024 // 500KB par défaut
                if (extension === 'png') estimatedSize = 800 * 1024 // PNG plus lourd
                if (extension === 'webp') estimatedSize = 300 * 1024 // WebP plus léger
                
                totalSize += estimatedSize
                
                if (!filesByType[extension]) {
                  filesByType[extension] = { count: 0, size: 0 }
                }
                filesByType[extension].count++
                filesByType[extension].size += estimatedSize
                
                filesDetails.push({
                  key,
                  url: correspondingUrl,
                  type: extension,
                  estimatedSize
                })
              }
            })
          } catch (batchError) {
            console.warn(`Erreur pour le batch ${i}:`, batchError.message)
          }
        }

        stats.totalSize = totalSize
        stats.filesByType = filesByType
        stats.filesDetails = filesDetails
        
        // Quota basé sur le plan UploadThing
        // Plan gratuit: 2GB, Plan Hobby: 8GB, Plan Pro: 100GB
        stats.quotaUsed = 2 * 1024 * 1024 * 1024 // 2GB par défaut (ajustez selon votre plan)
      } else {
        // Fallback si pas de token ou pas de fichiers
        console.warn('Token UploadThing manquant ou aucun fichier à analyser')
      }
    } catch (apiError) {
      console.warn('Impossible de récupérer les détails UploadThing:', apiError.message)
      
      // Fallback avec estimation simple
      const estimatedAverageSize = 500 * 1024 // 500KB par image
      stats.totalSize = allImageKeys.length * estimatedAverageSize
      
      // Grouper par type basé sur les URLs
      const fileTypes = {}
      imageUrls.forEach(url => {
        if (url) {
          const extension = url.split('.').pop()?.toLowerCase() || 'unknown'
          if (!fileTypes[extension]) {
            fileTypes[extension] = { count: 0, size: 0 }
          }
          fileTypes[extension].count++
          fileTypes[extension].size += estimatedAverageSize
        }
      })
      
      stats.filesByType = fileTypes
      stats.quotaUsed = 2 * 1024 * 1024 * 1024 // 2GB
    }

    // Ajouter quelques métadonnées utiles
    stats.metadata = {
      productsWithImages: products.filter(p => p.images && p.images.length > 0).length,
      totalProducts: products.length,
      averageImagesPerProduct: products.length > 0 
        ? (allImageKeys.length / products.length).toFixed(1) 
        : 0
    }

    return NextResponse.json(stats)
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques UploadThing:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    )
  }
}