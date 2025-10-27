import { prisma } from '../../../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductImage from './ProductImage'
import { 
  CameraIcon,
  ArrowLeftIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  TagIcon,
  CurrencyEuroIcon,
  SwatchIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

async function getProduct(id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        productVariants: {
          orderBy: { price: 'asc' }
        },
        productColors: true,
        _count: {
          select: {
            orderItems: true
          }
        }
      }
    })
    console.log('Produit récupéré (vue):', JSON.stringify(product, null, 2))
    return product
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    return null
  }
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
  'BOUQUET_MARIE': 'Bouquet de mariée',
  'BOUQUET_DEMOISELLE': 'Bouquet demoiselle d\'honneur',
  'BOUTONNIERE': 'Boutonnière',
  'DECORATION_TABLE': 'Décoration de table',
  'DECORATION_EGLISE': 'Décoration d\'église',
  'BOUQUET_ROND': 'Bouquet rond',
  'BOUQUET_COMPOSE': 'Bouquet composé',
  'ARRANGEMENT': 'Arrangement',
  'PLANTE_VERTE': 'Plante verte',
  'PLANTE_FLEURIE': 'Plante fleurie',
  'ACCESSOIRES': 'Accessoires'
}

const categoryIcons = {
  'DEUIL': (
    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  'MARIAGE': (
    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  'BOUTIQUE': (
    <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.001 3.001 0 0 1-.621-1.72C1.378 7.43 1.914 7.03 2.538 7.03h18.924c.624 0 1.16.4 1.039 1.599a3.001 3.001 0 0 1-.621 1.72m-18.5 0v-5.25A3.75 3.75 0 0 1 6.75 0h10.5A3.75 3.75 0 0 1 21 3.75v5.25m0 0h.008v.008H21V8.25Z" />
    </svg>
  )
}

export default async function ProductView({ params }) {
  const awaitedParams = await params
  const product = await getProduct(awaitedParams.id)

  if (!product) {
    notFound()
  }

  const priceRange = product.productVariants.length > 0 
    ? product.productVariants.length === 1 
      ? `${product.productVariants[0].price}€`
      : `${product.productVariants[0].price}€ - ${product.productVariants[product.productVariants.length - 1].price}€`
    : 'Prix non défini'

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* En-tête avec navigation */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/products"
              className="flex items-center text-gray-600 hover:text-gray-900 font-light transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour aux produits
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <div>
              <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
                {product.name}
              </h1>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="inline-flex items-center px-4 py-2 text-white font-light rounded-lg transition-colors hover:opacity-90"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Modifier
            </Link>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyEuroIcon className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Prix</p>
              <p className="text-lg font-semibold text-gray-900">{priceRange}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TagIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Variantes</p>
              <p className="text-lg font-semibold text-gray-900">{product.productVariants.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <SwatchIcon className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Couleurs</p>
              <p className="text-lg font-semibold text-gray-900">{product.productColors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-lg font-semibold text-gray-900">{product._count.orderItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images - Prend plus d'espace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-light text-gray-900 mb-6 flex items-center">
              <CameraIcon className="h-5 w-5 mr-2" style={{ color: PRIMARY_COLOR }} />
              Images du produit
            </h2>
            {product.images && product.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <ProductImage
                    key={index}
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <CameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune image</h3>
                  <p className="text-gray-500">Ajoutez des images pour ce produit</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2" style={{ color: PRIMARY_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Informations détaillées */}
        <div className="space-y-6">
          {/* Informations générales */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-light text-gray-900 mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2" style={{ color: PRIMARY_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informations générales
            </h3>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium flex items-center">
                    <span className="mr-2">{categoryIcons[product.category]}</span>
                    Catégorie
                  </span>
                  <span className="text-gray-900 font-medium flex items-center">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium flex items-center">
                    <TagIcon className="h-4 w-4 mr-2" />
                    Sous-catégorie
                  </span>
                  <span className="text-gray-900 font-medium">
                    {subCategoryNames[product.subCategory] || product.subCategory}
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Statut
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? (
                      <>
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        En stock
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        Rupture de stock
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium flex items-center">
                    <StarIcon className="h-4 w-4 mr-2" />
                    Produit vedette
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.featured 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {product.featured ? (
                      <>
                        <StarIcon className="h-3 w-3 mr-1" />
                        Oui
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-3 w-3 mr-1" />
                        Non
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Variantes de prix */}
          {product.productVariants.length > 0 && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4 flex items-center">
                <CurrencyEuroIcon className="h-5 w-5 mr-2" style={{ color: PRIMARY_COLOR }} />
                Variantes de prix ({product.productVariants.length})
              </h3>
              <div className="space-y-3">
                {product.productVariants.map((variant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: PRIMARY_COLOR }}></div>
                      <span className="text-gray-900 font-medium">{variant.size}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{variant.price}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Couleurs disponibles */}
          {product.productColors.length > 0 && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4 flex items-center">
                <SwatchIcon className="h-5 w-5 mr-2" style={{ color: PRIMARY_COLOR }} />
                Couleurs disponibles ({product.productColors.length})
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {product.productColors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-4 h-4 rounded-full mr-3 border border-gray-300" style={{ backgroundColor: color.hex || '#e5e7eb' }}></div>
                    <span className="text-gray-900 font-medium flex-1">{color.color}</span>
                    {color.hex && (
                      <span className="text-xs text-gray-500 font-mono">{color.hex}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}