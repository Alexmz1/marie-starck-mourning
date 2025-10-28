// Service de gestion de la livraison - Calcul par distance exacte
// Simple, précis et automatique pour toutes les adresses

// Adresse de l'atelier (Marie Starck) - À personnaliser
const ATELIER_ADDRESS = {
  address: "Soisy-sur-Seine, France",
  lat: 48.6553,
  lng: 2.4558
}

// Zones et tarifs de livraison basés sur la distance réelle
export const DELIVERY_ZONES = [
  {
    id: 1,
    name: "Zone 1 (0-10km)",
    maxDistance: 10,
    price: 0,
    color: "#22c55e",
    description: "Livraison gratuite incluse"
  },
  {
    id: 2,
    name: "Zone 2 (10-15km)", 
    maxDistance: 15,
    price: 10,
    color: "#3b82f6",
    description: "Livraison proche"
  },
  {
    id: 3,
    name: "Zone 3 (15-20km)",
    maxDistance: 20,
    price: 15,
    color: "#f59e0b", 
    description: "Livraison étendue"
  },
  {
    id: 4,
    name: "Zone 4 (20-25km)",
    maxDistance: 25,
    price: 20,
    color: "#ef4444",
    description: "Livraison maximale"
  }
]

// Fonction principale : calcul des frais de livraison par distance exacte
export async function calculateDeliveryFee(address) {
  try {
    // 1. Géolocaliser l'adresse
    const geocodeResult = await geocodeAddress(address)
    if (!geocodeResult.success) {
      return {
        success: false,
        price: 0,
        zone: null,
        method: 'geocoding_failed',
        message: 'Adresse non trouvée. Veuillez vérifier l\'adresse saisie.'
      }
    }
    
    // 2. Calculer la distance exacte
    const distance = calculateDistance(
      ATELIER_ADDRESS.lat,
      ATELIER_ADDRESS.lng,
      geocodeResult.lat,
      geocodeResult.lng
    )
    
    // 3. Déterminer la zone selon la distance
    const zone = getZoneForDistance(distance)
    if (!zone) {
      return {
        success: false,
        price: 0,
        zone: null,
        distance: distance,
        method: 'out_of_range',
        message: `Zone non couverte (${distance.toFixed(1)}km). Notre service de livraison couvre jusqu'à 25km depuis ${ATELIER_ADDRESS.address}.`
      }
    }
    
    // 4. Retourner le résultat
    return {
      success: true,
      price: zone.price,
      zone: zone,
      distance: distance,
      method: 'distance_calculation',
      coordinates: {
        customer: { lat: geocodeResult.lat, lng: geocodeResult.lng },
        atelier: { lat: ATELIER_ADDRESS.lat, lng: ATELIER_ADDRESS.lng }
      },
      message: `Livraison ${zone.name} - ${zone.price}€ (${distance.toFixed(1)}km depuis notre atelier)`
    }
    
  } catch (error) {
    console.error('Erreur calcul frais livraison:', error)
    return {
      success: false,
      price: 0,
      zone: null,
      method: 'error',
      message: 'Erreur lors du calcul. Veuillez réessayer ou nous contacter.'
    }
  }
}

// Fonction pour obtenir la zone selon la distance calculée
function getZoneForDistance(distance) {
  // Parcourir les zones dans l'ordre croissant de distance
  for (const zone of DELIVERY_ZONES) {
    if (distance <= zone.maxDistance) {
      return zone
    }
  }
  // Si aucune zone ne correspond, retourner null (hors zone)
  return null
}

// Fonction pour géocoder une adresse (OpenStreetMap - gratuit et fiable)
async function geocodeAddress(address) {
  try {
    // Encodage de l'adresse pour l'URL
    const encodedAddress = encodeURIComponent(address)
    
    // Appel à l'API Nominatim d'OpenStreetMap
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=fr&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Marie-Starck-Mourning-Delivery-Service/1.0'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Erreur API géolocalisation: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      const result = data[0]
      return {
        success: true,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        display_name: result.display_name,
        address_details: result.address
      }
    }
    
    return {
      success: false,
      message: 'Adresse non trouvée dans notre base de données'
    }
    
  } catch (error) {
    console.error('Erreur géolocalisation:', error)
    return {
      success: false,
      message: `Erreur de géolocalisation: ${error.message}`
    }
  }
}

// Calcul de distance avec formule de Haversine (très précise)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Rayon de la Terre en kilomètres
  
  // Conversion en radians
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  
  // Distance en kilomètres
  return R * c
}

// Fonctions utilitaires pour obtenir des informations sur les zones
export function getAllZones() {
  return DELIVERY_ZONES
}

export function getAtelierInfo() {
  return ATELIER_ADDRESS
}

export function getMaxDeliveryDistance() {
  return Math.max(...DELIVERY_ZONES.map(zone => zone.maxDistance))
}

// Validation des dates de livraison
export function isValidDeliveryDate(dateString) {
  if (!dateString) {
    return { valid: false, message: 'Veuillez sélectionner une date.' }
  }
  
  const selectedDate = new Date(dateString)
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  
  // Vérifier que la date est dans le futur (minimum 24h)
  if (selectedDate < tomorrow) {
    return { 
      valid: false, 
      message: 'La livraison doit être commandée au moins 24h à l\'avance.' 
    }
  }
  
  // Vérifier que ce n'est pas un dimanche (jour de repos)
  if (selectedDate.getDay() === 0) {
    return { 
      valid: false, 
      message: 'Pas de livraison le dimanche.' 
    }
  }
  
  // Vérifier que ce n'est pas trop loin (max 4 semaines)
  const maxDate = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000)
  if (selectedDate > maxDate) {
    return { 
      valid: false, 
      message: 'Veuillez choisir une date dans les 4 prochaines semaines.' 
    }
  }
  
  return { valid: true, message: '' }
}

// Générer les dates disponibles pour les 4 prochaines semaines
export function getAvailableDeliveryDates(weeksAhead = 4) {
  const dates = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 1) // Commencer demain
  
  for (let i = 0; i < weeksAhead * 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    // Exclure les dimanches
    if (currentDate.getDay() !== 0) {
      dates.push({
        date: currentDate.toISOString().split('T')[0],
        display: currentDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    }
  }
  
  return dates
}