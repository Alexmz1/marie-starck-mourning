'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { XCircleIcon, ArrowLeftIcon, ShoppingCartIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const PRIMARY_COLOR = '#276f88';

export default function CancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-16" style={{backgroundColor: '#faf8f3'}}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Icône d'annulation */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <XCircleIcon className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Paiement annulé
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Votre commande n'a pas été finalisée. Aucun montant n'a été débité de votre compte.
            </p>
          </div>

          {/* Message informatif */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-left">
            <h2 className="text-xl font-medium text-gray-900 mb-4 text-center">
              Que s'est-il passé ?
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>• Vous avez annulé le paiement</p>
              <p>• Votre session de paiement a expiré</p>
              <p>• Un problème technique est survenu</p>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Pas d'inquiétude !</strong> Vos articles sont toujours dans votre panier. 
                Vous pouvez reprendre votre commande quand vous le souhaitez.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/panier"
              className="flex items-center justify-center px-8 py-3 text-white font-light hover:opacity-90 transition-colors rounded-lg"
              style={{backgroundColor: PRIMARY_COLOR}}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Retour au panier
            </Link>
            <Link
              href="/checkout"
              className="flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-light hover:bg-gray-50 transition-colors rounded-lg"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Reprendre la commande
            </Link>
          </div>

          {/* Aide */}
          <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-medium text-orange-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-sm text-orange-700 mb-3">
              Si vous rencontrez des difficultés avec le paiement, contactez-nous :
            </p>
            <div className="text-sm text-orange-700 space-y-2">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span><strong>Téléphone :</strong> 06 03 05 91 95</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span><strong>Email :</strong> starck.marie@gmail.com</span>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}