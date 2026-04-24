import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarqueeBar from '../components/MarqueeBar';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import ServicesPreview from '../sections/ServicesPreview';
import WhyUsSection from '../sections/WhyUsSection';
import PortfolioPreview from '../sections/PortfolioPreview';
import TestimonialsSection from '../sections/TestimonialsSection';
import TeamSection from '../sections/TeamSection';
import CTASection from '../sections/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeBar />
      <StatsSection />
      <ServicesPreview />
      <WhyUsSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
