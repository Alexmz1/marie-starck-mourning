import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: "Deuil",
      description: "Compositions florales respectueuses pour accompagner vos moments de recueillement",
      items: ["Croix", "Cœurs", "Couronnes", "Coussins", "Dessus de cercueil"],
      href: "/deuil",
      image: "/images/demo-deuil.jpg"
    },
    {
      title: "Boutique",
      description: "Créations florales pour embellir votre quotidien et marquer vos occasions spéciales",
      items: ["Bouquets", "Compositions à offrir", "Plantes d'intérieur", "Plantes extérieur"],
      href: "/boutique",
      image: "/images/demo-boutique.jpg"
    },
    {
      title: "Mariage",
      description: "Sublimez votre union avec des créations florales sur mesure",
      items: ["Bouquet de mariée", "Décoration cérémonie", "Centres de table", "Arche florale"],
      href: "/mariage",
      image: "/images/demo-mariage.jpg"
    }
  ];

  return (
    <section id="services" className="py-20" style={{backgroundColor: '#faf8f3'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #276f88'}}>
            Nos spécialités
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
            Nos Services Floraux
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            De la composition de deuil au bouquet de mariage, nous créons des arrangements floraux 
            adaptés à chaque moment de votre vie.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-light text-black mb-4 group-hover:text-gray-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-600 font-light">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={service.href}
                  className="inline-flex items-center text-black hover:text-gray-600 font-light transition-colors duration-300 group"
                >
                  <span>Découvrir</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-black mb-4">
              💬 Une question ? Un projet spécifique ?
            </h3>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Nous sommes à votre écoute pour créer des compositions florales qui vous ressemblent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="custom-button-primary inline-block"
              >
                Nous contacter
              </Link>
              <Link 
                href="/atelier"
                className="custom-button-secondary inline-block"
              >
                Découvrir notre atelier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
