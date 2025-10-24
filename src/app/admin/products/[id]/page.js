import { prisma } from '../../../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductImage from './ProductImage'

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

const categoryEmoji = {
  'DEUIL': '🕊️',
  'MARIAGE': '💒',
  'BOUTIQUE': '🌺'
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* En-tête avec navigation */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            ← Retour aux produits
          </Link>
          <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
            {product.name}
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="px-4 py-2 text-white font-light rounded-lg transition-colors"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Modifier
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-xl font-light text-gray-900 mb-4">Images</h2>
          {product.images && product.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
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
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">📷 Aucune image</span>
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="space-y-6">
          {/* Détails généraux */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-light text-gray-900 mb-4">Informations générales</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Catégorie :</span>
                <span className="text-gray-900 font-light">
                  {categoryEmoji[product.category]} {product.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Sous-catégorie :</span>
                <span className="text-gray-900 font-light">
                  {subCategoryNames[product.subCategory] || product.subCategory}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Prix :</span>
                <span className="text-gray-900 font-light">{priceRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Statut :</span>
                <span className={`px-2 py-1 rounded-full text-xs font-light ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'En stock' : 'Rupture de stock'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Produit vedette :</span>
                <span className={`px-2 py-1 rounded-full text-xs font-light ${
                  product.featured 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.featured ? 'Oui' : 'Non'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Commandes :</span>
                <span className="text-gray-900 font-light">{product._count.orderItems}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Variantes de prix */}
          {product.productVariants.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Variantes de prix</h3>
              <div className="space-y-2">
                {product.productVariants.map((variant, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-light">{variant.size}</span>
                    <span className="text-gray-900 font-light">{variant.price}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Couleurs disponibles */}
          {product.productColors.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Couleurs disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {product.productColors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 font-light rounded-full text-sm"
                  >
                    {color.color}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}