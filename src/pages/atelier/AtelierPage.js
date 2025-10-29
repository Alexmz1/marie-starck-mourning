// /src/pages/atelier/AtelierPage.js
'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AtelierPage = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                NOTRE SAVOIR-FAIRE
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Notre Atelier
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Dans notre atelier de Soisy-sur-Seine, chaque composition florale naît d'une attention 
                particulière aux détails et d'un savoir-faire artisanal transmis avec passion.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Notre Philosophie
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-700 font-light leading-relaxed italic">
                "Je mets tout mon savoir-faire et toute mon attention dans la réalisation de chaque composition florale. 
                Parce qu'un dernier au revoir mérite douceur, respect et sincérité, je crée chaque pièce avec le cœur, 
                comme un hommage unique à la personne disparue."
              </p>
              <p className="text-lg text-black font-light mt-8">— Marie Starck</p>
            </div>
          </div>
        </div>

        {/* Services Features */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              <div className="text-center group">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-10 h-10" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Création Artisanale</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Chaque composition est unique, pensée et réalisée à la main avec une attention particulière 
                  aux formes, couleurs et émotions.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-10 h-10" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Fleurs Fraîches</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Sélection directe à Rungis pour garantir une fraîcheur optimale et des variétés 
                  de qualité exceptionnelle.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center bg-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <svg className="w-10 h-10" style={{color: '#276f88'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-black mb-4 tracking-wide">Service 7j/7</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Disponibilité et réactivité pour vous accompagner dans tous vos moments importants, 
                  avec respect et professionnalisme.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Notre Démarche
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                De la conception à la livraison, chaque étape est pensée pour honorer vos émotions 
                et créer des compositions qui vous ressemblent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "01", title: "Écoute", desc: "Comprendre vos besoins et vos émotions" },
                { number: "02", title: "Conception", desc: "Créer un projet personnalisé et unique" },
                { number: "03", title: "Réalisation", desc: "Composer avec soin et attention" },
                { number: "04", title: "Livraison", desc: "Accompagner jusqu'au dernier moment" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border-2" style={{borderColor: '#276f88'}}>
                    <span className="text-xl font-light" style={{color: '#276f88'}}>{step.number}</span>
                  </div>
                  <h3 className="text-lg font-light text-black mb-3 tracking-wide">{step.title}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Découvrez Notre Univers
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
              Venez nous rencontrer dans notre atelier ou contactez-nous pour découvrir 
              comment nous pouvons créer ensemble vos compositions florales.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <a
                href="/contact"
                className="btn-primary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                NOUS CONTACTER
              </a>
              <a
                href="/"
                className="btn-secondary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                RETOUR À L'ACCUEIL
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AtelierPage;
