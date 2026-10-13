import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  FaAndroid,
  FaApple,
  FaCode,
  FaReact,
  FaLaravel,
  FaDatabase,
  FaCreditCard,
  FaNodeJs,
  FaServer,
  FaLock
} from 'react-icons/fa';

// Import banner background image
import bannerBgImage from '../assets/bg5.webp';

// Import assets for Kangkan Case Study
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import kangkanHome from '../assets/case_studies/kangkan_screenshot/1.webp';
import kangkanCategories from '../assets/case_studies/kangkan_screenshot/2.webp';
import kangkanCart from '../assets/case_studies/kangkan_screenshot/4.webp';
import ArrowButton from '../components/ArrowButton';
import WebsitesShowcase from '../sections/WebsitesShowcase';

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://binudsoftwaresolutions.in/case-studies#collection',
      'name': 'Case Studies & Engineering Portfolio | Binud Software Solutions',
      'url': 'https://binudsoftwaresolutions.in/case-studies',
      'description': 'Explore live production case studies and applications engineered by Binud Software Solutions, featuring React Native, Laravel, Node.js, and cloud architectures.',
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'url': 'https://binudsoftwaresolutions.in/case-studies/case-study/kangkan',
            'name': 'Kangkan: Scalable Mobile-First E-commerce Platform'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'url': 'https://binudsoftwaresolutions.in/case-studies/case-study/givetheneedy',
            'name': 'GiveTheNeedy: Purpose-Driven Social Impact App'
          }
        ]
      }
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://binudsoftwaresolutions.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Case Studies',
          'item': 'https://binudsoftwaresolutions.in/case-studies'
        }
      ]
    }
  ]
};

const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return FaReact;
  if (t.includes('laravel')) return FaLaravel;
  if (t.includes('node')) return FaNodeJs;
  if (t.includes('mongodb') || t.includes('mysql') || t.includes('database') || t.includes('nosql')) return FaDatabase;
  if (t.includes('razorpay') || t.includes('gateway') || t.includes('payment') || t.includes('credit')) return FaCreditCard;
  if (t.includes('express') || t.includes('server')) return FaServer;
  if (t.includes('auth') || t.includes('security') || t.includes('lock') || t.includes('verified')) return FaLock;
  return FaCode;
};

const getTechColor = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return '#61dafb';
  if (t.includes('laravel')) return '#ff2d20';
  if (t.includes('node')) return '#339933';
  if (t.includes('mongodb')) return '#47a248';
  if (t.includes('mysql')) return '#00758f';
  if (t.includes('database') || t.includes('nosql')) return '#00758f';
  if (t.includes('razorpay') || t.includes('gateway') || t.includes('payment') || t.includes('credit')) return '#0854d4';
  if (t.includes('express')) return '#303030';
  if (t.includes('auth') || t.includes('security') || t.includes('lock') || t.includes('verified')) return '#10b981';
  return '#0ea5e9';
};

const Portfolio = () => {
  // Static Case Studies Data
  const caseStudies = [
    {
      id: 'kangkan',
      name: 'Kangkan',
      category: 'E-commerce Mobile App',
      title: 'Kangkan: A Scalable Mobile-First E-commerce Platform',
      description: 'A premium, culture-inspired mobile e-commerce platform designed to handle massive concurrent traffic, utilizing a stateless backend API and optimized Razorpay checkout integrations.',
      logo: kangkanLogo,
      screens: [kangkanCategories, kangkanHome, kangkanCart],
      stageColor: '#eadfdf', // matches the screenshots' background so the phones float
      platforms: ['Android', 'iOS'],
      tech: ['React Native', 'Laravel', 'MySQL', 'Razorpay', 'REST APIs'],
    }
  ];

  const platformIcons = {
    Android: { icon: FaAndroid, color: '#3DDC84' },
    iOS: { icon: FaApple, color: '#111827' },
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <SEOHead
        canonicalPath="/case-studies"
        jsonLd={portfolioJsonLd}
      />
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white py-14 overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerBgImage}
            alt=""
            className="w-full h-full object-cover opacity-45"
          />
          {/* Solid gradient overlay to guarantee perfect contrast and corporate look */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Portfolio &amp; Case Studies
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Case Studies</span>
          </nav>
        </div>
      </section>

      {/* Case Studies Showcase */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white border border-slate-200/80 rounded-card overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col h-full text-left"
              >
                {/* ── Visual Header: App Screens ── */}
                <div
                  className="relative h-64 sm:h-72 overflow-hidden"
                  style={{ backgroundColor: cs.stageColor }}
                >
                  {/* Logo & Platform Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
                    <div className="w-14 h-14 rounded-xl bg-white p-1.5 shadow-md ring-1 ring-slate-200/70">
                      <img src={cs.logo} alt={`${cs.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex gap-1.5">
                      {cs.platforms.map((platform) => {
                        const { icon: PlatformIcon, color } = platformIcons[platform];
                        return (
                          <span
                            key={platform}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm ring-1 ring-slate-200 text-[11px] font-bold text-slate-700 shadow-sm"
                          >
                            <PlatformIcon size={12} style={{ color }} />
                            {platform}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Screenshots (centre screen raised) */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3 sm:gap-4">
                    {cs.screens.map((screen, i) => (
                      <img
                        key={screen}
                        src={screen}
                        alt={`${cs.name} app screen ${i + 1}`}
                        loading="lazy"
                        className={i === 1
                          ? 'relative z-10 w-28 sm:w-32 translate-y-4'
                          : 'w-24 sm:w-28 translate-y-12'
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#005eb8] mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight leading-tight mb-3">
                    {cs.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {cs.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cs.tech.map((techItem) => {
                      const TechIcon = getTechIcon(techItem);
                      return (
                        <span
                          key={techItem}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          <TechIcon size={13} style={{ color: getTechColor(techItem) }} />
                          {techItem}
                        </span>
                      );
                    })}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-auto">
                    <ArrowButton to={`/case-studies/case-study/${cs.id}`}>Read Case Study</ArrowButton>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      <WebsitesShowcase />

      <Footer />
    </div>
  );
};

export default Portfolio;
