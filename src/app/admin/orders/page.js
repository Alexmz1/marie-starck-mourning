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

const StatusSelector = ({ status, orderId, onStatusChange, isOpen, onToggle }) => {
  const statusConfig = {
    PENDING: { 
      label: 'En attente', 
      color: 'bg-yellow-100 text-yellow-800',
      icon: ClockIcon 
    },
    CONFIRMED: { 
      label: 'Confirmée', 
      color: 'text-white',
      bgColor: '#276f88',
      icon: CheckCircleIcon 
    },
    IN_PROGRESS: { 
      label: 'En cours', 
      color: 'bg-purple-100 text-purple-800',
      icon: ClockIcon 
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

  const statusOptions = [
    { value: 'CONFIRMED', label: 'Payée' },
    { value: 'IN_PROGRESS', label: 'En cours' },
    { value: 'DELIVERED', label: 'Livrée' },
    { value: 'CANCELLED', label: 'Annulée' }
  ];

  const config = statusConfig[status] || statusConfig.PENDING;
  const IconComponent = config.icon;

  const handleStatusSelect = (newStatus) => {
    onStatusChange(orderId, newStatus);
    onToggle(); // Fermer le dropdown
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="flex items-center space-x-2 status-selector">
      <span 
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color || 'bg-gray-100 text-gray-800'}`}
        style={config.bgColor ? { backgroundColor: config.bgColor } : {}}
      >
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </span>
      
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="py-1 px-3 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none font-light text-left transition-all duration-300 flex items-center justify-between text-xs rounded"
        >
          <span className="text-black">Modifier</span>
          <svg 
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-sm shadow-lg z-[60] min-w-32">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusSelect(option.value);
                }}
                className="w-full py-2 px-3 text-left font-light text-black hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 text-xs block"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [openStatusDropdowns, setOpenStatusDropdowns] = useState(new Set());

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Vérifier si le clic est à l'extérieur d'un dropdown de statut
      if (!event.target.closest('.status-selector')) {
        setOpenStatusDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Recharger les commandes
        fetchOrders();
      } else {
        console.error('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const toggleStatusDropdown = (orderId) => {
    setOpenStatusDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString, includeTime = true) => {
    if (!dateString) return 'Non spécifiée';
    
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return new Date(dateString).toLocaleDateString('fr-FR', options);
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
          <div className="space-y-6 relative">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow-sm rounded-lg overflow-visible">
                {/* En-tête de la commande */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors relative"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Commande #{order.orderNumber}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm">
                            <UserIcon className="h-4 w-4 mr-1" style={{color: PRIMARY_COLOR}} />
                            <span style={{color: PRIMARY_COLOR}}>{order.customerInfo?.firstName || 'N/A'} {order.customerInfo?.lastName || 'N/A'}</span>
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
                      <StatusSelector 
                        status={order.status} 
                        orderId={order.id}
                        onStatusChange={updateOrderStatus}
                        isOpen={openStatusDropdowns.has(order.id)}
                        onToggle={() => toggleStatusDropdown(order.id)}
                      />
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
                            <UserIcon className="h-4 w-4 mr-2" style={{color: PRIMARY_COLOR}} />
                            <span className="font-medium" style={{color: PRIMARY_COLOR}}>{order.customerInfo?.firstName || 'N/A'} {order.customerInfo?.lastName || 'N/A'}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <EnvelopeIcon className="h-4 w-4 mr-2" style={{color: PRIMARY_COLOR}} />
                            <a href={`mailto:${order.customerInfo?.email || ''}`} className="hover:underline" style={{color: PRIMARY_COLOR}}>
                              {order.customerInfo?.email || 'N/A'}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <PhoneIcon className="h-4 w-4 mr-2" style={{color: PRIMARY_COLOR}} />
                            <a href={`tel:${order.customerInfo?.phone || ''}`} className="hover:underline" style={{color: PRIMARY_COLOR}}>
                              {order.customerInfo?.phone || 'N/A'}
                            </a>
                          </div>
                        </div>

                        {/* Informations de livraison/récupération */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">
                            {order.deliveryType === 'PICKUP' ? 'Récupération en boutique' : 'Livraison'}
                          </h5>
                          <div className="bg-white p-4 rounded-lg space-y-3">
                            {/* Type de livraison */}
                            <div className="flex items-center text-sm">
                              {order.deliveryType === 'PICKUP' ? (
                                <>
                                  <MapPinIcon className="h-4 w-4 mr-2 text-green-500" />
                                  <span className="font-medium text-green-700">Click & Collect</span>
                                </>
                              ) : (
                                <>
                                  <TruckIcon className="h-4 w-4 mr-2 text-blue-500" />
                                  <span className="font-medium text-blue-700">Livraison à domicile</span>
                                </>
                              )}
                            </div>

                            {/* Adresse */}
                            <div className="flex items-start text-sm">
                              <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{color: PRIMARY_COLOR}} />
                              <div>
                                {order.deliveryType === 'PICKUP' ? (
                                  <div>
                                    <div className="font-medium" style={{color: PRIMARY_COLOR}}>Atelier Floral Marie Starck</div>
                                    <div className="text-gray-600">Centre commercial des Meillottes</div>
                                    <div className="text-gray-600">1 rue de la forêt de Sénart</div>
                                    <div className="text-gray-600">91450 Soisy-sur-Seine</div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-medium" style={{color: PRIMARY_COLOR}}>{order.deliveryAddress || 'Adresse non renseignée'}</div>
                                    <div style={{color: PRIMARY_COLOR}}>{order.deliveryPostalCode} {order.deliveryCity}</div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Date prévue */}
                            {order.deliveryDate && (
                              <div className="flex items-center text-sm">
                                <CalendarIcon className="h-4 w-4 mr-2" style={{color: PRIMARY_COLOR}} />
                                <span style={{color: PRIMARY_COLOR}}>Date prévue: {formatDate(order.deliveryDate, false)}</span>
                              </div>
                            )}

                            {/* Instructions de livraison */}
                            {order.deliveryInstructions && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-800">
                                <span className="font-medium">Instructions de livraison :</span> {order.deliveryInstructions}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Articles commandés */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Articles ({order.items.filter(item => !item.productName?.includes('Détails de récupération')).length} article{order.items.filter(item => !item.productName?.includes('Détails de récupération')).length > 1 ? 's' : ''})
                        </h4>
                        <div className="bg-white rounded-lg divide-y divide-gray-200">
                          {order.items
                            .filter(item => !item.productName?.includes('Détails de récupération'))
                            .map((item, index) => (
                                    <div key={index} className="p-4 flex items-center space-x-4">
                                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                        {(() => {
                                          const productImage = item.product?.images?.[0];
                                          const savedImage = item.productImage;
                                          const finalImage = productImage || savedImage;
                                          
                                          return finalImage ? (
                                            <Image
                                              src={finalImage}
                                              alt={item.product?.name || item.productName}
                                              width={48}
                                              height={48}
                                              className="w-full h-full object-cover"
                                              onError={(e) => {
                                                e.target.style.display = 'none';
                                              }}
                                            />
                                          ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                              <span className="text-gray-400 text-xs">Photo</span>
                                            </div>
                                          );
                                        })()}
                                      </div>
                                      <div className="flex-1">
                                        <h6 className="font-medium text-gray-900">{item.product?.name || item.productName}</h6>
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
                                        {/* Affichage du ruban comme ligne séparée visuelle */}
                                        {item.hasRibbon && (
                                          <div className="mt-2 ml-2 pl-4 border-l-2 border-blue-200">
                                            <div className="flex items-center text-xs text-blue-700">
                                              <span className="font-semibold mr-1">Ruban personnalisé :</span>
                                              <span className="italic">{item.ribbonText}</span>
                                              {item.ribbonPrice && (
                                                <span className="ml-2 text-blue-500 font-medium">(+{formatCurrency(item.ribbonPrice)})</span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-right">
                                        <div className="font-medium text-gray-900">
                                          {formatCurrency(item.totalPrice)}
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
                              <span className="text-gray-900">
                                {formatCurrency(order.items
                                  .filter(item => !(item.productName && item.productName.trim().toLowerCase() === 'frais de livraison'))
                                  .reduce((sum, item) => sum + (item.totalPrice || 0), 0)
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Frais de livraison:</span>
                              <span className="text-gray-900">
                                {order.deliveryType === 'PICKUP' ? 'Gratuit (récupération)' : formatCurrency(order.deliveryFee || 0)}
                              </span>
                            </div>
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