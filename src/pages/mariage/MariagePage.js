// /src/pages/mariage/MariagePage.js
'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const MariagePage = () => {
  const mariageServices = {
    'bouquet-mariee': {
      title: 'Bouquet de mariée',
      description: 'Créations uniques pour sublimer votre jour J, dans le style qui vous ressemble.',
      products: [
        { name: 'Bouquet Classique', description: 'Élégance intemporelle avec roses blanches', price: '120€' },
        { name: 'Bouquet Bohème', description: 'Style naturel avec fleurs sauvages', price: '110€' },
        { name: 'Bouquet Moderne', description: 'Design contemporain et épuré', price: '130€' },
        { name: 'Bouquet Romantique', description: 'Tons pastels et pivoines délicates', price: '140€' }
      ]
    },
    'decoration-ceremonie': {
      title: 'Décoration cérémonie',
      description: 'Ornements floraux pour église, mairie et lieu de réception, créant une atmosphère magique.',
      products: [
        { name: 'Arche Florale', description: 'Structure majestueuse pour vos vœux', price: '350€' },
        { name: 'Compositions d\'Autel', description: 'Décorations élégantes pour la cérémonie', price: '180€' },
        { name: 'Chemins de Pétales', description: 'Tapis floral pour votre entrée', price: '80€' },
        { name: 'Arrangements Latéraux', description: 'Décorations d\'allée raffinées', price: '150€' }
      ]
    },
    'centres-table': {
      title: 'Centres de table',
      description: 'Compositions élégantes pour habiller vos tables avec raffinement et harmonie.',
      products: [
        { name: 'Centre Bas Classic', description: 'Élégance discrète pour conversations', price: '45€' },
        { name: 'Centre Haut Spectaculaire', description: 'Impact visuel saisissant', price: '75€' },
        { name: 'Centre Moderne Épuré', description: 'Design contemporain et chic', price: '55€' },
        { name: 'Centre Champêtre', description: 'Charme rustique et naturel', price: '50€' }
      ]
    },
    'boutonnieres': {
      title: 'Boutonnières',
      description: 'Accessoires floraux assortis pour le marié, témoins et famille, dans l\'esprit de votre bouquet.',
      products: [
        { name: 'Boutonnière Classique', description: 'Rose blanche traditionnelle', price: '15€' },
        { name: 'Boutonnière Moderne', description: 'Design contemporain original', price: '18€' },
        { name: 'Boutonnière Champêtre', description: 'Style naturel et décontracté', price: '16€' },
        { name: 'Boutonnière Sophistiquée', description: 'Finition luxe avec détails', price: '22€' }
      ]
    },
    'arche-florale': {
      title: 'Arche florale',
      description: 'Structures florales spectaculaires pour encadrer vos vœux et créer des souvenirs inoubliables.',
      products: [
        { name: 'Arche Classique', description: 'Élégance traditionnelle intemporelle', price: '400€' },
        { name: 'Arche Moderne', description: 'Design contemporain épuré', price: '450€' },
        { name: 'Arche Romantique', description: 'Drapés floraux vaporeux et délicats', price: '380€' },
        { name: 'Arche Spectaculaire', description: 'Installation grandiose et majestueuse', price: '550€' }
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
                CRÉATIONS DE MARIAGE
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Mariage
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Transformez votre jour J en un conte de fées avec nos créations florales 
                sur mesure, conçues pour refléter votre amour unique et votre style personnel.
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
                Découvrez notre collection complète de créations florales 
                pour faire de votre mariage un jour inoubliable.
              </p>
            </div>

            {/* Services Sections */}
            {Object.entries(mariageServices).map(([key, service], sectionIndex) => (
              <div key={key} id={key} className={`mb-24 ${sectionIndex > 0 ? 'pt-16 border-t border-gray-200' : ''}`}>
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.products.map((product, index) => (
                    <Link
                      key={product.name}
                      href={`/produit/mariage/${key}/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[àáâã]/g, 'a').replace(/[èéêë]/g, 'e').replace(/[ùúûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[œ]/g, 'oe')}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-pink-50 to-rose-100">
                        <div className="w-full h-40 bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
                          <svg className="w-12 h-12 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
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
              Planifions Ensemble
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Prenez rendez-vous pour une consultation personnalisée et donnons vie 
              à vos rêves floraux pour votre mariage.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                PRENDRE RENDEZ-VOUS
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

export default MariagePage;
