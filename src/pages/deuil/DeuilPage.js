// /src/pages/deuil/DeuilPage.js
'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const DeuilPage = () => {
  const deuilCategories = {
    'dessus-cercueil-classique': {
      title: 'Dessus de cercueil classique',
      price: '250€ à 300€',
      description: 'Composition majestueuse et allongée, le dessus de cercueil classique rend un dernier hommage solennel et élégant. Il est souvent choisi par la famille proche.',
      products: [
        { name: 'Dessus classique blanc', description: 'Fleurs blanches traditionnelles', price: '250€' },
        { name: 'Dessus classique pastel', description: 'Tons doux et apaisants', price: '270€' },
        { name: 'Dessus classique prestige', description: 'Composition luxueuse', price: '300€' },
        { name: 'Dessus classique personnalisé', description: 'Selon vos couleurs préférées', price: 'Sur devis' }
      ]
    },
    'dessus-cercueil-goutte': {
      title: 'Dessus de cercueil en goutte',
      price: '≈ 150€',
      description: 'En forme de goutte d\'eau, cette composition symbolise la continuité de la vie et les larmes d\'adieu. Élégant et discret, il convient à des hommages sobres.',
      products: [
        { name: 'Goutte classique', description: 'Forme traditionnelle épurée', price: '150€' },
        { name: 'Goutte moderne', description: 'Design contemporain', price: '160€' },
        { name: 'Goutte champêtre', description: 'Style naturel et authentique', price: '145€' },
        { name: 'Goutte délicate', description: 'Tons pastel raffinés', price: '155€' }
      ]
    },
    'dessus-cercueil-rond': {
      title: 'Dessus de cercueil rond',
      price: '≈ 150€',
      description: 'Sa forme ronde évoque le cycle de la vie, l\'éternité et la douceur. Idéal pour une touche florale poétique et épurée.',
      products: [
        { name: 'Rond classique', description: 'Composition traditionnelle', price: '150€' },
        { name: 'Rond moderne', description: 'Design épuré et contemporain', price: '160€' },
        { name: 'Rond naturel', description: 'Style champêtre et authentique', price: '145€' },
        { name: 'Rond élégant', description: 'Raffinement et distinction', price: '165€' }
      ]
    },
    'devant-tombe': {
      title: 'Devant de tombe',
      price: 'à partir de 200€',
      description: 'Placé au pied de la tombe, ce bouquet habille le lieu de repos avec respect. Il témoigne d\'un attachement profond et durable.',
      products: [
        { name: 'Arrangement permanent', description: 'Composition longue durée', price: '200€' },
        { name: 'Jardinière moderne', description: 'Design contemporain élégant', price: '220€' },
        { name: 'Composition saisonnière', description: 'Adaptée aux saisons', price: '210€' },
        { name: 'Arrangement personnalisé', description: 'Selon vos préférences', price: '250€' }
      ]
    },
    'coussins': {
      title: 'Coussins de fleurs',
      price: 'formes variées',
      description: 'Le coussin de fleurs symbolise la paix, le repos éternel et la tendresse. Il est parfait pour représenter l\'amour familial ou amical.',
      products: [
        { name: 'Coussin panier', description: 'Forme traditionnelle tressée', price: '80€' },
        { name: 'Oreiller floral', description: 'Douceur et tendresse', price: '85€' },
        { name: 'Coussin carré', description: 'Design géométrique épuré', price: '75€' },
        { name: 'Coussin personnalisé', description: 'Forme selon vos souhaits', price: 'Sur devis' }
      ]
    },
    'bouquet-gerbe': {
      title: 'Bouquet gerbe',
      price: '≈ 100€',
      description: 'Élancé et naturel, le bouquet gerbe est souvent offert par les amis ou les collègues pour un dernier geste d\'affection.',
      products: [
        { name: 'Gerbe classique', description: 'Composition traditionnelle généreuse', price: '100€' },
        { name: 'Gerbe moderne', description: 'Style contemporain et épuré', price: '110€' },
        { name: 'Gerbe champêtre', description: 'Naturelle et authentique', price: '95€' },
        { name: 'Gerbe prestige', description: 'Luxueuse et imposante', price: '130€' }
      ]
    },
    'coeur-floral': {
      title: 'Cœur floral',
      price: 'prix variable',
      description: 'Le cœur exprime l\'amour éternel, la loyauté et la proximité. Il est souvent choisi par un conjoint, un enfant ou un parent proche.',
      products: [
        { name: 'Cœur tendre', description: 'Roses roses et blanches délicates', price: '75€' },
        { name: 'Cœur passion', description: 'Roses rouges profondes', price: '80€' },
        { name: 'Cœur pur', description: 'Composition entièrement blanche', price: '75€' },
        { name: 'Cœur moderne', description: 'Design contemporain raffiné', price: '85€' }
      ]
    },
    'couronne': {
      title: 'Couronne de fleurs',
      price: 'prix variable',
      description: 'La couronne évoque l\'éternité et le souvenir inaltérable. Elle est traditionnellement posée autour du cercueil ou sur la tombe.',
      products: [
        { name: 'Couronne classique', description: 'Tradition et élégance intemporelle', price: '65€' },
        { name: 'Couronne champêtre', description: 'Style naturel et authentique', price: '70€' },
        { name: 'Couronne moderne', description: 'Design contemporain épuré', price: '75€' },
        { name: 'Couronne prestige', description: 'Composition luxueuse et raffinée', price: '90€' }
      ]
    },
    'croix': {
      title: 'Croix de fleurs',
      price: 'prix variable',
      description: 'La croix florale incarne la foi, l\'espérance et le passage vers l\'au-delà. Elle convient particulièrement aux cérémonies religieuses.',
      products: [
        { name: 'Croix traditionnelle', description: 'Composition classique aux fleurs blanches', price: '85€' },
        { name: 'Croix moderne', description: 'Design épuré et contemporain', price: '95€' },
        { name: 'Croix pastel', description: 'Tons doux et apaisants', price: '90€' },
        { name: 'Croix majestueuse', description: 'Grande taille, impact solennel', price: '120€' }
      ]
    },
    'formes-speciales': {
      title: 'Formes spéciales',
      price: 'étoile, papillon, ourson...',
      description: 'Pensées pour les enfants ou les hommages plus personnels, ces formes originales permettent d\'exprimer tendresse, innocence ou un lien particulier.',
      products: [
        { name: 'Étoile florale', description: 'Symbole de lumière et d\'espoir', price: 'Sur devis' },
        { name: 'Papillon floral', description: 'Métamorphose et liberté', price: 'Sur devis' },
        { name: 'Ourson en fleurs', description: 'Tendresse pour les enfants', price: 'Sur devis' },
        { name: 'Forme personnalisée', description: 'Création unique selon vos souhaits', price: 'Sur devis' }
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
                COMPOSITIONS DE DEUIL
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Deuil
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Parce que chaque hommage est unique, nous vous proposons une gamme de compositions florales funéraires adaptées à vos 
                souhaits et aux volontés du défunt. Qu’il s’agisse d’un dessus de cercueil, d’un cœur ou d’un devant de tombe, nos fleurs 
                de deuil sont réalisées avec soin pour transmettre vos émotions avec respect et délicatesse.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Nos Compositions
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Découvrez notre collection complète de compositions funéraires, 
                créées avec respect et dans la tradition florale.
              </p>
            </div>

            {/* Categories Sections */}
            {Object.entries(deuilCategories).map(([key, category], sectionIndex) => (
              <div key={key} id={key} className={`mb-24 ${sectionIndex > 0 ? 'pt-16 border-t border-gray-200' : ''}`}>
                <div className="text-center mb-12">
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl font-light text-black mb-2 tracking-tight">
                      {category.title}
                    </h3>
                    <div className="text-lg font-light" style={{color: '#858585'}}>
                      ({category.price})
                    </div>
                  </div>
                  <div className="w-16 h-0.5 mx-auto mb-6" style={{backgroundColor: '#858585'}}></div>
                  <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <Link
                      key={product.name}
                      href={`/produit/deuil/${key}/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[àáâã]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[œ]/g, 'oe')}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
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
              Besoin de Conseils ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Notre équipe est à votre disposition pour vous accompagner dans le choix 
              de la composition la plus appropriée à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                NOUS CONTACTER
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

export default DeuilPage;
