import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarqueeBar from '../components/MarqueeBar';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import AboutPreview from '../sections/AboutPreview';
import ServicesPreview from '../sections/ServicesPreview';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeBar />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <Footer />
    </div>
  );
};

export default Home;
