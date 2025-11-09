'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductActions from './ProductActions'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  TagIcon,
  PaintBrushIcon,
  ArchiveBoxIcon,
  StarIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

const ITEMS_PER_PAGE = 12 // Nombre de produits par page (augmenté pour la vue en grille)

const CATEGORIES = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'DEUIL', label: 'Deuil' },
  { value: 'MARIAGE', label: 'Mariage' },
  { value: 'BOUTIQUE', label: 'Boutique' }
]

const STATUS_FILTERS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'inStock', label: 'En stock' },
  { value: 'outOfStock', label: 'Rupture de stock' },
  { value: 'featured', label: 'En vedette' }
]

const SUBCATEGORIES = {
  'DEUIL': [
    { value: '', label: 'Toutes les sous-catégories' },
    { value: 'CROIX', label: 'Croix' },
    { value: 'COEUR', label: 'Cœur' },
    { value: 'COURONNE', label: 'Couronne' },
    { value: 'COUSSIN', label: 'Coussin' },
    { value: 'DESSUS_CERCUEIL', label: 'Dessus de cercueil' },
    { value: 'DEVANT_TOMBE', label: 'Devant de tombe' },
    { value: 'BOUQUET_GERBE', label: 'Bouquet gerbe' },
    { value: 'FORMES_SPECIALES', label: 'Formes spéciales' }
  ],
  'MARIAGE': [
    { value: '', label: 'Toutes les sous-catégories' },
    { value: 'BOUQUET_MARIEE', label: 'Bouquet de mariée' },
    { value: 'BOUTONNIERE', label: 'Boutonnière' },
    { value: 'CORSAGE', label: 'Corsage' },
    { value: 'CENTRE_TABLE', label: 'Centre de table' },
    { value: 'DECORATION_EGLISE', label: 'Décoration d\'église' }
  ],
  'BOUTIQUE': [
    { value: '', label: 'Toutes les sous-catégories' },
    { value: 'PRODUIT_SAISON', label: 'Produit de saison' },
    { value: 'COMPOSITION_OFFRIR', label: 'Composition à offrir' },
    { value: 'BOUQUET_FRAIS', label: 'Bouquet frais' },
    { value: 'PLANTE_INTERIEUR', label: 'Plante d\'intérieur' },
    { value: 'PLANTE_EXTERIEUR', label: 'Plante d\'extérieur' }
  ]
}

// Configuration des couleurs avec leurs labels et classes CSS
const COLORS = {
  'BLANC': { label: 'Blanc', colorClass: 'bg-white border-2 border-gray-300' },
  'ROSE_PALE': { label: 'Rose pâle', colorClass: 'bg-pink-200' },
  'ROSE_FUSHIA': { label: 'Rose fushia', colorClass: 'bg-pink-500' },
  'ROUGE': { label: 'Rouge', colorClass: 'bg-red-500' },
  'BLEU_VIOLET': { label: 'Bleu violet', colorClass: 'bg-indigo-500' },
  'JAUNE': { label: 'Jaune', colorClass: 'bg-yellow-400' },
  'ORANGE': { label: 'Orange', colorClass: 'bg-orange-400' },
  'MULTICOLORE': { label: 'Multicolore', colorClass: 'bg-gradient-to-br from-pink-300 via-orange-300 to-indigo-300' }
}

