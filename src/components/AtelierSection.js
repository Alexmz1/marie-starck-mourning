export default function AtelierSection() {
  return (
    <section id="atelier" className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#faf8f3'}}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Contenu texte */}
          <div className="space-y-8 text-center">
            <div>
              <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #858585'}}>
                Mon engagement
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
                Notre Atelier
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-800 font-light leading-relaxed">
              <p>
                Je mets tout mon savoir-faire et toute mon attention dans la réalisation de chaque composition florale.
              </p>
              <p>
                Parce qu'un dernier au revoir mérite douceur, respect et sincérité, je crée chaque pièce avec le cœur, comme un hommage unique à la personne disparue.
              </p>
              <div className="pt-4 text-right">
                <p className="text-xl text-black font-light italic">— Marie Starck</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl mx-auto text-left">
              {[
                { icon: "🌸", title: "Fleurs fraîches", desc: "Sélectionnées quotidiennement" },
                { icon: "✋", title: "Fait main", desc: "Créations artisanales uniques" },
                { icon: "🚚", title: "Livraison", desc: "Dans toute la région" },
                { icon: "💬", title: "Conseil", desc: "Accompagnement personnalisé" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-light text-black">{feature.title}</h4>
                    <p className="text-sm text-gray-600 font-light">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href="#contact" className="btn-aten-gray px-8 py-3 font-light inline-flex items-center">
                Nous contacter
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
