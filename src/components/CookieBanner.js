'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Vérifier si l'utilisateur a déjà accepté/refusé les cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Ici vous pouvez activer Google Analytics ou autres services
  };

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused');
    setShowBanner(false);
  };

  if (!isClient || !showBanner) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t"
      style={{ backgroundColor: '#faf8f3', borderColor: '#276f88' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Texte */}
          <div className="flex-1">
            <p className="text-sm md:text-base text-gray-800 font-light leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site et analyser notre trafic. 
              En continuant votre navigation, vous acceptez l'utilisation de ces cookies.{' '}
              <Link 
                href="/politique-confidentialite" 
                className="underline font-light transition-colors duration-300"
                style={{ color: '#276f88' }}
              >
                En savoir plus
              </Link>
            </p>
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleRefuse}
              className="px-6 py-3 text-sm font-light border transition-all duration-300 hover:shadow-md whitespace-nowrap"
              style={{ 
                borderColor: '#276f88',
                color: '#276f88'
              }}
            >
              Refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-3 text-sm font-light text-white transition-all duration-300 hover:shadow-md whitespace-nowrap"
              style={{ backgroundColor: '#276f88' }}
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
