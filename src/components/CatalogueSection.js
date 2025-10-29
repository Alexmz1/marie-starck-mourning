import { productCategories } from '../data/products';

export default function CatalogueSection() {
  return (
    <section id="catalogue" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 border border-black text-black text-sm font-light mb-4">
            Catalogue complet
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            Toutes nos Compositions
          </h2>
          <p className="text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez l'ensemble de nos créations florales funéraires, chacune réalisée avec soin et attention pour honorer vos proches.
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div 
              key={category.id}
              id={category.id}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-black/10 transition-colors duration-300">
                      {/* Icônes spécifiques selon la catégorie */}
                      {category.id.includes('cercueil') && (
                        <svg className="w-8 h-8 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      )}
                      {category.id === 'coeurs' && (
                        <svg className="w-8 h-8 text-black/60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      )}
                      {category.id === 'couronnes' && (
                        <svg className="w-8 h-8 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="1.5"/>
                        </svg>
                      )}
                      {(category.id === 'coussins' || category.id === 'bouquet-gerbe' || category.id === 'croix' || category.id === 'devant-de-tombe') && (
                        <svg className="w-8 h-8 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      )}
                      {category.id === 'formes-speciales' && (
                        <svg className="w-8 h-8 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-light">{category.name}</p>
                  </div>
                </div>
                
                {/* Badge prix */}
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-light">
                  {category.priceRange}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-light text-black group-hover:text-gray-800 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                
                <p className="text-gray-700 font-light leading-relaxed">
                  {category.description}
                </p>

                {/* Bouton d'action */}
                <div className="pt-4">
                  <button className="w-full bg-black text-white py-3 px-4 font-light transition-all duration-300 hover:bg-gray-800">
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action final */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 p-8 max-w-2xl mx-auto rounded-lg">
            <h3 className="text-2xl font-light mb-4">Une création sur mesure ?</h3>
            <p className="text-gray-700 font-light mb-6">
              Nous réalisons également des compositions entièrement personnalisées selon vos souhaits et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0123456789" className="bg-black text-white px-6 py-3 font-light transition-all duration-300 hover:bg-gray-800">
                Nous appeler
              </a>
              <a href="#contact" className="border border-black text-black px-6 py-3 font-light transition-all duration-300 hover:bg-black hover:text-white">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
