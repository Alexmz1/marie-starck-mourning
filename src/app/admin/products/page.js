'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductActions from './ProductActions'

const PRIMARY_COLOR = '#276f88'

const ITEMS_PER_PAGE = 4 // Nombre de produits par page

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

const ProductCard = ({ product }) => {
  const priceRange = product.productVariants.length > 0 
    ? product.productVariants.length === 1 
      ? `${product.productVariants[0].price}€`
      : `${product.productVariants[0].price}€ - ${product.productVariants[product.productVariants.length - 1].price}€`
    : 'Prix non défini'

  const categoryEmoji = {
    'DEUIL': '🕊️',
    'MARIAGE': '💒',
    'BOUTIQUE': '🌺'
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
    'COMPOSITION_OFFRIR': 'Composition à offrir',
    'BOUQUET_FRAIS': 'Bouquet frais',
    'PLANTE_INTERIEUR': 'Plante d\'intérieur',
    'PLANTE_EXTERIEUR': 'Plante d\'extérieur',
    'CREATION_SAISONNIERE': 'Création saisonnière'
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{categoryEmoji[product.category]}</span>
              <div>
                <h3 className="text-lg font-light text-gray-900">{product.name}</h3>
                <p className="text-sm font-light text-gray-600">
                  {product.category} • {subCategoryNames[product.subCategory]}
                </p>
              </div>
            </div>
            
            {product.description && (
              <p className="text-gray-700 text-sm font-light mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-lg font-light text-green-600">{priceRange}</span>
              <span className="text-sm font-light text-gray-600">
                ({product.productVariants.length} taille{product.productVariants.length > 1 ? 's' : ''})
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm font-light text-gray-600">
              <span>🎨 {product.productColors.length} couleur{product.productColors.length > 1 ? 's' : ''}</span>
              <span>📦 {product._count.orderItems} commande{product._count.orderItems > 1 ? 's' : ''}</span>
              {product.featured && <span className="text-yellow-600">⭐ En vedette</span>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm font-light text-gray-600">
              {product.inStock ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>

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
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  // États pour les dropdowns
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
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
  }, [products, searchTerm, categoryFilter, statusFilter])

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
          className="py-3 px-6 text-white rounded-lg font-light transition-colors hover:opacity-90"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          ➕ Ajouter un produit
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Barre de recherche */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              🔍 Rechercher
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
            <label className="block text-sm font-medium text-gray-800 mb-2">
              📂 Catégorie
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

          {/* Dropdown Statut */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              🏷️ Statut
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
              <span className="text-6xl mb-4 block">🌸</span>
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
              <span className="text-6xl mb-4 block">🔍</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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