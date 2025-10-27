'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const PRIMARY_COLOR = '#276f88'

// Traduction des tailles
const SIZES = {
  'PETIT': 'Petit',
  'MOYEN': 'Moyen',
  'GRAND': 'Grand',
  'TRES_GRAND': 'Très Grand'
}

// Configuration des couleurs avec leurs classes CSS
const COLORS = {
  'BLANC': { label: 'Blanc', colorClass: 'bg-white border-2 border-gray-300' },
  'ROUGE': { label: 'Rouge', colorClass: 'bg-red-500' },
  'ROSE': { label: 'Rose', colorClass: 'bg-pink-400' },
  'JAUNE': { label: 'Jaune', colorClass: 'bg-yellow-400' },
  'ORANGE': { label: 'Orange', colorClass: 'bg-orange-400' },
  'VIOLET': { label: 'Violet', colorClass: 'bg-purple-500' },
  'BLEU': { label: 'Bleu', colorClass: 'bg-blue-500' },
  'VERT': { label: 'Vert', colorClass: 'bg-green-500' }
}

// Traduction des catégories
const CATEGORIES = {
  'DEUIL': 'Deuil',
  'MARIAGE': 'Mariage',
  'BOUTIQUE': 'Boutique'
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // États pour les sélections
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // États pour les dropdowns
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false)
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {
    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        // Sélectionner la première variante par défaut
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0])
        }
        // Sélectionner la première couleur par défaut
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }
      } else if (response.status === 404) {
        setError('Produit non trouvé')
      } else {
        setError('Erreur lors du chargement du produit')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('Veuillez sélectionner une taille')
      return
    }
    if (!selectedColor && product.colors.length > 0) {
      alert('Veuillez sélectionner une couleur')
      return
    }

    // Ici on ajouterait la logique d'ajout au panier
    const cartItem = {
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      size: selectedVariant.size,
      price: selectedVariant.price,
      colorId: selectedColor?.id,
      color: selectedColor?.color,
      quantity: quantity,
      image: product.images[0] || null
    }

    console.log('Ajout au panier:', cartItem)
    alert(`Produit ajouté au panier !\n${product.name} - ${SIZES[selectedVariant.size]} ${selectedColor ? `- ${COLORS[selectedColor.color]?.label}` : ''} - Quantité: ${quantity}`)
  }

  // Fermer tous les dropdowns
  const closeAllDropdowns = () => {
    setSizeDropdownOpen(false)
    setQuantityDropdownOpen(false)
  }

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant)
    setSizeDropdownOpen(false)
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
        <Header />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-gray-500 font-light">Chargement du produit...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            {error || 'Produit introuvable'}
          </h1>
          <p className="text-gray-600 mb-8">
            Le produit que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link
            href="/"
            className="inline-block py-3 px-6 text-white rounded-lg font-light transition-colors hover:opacity-90"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm font-light" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Accueil
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link 
              href={`/${product.category.toLowerCase()}`} 
              className="text-gray-500 hover:text-gray-700"
            >
              {CATEGORIES[product.category]}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={closeAllDropdowns}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Images */}
            <div className="space-y-4">
              {/* Image principale */}
              <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Miniatures */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index 
                          ? 'border-gray-800' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-8">
              {/* En-tête */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}>
                    {CATEGORIES[product.category]}
                  </span>
                  {product.featured && (
                    <span className="text-sm font-medium px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Coup de cœur
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="text-lg text-gray-700 font-light leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Prix */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="text-3xl font-light text-gray-900">
                  {selectedVariant ? `${selectedVariant.price}€` : 'Sélectionnez une taille'}
                </div>
                {selectedVariant && (
                  <div className="text-sm text-gray-600 mt-1">
                    Taille {SIZES[selectedVariant.size]}
                  </div>
                )}
              </div>

              {/* Sélecteurs */}
              <div className="space-y-6">
                {/* Sélecteur de taille */}
                {product.variants && product.variants.length > 0 && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Taille *
                    </label>
                    <div
                      className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSizeDropdownOpen(!sizeDropdownOpen)
                      }}
                    >
                      <span className="text-gray-800">
                        {selectedVariant 
                          ? `${SIZES[selectedVariant.size]} - ${selectedVariant.price}€`
                          : 'Sélectionner une taille'
                        }
                      </span>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform ${sizeDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {sizeDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                        {product.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors flex justify-between items-center"
                            onClick={() => handleVariantSelect(variant)}
                          >
                            <span>{SIZES[variant.size]}</span>
                            <span className="font-medium">{variant.price}€</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Sélecteur de couleur */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-3">
                      Couleur {product.colors.length > 1 ? '*' : ''}
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {product.colors.map((color) => {
                        const colorConfig = COLORS[color.color]
                        const isSelected = selectedColor?.id === color.id
                        
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleColorSelect(color)}
                            className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                              isSelected 
                                ? 'border-gray-800 shadow-lg' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full mb-2 ${colorConfig?.colorClass || 'bg-gray-300'}`}
                            />
                            <span className="text-xs font-medium text-gray-700 text-center">
                              {colorConfig?.label || color.color}
                            </span>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Sélecteur de quantité */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Quantité
                  </label>
                  <div
                    className="w-32 py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setQuantityDropdownOpen(!quantityDropdownOpen)
                    }}
                  >
                    <span className="text-gray-800">{quantity}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${quantityDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {quantityDropdownOpen && (
                    <div className="absolute z-10 w-32 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                        <div
                          key={qty}
                          className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                          onClick={() => {
                            setQuantity(qty)
                            setQuantityDropdownOpen(false)
                          }}
                        >
                          {qty}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary-gray w-full py-4 px-8 font-light tracking-wide"
                >
                  AJOUTER AU PANIER
                </button>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 font-light">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    En stock
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Livraison 24h minimum
                  </div>
                </div>

                {/* Onglets déroulants */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  {/* Onglet Livraison */}
                  <div className="border border-gray-200 rounded">
                    <button
                      onClick={() => setActiveTab(activeTab === 'livraison' ? null : 'livraison')}
                      className="w-full px-4 py-3 text-left font-light text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                    >
                      <span>Informations de livraison</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${activeTab === 'livraison' ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    {activeTab === 'livraison' && (
                      <div className="px-4 pb-4 text-sm text-gray-600 space-y-3">
                        <p className="font-light">Pour garantir la qualité des fleurs, merci de passer commande au moins 24h à l&apos;avance (jours ouvrés).</p>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Zone 1 (0-10km)</span>
                              <span className="font-medium">5€</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light">
                              Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, Ris-Orangis, Saint-Germain-lès-Corbeil, Tigery, Morsang-sur-Seine, Villabé
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Zone 2 (10-15km)</span>
                              <span className="font-medium">+10€</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light">
                              Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, Combs-la-Ville, Lieusaint, Moissy-Cramayel, Épinay-sous-Sénart, Brunoy
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Zone 3 (15-20km)</span>
                              <span className="font-medium">+15€</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light">
                              Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, Épinay-sur-Orge, Crosne, Mandres-les-Roses
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Zone 4 (20-25km)</span>
                              <span className="font-medium">+20€</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light">
                              Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, Saint-Fargeau-Ponthierry, Seine-Port, Nandy, Yerres, Villecresnes, Le Mée-sur-Seine, Boissise-le-Roi, La Rochette, Pringy
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center text-xs font-light hover:underline"
                          style={{color: '#276f88'}}
                        >
                          Voir plus de détails →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Onglet Qualité */}
                  <div className="border border-gray-200 rounded">
                    <button
                      onClick={() => setActiveTab(activeTab === 'qualite' ? null : 'qualite')}
                      className="w-full px-4 py-3 text-left font-light text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                    >
                      <span>Qualité artisanale</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${activeTab === 'qualite' ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>
                    {activeTab === 'qualite' && (
                      <div className="px-4 pb-4 text-sm text-gray-600 space-y-3">
                        <p className="font-light">
                          Toutes nos compositions florales sont réalisées à la main dans notre atelier à Soisy-sur-Seine.
                          Chaque pièce est conçue avec soin, au plus proche du visuel présenté.
                        </p>
                        <p className="font-light">
                          Nous ne faisons pas appel à des services de transmission florale : ici, tout est fait maison, avec exigence et respect.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
              Besoin de Conseils ?
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Notre équipe est à votre disposition pour vous accompagner dans votre choix
              et répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray px-6 py-3 font-light tracking-wide inline-flex items-center justify-center"
              >
                NOUS CONTACTER
              </Link>
              <a
                href="tel:0603059195"
                className="btn-secondary-gray px-6 py-3 font-light tracking-wide inline-flex items-center justify-center"
              >
                06 03 05 91 95
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}