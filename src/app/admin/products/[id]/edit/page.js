'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

const PRIMARY_COLOR = '#276f88'

const CATEGORIES = [
  { value: 'DEUIL', label: 'Deuil' },
  { value: 'MARIAGE', label: 'Mariage' },
  { value: 'BOUTIQUE', label: 'Boutique' }
]

const SUB_CATEGORIES = {
  DEUIL: [
    { value: 'COUSSIN', label: 'Coussin' },
    { value: 'CROIX', label: 'Croix' },
    { value: 'COEUR', label: 'Cœur' },
    { value: 'COURONNE', label: 'Couronne' },
    { value: 'DESSUS_CERCUEIL', label: 'Dessus de cercueil' },
    { value: 'DEVANT_TOMBE', label: 'Devant de tombe' },
    { value: 'BOUQUET_GERBE', label: 'Bouquet gerbe' },
    { value: 'FORMES_SPECIALES', label: 'Formes spéciales' }
  ],
  MARIAGE: [
    { value: 'BOUQUET_MARIEE', label: 'Bouquet de mariée' },
    { value: 'BOUTONNIERE', label: 'Boutonnière' },
    { value: 'CORSAGE', label: 'Corsage' },
    { value: 'CENTRE_TABLE', label: 'Centre de table' },
    { value: 'DECORATION_EGLISE', label: 'Décoration d\'église' }
  ],
  BOUTIQUE: [
    { value: 'PRODUIT_SAISON', label: 'Produit de saison' },
    { value: 'COMPOSITION_OFFRIR', label: 'Composition à offrir' },
    { value: 'BOUQUET_FRAIS', label: 'Bouquet frais' },
    { value: 'PLANTE_INTERIEUR', label: 'Plante d\'intérieur' },
    { value: 'PLANTE_EXTERIEUR', label: 'Plante d\'extérieur' }
  ]
}

const SIZES = [
  { value: 'PETIT', label: 'Petit' },
  { value: 'MOYEN', label: 'Moyen' },
  { value: 'GRAND', label: 'Grand' },
  { value: 'TRES_GRAND', label: 'Très Grand' }
]

