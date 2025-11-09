import "./globals.css";
import "./custom-buttons.css";

export const metadata = {
  title: "L'atelier floral de Marie Starck",
  description: "Artisan fleuriste passionnée : compositions florales personnalisées pour tous vos événements. Mariages, deuil, entreprises et créations sur mesure. Livraison assurée.",
  keywords: "fleuriste, compositions florales, mariage, deuil, entreprise, bouquets, couronnes, décoration florale, livraison fleurs, artisan fleuriste, événementiel, Marie Starck",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
