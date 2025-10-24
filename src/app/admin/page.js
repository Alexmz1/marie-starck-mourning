import { prisma } from '../../../lib/prisma'

const PRIMARY_COLOR = '#276f88'

async function getAdminStats() {
  try {
    const [
      productsCount,
      customersCount,
      ordersCount,
      recentOrders
    ] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.order.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          items: {
            include: {
              product: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })
    ])

    return {
      productsCount,
      customersCount,
      ordersCount,
      recentOrders
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return {
      productsCount: 0,
      customersCount: 0,
      ordersCount: 0,
      recentOrders: []
    }
  }
}

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-light text-gray-700 truncate">
            {title}
          </dt>
          <dd className="text-2xl font-light text-gray-900">
            {value}
          </dd>
        </dl>
      </div>
    </div>
  </div>
)

const QuickAction = ({ title, description, href, icon }) => (
  <a
    href={href}
    className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
  >
    <div className="flex items-center">
      <div className="rounded-lg p-3" style={{ backgroundColor: PRIMARY_COLOR }}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-light text-gray-900">{title}</h3>
        <p className="text-sm font-light text-gray-600">{description}</p>
      </div>
    </div>
  </a>
)

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm font-light text-gray-600">
          Vue d'ensemble de votre atelier floral
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Produits"
          value={stats.productsCount}
          icon="🌸"
        />
        <StatCard
          title="Clients"
          value={stats.customersCount}
          icon="👥"
        />
        <StatCard
          title="Commandes"
          value={stats.ordersCount}
          icon="📦"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions rapides */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Actions rapides
            </h2>
          </div>
          <div className="p-8 space-y-4">
            <QuickAction
              title="Ajouter un produit"
              description="Créer un nouveau produit floral"
              href="/admin/products/new"
              icon="➕"
            />
            <QuickAction
              title="Voir les commandes"
              description="Gérer les commandes en cours"
              href="/admin/orders"
              icon="📋"
            />
            <QuickAction
              title="Base de données"
              description="Ouvrir Prisma Studio"
              href="http://localhost:5555"
              icon="🗄️"
            />
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Commandes récentes
            </h2>
          </div>
          <div className="p-8">
            {stats.recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">📦</span>
                <p className="font-light text-gray-600">Aucune commande pour le moment</p>
                <p className="text-sm font-light text-gray-500 mt-2">
                  Les nouvelles commandes apparaîtront ici
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} article(s) - {order.total}€
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                  <div className="text-center pt-4">
                  <a
                    href="/admin/orders"
                    className="text-sm font-light hover:underline transition-colors"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    Voir toutes les commandes →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Informations système */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-light text-gray-900 mb-6" style={{ color: PRIMARY_COLOR }}>
          Informations système
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-light text-gray-700">Base de données:</span>
            <span className="ml-2 text-green-600">✅ Connectée</span>
          </div>
          <div>
            <span className="font-light text-gray-700">Environnement:</span>
            <span className="ml-2 font-light text-black">{process.env.NODE_ENV}</span>
          </div>
          <div>
            <span className="font-light text-gray-700">Prisma Studio:</span>
            <a 
              href="http://localhost:5555" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 font-light hover:underline transition-colors"
              style={{ color: PRIMARY_COLOR }}
            >
              Ouvrir
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}