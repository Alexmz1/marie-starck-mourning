'use client';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Liste des compositions pour le menu déroulant
const compositions = [
    { name: 'Dessus de cercueil classique' },
    { name: 'Dessus de cercueil goutte' },
    { name: 'Dessus cercueil rond' },
    { name: 'Devant de tombe' },
    { name: 'Coussins (panier oreiller)' },
    { name: 'Bouquet gerbe' },
    { name: 'Cœurs' },
    { name: 'Couronnes' },
    { name: 'Croix' },
    { name: 'Formes spéciales' }
];

  return (
    <header className="text-black sticky top-0 z-50 border-b" style={{backgroundColor: '#858585', borderColor: '#858585'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Version mobile */}
        <div className="md:hidden">
          {/* Titre */}
          <div className="py-3 text-center">
            <h1 className="text-sm font-light text-white tracking-tight leading-tight">
              L'Atelier Fleurs de Deuil – Marie Starck
            </h1>
            <p className="text-xs text-white font-light leading-none mt-1">
              Compositions Florales de Deuil
            </p>
          </div>
          
          {/* Menu et contact mobile */}
          <div className="flex justify-between items-center py-2 border-t border-white/20">
            {/* Menu hamburger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
            
            {/* Contact et Instagram mobile */}
            <div className="flex items-center space-x-3">
                <a 
                    href="tel:0123456789" 
                    className="text-xs text-white hover:text-gray-200 transition-colors duration-300"
                >
                    01 23 45 67 89
                </a>
                <a 
                    href="https://www.instagram.com/mariestarckfleursdeuil/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                    aria-label="Instagram"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Menu mobile déroulant */}
          {isMenuOpen && (
            <div className="border-t border-white/20 py-4">
              <nav className="space-y-3">
                <a href="#accueil" className="block text-white hover:text-gray-200 text-sm font-light py-2">
                  Accueil
                </a>
                <a href="#compositions" className="block text-white hover:text-gray-200 text-sm font-light py-2">
                  Nos Compositions
                </a>
                <a href="#atelier" className="block text-white hover:text-gray-200 text-sm font-light py-2">
                  Notre Atelier
                </a>
                <a href="#contact" className="block text-white hover:text-gray-200 text-sm font-light py-2">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>

        {/* Version desktop (md et plus) */}
        <div className="hidden md:flex items-center h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-base lg:text-lg font-light text-white tracking-tight leading-tight">
              L'Atelier Fleurs de Deuil – Marie Starck
            </h1>
            <p className="text-xs text-white font-light leading-none">
              Compositions Florales de Deuil
            </p>
          </div>

          {/* Navigation desktop - centré absolument par rapport à la page */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a 
              href="#accueil" 
              className="text-white hover:text-gray-200 text-sm font-light transition-colors duration-300"
            >
              Accueil
            </a>
            
            {/* Menu déroulant Compositions */}
            <div 
              className="relative group"
            >
              <a 
                href="#compositions" 
                className="text-white hover:text-gray-200 text-sm font-light transition-colors duration-300 flex items-center"
              >
                Nos Compositions
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              
              {/* Dropdown menu */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-2">
                  {compositions.map((composition, index) => (
                    <a
                      key={index}
                      href="#compositions"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="font-light text-black">{composition.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{composition.price}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <a 
              href="#atelier" 
              className="text-white hover:text-gray-200 text-sm font-light transition-colors duration-300"
            >
              Notre Atelier
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-gray-200 text-sm font-light transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Droite - Instagram et Contact */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Contact info (hidden on small screens) */}
            <div className="hidden lg:flex flex-col text-right">
              <a 
                href="tel:0123456789" 
                className="text-sm font-light text-white hover:text-gray-200 transition-colors duration-300"
              >
                01 23 45 67 89
              </a>
            </div>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/mariestarckfleursdeuil/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Menu mobile */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
