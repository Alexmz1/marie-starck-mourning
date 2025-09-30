// /src/pages/boutique/BoutiquePage.js
'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const BoutiquePage = () => {
  const boutiqueProducts = {
    'compositions-offrir': {
      title: 'Compositions à offrir',
      description: 'Créations florales élégantes pour toutes les occasions spéciales et moments de partage.',
      products: [
        { name: 'Bouquet Élégance', description: 'Composition raffinée aux tons pastel', price: '45€' },
        { name: 'Arrangement Moderne', description: 'Design contemporain avec fleurs de saison', price: '65€' },
        { name: 'Création Délicate', description: 'Composition subtile et harmonieuse', price: '55€' },
        { name: 'Bouquet Sophistiqué', description: 'Arrangement aux couleurs nobles', price: '75€' }
      ]
    },
    'bouquets-frais': {
      title: 'Bouquets frais',
      description: 'Bouquets du jour composés avec les plus belles fleurs de saison, pour illuminer votre quotidien.',
      products: [
        { name: 'Bouquet du Jour', description: 'Sélection quotidienne de fleurs fraîches', price: '35€' },
        { name: 'Bouquet Champêtre', description: 'Style naturel aux couleurs vives', price: '40€' },
        { name: 'Bouquet Romantique', description: 'Tons roses et blancs délicats', price: '50€' },
        { name: 'Bouquet Printanier', description: 'Fraîcheur et couleurs de saison', price: '42€' }
      ]
    },
    'plantes-interieur': {
      title: 'Plantes d\'intérieur',
      description: 'Sélection de plantes vertes et fleuries pour apporter nature et sérénité à votre intérieur.',
      products: [
        { name: 'Monstera Deliciosa', description: 'Plante tropicale aux grandes feuilles', price: '25€' },
        { name: 'Orchidée Phalaenopsis', description: 'Élégance florale longue durée', price: '30€' },
        { name: 'Ficus Lyrata', description: 'Arbre d\'intérieur majestueux', price: '45€' },
        { name: 'Pothos Doré', description: 'Plante grimpante facile d\'entretien', price: '18€' }
      ]
    },
    'plantes-exterieur': {
      title: 'Plantes d\'extérieur',
      description: 'Variétés résistantes et colorées pour embellir jardins, terrasses et espaces extérieurs.',
      products: [
        { name: 'Lavande de Provence', description: 'Parfum méditerranéen authentique', price: '15€' },
        { name: 'Rosier Grimpant', description: 'Floraison généreuse et parfumée', price: '35€' },
        { name: 'Hortensia Bleu', description: 'Floraison spectaculaire estivale', price: '28€' },
        { name: 'Géranium Lierre', description: 'Idéal pour jardinières et balcons', price: '12€' }
      ]
    },
    'creations-saisonnieres': {
      title: 'Créations saisonnières',
      description: 'Collections temporaires qui évoluent au rythme des saisons et des tendances florales.',
      products: [
        { name: 'Couronne d\'Automne', description: 'Feuillages dorés et baies colorées', price: '55€' },
        { name: 'Centre de Table Hivernal', description: 'Ambiance chaleureuse de saison', price: '48€' },
        { name: 'Composition Festive', description: 'Créations pour occasions spéciales', price: '65€' },
        { name: 'Bouquet de Saison', description: 'Fleurs du moment sublimées', price: '38€' }
      ]
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                BOUTIQUE FLORALE
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Boutique
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Découvrez notre univers floral où chaque création raconte une histoire. 
                Compositions, bouquets et plantes sélectionnés avec passion pour embellir votre quotidien.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Nos Produits
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Découvrez notre sélection de créations florales et plantes, 
                chacune choisie avec soin pour sa beauté et sa qualité.
              </p>
            </div>

            {/* Products Sections */}
            {Object.entries(boutiqueProducts).map(([key, category], sectionIndex) => (
              <div key={key} id={key} className={`mb-24 ${sectionIndex > 0 ? 'pt-16 border-t border-gray-200' : ''}`}>
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <Link
                      key={product.name}
                      href={`/produit/boutique/${key}/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[àáâã]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[œ]/g, 'oe')}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-green-50 to-emerald-100">
                        <div className="w-full h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                          <svg className="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-light text-black group-hover:text-gray-600 transition-colors duration-300">
                            {product.name}
                          </h4>
                          <span className="text-lg font-light" style={{color: '#858585'}}>
                            {product.price}
                          </span>
                        </div>
                        <p className="text-gray-600 font-light text-sm leading-relaxed">
                          {product.description}
                        </p>
                        <div className="mt-3 flex items-center text-sm font-light group-hover:translate-x-1 transition-transform duration-300" style={{color: '#858585'}}>
                          <span>Voir le produit</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Visitez Notre Atelier
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Découvrez nos créations en personne et laissez-vous inspirer 
              par l'univers unique de notre atelier floral.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                NOUS RENDRE VISITE
              </Link>
              <a
                href="tel:0603059195"
                className="btn-secondary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                06 03 05 91 95
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BoutiquePage;
