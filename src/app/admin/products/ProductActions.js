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
    <div className="flex justify-between gap-1">
      <button
        onClick={handleViewClick}
        disabled={navigating === 'view'}
        className={`flex-1 py-1.5 px-2 text-xs font-light bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:border-gray-400 transition-colors ${
          navigating === 'view' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {navigating === 'view' ? '...' : 'Voir'}
      </button>
      <button
        onClick={handleEditClick}
        disabled={navigating === 'edit'}
        className={`flex-1 py-1.5 px-2 text-xs font-light text-white rounded transition-colors ${
          navigating === 'edit' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        style={{ backgroundColor: navigating === 'edit' ? '#6b7280' : PRIMARY_COLOR }}
      >
        {navigating === 'edit' ? '...' : 'Modifier'}
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex-1 py-1.5 px-2 text-xs font-light bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {deleting ? '...' : 'Supprimer'}
      </button>
    </div>
  )
}