const ProductCard = ({ product }) => {
  const priceRange = product.productVariants.length > 0 
    ? product.productVariants.length === 1 
      ? `${product.productVariants[0].price}€`
      : `${product.productVariants[0].price}€ - ${product.productVariants[product.productVariants.length - 1].price}€`
    : 'Prix non défini'

  const categoryIcons = {
    'DEUIL': (
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    'MARIAGE': (
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    'BOUTIQUE': (
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.001 3.001 0 0 1-.621-1.72C1.378 7.43 1.914 7.03 2.538 7.03h18.924c.624 0 1.16.4 1.039 1.599a3.001 3.001 0 0 1-.621 1.72m-18.5 0v-5.25A3.75 3.75 0 0 1 6.75 0h10.5A3.75 3.75 0 0 1 21 3.75v5.25m0 0h.008v.008H21V8.25Z" />
      </svg>
    )
  }

  const subCategoryNames = {
    'CROIX': 'Croix',
    'COEUR': 'Cœur',
    'COURONNE': 'Couronne',
    'COUSSIN': 'Coussin',
    'DESSUS_CERCUEIL': 'Dessus de cercueil',
    'DEVANT_TOMBE': 'Devant de tombe',
    'BOUQUET_GERBE': 'Bouquet gerbe',
    'FORMES_SPECIALES': 'Formes spéciales',
    'BOUQUET_MARIEE': 'Bouquet de mariée',
    'BOUTONNIERE': 'Boutonnière',
    'CORSAGE': 'Corsage',
    'CENTRE_TABLE': 'Centre de table',
    'DECORATION_EGLISE': 'Décoration d\'église',
    'PRODUIT_SAISON': 'Produit de saison',
    'COMPOSITION_OFFRIR': 'Composition à offrir',
    'BOUQUET_FRAIS': 'Bouquet frais',
    'PLANTE_INTERIEUR': 'Plante d\'intérieur',
    'PLANTE_EXTERIEUR': 'Plante d\'extérieur'
  }

  // Couleurs pour la démonstration des produits (premières couleurs disponibles)
  const primaryColor = product.productColors[0]?.color

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden">
      {/* Image du produit */}
      <div className="h-40 bg-gray-100 relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image 
            src={product.images[0]} 
            alt={product.name}
            width={320}
            height={160}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Si l'image ne charge pas, afficher un placeholder avec icône
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        
        {/* Placeholder au cas où pas d'image ou erreur de chargement */}
        <div className={`absolute inset-0 bg-gray-200 ${product.images && product.images.length > 0 ? 'hidden' : 'flex'} items-center justify-center`}>
          <div className="text-center">
            {categoryIcons[product.category]}
            <div className="text-xs text-gray-500 mt-1 font-light">
              {subCategoryNames[product.subCategory]}
            </div>
          </div>
        </div>
        
        {/* Badge produit en vedette */}
        {product.featured && (
          <div className="absolute top-2 left-2">
            <div className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              ⭐
            </div>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate flex-1 mr-2" title={product.name}>
              {product.name}
            </h3>
            {/* Indicateur de stock à côté du nom */}
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} 
                 title={product.inStock ? 'En stock' : 'Rupture de stock'} />
          </div>
          <p className="text-xs text-gray-500">
            {product.category} • {subCategoryNames[product.subCategory]}
          </p>
        </div>

        {/* Couleurs disponibles (pastilles) */}
        {product.productColors && product.productColors.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs text-gray-500 mr-1">Couleurs:</span>
              {product.productColors.slice(0, 6).map((colorItem, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border border-gray-300 ${COLORS[colorItem.color]?.colorClass || 'bg-gray-200'}`}
                  title={COLORS[colorItem.color]?.label || colorItem.color}
                />
              ))}
              {product.productColors.length > 6 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.productColors.length - 6}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Prix et informations */}
        <div className="mb-3">
          <div className="text-lg font-medium text-green-600 mb-1">{priceRange}</div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{product.productVariants.length} taille{product.productVariants.length > 1 ? 's' : ''}</span>
            <span>{product.productColors.length} couleur{product.productColors.length > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Actions compactes */}
        <ProductActions product={product} />
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  
  // États des filtres
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [subCategoryFilter, setSubCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  // États pour les dropdowns
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  // Charger les produits
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
      setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE))
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  // Appliquer les filtres
  useEffect(() => {
    let filtered = products

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par catégorie
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    // Filtre par sous-catégorie
    if (subCategoryFilter) {
      filtered = filtered.filter(product => product.subCategory === subCategoryFilter)
    }

    // Filtre par statut
    if (statusFilter) {
      switch (statusFilter) {
        case 'inStock':
          filtered = filtered.filter(product => product.inStock)
          break
        case 'outOfStock':
          filtered = filtered.filter(product => !product.inStock)
          break
        case 'featured':
          filtered = filtered.filter(product => product.featured)
          break
      }
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE))
  }, [products, searchTerm, categoryFilter, subCategoryFilter, statusFilter])

  // Réinitialiser le filtre de sous-catégorie quand la catégorie change
  useEffect(() => {
    setSubCategoryFilter('')
  }, [categoryFilter])

  // Charger plus de produits
  const loadMore = async () => {
    setLoadingMore(true)
    const nextPage = currentPage + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    
    const newProducts = filteredProducts.slice(0, endIndex)
    setDisplayedProducts(newProducts)
    setCurrentPage(nextPage)
    setLoadingMore(false)
  }

  const hasMore = displayedProducts.length < filteredProducts.length

  // Fermer tous les dropdowns quand on clique ailleurs
  const closeAllDropdowns = () => {
    setCategoryDropdownOpen(false)
    setSubCategoryDropdownOpen(false)
    setStatusDropdownOpen(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 font-light">Chargement des produits...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
            Produits
          </h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Gérez votre catalogue de créations florales
          </p>
        </div>
        <Link
          href="/admin/products/new"
          prefetch={false}
          className="py-3 px-6 text-white rounded-lg font-light transition-colors hover:opacity-90 flex items-center"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un produit
        </Link>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-gray-900">{products.length}</div>
          <div className="text-sm font-light text-gray-600">Produits total</div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-green-600">
            {products.filter(p => p.inStock).length}
          </div>
          <div className="text-sm font-light text-gray-600">En stock</div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-yellow-600">
            {products.filter(p => p.featured).length}
          </div>
          <div className="text-sm font-light text-gray-600">En vedette</div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light" style={{ color: PRIMARY_COLOR }}>
            {products.reduce((acc, p) => acc + p.productVariants.length, 0)}
          </div>
          <div className="text-sm font-light text-gray-600">Variantes total</div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8" onClick={closeAllDropdowns}>
        <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
          Recherche et filtres
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Barre de recherche */}
          <div className="md:col-span-1">
            <label className="flex text-sm font-medium text-gray-800 mb-2 items-center">
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Rechercher
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nom ou description..."
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Dropdown Catégorie */}
          <div className="relative">
            <label className="flex text-sm font-medium text-gray-800 mb-2 items-center">
              <FolderIcon className="h-4 w-4 mr-2" />
              Catégorie
            </label>
            <div
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setCategoryDropdownOpen(!categoryDropdownOpen)
              }}
            >
              <span className="text-gray-800">
                {CATEGORIES.find(c => c.value === categoryFilter)?.label || 'Toutes les catégories'}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {categoryDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                {CATEGORIES.map((category) => (
                  <div
                    key={category.value}
                    className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                    onClick={() => {
                      setCategoryFilter(category.value)
                      setCategoryDropdownOpen(false)
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
            <label className="flex text-sm font-medium text-gray-800 mb-2 items-center">
              <FolderIcon className="h-4 w-4 mr-2" />
              Sous-catégorie
            </label>
            <div
              className={`w-full py-3 px-4 bg-white border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                !categoryFilter ? 'opacity-50 cursor-not-allowed' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                if (categoryFilter) {
                  setSubCategoryDropdownOpen(!subCategoryDropdownOpen)
                }
              }}
            >
              <span className="text-gray-800">
                {categoryFilter && SUBCATEGORIES[categoryFilter] 
                  ? SUBCATEGORIES[categoryFilter].find(s => s.value === subCategoryFilter)?.label || 'Toutes les sous-catégories'
                  : 'Sélectionnez d\'abord une catégorie'
                }
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${subCategoryDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {subCategoryDropdownOpen && categoryFilter && SUBCATEGORIES[categoryFilter] && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                {SUBCATEGORIES[categoryFilter].map((subCategory) => (
                  <div
                    key={subCategory.value}
                    className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                    onClick={() => {
                      setSubCategoryFilter(subCategory.value)
                      setSubCategoryDropdownOpen(false)
                    }}
                  >
                    {subCategory.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Statut */}
          <div className="relative">
            <label className="flex text-sm font-medium text-gray-800 mb-2 items-center">
              <TagIcon className="h-4 w-4 mr-2" />
              Statut
            </label>
            <div
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setStatusDropdownOpen(!statusDropdownOpen)
              }}
            >
              <span className="text-gray-800">
                {STATUS_FILTERS.find(s => s.value === statusFilter)?.label || 'Tous les statuts'}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${statusDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {statusDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto" onClick={(e) => e.stopPropagation()}>
                {STATUS_FILTERS.map((status) => (
                  <div
                    key={status.value}
                    className="py-3 px-4 hover:bg-gray-50 cursor-pointer text-gray-800 transition-colors"
                    onClick={() => {
                      setStatusFilter(status.value)
                      setStatusDropdownOpen(false)
                    }}
                  >
                    {status.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de résultats */}
        <div className="mt-6 text-sm font-light text-gray-600">
          {filteredProducts.length === products.length 
            ? `${products.length} produit${products.length > 1 ? 's' : ''} au total`
            : `${filteredProducts.length} résultat${filteredProducts.length > 1 ? 's' : ''} sur ${products.length} produit${products.length > 1 ? 's' : ''}`
          }
        </div>
      </div>

      {/* Liste des produits */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-12 text-center">
          {products.length === 0 ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">
                Aucun produit pour le moment
              </h3>
              <p className="font-light text-gray-600 mb-6">
                Commencez par ajouter votre première création florale
              </p>
              <Link
                href="/admin/products/new"
                prefetch={false}
                className="py-3 px-6 text-white rounded-lg font-light inline-block transition-colors hover:opacity-90"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Créer mon premier produit
              </Link>
            </>
          ) : (
            <>
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="font-light text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('')
                  setSubCategoryFilter('')
                  setStatusFilter('')
                  closeAllDropdowns()
                }}
                className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-light hover:bg-gray-200 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bouton "Voir plus" */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="py-3 px-6 bg-white border border-gray-300 text-gray-700 rounded-lg font-light hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50"
              >
                {loadingMore ? 'Chargement...' : `Voir plus (${filteredProducts.length - displayedProducts.length} restants)`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}