import "./globals.css";
import "./custom-buttons.css";

export const metadata = {
  title: "L'Atelier Fleurs de Deuil – Marie Starck",
  description: "Créations florales pour rendre hommage à vos proches. Compositions personnalisées et livraison assurée.",
  keywords: "fleurs de deuil, compositions florales, hommage, funéraire, couronnes, coussins, gerbes",
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
