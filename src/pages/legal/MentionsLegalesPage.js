// /src/pages/legal/MentionsLegalesPage.js
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MentionsLegalesPage = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                INFORMATIONS LÉGALES
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Mentions Légales
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Informations légales concernant notre atelier floral et l&apos;utilisation 
                de ce site internet.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections - Two Columns */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* First Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Éditeur du site</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    <strong>Marie Starck</strong><br/>
                    Atelier floral<br/>
                    Soisy-sur-Seine, Essonne (91)<br/>
                    France
                  </p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    <strong>Email :</strong> starck.marie@gmail.com<br/>
                    <strong>Téléphone :</strong> 01 23 45 67 89
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Données personnelles</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), 
                    vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression 
                    des données vous concernant.
                  </p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Les informations recueillies via le formulaire de contact sont utilisées 
                    uniquement pour répondre à vos demandes et ne sont jamais transmises à des tiers.
                  </p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-300 my-16"></div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Hébergement</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    Ce site est hébergé par Vercel Inc.<br/>
                    340 S Lemon Ave #4133<br/>
                    Walnut, CA 91789<br/>
                    États-Unis
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Responsabilité</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    Les informations présentes sur ce site sont données à titre indicatif 
                    et peuvent être modifiées sans préavis.
                  </p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Marie Starck ne saurait être tenue responsable de l&apos;utilisation 
                    qui pourrait être faite de ces informations.
                  </p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-300 my-16"></div>

            {/* Third Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Propriété intellectuelle</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    L&apos;ensemble des contenus présents sur ce site (textes, images, photographies) 
                    sont la propriété exclusive de Marie Starck, sauf mention contraire.
                  </p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Droit applicable</h2>
                <div className="space-y-4">
                  <p className="text-gray-700 font-light leading-relaxed">
                    Les présentes mentions légales sont soumises au droit français.
                  </p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    En cas de litige, les tribunaux français seront seuls compétents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Une Question Juridique ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
              Pour toute question concernant ces mentions légales ou l&apos;utilisation de ce site, 
              n&apos;hésitez pas à nous contacter.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                NOUS CONTACTER
              </Link>
              <Link
                href="/"
                className="btn-secondary-gray inline-block py-4 px-10 font-light tracking-wide"
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

export default MentionsLegalesPage;
