import ProductCard from './ProductCard';

// Données exemple pour les produits
const featuredProducts = [
  {
    id: 1,
    name: "Couronne Traditionnelle",
    description: "Composition florale classique pour un hommage éternel",
    priceRange: "à partir de 280€",
    category: "Couronnes"
  },
  {
    id: 2,
    name: "Cœur Blanc",
    description: "Symbole d'affection pure et d'amour éternel",
    priceRange: "à partir de 220€",
    category: "Cœurs"
  },
  {
    id: 3,
    name: "Coussin Pastel",
    description: "Douceur et sérénité dans des tons apaisants",
    priceRange: "à partir de 180€",
    category: "Coussins"
  },
  {
    id: 4,
    name: "Dessus de Cercueil",
    description: "Hommage final élégant et respectueux",
    priceRange: "à partir de 320€",
    category: "Cercueil"
  },
  {
    id: 5,
    name: "Gerbe Piquée",
    description: "Pour accompagner le recueillement en silence",
    priceRange: "à partir de 120€",
    category: "Gerbes"
  },
  {
    id: 6,
    name: "Croix Florale",
    description: "Symbole spirituel et message de réconfort",
    priceRange: "à partir de 250€",
    category: "Croix"
  }
];

export default function CompositionsSection() {
return (
    <section id="compositions" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 text-black text-sm font-light mb-4" style={{border: '1px solid #858585'}}>
                    Nos créations
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
                    Nos Compositions Coup de Cœur
                </h2>
                <p className="text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
                    Découvrez notre sélection de compositions florales favorites, créées avec soin 
                    pour honorer la mémoire de vos proches dans le respect et la dignité.
                </p>
            </div>

            {/* Produits coup de cœur */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredProducts.map((product, index) => (
                    <div 
                        key={product.id} 
                        className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] h-full"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Bouton uniquement */}
            <div className="text-center">
                <a href="#" className="btn-compo-gray px-8 py-3 font-light">
                    Voir toutes nos compositions
                </a>
            </div>
        </div>
    </section>
);
}
