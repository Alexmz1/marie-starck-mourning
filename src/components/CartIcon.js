'use client'

import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon as ShoppingBagSolid } from '@heroicons/react/24/solid'
import useCartStore from '../store/cartStore'
import Link from 'next/link'

const PRIMARY_COLOR = '#276f88'

export default function CartIcon() {
  const { getTotalItems, toggleCart, isOpen } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <div className="relative">
      <Link
        href="/panier"
        className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        {totalItems > 0 ? (
          <ShoppingBagSolid 
            className="h-6 w-6" 
            style={{ color: PRIMARY_COLOR }}
          />
        ) : (
          <ShoppingBagIcon className="h-6 w-6" />
        )}
        
        {/* Badge avec le nombre d'articles */}
        {totalItems > 0 && (
          <span 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs font-bold text-white flex items-center justify-center min-w-[20px]"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Link>
    </div>
  )
}
