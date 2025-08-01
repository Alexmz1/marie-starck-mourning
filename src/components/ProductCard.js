export default function ProductCard({ product }) {
  // Images de démonstration basées sur la catégorie
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

  return (
    <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <img 
          src={getImageUrl(product.category)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Badge de prix */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-light">
          {product.priceRange}
        </div>
        
        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div>
          <h3 className="text-xl font-light text-black group-hover:text-gray-800 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 font-light mt-1">{product.category}</p>
        </div>
        
        <p className="text-gray-700 font-light leading-relaxed flex-1">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center pt-2 mt-auto">
          <div>
            <p className="text-lg font-light text-black">
              {product.priceRange}
            </p>
          </div>
          <button className="bg-black text-white px-4 py-2 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-gray-800">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}
