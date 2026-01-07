'use client';

import { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  UsersIcon, 
  ArchiveBoxIcon,
  PlusIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const PRIMARY_COLOR = '#276f88'

function getStatusLabel(status) {
  const statusLabels = {
    'PENDING': 'En attente',
    'CONFIRMED': 'Confirmée',
    'IN_PROGRESS': 'En cours',
    'DELIVERED': 'Livrée',
    'CANCELLED': 'Annulée'
  }
  return statusLabels[status] || status
}

function getStatusColor(status) {
  const statusColors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CONFIRMED': 'bg-blue-100 text-blue-800',
    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
    'DELIVERED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

// Cette fonction sera remplacée par des appels API côté client

const StatCard = ({ title, value, icon: IconComponent }) => (
  <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-3 sm:p-6">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
      </div>
      <div className="ml-3 sm:ml-5 w-0 flex-1">
        <dl>
          <dt className="text-xs sm:text-sm font-light text-gray-700 truncate">
            {title}
          </dt>
          <dd className="text-lg sm:text-2xl font-light text-gray-900">
            {value}
          </dd>
        </dl>
      </div>
    </div>
  </div>
)

const QuickAction = ({ title, description, href, icon: IconComponent }) => (
  <a
    href={href}
    className="block p-3 sm:p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
  >
    <div className="flex items-center">
      <div className="rounded-lg p-2 sm:p-3" style={{ backgroundColor: PRIMARY_COLOR }}>
        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <div className="ml-3 sm:ml-4">
        <h3 className="text-sm sm:text-lg font-light text-gray-900">{title}</h3>
        <p className="text-xs sm:text-sm font-light text-gray-600">{description}</p>
      </div>
    </div>
  </a>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      
      // Récupérer les statistiques et les commandes en parallèle
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/orders')
      ]);
      
      const stats = await statsResponse.json();
      const orders = await ordersResponse.json();
      
      // Prendre les 5 commandes les plus récentes
      const recentOrders = orders.slice(0, 5);
      
      setStats({
        productsCount: stats.productsCount,
        ordersCount: stats.ordersCount,
        recentOrders
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-8">
      {/* En-tête */}
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
          Tableau de bord
        </h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-light text-gray-600">
          Vue d'ensemble de vos produits et commandes
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY_COLOR }}></div>
          <p className="mt-2 text-sm text-gray-600">Chargement...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* Statistiques */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <StatCard
          title="Produits"
          value={stats.productsCount}
          icon={SparklesIcon}
        />
        <StatCard
          title="Commandes"
          value={stats.ordersCount}
          icon={ArchiveBoxIcon}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Actions rapides */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="px-4 sm:px-8 py-3 sm:py-6 border-b border-gray-200">
            <h2 className="text-base sm:text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Actions rapides
            </h2>
          </div>
          <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
            <QuickAction
              title="Ajouter un produit"
              description="Créer un nouveau produit floral"
              href="/admin/products/new"
              icon={PlusIcon}
            />
            <QuickAction
              title="Voir les commandes"
              description="Gérer les commandes en cours"
              href="/admin/orders"
              icon={ClipboardDocumentListIcon}
            />
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="px-4 sm:px-8 py-3 sm:py-6 border-b border-gray-200">
            <h2 className="text-base sm:text-xl font-light text-gray-900" style={{ color: PRIMARY_COLOR }}>
              Commandes récentes
            </h2>
          </div>
          <div className="p-4 sm:p-8">
            {stats.recentOrders.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <ArchiveBoxIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="font-light text-gray-600 text-sm sm:text-base">Aucune commande pour le moment</p>
                <p className="text-xs sm:text-sm font-light text-gray-500 mt-1 sm:mt-2">
                  Les nouvelles commandes apparaîtront ici
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-xs sm:text-base">
                        {order.customerInfo?.firstName || 'N/A'} {order.customerInfo?.lastName || 'N/A'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {order.items.length} article(s) - {order.total}€
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
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
      </>
      )}
    </div>
  )
}