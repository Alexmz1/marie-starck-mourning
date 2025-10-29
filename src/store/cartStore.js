import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      // État du panier
      items: [],
      isOpen: false,

      // Actions du panier
      addItem: (product, variant, selectedColor, quantity = 1) => {
        const { items } = get()
        
        // Créer un ID unique pour cet item (produit + taille + couleur)
        const itemId = `${product.id}-${variant.size}-${selectedColor?.id || 'no-color'}`
        
        // Vérifier si l'item existe déjà
        const existingItemIndex = items.findIndex(item => item.id === itemId)
        
        if (existingItemIndex >= 0) {
          // Si l'item existe, augmenter la quantité
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // Sinon, ajouter un nouvel item
          const newItem = {
            id: itemId,
            productId: product.id,
            productName: product.name,
            productSlug: product.slug,
            productImage: product.images?.[0] || null,
            category: product.category,
            size: variant.size,
            price: variant.price,
            color: selectedColor ? {
              id: selectedColor.id,
              name: selectedColor.color,
              hex: selectedColor.hex
            } : null,
            quantity: quantity,
            addedAt: new Date().toISOString()
          }
          
          set({ items: [...items, newItem] })
        }
      },

      // Mettre à jour la quantité d'un item
      updateQuantity: (itemId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        const { items } = get()
        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
        set({ items: updatedItems })
      },

      // Supprimer un item du panier
      removeItem: (itemId) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.id !== itemId)
        set({ items: updatedItems })
      },

      // Vider le panier
      clearCart: () => {
        set({ items: [] })
      },

      // Ouvrir/fermer le panier
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      setCartOpen: (isOpen) => {
        set({ isOpen })
      },

      // Calculateurs
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      // Obtenir les items groupés par catégorie
      getItemsByCategory: () => {
        const { items } = get()
        return items.reduce((acc, item) => {
          const category = item.category
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(item)
          return acc
        }, {})
      }
    }),
    {
      name: 'marie-starck-cart', // nom du storage
      storage: createJSONStorage(() => localStorage), // stockage dans localStorage
      partialize: (state) => ({ 
        items: state.items // seulement persister les items, pas l'état d'ouverture
      })
    }
  )
)

export default useCartStore
