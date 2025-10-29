import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white" style={{backgroundColor: '#276f88'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Informations contact */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-light mb-2">Atelier Floral de Marie Starck</h3>
                <p className="text-gray-200 font-light">Créations Florales sur Mesure</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white font-light">Téléphone</p>
                    <a href="tel:0603059195" className="text-lg font-light hover:text-gray-200 transition-colors duration-300">
                      06 03 05 91 95
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white font-light">Email</p>
                    <a href="mailto:contact@marie-starck.fr" className="text-lg font-light hover:text-gray-200 transition-colors duration-300">
                      contact@marie-starck.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services particuliers */}
            <div>
              <h4 className="text-lg font-light mb-6 text-white">Particuliers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/deuil" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Deuil
                  </Link>
                </li>
                <li>
                  <Link href="/boutique" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link href="/mariage" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Mariage
                  </Link>
                </li>
                <li>
                  <Link href="/atelier" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Notre Atelier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services professionnels */}
            <div>
              <h4 className="text-lg font-light mb-6 text-white">Professionnels</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/entreprises#abonnements-floraux" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Abonnements floraux
                  </Link>
                </li>
                <li>
                  <Link href="/entreprises#evenements-seminaires" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Événements
                  </Link>
                </li>
                <li>
                  <Link href="/entreprises#vegetalisation-espaces" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Végétalisation
                  </Link>
                </li>
                <li>
                  <Link href="/entreprises#arbre-noel" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Arbre de Noël
                  </Link>
                </li>
                <li>
                  <Link href="/contact-entreprises" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Devis entreprise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Informations légales */}
            <div>
              <h4 className="text-lg font-light mb-6 text-white">Informations</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/mentions-legales" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link href="/politique-confidentialite" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cgv" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    CGV
                  </Link>
                </li>
                <li>
                  <Link href="/livraisons" className="text-white hover:text-gray-200 font-light transition-colors duration-300 flex items-center group text-sm">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-300"></span>
                    Livraisons
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/20"></div>

        {/* Copyright */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Version mobile */}
            <div className="md:hidden text-center space-y-3">
              <p className="text-sm font-light text-white">
                © 2025 L'Atelier Fleurs de Deuil – Marie Starck
              </p>
              <p className="text-sm font-light text-white">
                Tous droits réservés
              </p>
              <p className="text-sm font-light text-white">
                Créations artisanales
              </p>
              <div className="flex items-center justify-center space-x-2 pt-2">
                <span className="text-xs text-white font-light">Réalisé avec</span>
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-xs text-white font-light">en France</span>
              </div>
            </div>

            {/* Version desktop */}
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center w-full space-y-2 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="text-sm font-light text-white">
                  © 2025 L'Atelier Fleurs de Deuil – Marie Starck
                </p>
                <span className="text-white opacity-50">|</span>
                <p className="text-sm font-light text-white">
                  Tous droits réservés
                </p>
                <span className="text-white opacity-50">|</span>
                <p className="text-sm font-light text-white">
                  Créations artisanales
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white font-light">Réalisé avec</span>
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-xs text-white font-light">en France</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
