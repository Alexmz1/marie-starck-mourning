'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useCartStore from '../store/cartStore'
import { 
  XMarkIcon, 
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

// Traduction des tailles
const SIZES = {
  'PETIT': 'Petit',
  'MOYEN': 'Moyen',
  'GRAND': 'Grand',
  'TRES_GRAND': 'Très Grand'
}

export default function CartDrawer({ isOpen, onClose }) {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalItems, 
    getTotalPrice 
  } = useCartStore()

  // Fermer le drawer quand on clique sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity)
      }
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
        >
          {/* Drawer Panel */}
          <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="flex items-center">
                <ShoppingBagIcon className="h-6 w-6 mr-2" style={{ color: PRIMARY_COLOR }} />
                <h2 className="text-lg font-medium" style={{ color: PRIMARY_COLOR }}>
                  Mon panier ({getTotalItems()})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              {items.length === 0 ? (
                /* Panier vide */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 mb-6">Découvrez nos créations florales</p>
                  <Link
                    href="/boutique"
                    onClick={onClose}
                    className="btn-primary-gray px-8 py-3 font-light tracking-wide inline-block"
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Liste des articles - Prend l'espace disponible */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          {item.productImage ? (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Détails */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.productName}
                          </h4>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Taille: {SIZES[item.size] || item.size}</div>
                            {item.color && (
                              <div className="flex items-center">
                                <span>Couleur: </span>
                                <div 
                                  className="w-3 h-3 rounded-full ml-1 mr-1 border border-gray-300"
                                  style={{ backgroundColor: item.color.hex }}
                                />
                                <span>{item.color.name}</span>
                              </div>
                            )}
                            {/* Affichage des options */}
                            {item.options?.ribbon?.enabled && (
                              <div className="space-y-1">
                                <div className="text-xs font-medium" style={{ color: PRIMARY_COLOR }}>
                                  + Ruban avec message (+5€)
                                </div>
                                {item.options.ribbon.message && (
                                  <div className="text-xs font-light text-gray-600 italic truncate">
                                    "{item.options.ribbon.message}"
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>
                            {(item.totalPrice || item.price).toFixed(2)} €
                          </div>

                          {/* Contrôles quantité */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-3 bg-white rounded-lg px-3 py-1 border border-gray-200">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <MinusIcon className="h-4 w-4 text-gray-600" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <PlusIcon className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total et Actions - Remontés */}
                  <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
                    {/* Total */}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg font-medium text-gray-900">Total:</span>
                      <span className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>
                        {getTotalPrice().toFixed(2)} €
                      </span>
                    </div>

                    {/* Actions avec espacement amélioré */}
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/panier"
                        onClick={onClose}
                        className="btn-primary-gray px-8 py-3 font-light tracking-wide text-center inline-block"
                      >
                        Voir le panier complet
                      </Link>
                      <button
                        onClick={onClose}
                        className="btn-secondary-gray px-8 py-3 font-light tracking-wide w-full"
                      >
                        Continuer mes achats
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}