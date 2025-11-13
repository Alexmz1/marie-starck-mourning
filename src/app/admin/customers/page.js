'use client';

import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CalendarIcon,
  CurrencyEuroIcon,
  ShoppingBagIcon,
  BuildingOfficeIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const PRIMARY_COLOR = '#276f88';

const CustomerTypeIcon = ({ type }) => {
  return type === 'BUSINESS' ? (
    <BuildingOfficeIcon className="h-4 w-4 text-blue-600" />
  ) : (
    <UserIcon className="h-4 w-4 text-green-600" />
  );
};

const CustomerTypeBadge = ({ type }) => {
  const isBusinesses = type === 'BUSINESS';
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      isBusinesses 
        ? 'bg-blue-100 text-blue-800' 
        : 'bg-green-100 text-green-800'
    }`}>
      <CustomerTypeIcon type={type} />
      <span className="ml-1">
        {isBusinesses ? 'Entreprise' : 'Particulier'}
      </span>
    </span>
  );
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/customers');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des clients');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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
            <p className="text-gray-600">Chargement des clients...</p>
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
              onClick={fetchCustomers}
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
              <UsersIcon className="h-8 w-8" style={{color: PRIMARY_COLOR}} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
                <p className="text-sm text-gray-600">
                  {customers.length} client{customers.length > 1 ? 's' : ''} enregistré{customers.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {customers.length === 0 ? (
          <div className="text-center py-12">
            <UsersIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun client</h3>
            <p className="text-gray-600">
              Les clients apparaîtront ici une fois qu'ils auront passé leur première commande.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commandes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total dépensé
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière commande
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          {customer.companyName && (
                            <div className="text-sm text-gray-500">
                              {customer.companyName}
                            </div>
                          )}
                          <div className="text-xs text-gray-400">
                            Client depuis le {formatDate(customer.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <CustomerTypeBadge type={customer.type} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                            <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                              {customer.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <PhoneIcon className="h-4 w-4 mr-2" />
                            <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                              {customer.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.address ? (
                          <div className="flex items-start text-sm text-gray-600">
                            <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <div>{customer.address}</div>
                              <div>{customer.postalCode} {customer.city}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Non renseignée</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <ShoppingBagIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {customer._count.orders}
                          </span>
                          <span className="text-gray-500 ml-1">
                            commande{customer._count.orders > 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <CurrencyEuroIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span className="font-medium text-gray-900">
                            {formatCurrency(customer.totalSpent)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {formatDate(customer.lastOrderDate)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}