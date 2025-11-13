'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArchiveBoxIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyEuroIcon,
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const PRIMARY_COLOR = '#276f88';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: { 
      label: 'En attente', 
      color: 'bg-yellow-100 text-yellow-800',
      icon: ClockIcon 
    },
    CONFIRMED: { 
      label: 'Confirmée', 
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircleIcon 
    },
    IN_PROGRESS: { 
      label: 'En cours', 
      color: 'bg-purple-100 text-purple-800',
      icon: ClockIcon 
    },
    READY: { 
      label: 'Prête', 
      color: 'bg-green-100 text-green-800',
      icon: CheckCircleIcon 
    },
    DELIVERED: { 
      label: 'Livrée', 
      color: 'bg-green-100 text-green-800',
      icon: CheckCircleIcon 
    },
    CANCELLED: { 
      label: 'Annulée', 
      color: 'bg-red-100 text-red-800',
      icon: XCircleIcon 
    }
  };

  const config = statusConfig[status] || statusConfig.PENDING;
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <IconComponent className="h-3 w-3 mr-1" />
      {config.label}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/orders');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des commandes');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: PRIMARY_COLOR}}></div>
            <p className="text-gray-600">Chargement des commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">❌ {error}</p>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 text-white rounded-lg"
              style={{backgroundColor: PRIMARY_COLOR}}
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ArchiveBoxIcon className="h-8 w-8" style={{color: PRIMARY_COLOR}} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
                <p className="text-sm text-gray-600">
                  {orders.length} commande{orders.length > 1 ? 's' : ''} enregistrée{orders.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ArchiveBoxIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-600">
              Les commandes apparaîtront ici une fois que les clients auront finalisé leurs achats.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
                {/* En-tête de la commande */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Commande #{order.orderNumber}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="h-4 w-4 mr-1" />
                            {order.customer.firstName} {order.customer.lastName}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {formatDate(order.createdAt)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CurrencyEuroIcon className="h-4 w-4 mr-1" />
                            {formatCurrency(order.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <StatusBadge status={order.status} />
                      <span className="text-sm text-gray-400">
                        {expandedOrders.has(order.id) ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Détails de la commande */}
                {expandedOrders.has(order.id) && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Informations client */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 mb-3">Informations client</h4>
                        <div className="bg-white p-4 rounded-lg space-y-3">
                          <div className="flex items-center text-sm">
                            <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="font-medium">{order.customer.firstName} {order.customer.lastName}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                            <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:underline">
                              {order.customer.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                            <a href={`tel:${order.customer.phone}`} className="text-blue-600 hover:underline">
                              {order.customer.phone}
                            </a>
                          </div>
                        </div>

                        {/* Informations de livraison */}
                        {order.deliveryAddress && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Livraison</h5>
                            <div className="bg-white p-4 rounded-lg">
                              <div className="flex items-start text-sm">
                                <MapPinIcon className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div>{order.deliveryAddress}</div>
                                  <div>{order.deliveryPostalCode} {order.deliveryCity}</div>
                                </div>
                              </div>
                              {order.deliveryDate && (
                                <div className="flex items-center text-sm mt-2">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>Date prévue: {formatDate(order.deliveryDate)}</span>
                                </div>
                              )}
                              {order.deliveryInstructions && (
                                <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                                  <strong>Instructions:</strong> {order.deliveryInstructions}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Articles commandés */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Articles ({order._count.items} article{order._count.items > 1 ? 's' : ''})
                        </h4>
                        <div className="bg-white rounded-lg divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <div key={index} className="p-4 flex items-center space-x-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                {item.product.images?.[0] ? (
                                  <Image
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">Photo</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h6 className="font-medium text-gray-900">{item.product.name}</h6>
                                <div className="text-sm text-gray-600">
                                  {item.selectedSize && <span>Taille: {item.selectedSize} • </span>}
                                  {item.selectedColor && <span>Couleur: {item.selectedColor} • </span>}
                                  Quantité: {item.quantity}
                                </div>
                                {item.customMessage && (
                                  <div className="text-sm text-blue-600 mt-1">
                                    Message: "{item.customMessage}"
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">
                                  {formatCurrency(item.total)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatCurrency(item.unitPrice)} × {item.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Récapitulatif financier */}
                        <div className="bg-white p-4 rounded-lg border-t-2" style={{borderColor: PRIMARY_COLOR}}>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Sous-total:</span>
                              <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                            </div>
                            {order.deliveryFee > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Frais de livraison:</span>
                                <span className="text-gray-900">{formatCurrency(order.deliveryFee)}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-medium text-lg pt-2 border-t">
                              <span className="text-gray-900">Total:</span>
                              <span style={{color: PRIMARY_COLOR}}>{formatCurrency(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Notes internes</h5>
                        <p className="text-sm text-gray-700">{order.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}