import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CompositionsSection from '../components/CompositionsSection';
import AtelierSection from '../components/AtelierSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#faf8f3'}}>
      <Header />
      
      <main>
        <HeroSection />
        <CompositionsSection />
        <AtelierSection />
      </main>

      <Footer />
    </div>
  );
}
