// /src/pages/legal/LivraisonPage.js
import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LivraisonPage = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                INFORMATIONS LIVRAISON
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Livraisons
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Informations sur nos zones de livraison, tarifs et modalités de récupération 
                pour vos créations florales artisanales.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Délais de commande */}
            <div className="mb-20 text-center">
              <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto" style={{border: '1px solid #276f88'}}>
                <h2 className="text-3xl font-light text-black mb-6 tracking-wide">Délais de Commande</h2>
                <p className="text-xl text-gray-700 font-light leading-relaxed mb-4">
                  Pour garantir la qualité des fleurs, merci de passer commande au moins 
                  <strong className="text-black"> 24h à l'avance</strong> (jours ouvrés).
                </p>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  Commande minimum 24h à l'avance pour nous laisser le temps de créer votre composition.
                </p>
              </div>
            </div>

            {/* Zones de livraison */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-black mb-6 tracking-wide">Zones de Livraison</h2>
                <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                  Nos tarifs de livraison sont calculés selon la distance depuis notre atelier à Soisy-sur-Seine.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Zone 1 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center" style={{border: '2px solid #276f88'}}>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-light text-green-600">1</span>
                  </div>
                  <h3 className="text-xl font-light text-black mb-2">Zone 1</h3>
                  <p className="text-sm text-gray-600 mb-4">0 à 10 km</p>
                  <div className="text-3xl font-light text-green-600 mb-4">5€</div>
                  <p className="text-sm text-gray-500 mb-4 font-medium">Livraison incluse</p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, 
                    Ris-Orangis, Saint-Germain-lès-Corbeil, Tigery, Morsang-sur-Seine, Villabé
                  </div>
                </div>

                {/* Zone 2 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center" style={{border: '2px solid #276f88'}}>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-light text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-light text-black mb-2">Zone 2</h3>
                  <p className="text-sm text-gray-600 mb-4">10 à 15 km</p>
                  <div className="text-3xl font-light text-blue-600 mb-4">+10€</div>
                  <p className="text-sm text-gray-500 mb-4 opacity-0">Espacement</p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, 
                    Combs-la-Ville, Lieusaint, Moissy-Cramayel, Épinay-sous-Sénart, Brunoy
                  </div>
                </div>

                {/* Zone 3 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center" style={{border: '2px solid #276f88'}}>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-light text-orange-600">3</span>
                  </div>
                  <h3 className="text-xl font-light text-black mb-2">Zone 3</h3>
                  <p className="text-sm text-gray-600 mb-4">15 à 20 km</p>
                  <div className="text-3xl font-light text-orange-600 mb-4">+15€</div>
                  <p className="text-sm text-gray-500 mb-4 opacity-0">Espacement</p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, 
                    Épinay-sur-Orge, Crosne, Mandres-les-Roses
                  </div>
                </div>

                {/* Zone 4 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center" style={{border: '2px solid #276f88'}}>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-light text-red-600">4</span>
                  </div>
                  <h3 className="text-xl font-light text-black mb-2">Zone 4</h3>
                  <p className="text-sm text-gray-600 mb-4">20 à 25 km</p>
                  <div className="text-3xl font-light text-red-600 mb-4">+20€</div>
                  <p className="text-sm text-gray-500 mb-4 opacity-0">Espacement</p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, Saint-Fargeau-Ponthierry, 
                    Seine-Port, Nandy, Yerres, Villecresnes, Le Mée-sur-Seine, Boissise-le-Roi, 
                    La Rochette, Pringy
                  </div>
                </div>

              </div>
            </div>

            {/* Modes de récupération */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-black mb-6 tracking-wide">Modes de Récupération</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Livraison à domicile */}
                <div className="bg-white rounded-lg shadow-sm p-8" style={{border: '1px solid #276f88'}}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-black">Livraison à Domicile</h3>
                  </div>
                  <p className="text-gray-700 font-light leading-relaxed mb-4">
                    Nous livrons directement à votre adresse dans toutes nos zones de livraison.
                  </p>
                  <p className="text-gray-600 font-light text-sm">
                    Frais de livraison calculés selon la distance depuis notre atelier.
                  </p>
                </div>

                {/* Click & Collect */}
                <div className="bg-white rounded-lg shadow-sm p-8" style={{border: '1px solid #276f88'}}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-black">Click & Collect</h3>
                  </div>
                  <p className="text-gray-700 font-light leading-relaxed mb-4">
                    Récupération gratuite à l'atelier
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 font-medium text-sm mb-2">📍 Notre Atelier</p>
                    <p className="text-green-700 text-sm leading-relaxed">
                      Centre commercial des Meillottes<br/>
                      1 rue de la forêt de Sénart<br/>
                      91450 Soisy-sur-Seine
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Qualité artisanale */}
            <div className="bg-white rounded-lg shadow-sm p-12 text-center" style={{border: '1px solid #276f88'}}>
              <h2 className="text-3xl font-light text-black mb-8 tracking-wide">
                Des Compositions Artisanales, Fidèles à Votre Demande
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl text-gray-700 font-light leading-relaxed">
                  Toutes nos compositions florales sont réalisées à la main dans notre atelier à Soisy-sur-Seine. 
                  Chaque pièce est conçue avec soin, au plus proche du visuel présenté sur notre site.
                </p>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  Nous ne faisons pas appel à des services de transmission florale : ici, tout est fait maison, 
                  avec exigence et respect.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Une Question sur la Livraison ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
              Pour toute question sur nos zones de livraison ou nos tarifs, 
              n'hésitez pas à nous contacter directement.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                NOUS CONTACTER
              </Link>
              <Link
                href="/boutique"
                className="btn-secondary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                VOIR LA BOUTIQUE
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LivraisonPage;