const COLORS = [
  { value: 'BLANC', label: 'Blanc', color: 'bg-white border-2 border-gray-300' },
  { value: 'ROUGE', label: 'Rouge', color: 'bg-red-500' },
  { value: 'ROSE', label: 'Rose', color: 'bg-pink-400' },
  { value: 'JAUNE', label: 'Jaune', color: 'bg-yellow-400' },
  { value: 'ORANGE', label: 'Orange', color: 'bg-orange-400' },
  { value: 'VIOLET', label: 'Violet', color: 'bg-purple-500' },
  { value: 'BLEU', label: 'Bleu', color: 'bg-blue-500' },
  { value: 'VERT', label: 'Vert', color: 'bg-green-500' }
]

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    inStock: true,
    featured: false
  })
  
  const [variants, setVariants] = useState([
    { size: 'MOYEN', price: '', height: '', width: '', depth: '', diameter: '' }
  ])
  
  const [selectedColors, setSelectedColors] = useState([])
  const [images, setImages] = useState([])
  const [dragActive, setDragActive] = useState(false)

  // État pour les dropdowns
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [subCategoryOpen, setSubCategoryOpen] = useState(false)
  const [sizeDropdowns, setSizeDropdowns] = useState({})

  // Charger les données du produit
  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/admin/products/${productId}`)
        if (response.ok) {
          const product = await response.json()
          console.log('Produit chargé:', product) // Debug
          
          setFormData({
            name: product.name || '',
            description: product.description || '',
            category: product.category || '',
            subCategory: product.subCategory || '',
            inStock: product.inStock ?? true,
            featured: product.featured ?? false
          })
          
          if (product.productVariants?.length > 0) {
            setVariants(product.productVariants.map(v => ({ 
              size: v.size, 
              price: v.price.toString(),
              height: v.height?.toString() || '',
              width: v.width?.toString() || '',
              depth: v.depth?.toString() || '',
              diameter: v.diameter?.toString() || ''
            })))
          }
          
          if (product.productColors?.length > 0) {
            setSelectedColors(product.productColors.map(c => c.color))
          }
          
          if (product.images?.length > 0) {
            setImages(product.images.map((img, index) => ({
              id: Date.now() + index,
              preview: img,
              name: `Image ${index + 1}`,
              isExisting: true
            })))
          }
        } else {
          console.error('Erreur response:', response.status, response.statusText)
          alert('Erreur lors du chargement du produit')
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error)
        alert('Erreur lors du chargement du produit: ' + error.message)
      }
      setInitialLoading(false)
    }
    
    loadProduct()
  }, [productId])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleVariantChange = (index, field, value) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ))
  }

  const addVariant = () => {
    setVariants(prev => [...prev, { 
      size: 'MOYEN', 
      price: '', 
      height: '', 
      width: '', 
      depth: '', 
      diameter: '' 
    }])
  }

  const removeVariant = (index) => {
    if (variants.length > 1) {
      setVariants(prev => prev.filter((_, i) => i !== index))
      // Nettoyer l'état des dropdowns
      setSizeDropdowns(prev => {
        const newDropdowns = { ...prev }
        delete newDropdowns[index]
        // Réindexer les dropdowns restants
        const reindexed = {}
        Object.keys(newDropdowns).forEach(key => {
          const numKey = parseInt(key)
          if (numKey > index) {
            reindexed[numKey - 1] = newDropdowns[key]
          } else {
            reindexed[key] = newDropdowns[key]
          }
        })
        return reindexed
      })
    }
  }

  const toggleSizeDropdown = (index) => {
    setSizeDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Fermer tous les dropdowns quand on clique ailleurs
  const closeAllDropdowns = () => {
    setCategoryOpen(false)
    setSubCategoryOpen(false)
    setSizeDropdowns({})
  }

  const toggleColor = (colorValue) => {
    setSelectedColors(prev => 
      prev.includes(colorValue)
        ? prev.filter(c => c !== colorValue)
        : [...prev, colorValue]
    )
  }

  // Gestion des images
  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    imageFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name,
          isExisting: false
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    const validVariants = variants.filter(v => v.price && parseFloat(v.price) > 0)
    
    if (!formData.name || !formData.description || !formData.category || !formData.subCategory) {
      alert('Veuillez remplir tous les champs obligatoires')
      setLoading(false)
      return
    }
    
    if (validVariants.length === 0) {
      alert('Veuillez ajouter au moins une variante avec un prix')
      setLoading(false)
      return
    }
    
    if (selectedColors.length === 0) {
      alert('Veuillez sélectionner au moins une couleur')
      setLoading(false)
      return
    }
    
    if (images.length === 0) {
      alert('Veuillez ajouter au moins une image du produit')
      setLoading(false)
      return
    }

    try {
      // Préparer les données avec les images
      const imageUrls = images.map(img => img.preview)
      
      const productData = {
        ...formData,
        isActive: formData.inStock,
        featured: formData.featured,
        variants: validVariants,
        colors: selectedColors,
        images: imageUrls
      }

      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        router.push('/admin/products')
        router.refresh()
      } else {
        const error = await response.json()
        alert('Erreur: ' + (error.message || 'Erreur inconnue'))
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la modification du produit')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 font-light">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
          Modifier le produit
        </h1>
        <p className="mt-2 text-sm font-light text-gray-600">
          Modifiez les informations de votre création florale
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" onClick={closeAllDropdowns}>
        {/* Informations de base */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
            Informations de base
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full py-4 px-6 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{ 
                  fontSize: '16px'
                }}
                placeholder="Ex: Croix de Deuil Traditionnelle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full py-4 px-6 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                style={{ 
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}
                placeholder="Décrivez votre création florale..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dropdown Catégorie */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Catégorie *
                </label>
                <div
                  className="w-full py-4 px-6 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{ 
                    fontSize: '16px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCategoryOpen(!categoryOpen)
                  }}
                >
                  <span className={formData.category ? 'text-gray-800' : 'text-gray-500'}>
                    {formData.category ? CATEGORIES.find(c => c.value === formData.category)?.label : 'Sélectionnez une catégorie'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {categoryOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                    {CATEGORIES.map((category) => (
                      <div
                        key={category.value}
                        className="py-3 px-6 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, category: category.value, subCategory: '' }))
                          setCategoryOpen(false)
                        }}
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Sous-catégorie */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Sous-catégorie *
                </label>
                <div
                  className={`w-full py-4 px-6 bg-white border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${!formData.category ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ 
                    fontSize: '16px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    formData.category && setSubCategoryOpen(!subCategoryOpen)
                  }}
                >
                  <span className={formData.subCategory ? 'text-gray-800' : 'text-gray-500'}>
                    {formData.subCategory 
                      ? SUB_CATEGORIES[formData.category]?.find(sc => sc.value === formData.subCategory)?.label 
                      : 'Sélectionnez une sous-catégorie'
                    }
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${subCategoryOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {subCategoryOpen && formData.category && SUB_CATEGORIES[formData.category] && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                    {SUB_CATEGORIES[formData.category].map((subCategory) => (
                      <div
                        key={subCategory.value}
                        className="py-3 px-6 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, subCategory: subCategory.value }))
                          setSubCategoryOpen(false)
                        }}
                      >
                        {subCategory.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
            Images du produit
          </h2>
          
          <div className="space-y-4">
            {/* Zone de téléchargement */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Image 
                className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                width={48} 
                height={48} 
                src="data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cg%3e%3ctitle%3eLayer 1%3c/title%3e%3crect stroke='%23999' fill='none' stroke-width='2' x='10' y='10' width='80' height='80' /%3e%3cline stroke='%23999' stroke-width='2' x1='30' y1='70' x2='70' y2='30'/%3e%3ccircle fill='%23999' cx='25' cy='35' r='5'/%3e%3c/g%3e%3c/svg%3e" 
                alt="Upload" 
              />
              <div className="font-light text-gray-600">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">Cliquez pour télécharger</span>
                  <span> ou glissez-déposez vos images</span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF jusqu'à 10MB</p>
            </div>

            {/* Aperçu des images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden">
                      <Image
                        src={image.preview}
                        alt={image.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Variantes et prix */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Prix par taille
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-colors"
            >
              + Ajouter une taille
            </button>
          </div>
          
          <div className="space-y-6">
            {variants.map((variant, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Variant {index + 1}</h3>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dropdown Taille */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taille</label>
                    <div
                      className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSizeDropdown(index)
                      }}
                    >
                      <span className="text-gray-800">
                        {SIZES.find(s => s.value === variant.size)?.label || 'Sélectionner une taille'}
                      </span>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform ${sizeDropdowns[index] ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {sizeDropdowns[index] && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                        {SIZES.map((size) => (
                          <div
                            key={size.value}
                            className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                            onClick={() => {
                              handleVariantChange(index, 'size', size.value)
                              toggleSizeDropdown(index)
                            }}
                          >
                            {size.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Input Prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      placeholder="Prix en €"
                      required
                      className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Dimensions (en cm)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Hauteur</label>
                      <input
                        type="number"
                        value={variant.height}
                        onChange={(e) => handleVariantChange(index, 'height', e.target.value)}
                        placeholder="cm"
                        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Largeur</label>
                      <input
                        type="number"
                        value={variant.width}
                        onChange={(e) => handleVariantChange(index, 'width', e.target.value)}
                        placeholder="cm"
                        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Profondeur</label>
                      <input
                        type="number"
                        value={variant.depth}
                        onChange={(e) => handleVariantChange(index, 'depth', e.target.value)}
                        placeholder="cm"
                        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Diamètre</label>
                      <input
                        type="number"
                        value={variant.diameter}
                        onChange={(e) => handleVariantChange(index, 'diameter', e.target.value)}
                        placeholder="cm"
                        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Renseignez les dimensions pertinentes selon la forme du produit. Le diamètre est généralement utilisé pour les couronnes et formes circulaires.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Couleurs disponibles */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
            Couleurs disponibles *
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {COLORS.map(color => (
              <label key={color.value} className="flex flex-col items-center cursor-pointer group">
                <div
                  className={`w-12 h-12 rounded-full border-2 transition-all group-hover:scale-110 ${
                    selectedColors.includes(color.value) 
                      ? 'border-gray-800 shadow-lg' 
                      : 'border-gray-300'
                  } ${color.color}`}
                >
                  {selectedColors.includes(color.value) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-xs font-light text-gray-700 mt-2 text-center">{color.label}</span>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color.value)}
                  onChange={() => toggleColor(color.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Options et disponibilité */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
            Options et disponibilité
          </h2>
          
          <div className="space-y-4">
            {[
              { name: 'inStock', label: 'En stock', checked: formData.inStock },
              { name: 'featured', label: 'Produit mis en avant', checked: formData.featured }
            ].map((option) => (
              <label key={option.name} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name={option.name}
                    checked={option.checked}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div 
                    className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all ${
                      option.checked 
                        ? 'border-gray-800 bg-gray-800' 
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}
                  >
                    {option.checked && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-sm font-light text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 py-4">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="py-3 px-8 bg-white border border-gray-400 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-500 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-8 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            {loading ? 'Modification...' : 'Modifier le produit'}
          </button>
        </div>
      </form>
    </div>
  )
}