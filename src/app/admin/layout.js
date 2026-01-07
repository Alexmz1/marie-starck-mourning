'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdminLogin from '@/components/AdminLogin'
import { 
  ChartBarIcon, 
  SparklesIcon, 
  ArchiveBoxIcon, 
  UsersIcon, 
  ChartPieIcon,
  Bars3Icon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

const menuItems = [
  {
    title: 'Tableau de bord',
    href: '/admin',
    icon: ChartBarIcon
  },
  {
    title: 'Produits',
    href: '/admin/products',
    icon: SparklesIcon
  },
  {
    title: 'Commandes',
    href: '/admin/orders',
    icon: ArchiveBoxIcon
  },
  {
    title: 'Statistiques',
    href: '/admin/statistics',
    icon: ChartPieIcon
  }
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const authenticated = sessionStorage.getItem('admin_authenticated')
    setIsAuthenticated(authenticated === 'true')
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
  }

  // Afficher le loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY_COLOR }}></div>
      </div>
    )
  }

  // Afficher la page de login si pas authentifié
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-3 py-2.5 md:px-4 md:py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <h1 className="text-base md:text-xl font-light text-gray-900 ml-1 md:ml-2" style={{ color: PRIMARY_COLOR }}>
              <span className="hidden sm:inline">Marie Starck - Admin</span>
              <span className="sm:hidden">MS Admin</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href="/"
              className="text-xs md:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors flex items-center"
            >
              <GlobeAltIcon className="h-4 w-4 mr-0.5 md:mr-1" />
              <span className="hidden sm:inline">Voir le site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs md:text-sm font-light text-gray-600 hover:text-gray-900 transition-colors flex items-center"
              title="Se déconnecter"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-0.5 md:mr-1" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_COLOR }}>
              <span className="text-white text-xs md:text-sm font-light">MS</span>
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
            {/* Bouton de fermeture mobile */}
            <div className="lg:hidden absolute top-4 right-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const IconComponent = item.icon
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
                    <IconComponent className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
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