'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CalendarPicker from '../../components/CalendarPicker'
import useCartStore from '../../store/cartStore'
import { 
  calculateDeliveryFee, 
  isValidDeliveryDate, 
  getAvailableDeliveryDates,
  getAllZones
} from '../../services/deliveryService'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

// Traduction des tailles
const SIZES = {
  'PETIT': 'Petit',
  'MOYEN': 'Moyen',
  'GRAND': 'Grand',
  'TRES_GRAND': 'Très Grand'
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalItems, getTotalPrice } = useCartStore()
  const [isClient, setIsClient] = useState(false)

  // États du formulaire
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [formData, setFormData] = useState({
    // Informations client
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Type de livraison
    deliveryType: 'delivery', // 'delivery' ou 'pickup'
    
    // Adresse de livraison (seulement si delivery)
    address: '',
    city: '',
    postalCode: '',
    additionalInfo: '',
    
    // Livraison/Récupération
    deliveryDate: '',
    pickupDate: '',
    specialInstructions: ''
  })

  // États pour la livraison
  const [deliveryInfo, setDeliveryInfo] = useState({
    calculating: false,
    calculated: false,
    fee: 0,
    zone: null,
    distance: null,
    error: null
  })

  const [dateValidation, setDateValidation] = useState({ valid: true, message: '' })
  const [availableDates, setAvailableDates] = useState([])
  const [isCalculatingFee, setIsCalculatingFee] = useState(false)
  const [minDeliveryDate, setMinDeliveryDate] = useState('')

  // Effet pour initialiser le côté client
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    // Définir la date minimum côté client pour éviter les problèmes d'hydratation
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setMinDeliveryDate(tomorrow.toISOString().split('T')[0])
    
    // Rediriger si le panier est vide
    if (items.length === 0) {
      router.push('/panier')
      return
    }

    // Charger les dates disponibles
    setAvailableDates(getAvailableDeliveryDates(4))
  }, [items, router, isClient])

  // Calcul automatique des frais de livraison quand l'adresse change (seulement pour la livraison)
  useEffect(() => {
    const calculateFee = async () => {
      // Pas de calcul de frais pour le Click & Collect
      if (formData.deliveryType === 'pickup') {
        setDeliveryInfo({
          calculating: false,
          calculated: true,
          fee: 0,
          zone: null,
          distance: null,
          error: null
        })
        setIsCalculatingFee(false)
        return
      }

      if (formData.address && formData.city) {
        setIsCalculatingFee(true)
        setDeliveryInfo(prev => ({ ...prev, calculating: true, error: null }))

        try {
          const fullAddress = `${formData.address}, ${formData.city}${formData.postalCode ? ', ' + formData.postalCode : ''}, France`
          
          // Calcul direct par géolocalisation et distance
          const result = await calculateDeliveryFee(fullAddress)
          
          if (result.success) {
            setDeliveryInfo({
              calculating: false,
              calculated: true,
              fee: result.price,
              zone: result.zone,
              distance: result.distance,
              error: null,
              method: result.method
            })
          } else {
            setDeliveryInfo({
              calculating: false,
              calculated: false,
              fee: 0,
              zone: null,
              distance: null,
              error: result.message,
              method: result.method
            })
          }
        } catch (error) {
          setDeliveryInfo({
            calculating: false,
            calculated: false,
            fee: 0,
            zone: null,
            distance: null,
            error: 'Erreur lors du calcul des frais de livraison.',
            method: 'error'
          })
        }

        setIsCalculatingFee(false)
      } else {
        setDeliveryInfo({
          calculating: false,
          calculated: false,
          fee: 0,
          zone: null,
          distance: null,
          error: null
        })
      }
    }

    const timeoutId = setTimeout(calculateFee, 1000) // Délai pour éviter trop de requêtes
    return () => clearTimeout(timeoutId)
  }, [formData.address, formData.city, formData.postalCode, formData.deliveryType])

  // Validation de la date de livraison/récupération
  useEffect(() => {
    const dateToValidate = formData.deliveryType === 'delivery' ? formData.deliveryDate : formData.pickupDate
    if (dateToValidate) {
      const validation = isValidDeliveryDate(dateToValidate)
      setDateValidation(validation)
    }
  }, [formData.deliveryDate, formData.pickupDate, formData.deliveryType])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation finale pour la livraison
    if (formData.deliveryType === 'delivery') {
      if (!deliveryInfo.calculated || deliveryInfo.error) {
        alert('Veuillez vérifier l\'adresse de livraison.')
        return
      }
      
      // Validation de la distance (sécurité côté client)
      if (deliveryInfo.distance > 25) {
        alert('La livraison est disponible uniquement dans un rayon de 25 km de la boutique.')
        return
      }
    }

    if (!dateValidation.valid) {
      const dateType = formData.deliveryType === 'delivery' ? 'livraison' : 'récupération'
      alert(`Veuillez sélectionner une date de ${dateType} valide.`)
      return
    }

    // Validation des champs obligatoires
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    setIsProcessingPayment(true)

    try {
      // Générer un tableau d'items où le ruban est une option de l'item principal
      const itemsWithRibbon = items.map(item => {
        if (item.options?.ribbon?.enabled && item.options?.ribbon?.message) {
          return {
            ...item,
            hasRibbon: true,
            ribbonText: item.options.ribbon.message,
            ribbonPrice: item.options.ribbon.price || 5.00,
            // On ajoute le prix du ruban au totalPrice et unitPrice
            unitPrice: (item.unitPrice || item.price || 0) + (item.options.ribbon.price || 5.00),
            totalPrice: ((item.unitPrice || item.price || 0) + (item.options.ribbon.price || 5.00)) * item.quantity
          };
        }
        return item;
      });

      // Préparer les données pour Stripe
      const orderData = {
        items: itemsWithRibbon,
        customer: formData,
        delivery: {
          deliveryType: formData.deliveryType,
          fee: formData.deliveryType === 'pickup' ? 0 : deliveryInfo.fee,
          zone: deliveryInfo.zone,
          distance: deliveryInfo.distance,
          calculated: deliveryInfo.calculated,
          error: deliveryInfo.error
        },
        totals: {
          subtotal: getTotalPrice(),
          deliveryFee: formData.deliveryType === 'pickup' ? 0 : deliveryInfo.fee,
          total: getTotalPrice() + (formData.deliveryType === 'pickup' ? 0 : deliveryInfo.fee)
        }
      }

      // Appeler l'API pour créer la session Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (data.url) {
        // Redirection vers Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement')
      }
    } catch (error) {
      console.error('Erreur:', error)
      
      // Message d'erreur spécifique selon le type d'erreur
      if (error.message.includes('rayon de 25 km')) {
        alert('❌ Zone de livraison non couverte\n\nVotre adresse se trouve en dehors de notre zone de livraison (25 km maximum).\n\nVous pouvez opter pour le "Click & Collect" à notre atelier.')
      } else if (error.message.includes('adresse de livraison')) {
        alert('❌ Adresse de livraison invalide\n\nVeuillez vérifier votre adresse de livraison.')
      } else {
        alert('❌ Une erreur est survenue lors de la redirection vers le paiement.\n\nVeuillez réessayer ou nous contacter si le problème persiste.')
      }
      
      setIsProcessingPayment(false)
    }
  }

  const subtotal = getTotalPrice()
  const deliveryFee = formData.deliveryType === 'pickup' ? 0 : (deliveryInfo.calculated ? deliveryInfo.fee : 0)
  const total = subtotal + deliveryFee

  // Afficher un loader pendant l'hydratation côté client
  if (!isClient) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-8" style={{backgroundColor: '#faf8f3'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mb-8">
            <Link
              href="/panier"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Retour au panier
            </Link>
            <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Finaliser ma commande
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-8">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Informations personnelles */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">
                    Informations personnelles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Votre prénom"
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Votre nom"
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Votre email"
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Votre téléphone"
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Type de livraison */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-6">
                    <TruckIcon className="h-6 w-6 mr-2" style={{ color: PRIMARY_COLOR }} />
                    <h2 className="text-xl font-medium text-gray-900">
                      Mode de récupération
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option Livraison */}
                    <div 
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.deliveryType === 'delivery' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
                    >
                      <div className="flex items-center mb-3">
                        <TruckIcon className="h-6 w-6 mr-3" style={{ color: PRIMARY_COLOR }} />
                        <h3 className="text-lg font-medium text-gray-900">Livraison à domicile</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Nous livrons directement à votre adresse
                      </p>
                      <p className="text-xs text-gray-500">
                        Frais de livraison calculés selon la distance
                      </p>
                    </div>

                    {/* Option Click & Collect */}
                    <div 
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.deliveryType === 'pickup' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
                    >
                      <div className="flex items-center mb-3">
                        <MapPinIcon className="h-6 w-6 mr-3" style={{ color: PRIMARY_COLOR }} />
                        <h3 className="text-lg font-medium text-gray-900">Click & Collect</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Récupération à l'atelier
                      </p>
                      <p className="text-xs text-gray-500">
                        Gratuit • Centre commercial des Meillottes, 1 rue de la forêt de Sénart, 91450 Soisy-sur-Seine
                      </p>
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                {formData.deliveryType === 'delivery' && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <MapPinIcon className="h-6 w-6 mr-2" style={{ color: PRIMARY_COLOR }} />
                      <h2 className="text-xl font-medium text-gray-900">
                        Adresse de livraison
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Numéro et nom de rue"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ville"
                          className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="Code postal"
                          required
                          className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        Informations complémentaires
                      </label>
                      <input
                        type="text"
                        name="additionalInfo"
                        placeholder="Bâtiment, étage, code..."
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 transition-all duration-300"
                      />
                    </div>

                    {/* Affichage des frais de livraison calculés */}
                    {(isCalculatingFee || deliveryInfo.calculated || deliveryInfo.error) && (
                      <div className="mt-4 p-4 rounded-lg border">
                        {isCalculatingFee && (
                          <div className="flex items-center text-blue-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Calcul des frais de livraison...
                          </div>
                        )}
                        
                        {deliveryInfo.calculated && (
                          <div className="flex items-start space-x-2">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="text-green-700 font-medium">
                                Livraison : {deliveryInfo.fee === 0 ? 'Gratuite !' : `${deliveryInfo.fee}€`}
                              </p>
                              <p className="text-sm text-gray-600">
                                {deliveryInfo.zone?.name}
                                {deliveryInfo.distance && ` (${deliveryInfo.distance.toFixed(1)}km)`}
                                {deliveryInfo.fee === 0 && ' - Incluse dans le prix'}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {deliveryInfo.error && (
                          <div className="flex items-start space-x-2">
                            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="text-amber-700 font-medium">
                                Zone non couverte
                              </p>
                              <p className="text-sm text-gray-600">
                                {deliveryInfo.error}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                )}

                {/* Date de livraison/récupération */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <CalendarIcon className="h-6 w-6 mr-2" style={{ color: PRIMARY_COLOR }} />
                    <h2 className="text-xl font-medium text-gray-900">
                      {formData.deliveryType === 'delivery' ? 'Date de livraison' : 'Date de récupération'}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        {formData.deliveryType === 'delivery' 
                          ? 'Choisissez votre date de livraison *' 
                          : 'Choisissez votre date de récupération *'
                        }
                      </label>
                      
                      {/* Calendrier DaisyUI personnalisé */}
                      <div className="w-full">
                        <CalendarPicker
                          value={formData.deliveryType === 'delivery' ? formData.deliveryDate : formData.pickupDate}
                          onChange={(date) => {
                            if (formData.deliveryType === 'delivery') {
                              setFormData(prev => ({ ...prev, deliveryDate: date }))
                            } else {
                              setFormData(prev => ({ ...prev, pickupDate: date }))
                            }
                          }}
                          placeholder={formData.deliveryType === 'delivery' 
                            ? "Choisir une date de livraison" 
                            : "Choisir une date de récupération"
                          }
                          minDate={minDeliveryDate}
                        />
                      </div>
                      
                      {!dateValidation.valid && (
                        <p className="text-red-600 text-sm mt-2 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          {dateValidation.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        {formData.deliveryType === 'delivery' 
                          ? 'Instructions spéciales pour la livraison' 
                          : 'Instructions spéciales pour la récupération'
                        }
                      </label>
                      <textarea
                        name="specialInstructions"
                        rows="3"
                        placeholder={formData.deliveryType === 'delivery' 
                          ? "Instructions particulières, accès, personne à contacter..." 
                          : "Instructions particulières, personne qui récupère..."
                        }
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        className="w-full py-4 px-6 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-black placeholder-gray-500 resize-none transition-all duration-300"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start">
                        <ClockIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium">Information importante :</p>
                          <p>Commande minimum 24h à l'avance pour nous laisser le temps de créer votre composition.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-light text-gray-900 mb-6">
                  Résumé de commande
                </h2>
                
                {/* Articles */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {item.productImage ? (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.productName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {SIZES[item.size]} {item.color && `• ${item.color.name}`}
                        </p>
                        {/* Affichage des options */}
                        {item.options?.ribbon?.enabled && (
                          <div className="space-y-1 mt-1">
                            <p className="text-xs font-medium" style={{ color: PRIMARY_COLOR }}>
                              + Ruban avec message (+5€)
                            </p>
                            {item.options.ribbon.message && (
                              <p className="text-xs font-light text-gray-600 italic">
                                "{item.options.ribbon.message}"
                              </p>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium" style={{ color: PRIMARY_COLOR }}>
                        {((item.totalPrice || item.price) * item.quantity).toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})</span>
                    <span className="font-medium text-gray-900">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formData.deliveryType === 'delivery' ? 'Livraison' : 'Récupération'}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formData.deliveryType === 'pickup' ? 'Gratuite' : 
                        (deliveryInfo.calculated ? 
                          (deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toFixed(2)}€`) : 
                          'À calculer'
                        )
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Total</span>
                    <span style={{ color: PRIMARY_COLOR }}>
                      {total.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Bouton de paiement sous le résumé */}
              <div className="w-full">
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={!deliveryInfo.calculated || deliveryInfo.error || !dateValidation.valid || isProcessingPayment}
                  className="w-full py-4 px-12 font-light text-white transition-all duration-300 tracking-wide hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{backgroundColor: PRIMARY_COLOR}}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      REDIRECTION VERS LE PAIEMENT...
                    </>
                  ) : (
                    <>
                      <TruckIcon className="h-5 w-5 mr-2" />
                      PROCÉDER AU PAIEMENT
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
