'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'

// Données exemple pour les produits - gardées en fallback
const fallbackProducts = [
  {
    id: 1,
    name: "Couronne Traditionnelle",
    description: "Composition florale classique pour un hommage éternel",
    priceRange: "à partir de 280€",
    category: "Couronnes"
  },
  {
    id: 2,
    name: "Cœur Blanc",
    description: "Symbole d'affection pure et d'amour éternel",
    priceRange: "à partir de 220€",
    category: "Cœurs"
  },
  {
    id: 3,
    name: "Bouquet Romantique",
    description: "Composition florale délicate et parfumée",
    priceRange: "à partir de 45€",
    category: "Bouquets"
  },
  {
    id: 4,
    name: "Plante Verte Monstera",
    description: "Monstera délicieuse pour votre intérieur",
    priceRange: "à partir de 35€",
    category: "Plantes"
  },
  {
    id: 5,
    name: "Bouquet de Mariée",
    description: "Bouquet unique pour votre jour J",
    priceRange: "à partir de 120€",
    category: "Mariage"
  },
  {
    id: 6,
    name: "Centre de Table",
    description: "Élégance florale pour votre réception",
    priceRange: "à partir de 55€",
    category: "Mariage"
  }
]

export default function CompositionsSection() {
  const [featuredProducts, setFeaturedProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=8')
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setFeaturedProducts(data)
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits coup de cœur:', error)
      // On garde les produits fallback en cas d'erreur
    } finally {
      setLoading(false)
    }
  }
  return (
    <section id="compositions" className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#faf8f3'}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #276f88'}}>
            Nos créations
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            Nos Compositions Coup de Cœur
          </h2>
          <p className="text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de créations florales favorites. Du deuil au mariage, 
            en passant par notre boutique, nous créons avec soin pour tous vos moments importants.
          </p>
        </div>

        {/* Produits coup de cœur */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-gray-500 font-light">Chargement des créations...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Boutons d'action */}
        <div className="text-center">
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/deuil" className="btn-compo-gray px-8 py-3 font-light inline-block">
              Compositions de deuil
            </Link>
            <Link href="/boutique" className="btn-secondary-gray px-8 py-3 font-light inline-block">
              Notre boutique
            </Link>
            <Link href="/mariage" className="btn-compo-gray px-8 py-3 font-light inline-block">
              Compositions mariage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
