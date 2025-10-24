'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PRIMARY_COLOR = '#276f88'

export default function ProductActions({ product }) {
  const [deleting, setDeleting] = useState(false)
  const [navigating, setNavigating] = useState(null) // 'view', 'edit', ou null
  const router = useRouter()

  const handleViewClick = (e) => {
    e.preventDefault()
    if (navigating) return
    
    setNavigating('view')
    router.push(`/admin/products/${product.id}`)
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    if (navigating) return
    
    setNavigating('edit')
    router.push(`/admin/products/${product.id}/edit`)
  }

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}" ?`)) {
      return
    }

    setDeleting(true)
    
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh() // Rafraîchir la page pour voir les changements
      } else {
        const error = await response.json()
        alert('Erreur: ' + error.message)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression du produit')
    }

    setDeleting(false)
  }

  return (
    <div className="mt-6 flex justify-end space-x-3">
      <button
        onClick={handleViewClick}
        disabled={navigating === 'view'}
        className={`py-2 px-4 text-sm font-light bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors ${
          navigating === 'view' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {navigating === 'view' ? 'Chargement...' : 'Voir'}
      </button>
      <button
        onClick={handleEditClick}
        disabled={navigating === 'edit'}
        className={`py-2 px-4 text-sm font-light text-white rounded-lg transition-colors ${
          navigating === 'edit' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{ backgroundColor: navigating === 'edit' ? '#6b7280' : PRIMARY_COLOR }}
      >
        {navigating === 'edit' ? 'Chargement...' : 'Modifier'}
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="py-2 px-4 text-sm font-light bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {deleting ? 'Suppression...' : 'Supprimer'}
      </button>
    </div>
  )
}