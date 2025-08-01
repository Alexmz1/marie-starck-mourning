export default function HeroSection() {
  return (
    <section id="accueil" className="hero min-h-[80vh] relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
      <div className="hero-content text-center max-w-5xl relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #858585'}}>
              Artisan fleuriste depuis 15 ans
            </div>
            <h1 className="text-5xl md:text-7xl font-light leading-tight">
              <span className="block text-black">Compositions florales</span>
              <span className="block text-3xl md:text-5xl text-gray-700 mt-2">
                de deuil personnalisées
              </span>
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Logo de Marie Starck */}
            <div className="flex justify-center py-8">
              <img 
                src="/images/logo/marie-starck-logo.png" 
                alt="Logo Marie Starck - Compositions florales de deuil"
                className="h-32 md:h-40 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#compositions" className="btn-primary-gray px-8 py-3 font-light flex items-center">
              Découvrir nos compositions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </a>
            <a href="tel:0123456789" className="btn-secondary-gray px-8 py-3 font-light flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Appeler maintenant
            </a>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/80 backdrop-blur shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Service</div>
              <div className="text-2xl text-black font-light">7/7</div>
            </div>
            <div className="bg-white/80 backdrop-blur shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Expérience</div>
              <div className="text-2xl text-black font-light">15+</div>
              <div className="text-sm text-gray-500">Années de savoir-faire</div>
            </div>
            <div className="bg-white/80 backdrop-blur shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Qualité</div>
              <div className="text-2xl text-black font-light">100%</div>
              <div className="text-sm text-gray-500">Fait main</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
