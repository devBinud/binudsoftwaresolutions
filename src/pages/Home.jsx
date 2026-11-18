import { lazy, Suspense } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import HeroSection from '../sections/HeroSection';

// Everything below the first screen is downloaded in the background, so the hero appears sooner.
const ClientsSection = lazy(() => import('../sections/ClientsSection'));
const WhyChooseSection = lazy(() => import('../sections/WhyChooseSection'));
const GrowthBanner = lazy(() => import('../sections/GrowthBanner'));
const TechnologiesSection = lazy(() => import('../sections/TechnologiesSection'));
const ServicesPreview = lazy(() => import('../sections/ServicesPreview'));
const ProcessSection = lazy(() => import('../sections/ProcessSection'));
const ConsultationBanner = lazy(() => import('../sections/ConsultationBanner'));
const LatestBlogsSection = lazy(() => import('../sections/LatestBlogsSection'));
const Footer = lazy(() => import('../components/Footer'));


const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://binudsoftwaresolutions.in/#organization',
  'name': 'Binud Software Solutions',
  'alternateName': 'BSS Tech Solutions',
  'url': 'https://binudsoftwaresolutions.in/',
  'logo': 'https://binudsoftwaresolutions.in/logo.png',
  'image': 'https://binudsoftwaresolutions.in/og-image.png',
  'telephone': '+91-97063-93924',
  'email': 'binudsoftwaresolutions@gmail.com',
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
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <ServicesPreview />
        <ClientsSection />
        <WhyChooseSection />
        <GrowthBanner />
        <TechnologiesSection />
        <ProcessSection />
        <ConsultationBanner />
        <LatestBlogsSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
