'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircleIcon, TruckIcon, CalendarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import useCartStore from '../../store/cartStore';

const PRIMARY_COLOR = '#276f88';

export default function SuccessPage() {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (sessionId) {
      // Vider le panier après un paiement réussi
      clearCart();
      
      // Ici vous pourriez récupérer les détails de la session depuis votre API
      // Pour l'instant, on affiche un message de succès générique
      setSessionData({ id: sessionId });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-16" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: PRIMARY_COLOR}}></div>
            <p className="text-lg text-gray-600">Vérification du paiement...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-16" style={{backgroundColor: '#faf8f3'}}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Icône de succès */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Votre paiement a été traité avec succès. Merci pour votre confiance !
            </p>
          </div>

          {/* Détails de la commande */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-left">
            <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
              Que se passe-t-il maintenant ?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{backgroundColor: PRIMARY_COLOR}}>
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Confirmation par email</h3>
                  <p className="text-sm text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails de votre commande dans quelques minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{backgroundColor: PRIMARY_COLOR}}>
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Préparation de votre composition</h3>
                  <p className="text-sm text-gray-600">
                    Marie commence la création de votre composition florale avec le plus grand soin.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{backgroundColor: PRIMARY_COLOR}}>
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Livraison ou récupération</h3>
                  <p className="text-sm text-gray-600">
                    Selon votre choix, nous vous livrons à l'adresse indiquée ou vous pouvez récupérer votre commande à l'atelier.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
            <h3 className="font-medium text-blue-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Pour toute question concernant votre commande, n'hésitez pas à nous contacter :
            </p>
            <div className="text-sm text-blue-700 space-y-2">
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-light hover:bg-gray-50 transition-colors rounded-lg"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/nos-creations"
              className="px-8 py-3 text-white font-light hover:opacity-90 transition-colors rounded-lg"
              style={{backgroundColor: PRIMARY_COLOR}}
            >
              Découvrir nos créations
            </Link>
          </div>

          {/* Numéro de session (pour debug en mode test) */}
          {sessionId && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-500">
                ID de session : {sessionId}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}