import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Livraisons et zones de livraison - L\'Atelier Floral de Marie Starck',
  description: 'Informations sur nos zones de livraison, tarifs et modalités de récupération pour vos créations florales artisanales. Livraison dans l\'Essonne et Seine-et-Marne.',
  keywords: 'livraison fleurs, zones livraison Essonne, tarifs livraison fleuriste, click collect Soisy-sur-Seine, livraison compositions florales'
};

export default function Livraisons() {
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
            
            {/* Délais de commande - Style cohérent */}
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-light text-black mb-8 tracking-wide">Délais de Commande</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl text-gray-700 font-light leading-relaxed mb-6">
                  Pour garantir la qualité des fleurs, merci de passer commande au moins 
                  <strong className="text-black"> 24h à l'avance</strong> (jours ouvrés).
                </p>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  Commande minimum 24h à l'avance pour nous laisser le temps de créer votre composition.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-300 my-20"></div>

            {/* Modes de récupération avec zones intégrées */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-black mb-8 tracking-wide">Modes de Récupération</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Livraison à domicile avec cartes de zones */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6" style={{backgroundColor: '#276f88'}}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-black tracking-wide">Livraison à Domicile</h3>
                  </div>
                  <div className="space-y-6 mb-8">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Nous livrons directement à votre adresse dans toutes nos zones de livraison.
                    </p>
                    <p className="text-gray-600 font-light">
                      Frais de livraison calculés selon la distance depuis notre atelier à Soisy-sur-Seine :
                    </p>
                  </div>

                  {/* Cartes de zones intégrées */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Zone 1 */}
                    <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-full -mr-8 -mt-8 opacity-40"></div>
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-white">1</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-light text-green-700">5€</div>
                            <div className="text-xs text-green-600 font-medium">INCLUS</div>
                          </div>
                        </div>
                        <h4 className="text-lg font-light text-gray-800 mb-1">Zone 1</h4>
                        <p className="text-sm text-gray-600 mb-4">0 à 10 km</p>
                        <div className="text-xs text-gray-700 leading-relaxed">
                          Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, 
                          Ris-Orangis, Saint-Germain-lès-Corbeil, Tigery...
                        </div>
                      </div>
                    </div>

                    {/* Zone 2 */}
                    <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full -mr-8 -mt-8 opacity-40"></div>
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-white">2</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-light text-blue-700">+10€</div>
                          </div>
                        </div>
                        <h4 className="text-lg font-light text-gray-800 mb-1">Zone 2</h4>
                        <p className="text-sm text-gray-600 mb-4">10 à 15 km</p>
                        <div className="text-xs text-gray-700 leading-relaxed">
                          Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, 
                          Combs-la-Ville, Lieusaint...
                        </div>
                      </div>
                    </div>

                    {/* Zone 3 */}
                    <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-200 rounded-full -mr-8 -mt-8 opacity-40"></div>
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-white">3</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-light text-amber-700">+15€</div>
                          </div>
                        </div>
                        <h4 className="text-lg font-light text-gray-800 mb-1">Zone 3</h4>
                        <p className="text-sm text-gray-600 mb-4">15 à 20 km</p>
                        <div className="text-xs text-gray-700 leading-relaxed">
                          Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, 
                          Épinay-sur-Orge, Crosne...
                        </div>
                      </div>
                    </div>

                    {/* Zone 4 */}
                    <div className="relative overflow-hidden rounded-xl shadow-md bg-gradient-to-br from-rose-50 to-rose-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-200 rounded-full -mr-8 -mt-8 opacity-40"></div>
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-white">4</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-light text-rose-700">+20€</div>
                          </div>
                        </div>
                        <h4 className="text-lg font-light text-gray-800 mb-1">Zone 4</h4>
                        <p className="text-sm text-gray-600 mb-4">20 à 25 km</p>
                        <div className="text-xs text-gray-700 leading-relaxed">
                          Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, 
                          Saint-Fargeau-Ponthierry...
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Click & Collect */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6" style={{backgroundColor: '#276f88'}}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-black tracking-wide">Click & Collect</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      <strong>Récupération gratuite</strong> à l'atelier
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <p className="text-gray-700 font-medium">Notre Atelier</p>
                      </div>
                      <p className="text-gray-600 font-light leading-relaxed">
                        Centre commercial des Meillottes<br/>
                        1 rue de la forêt de Sénart<br/>
                        91450 Soisy-sur-Seine
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-300 my-20"></div>

            {/* Qualité artisanale - Style cohérent */}
            <div className="text-center">
              <h2 className="text-4xl font-light text-black mb-8 tracking-wide">
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
}