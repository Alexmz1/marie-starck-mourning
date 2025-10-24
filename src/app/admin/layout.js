'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PRIMARY_COLOR = '#276f88'

const menuItems = [
  {
    title: 'Tableau de bord',
    href: '/admin',
    icon: '📊'
  },
  {
    title: 'Produits',
    href: '/admin/products',
    icon: '🌸'
  },
  {
    title: 'Commandes',
    href: '/admin/orders',
    icon: '📦'
  },
  {
    title: 'Clients',
    href: '/admin/customers',
    icon: '👥'
  },
  {
    title: 'Statistiques',
    href: '/admin/stats',
    icon: '📈'
  }
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md lg:hidden"
            >
              <span className="text-2xl">☰</span>
            </button>
            <h1 className="text-xl font-light text-gray-900 ml-2" style={{ color: PRIMARY_COLOR }}>
              Marie Starck - Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors"
            >
              🌐 Voir le site
            </Link>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_COLOR }}>
              <span className="text-white text-sm font-light">MS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    className={`flex items-center px-4 py-3 text-sm font-light rounded-lg transition-colors ${
                      isActive
                        ? 'text-white border-r-2'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={isActive ? { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR } : {}}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.title}
                  </Link>
                )
              })}
            </nav>
            
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="text-xs font-light text-gray-600">
                Base de données: {process.env.NODE_ENV === 'development' ? 'Développement' : 'Production'}
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenu principal */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}