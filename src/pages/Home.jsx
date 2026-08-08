import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarqueeBar from '../components/MarqueeBar';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import AboutPreview from '../sections/AboutPreview';
import ServicesPreview from '../sections/ServicesPreview';
import TestimonialsSection from '../sections/TestimonialsSection';
import CTASection from '../sections/CTASection';
import LatestBlogsSection from '../sections/LatestBlogsSection';
import ConnectSection from '../sections/ConnectSection';


const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  'name': 'Binud Software Solutions',
  'alternateName': 'BSS Tech Solutions',
  'url': 'https://binudsoftwaresolutions.in/',
  'logo': 'https://binudsoftwaresolutions.in/logo.png',
  'image': 'https://binudsoftwaresolutions.in/hero_3d_illustration.png',
  'description': 'Binud Software Solutions provides custom software engineering, cross-platform mobile app development, React & Next.js web applications, and AI automation solutions for startups and enterprises.',
  'founder': {
    '@type': 'Person',
    'name': 'Binud Panging',
    'jobTitle': 'Founder & Lead Software Architect'
  },
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Guwahati',
    'addressRegion': 'Assam',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '26.1445',
    'longitude': '91.7362'
  },
  'priceRange': '$$',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Software Engineering Services',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Custom Web Application Development'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Cross-Platform Mobile Apps (React Native & Flutter)'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'AI & Robotic Process Automation (RPA)'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Enterprise Cloud Infrastructure & DevOps'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'UI/UX Design Systems'
        }
      }
    ]
  }
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Binud Software Solutions | Custom Software, Mobile Apps & AI Development Company"
        description="Binud Software Solutions is a premier custom software, mobile app (React Native & Flutter), web development, and AI automation company. We architect scalable digital platforms for startups and enterprises worldwide."
        keywords={[
          'Binud Software Solutions',
          'custom software development',
          'mobile app development company',
          'React Native development',
          'Laravel REST API',
          'AI automation services',
          'web application development',
          'cloud solutions AWS',
          'Guwahati Assam software agency',
          'Binud Panging'
        ]}
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <HeroSection />
      <MarqueeBar />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <TestimonialsSection />

      <CTASection />
      <LatestBlogsSection />
      <ConnectSection />
      <Footer />
    </div>
  );
};

export default Home;
