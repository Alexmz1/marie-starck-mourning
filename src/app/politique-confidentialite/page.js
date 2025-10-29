import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block px-6 py-3 text-black text-sm font-light mb-6 tracking-wider" style={{border: '1px solid #276f88'}}>
                Confidentialité
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-8 tracking-tight">
                Politique de Confidentialité
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Comment nous protégeons et respectons vos données personnelles
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-24" style={{backgroundColor: '#f8f6f0'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              <div>
                <div className="w-24 h-0.5 mx-auto mb-8" style={{backgroundColor: '#276f88'}}></div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Collecte des données</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>
                    Nous collectons uniquement les informations nécessaires à la gestion de vos commandes et à l'amélioration de nos services :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Informations de contact (nom, prénom, adresse email, téléphone)</li>
                    <li>Adresse de livraison et de facturation</li>
                    <li>Informations de commande et préférences</li>
                    <li>Données de navigation sur notre site (cookies techniques)</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Utilisation des données</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>Vos données personnelles sont utilisées exclusivement pour :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Traiter et livrer vos commandes</li>
                    <li>Vous contacter concernant vos commandes</li>
                    <li>Améliorer nos services et votre expérience client</li>
                    <li>Respecter nos obligations légales</li>
                  </ul>
                  <p>
                    Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
                  </p>
                </div>
              </div>

              <div>
                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Conservation des données</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>
                    Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Données de commande : 10 ans (obligations comptables)</li>
                    <li>Données de contact : 3 ans après votre dernière commande</li>
                    <li>Cookies : 13 mois maximum</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Vos droits</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Droit d'accès à vos données personnelles</li>
                    <li>Droit de rectification des données inexactes</li>
                    <li>Droit à l'effacement ("droit à l'oubli")</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                    <li>Droit d'opposition au traitement</li>
                  </ul>
                  <p>
                    Pour exercer ces droits, contactez-nous à l'adresse : contact@marie-starck.fr
                  </p>
                </div>
              </div>

              <div>
                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Sécurité</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>
                    Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération ou la destruction.
                  </p>
                </div>
              </div>

              <div>
                <div className="w-full h-0.5" style={{backgroundColor: '#276f88', opacity: 0.3}}></div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-black mb-6 tracking-wide">Contact</h2>
                <div className="space-y-4 text-gray-700 font-light leading-relaxed">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits :
                  </p>
                  <div className="bg-white p-6 rounded-lg">
                    <p><strong>Atelier Floral de Marie Starck</strong></p>
                    <p>Email : contact@marie-starck.fr</p>
                    <p>Téléphone : 06 03 05 91 95</p>
                    <p>Adresse : Soisy-sur-Seine, Essonne (91)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-24" style={{backgroundColor: '#faf8f3'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 tracking-tight">
              Des Questions ?
            </h2>
            <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
              Notre équipe est à votre disposition pour vous renseigner sur notre politique de confidentialité.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link
                href="/contact"
                className="btn-primary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                NOUS CONTACTER
              </Link>
              <Link
                href="/"
                className="btn-secondary-gray inline-block py-4 px-10 font-light tracking-wide"
              >
                RETOUR À L'ACCUEIL
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}