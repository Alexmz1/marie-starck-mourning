'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import useCartStore from '../../store/cartStore'
import { 
  TrashIcon, 
  MinusIcon, 
  PlusIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

// Traduction des tailles
const SIZES = {
  'PETIT': 'Petit',
  'MOYEN': 'Moyen',
  'GRAND': 'Grand',
  'TRES_GRAND': 'Très Grand'
}

// Traduction des catégories
const CATEGORIES = {
  'DEUIL': 'Deuil',
  'MARIAGE': 'Mariage',
  'BOUTIQUE': 'Boutique'
}

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCartStore()
  
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity)
      }
    }
  }

  const handleClearCart = () => {
    clearCart()
    setShowClearConfirm(false)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Votre panier est vide
              </h1>
              <p className="text-gray-600 font-light mb-8">
                Découvrez nos créations florales et ajoutez-les à votre panier
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/boutique"
                  className="btn-primary-gray px-8 py-3 font-light tracking-wide inline-block"
                >
                  Découvrir la boutique
                </Link>
                <Link
                  href="/deuil"
                  className="btn-secondary-gray px-8 py-3 font-light tracking-wide inline-block"
                >
                  Compositions deuil
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Continuer mes achats
              </Link>
              
            </div>
            <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Mon panier
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-4">
                    {/* Image du produit */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBagIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    {/* Détails du produit */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            <Link 
                              href={`/produit/${item.productSlug}`}
                              className="hover:text-gray-700 transition-colors"
                            >
                              {item.productName}
                            </Link>
                          </h3>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600">
                              Catégorie: {CATEGORIES[item.category]}
                            </p>
                            <p className="text-sm text-gray-600">
                              Taille: {SIZES[item.size]}
                            </p>
                            {item.color && (
                              <div className="flex items-center text-sm text-gray-600">
                                <span>Couleur: </span>
                                <div className="flex items-center ml-2">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                                    style={{ backgroundColor: item.color.hex || '#e5e7eb' }}
                                  ></div>
                                  {item.color.name}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Supprimer l'article"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantité et prix */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">
                            {(item.price * item.quantity).toFixed(2)}€
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              {item.price}€ l'unité
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Actions sur le panier */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-red-600 hover:text-red-800 transition-colors text-sm font-light"
                >
                  Vider le panier
                </button>
                
                {showClearConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Vider le panier ?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Cette action supprimera tous les articles de votre panier.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleClearCart}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-light text-gray-900 mb-6">
                  Résumé de commande
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                    <span className="font-medium text-gray-900">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="text-sm text-gray-500">Selon zone (5€ à 20€)</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-medium text-gray-900">{totalPrice.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className="btn-primary-gray w-full text-center px-8 py-3 font-light tracking-wide inline-flex items-center justify-center"
                  >
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Passer ma commande
                  </Link>
                  <p className="text-xs text-gray-500 text-center">
                    Commande sécurisée avec paiement en ligne.
                  </p>
                </div>

                {/* Informations de livraison */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Informations de livraison</h3>
                  <p className="text-sm text-gray-600 font-light mb-4">
                    Livraison en Île-de-France selon zones : de 5€ (0-10km) à 20€ (20-25km). 
                    Commande 24h à l'avance minimum (jours ouvrés).
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <CheckIcon className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span>Créations sur mesure</span>
                    </div>
                    <div className="flex items-start">
                      <CheckIcon className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span>Livraison soignée et ponctuelle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal de confirmation pour vider le panier */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Vider le panier
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer tous les articles de votre panier ?
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn-secondary-gray flex-1 px-6 py-3 font-light tracking-wide"
              >
                Annuler
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-light tracking-wide hover:transform hover:-translate-y-0.5"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
