// /src/pages/contact/ContactPage.js
'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ContactPage = () => {
  const [selectedPrestation, setSelectedPrestation] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const prestationOptions = [
    { value: '', label: 'Type de prestation' },
    { value: 'deuil', label: 'Compositions de deuil' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'autre', label: 'Autre événement' }
  ];

  const handleSelectOption = (value, label) => {
    setSelectedPrestation(value);
    setIsDropdownOpen(false);
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-select')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #858585'}}>
                PRENONS CONTACT
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Contact
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Nous sommes à votre écoute pour créer ensemble des compositions florales 
                qui honoreront vos moments les plus précieux avec délicatesse et respect.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-8 h-8" style={{color: '#858585'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Téléphone</h3>
                <p className="text-gray-600 font-light mb-2">Appelez-nous directement</p>
                <a href="tel:+33123456789" className="text-black font-light hover:underline">
                  06 03 05 91 95
                </a>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-8 h-8" style={{color: '#858585'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Email</h3>
                <p className="text-gray-600 font-light mb-2">Écrivez-nous</p>
                <a href="mailto:contact@marie-starck.fr" className="text-black font-light hover:underline">
                  contact@marie-starck.fr
                </a>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-8 h-8" style={{color: '#858585'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Atelier</h3>
                <p className="text-gray-600 font-light mb-2">Venez nous voir</p>
                <p className="text-black font-light">Soisy-sur-Seine</p>
                <p className="text-black font-light">Essonne (91)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              <div className="text-center">
                <h3 className="text-2xl font-light text-black mb-6 tracking-wide">Horaires d'Ouverture</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Lundi - Vendredi</span>
                    <span className="text-black font-light">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Samedi</span>
                    <span className="text-black font-light">9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Dimanche</span>
                    <span className="text-black font-light">Sur rendez-vous</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <p className="text-sm text-gray-600 font-light italic">
                      Service d'urgence disponible 7j/7 pour les cérémonies
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-light text-black mb-6 tracking-wide">Zone de Livraison</h3>
                <div className="space-y-3">
                  <p className="text-gray-600 font-light">• Soisy-sur-Seine et communes limitrophes</p>
                  <p className="text-gray-600 font-light">• Essonne (91)</p>
                  <p className="text-gray-600 font-light">• Paris et petite couronne</p>
                  <p className="text-gray-600 font-light">• Seine-et-Marne (selon secteur)</p>
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <p className="text-sm text-gray-600 font-light italic">
                      Autres destinations possibles sur demande
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Écrivez-nous
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Partagez-nous vos besoins, nous vous répondrons dans les plus brefs délais 
                pour créer ensemble quelque chose de beau et de respectueux.
              </p>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Select personnalisé */}
              <div className="relative custom-select">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-left transition-all duration-300 flex items-center justify-between ${
                    selectedPrestation ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  <span>
                    {selectedPrestation 
                      ? prestationOptions.find(opt => opt.value === selectedPrestation)?.label 
                      : 'Type de prestation'
                    }
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {/* Dropdown personnalisé */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-sm shadow-lg z-10 max-h-60 overflow-y-auto">
                    {prestationOptions.slice(1).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectOption(option.value, option.label)}
                        className="w-full py-3 px-6 text-left font-light text-black hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input caché pour le formulaire */}
                <input
                  type="hidden"
                  name="prestation"
                  value={selectedPrestation}
                />
              </div>

              <div>
                <textarea
                  rows="6"
                  placeholder="Décrivez-nous votre projet, vos souhaits, l'occasion..."
                  className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 resize-none transition-all duration-300"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="py-4 px-12 font-light text-white transition-all duration-300 tracking-wide hover:shadow-lg"
                  style={{backgroundColor: '#858585'}}
                >
                  ENVOYER LE MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delivery Zones Section */}
        <div className="py-16" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
                Zones de Livraison
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                Nous livrons dans un rayon de 25 km autour de notre atelier de Soisy-sur-Seine
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-light text-black mb-3 tracking-wide">Zone 1 – 0 à 10 km</h3>
                    <p className="text-lg font-light mb-2" style={{color: '#858585'}}>5€ - Livraison incluse</p>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, Ris-Orangis, 
                      Saint-Germain-lès-Corbeil, Tigery, Morsang-sur-Seine, Villabé
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-light text-black mb-3 tracking-wide">Zone 2 – 10 à 15 km</h3>
                    <p className="text-lg font-light mb-2" style={{color: '#858585'}}>+10€</p>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, Combs-la-Ville, 
                      Lieusaint, Moissy-Cramayel, Épinay-sous-Sénart, Brunoy
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-light text-black mb-3 tracking-wide">Zone 3 – 15 à 20 km</h3>
                    <p className="text-lg font-light mb-2" style={{color: '#858585'}}>+15€</p>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, Épinay-sur-Orge, 
                      Crosne, Mandres-les-Roses
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-light text-black mb-3 tracking-wide">Zone 4 – 20 à 25 km</h3>
                    <p className="text-lg font-light mb-2" style={{color: '#858585'}}>+20€</p>
                    <p className="text-gray-600 font-light leading-relaxed">
                      Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, Saint-Fargeau-Ponthierry, 
                      Seine-Port, Nandy, Yerres, Villecresnes, Le Mée-sur-Seine, Boissise-le-Roi, 
                      La Rochette, Pringy
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 font-light leading-relaxed">
                  Pour garantir la qualité des fleurs, merci de passer commande au moins 24h à l'avance (jours ouvrés).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
