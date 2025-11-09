// /src/pages/legal/ConditionsVentePage.js
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ConditionsVentePage = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
                            <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                CONDITIONS DE VENTE
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Conditions de Vente
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Les conditions générales de vente définissent les modalités de nos prestations 
                et encadrent notre relation commerciale dans le respect mutuel.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections - Two Columns */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left Column */}
              <div className="space-y-16">
                
                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 1 - Objet et champ d'application</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Les présentes conditions générales de vente s'appliquent à toutes les prestations de services 
                      proposées par Marie Starck, fleuriste, dans le cadre de son activité de création et livraison 
                      de compositions florales pour cérémonies de deuil, mariages et événements.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente 
                      par l'acheteur.
                    </p>
                  </div>
                </div>

                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>

                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 2 - Commandes</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Les commandes peuvent être passées par téléphone, email ou en personne à l'atelier. 
                      Chaque commande fait l'objet d'une confirmation écrite ou orale reprenant les détails 
                      de la prestation demandée.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Pour les cérémonies de deuil, nous nous efforçons de répondre aux demandes urgentes 
                      dans la mesure de nos disponibilités.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Les modifications de commande ne peuvent être acceptées que dans la limite de nos 
                      contraintes techniques et de délais.
                    </p>
                  </div>
                </div>

                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>

                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 3 - Prix et modalités de paiement</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Les prix sont exprimés en euros toutes taxes comprises. Ils incluent la création 
                      artisanale et peuvent inclure la livraison selon les modalités convenues.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Le paiement peut s'effectuer par chèque, espèces ou virement bancaire. 
                      Pour les prestations importantes, un acompte peut être demandé à la commande.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Les prix peuvent varier selon la saison et la disponibilité des fleurs. 
                      Un devis détaillé sera établi pour toute prestation sur mesure.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-16">
                
                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 4 - Livraison</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Pour garantir la qualité des fleurs, merci de passer commande au moins 24h à l'avance (jours ouvrés).
                    </p>
                    
                    <div>
                      <h3 className="text-lg font-light text-black mb-4 tracking-wide">Zones de livraison</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-base font-light text-black mb-2">Zone 1 – 0 à 10 km</h4>
                          <p className="text-gray-600 font-light mb-2">5€ - Livraison incluse</p>
                          <p className="text-gray-700 font-light leading-relaxed">
                            Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, Ris-Orangis, 
                            Saint-Germain-lès-Corbeil, Tigery, Morsang-sur-Seine, Villabé
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-light text-black mb-2">Zone 2 – 10 à 15 km</h4>
                          <p className="text-gray-600 font-light mb-2">+10€</p>
                          <p className="text-gray-700 font-light leading-relaxed">
                            Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, Combs-la-Ville, 
                            Lieusaint, Moissy-Cramayel, Épinay-sous-Sénart, Brunoy
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-light text-black mb-2">Zone 3 – 15 à 20 km</h4>
                          <p className="text-gray-600 font-light mb-2">+15€</p>
                          <p className="text-gray-700 font-light leading-relaxed">
                            Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, Épinay-sur-Orge, 
                            Crosne, Mandres-les-Roses
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-light text-black mb-2">Zone 4 – 20 à 25 km</h4>
                          <p className="text-gray-600 font-light mb-2">+20€</p>
                          <p className="text-gray-700 font-light leading-relaxed">
                            Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, Saint-Fargeau-Ponthierry, 
                            Seine-Port, Nandy, Yerres, Villecresnes, Le Mée-sur-Seine, Boissise-le-Roi, 
                            La Rochette, Pringy
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-light text-black mb-3 tracking-wide">Des compositions artisanales, fidèles à votre demande</h3>
                      <p className="text-gray-700 font-light leading-relaxed mb-3">
                        Toutes nos compositions florales sont réalisées à la main dans notre atelier à Soisy-sur-Seine.
                        Chaque pièce est conçue avec soin, au plus proche du visuel présenté sur notre site.
                      </p>
                      <p className="text-gray-700 font-light leading-relaxed">
                        Nous ne faisons pas appel à des services de transmission florale : ici, tout est fait maison, avec exigence et respect.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>

                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 5 - Responsabilité</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Notre responsabilité se limite à la fourniture des prestations convenues. 
                      Les compositions florales étant des créations artisanales avec des produits naturels, 
                      de légères variations peuvent survenir.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      En cas de force majeure ou d'indisponibilité de certaines variétés de fleurs, 
                      nous nous réservons le droit de proposer des alternatives de qualité équivalente.
                    </p>
                  </div>
                </div>

                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>

                <div>
                  <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Article 6 - Réclamations</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-light leading-relaxed">
                      Toute réclamation doit être formulée dans les 24 heures suivant la livraison. 
                      Nous nous engageons à examiner chaque réclamation avec attention et à apporter 
                      une solution appropriée.
                    </p>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Notre priorité est la satisfaction de nos clients et le respect de leurs émotions 
                      dans ces moments particuliers.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Une Question ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
              N&apos;hésitez pas à nous contacter pour toute information complémentaire 
              concernant nos conditions de vente ou nos prestations.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="inline-block py-4 px-10 font-light text-white transition-all duration-300 tracking-wide hover:shadow-lg"
                style={{backgroundColor: '#276f88'}}
              >
                NOUS CONTACTER
              </Link>
              <Link
                href="/"
                className="inline-block py-4 px-10 font-light text-black border transition-all duration-300 tracking-wide hover:shadow-lg"
                style={{borderColor: '#276f88'}}
              >
                RETOUR À L&apos;ACCUEIL
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConditionsVentePage;
