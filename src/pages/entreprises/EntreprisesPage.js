// /src/pages/entreprises/EntreprisesPage.js
'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const EntreprisesPage = () => {
  const entreprisesCategories = {
    'abonnements-floraux': {
      title: 'Abonnements floraux',
      subtitle: 'Service régulier et pratique',
      description: 'Recevez régulièrement vos bouquets livrés directement dans leur vase, prêts à sublimer vos espaces. Un service fiable qui allie élégance, fraîcheur et praticité.',
      features: [
        'Livraison directe dans vos locaux',
        'Bouquets préparés dans leur vase',
        'Renouvellement automatique selon votre fréquence',
        'Service personnalisable selon vos besoins',
        'Qualité et fraîcheur garanties'
      ],
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    'evenements-seminaires': {
      title: 'Événements & Séminaires',
      subtitle: 'Décors sur mesure',
      description: 'Conférences, réunions, lancements, inaugurations ou soirées d\'entreprise : nous créons des décors floraux uniques et adaptés à votre image. Des compositions sur mesure qui renforcent l\'impact de vos moments forts.',
      features: [
        'Décoration personnalisée selon votre charte graphique',
        'Création d\'ambiances uniques',
        'Installation et mise en place sur site',
        'Compositions adaptées à tous types d\'événements',
        'Service complet de A à Z'
      ],
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    },
    'vegetalisation-espaces': {
      title: 'Végétalisation d\'espaces',
      subtitle: 'Environnements vivants',
      description: 'Transformez vos bureaux, halls ou restaurants d\'entreprise en lieux vivants et accueillants grâce à nos plantes et installations végétales. Un service complet de conseil, installation et entretien pour un cadre durable et chaleureux.',
      features: [
        'Étude personnalisée de vos espaces',
        'Sélection de plantes adaptées à l\'environnement',
        'Installation professionnelle',
        'Service d\'entretien régulier',
        'Conseil en aménagement végétal'
      ],
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    'arbre-noel': {
      title: 'Arbre de Noël',
      subtitle: 'Magie des fêtes',
      description: 'Apportez la magie des fêtes dans vos locaux avec un sapin décoré et installé par nos soins. Du choix du sapin à la mise en place des décorations, nous vous proposons un service clé en main qui émerveille collaborateurs et visiteurs.',
      features: [
        'Sélection et livraison du sapin',
        'Décoration complète selon vos goûts',
        'Installation sécurisée sur site',
        'Entretien pendant la période des fêtes',
        'Enlèvement après les fêtes'
      ],
      icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
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
                SERVICES PROFESSIONNELS
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Entreprises & Professionnels
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                Nous accompagnons les entreprises et professionnels dans leurs projets floraux avec des services 
                sur mesure. De l'abonnement floral à la décoration d'événements, en passant par la végétalisation 
                de vos espaces, nous créons des environnements qui reflètent votre image et vos valeurs.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
                Nos Services
              </h2>
              <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#858585'}}></div>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Des solutions florales adaptées à tous vos besoins professionnels, 
                avec l'expertise et la qualité artisanale de notre atelier.
              </p>
            </div>

            {/* Services Sections */}
            {Object.entries(entreprisesCategories).map(([key, service], sectionIndex) => (
              <div key={key} id={key} className={`mb-24 ${sectionIndex > 0 ? 'pt-16 border-t border-gray-200' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`${sectionIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 aspect-square rounded-lg flex items-center justify-center">
                      <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={service.icon}/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className={`${sectionIndex % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="inline-block px-4 py-2 text-black text-xs font-light mb-4 tracking-wider" style={{border: '1px solid #858585'}}>
                      {service.subtitle}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 mr-3 mt-0.5" style={{color: '#858585'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span className="text-gray-600 font-light">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact-entreprises"
                      className="btn-secondary-gray inline-flex items-center px-6 py-3 font-light tracking-wide"
                    >
                      Demander un devis
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Prêts à donner une nouvelle vie à vos espaces ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Rencontrons-nous et imaginons ensemble vos futurs décors floraux. 
              Contactez-nous pour une rencontre et découvrez comment nous pouvons fleurir vos espaces.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact-entreprises"
                className="btn-primary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                DEMANDER UN DEVIS PERSONNALISÉ
              </Link>
              <Link
                href="/contact"
                className="btn-secondary-gray inline-flex items-center justify-center px-8 py-4 font-light tracking-wide"
              >
                ORGANISER UN RENDEZ-VOUS
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EntreprisesPage;