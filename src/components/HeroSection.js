import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="accueil" className="hero min-h-[80vh] relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
      <div className="hero-content text-center max-w-5xl relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #276f88'}}>
              Artisan fleuriste
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Logo de Marie Starck */}
            <div className="flex justify-center py-8">
              <Image 
                src="/images/logo/marie-starck-logo.png" 
                alt="Logo Marie Starck - Compositions florales de deuil"
                width={224}
                height={224}
                className="h-44 md:h-56 object-contain"
                priority
              />
            </div>
          </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#compositions" className="btn-primary-gray px-8 py-3 font-light flex items-center">
              Découvrir nos créations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </a>
            <Link href="/contact" className="btn-secondary-gray px-8 py-3 font-light flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Nous contacter
            </Link>
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
