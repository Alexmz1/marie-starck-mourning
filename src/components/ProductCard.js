import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  // Images de démonstration basées sur la catégorie pour les anciens produits
  const getImageUrl = (category) => {
    const imageMap = {
        'Couronnes': 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Cœurs': 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Coussins': 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Cercueil': 'https://images.pexels.com/photos/356372/pexels-photo-356372.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Dessus de cercueil': 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Gerbes': 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Croix': 'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&w=400&h=300&fit=crop',
        'Devant de tombe': 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&h=300&fit=crop'
    };
    return imageMap[category] || 'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&w=400&h=300&fit=crop';
  };

  // Déterminer si c'est un nouveau produit de la BDD ou un ancien produit en dur
  const isDbProduct = product.slug && product.images
  const imageUrl = isDbProduct 
    ? (product.images && product.images[0] ? product.images[0] : getImageUrl(product.category))
    : getImageUrl(product.category)
  
  // Catégories en français pour l'affichage
  const categoryLabels = {
    'DEUIL': 'Deuil',
    'MARIAGE': 'Mariage', 
    'BOUTIQUE': 'Boutique'
  }
  
  const displayCategory = isDbProduct 
    ? categoryLabels[product.category] || product.category
    : product.category

  // Générer l'URL du produit
  const productUrl = isDbProduct 
    ? `/produit/${product.slug}`
    : '#' // Pour les anciens produits sans slug

  // Déterminer si utiliser Image ou img selon la source
  const isExternalImage = imageUrl.includes('pexels.com')

  return (
    <Link 
      href={productUrl}
      className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        {isExternalImage ? (
          <img 
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <Image 
            src={imageUrl}
            alt={product.name}
            width={400}
            height={533}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        
        {/* Badge de prix */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-light">
          {product.priceRange}
        </div>
        
        {/* Badge featured pour les produits de la BDD */}
        {isDbProduct && product.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 text-xs font-medium rounded">
            Coup de cœur
          </div>
        )}
        
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Contenu */}
      <div className="p-3 space-y-2 flex-1 flex flex-col">
        <div>
          <h3 className="text-lg font-light text-black group-hover:text-gray-800 transition-colors duration-300 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 font-light">{displayCategory}</p>
        </div>
        
        {/* Couleurs disponibles pour les produits de la BDD */}
        {isDbProduct && product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Couleurs:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => {
                const colorClasses = {
                  'BLANC': 'bg-white border-2 border-gray-300',
                  'ROSE_PALE': 'bg-pink-200',
                  'ROSE_FUSHIA': 'bg-pink-500',
                  'ROUGE': 'bg-red-500',
                  'BLEU_VIOLET': 'bg-indigo-500',
                  'JAUNE': 'bg-yellow-400',
                  'ORANGE': 'bg-orange-400',
                  'MULTICOLORE': 'bg-gradient-to-r from-pink-300 via-orange-300 via-yellow-300 to-indigo-300'
                }
                return (
                  <div
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${colorClasses[color] || 'bg-gray-300'}`}
                    title={color}
                  />
                )
              })}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-1 mt-auto">
          <div>
            <p className="text-sm font-light text-black">
              {product.priceRange}
            </p>
          </div>
          <div className="bg-black text-white px-2 py-1 text-xs font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-gray-800">
            {isDbProduct ? 'Voir' : 'Infos'}
          </div>
        </div>
      </div>
    </Link>
  );
}
