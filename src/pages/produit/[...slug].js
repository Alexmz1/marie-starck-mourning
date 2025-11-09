// /src/pages/produit/[...slug].js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ProduitPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  // État pour la gestion du panier et des onglets
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeTab, setActiveTab] = useState(null);

  // Extraire les paramètres de l'URL
  const category = slug ? slug[0] : 'boutique';
  const type = slug ? slug[1] : 'general';
  const product = slug ? slug[2] : 'produit';

  // Données produit (en attendant la BDD)
  const productData = {
    name: product ? decodeURIComponent(product).replace(/-/g, ' ') : 'Produit',
    category: category,
    type: type,
    description: 'Description détaillée du produit qui sera récupérée depuis la base de données. Cette création florale unique est réalisée avec soin par nos artisans fleuristes.',
    price: category === 'mariage' ? '120€' : category === 'deuil' ? '85€' : '65€',
    images: ['/images/placeholder-product.jpg'],
    options: {
      taille: ['Petite', 'Moyenne', 'Grande'],
      couleur: ['Blanc', 'Rose', 'Rouge', 'Multicolore']
    },
    availability: 'En stock'
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${category}-${type}-${product}`,
      name: productData.name,
      price: productData.price,
      quantity: 1, // Toujours ajouter 1 unité à chaque fois
      options: selectedOptions,
      category: category
    };
    
    // Logique d'ajout au panier (localStorage temporaire)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1; // Incrémenter de 1
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Produit ajouté au panier !');
  };

  const getCategoryColor = () => {
    switch(category) {
      case 'mariage': return 'from-pink-50 to-rose-100';
      case 'deuil': return 'from-gray-100 to-gray-200';
      case 'boutique': 
      default: return 'from-green-50 to-emerald-100';
    }
  };

  const getCategoryTheme = () => {
    switch(category) {
      case 'mariage': return { 
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        back: '/mariage',
        label: 'Retour aux créations mariage'
      };
      case 'deuil': return { 
        icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
        back: '/deuil',
        label: 'Retour aux compositions de deuil'
      };
      case 'boutique': 
      default: return { 
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        back: '/boutique',
        label: 'Retour à la boutique'
      };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Navigation */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={theme.back}
              className="inline-flex items-center text-sm font-light text-gray-600 hover:text-black transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              {theme.label}
            </Link>
          </div>
        </div>

        {/* Product Section */}
        <div className="py-16" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Image */}
              <div className="space-y-4">
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${getCategoryColor()} flex items-center justify-center`}>
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={theme.icon}/>
                  </svg>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-4 py-2 text-black text-xs font-light mb-4 tracking-wider" style={{border: '1px solid #276f88'}}>
                    {type?.replace(/-/g, ' ').toUpperCase()}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight capitalize">
                    {productData.name}
                  </h1>
                  <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
                    {productData.description}
                  </p>
                  <div className="text-3xl font-light text-black mb-8" style={{color: '#276f88'}}>
                    {productData.price}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-6">
                  {Object.entries(productData.options).map(([optionName, values]) => (
                    <div key={optionName}>
                      <label className="block text-lg font-light text-black mb-3 capitalize">
                        {optionName}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {values.map((value) => (
                          <button
                            key={value}
                            onClick={() => setSelectedOptions(prev => ({...prev, [optionName]: value}))}
                            className={`py-3 px-4 text-sm font-light border transition-all duration-300 ${
                              selectedOptions[optionName] === value
                                ? 'border-gray-800 bg-gray-50 text-black'
                                : 'border-gray-300 text-gray-600 hover:border-gray-400'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary-gray w-full py-4 px-8 font-light tracking-wide"
                  >
                    AJOUTER AU PANIER
                  </button>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 font-light">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {productData.availability}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Livraison 24h minimum
                    </div>
                  </div>

                  {/* Onglets déroulants */}
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    {/* Onglet Livraison */}
                    <div className="border border-gray-200 rounded">
                      <button
                        onClick={() => setActiveTab(activeTab === 'livraison' ? null : 'livraison')}
                        className="w-full px-4 py-3 text-left font-light text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                      >
                        <span>Informations de livraison</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${activeTab === 'livraison' ? 'rotate-180' : ''}`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      {activeTab === 'livraison' && (
                        <div className="px-4 pb-4 text-sm text-gray-600 space-y-3">
                          <p className="font-light">Pour garantir la qualité des fleurs, merci de passer commande au moins 24h à l&apos;avance (jours ouvrés).</p>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Zone 1 (0-10km)</span>
                                <span className="font-medium">5€</span>
                              </div>
                              <p className="text-xs text-gray-400 font-light">
                                Soisy-sur-Seine, Évry-Courcouronnes, Corbeil-Essonnes, Draveil, Ris-Orangis, Saint-Germain-lès-Corbeil, Tigery, Morsang-sur-Seine, Villabé
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Zone 2 (10-15km)</span>
                                <span className="font-medium">+10€</span>
                              </div>
                              <p className="text-xs text-gray-400 font-light">
                                Lisses, Vigneux-sur-Seine, Montgeron, Quincy-sous-Sénart, Combs-la-Ville, Lieusaint, Moissy-Cramayel, Épinay-sous-Sénart, Brunoy
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Zone 3 (15-20km)</span>
                                <span className="font-medium">+15€</span>
                              </div>
                              <p className="text-xs text-gray-400 font-light">
                                Réau, Brie-Comte-Robert, Bondoufle, Boussy-Saint-Antoine, Épinay-sur-Orge, Crosne, Mandres-les-Roses
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Zone 4 (20-25km)</span>
                                <span className="font-medium">+20€</span>
                              </div>
                              <p className="text-xs text-gray-400 font-light">
                                Melun, Savigny-le-Temple, Cesson, Vert-Saint-Denis, Saint-Fargeau-Ponthierry, Seine-Port, Nandy, Yerres, Villecresnes, Le Mée-sur-Seine, Boissise-le-Roi, La Rochette, Pringy
                              </p>
                            </div>
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center text-xs font-light hover:underline"
                            style={{color: '#276f88'}}
                          >
                            Voir plus de détails →
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Onglet Qualité */}
                    <div className="border border-gray-200 rounded">
                      <button
                        onClick={() => setActiveTab(activeTab === 'qualite' ? null : 'qualite')}
                        className="w-full px-4 py-3 text-left font-light text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                      >
                        <span>Qualité artisanale</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${activeTab === 'qualite' ? 'rotate-180' : ''}`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      {activeTab === 'qualite' && (
                        <div className="px-4 pb-4 text-sm text-gray-600 space-y-3">
                          <p className="font-light">
                            Toutes nos compositions florales sont réalisées à la main dans notre atelier à Soisy-sur-Seine.
                            Chaque pièce est conçue avec soin, au plus proche du visuel présenté.
                          </p>
                          <p className="font-light">
                            Nous ne faisons pas appel à des services de transmission florale : ici, tout est fait maison, avec exigence et respect.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
              Besoin de Conseils ?
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Notre équipe est à votre disposition pour vous accompagner dans votre choix
              et répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray px-6 py-3 font-light tracking-wide inline-flex items-center justify-center"
              >
                NOUS CONTACTER
              </Link>
              <a
                href="tel:0603059195"
                className="btn-secondary-gray px-6 py-3 font-light tracking-wide inline-flex items-center justify-center"
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
}
