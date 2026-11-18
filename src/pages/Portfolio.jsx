import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
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

// Import assets for Kangkan Case Study
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import kangkanHome from '../assets/case_studies/kangkan_screenshot/1.webp';
import kangkanCategories from '../assets/case_studies/kangkan_screenshot/2.webp';
import kangkanCart from '../assets/case_studies/kangkan_screenshot/4.webp';
// GiveTheNeedy
import gtnLogo from '../assets/case_studies/givetheneedy_screenshot/logo.webp';
import gtnDonations from '../assets/case_studies/givetheneedy_screenshot/2.webp';
import gtnWelcome from '../assets/case_studies/givetheneedy_screenshot/6.webp';
import gtnHome from '../assets/case_studies/givetheneedy_screenshot/7.webp';
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
      facts: [
        { label: 'Client', value: 'Kangkan Retail Brands' },
        { label: 'Industry', value: 'E-commerce & Retail' },
        { label: 'Timeline', value: '4 months' },
      ],
    },
    {
      id: 'givetheneedy',
      name: 'GiveTheNeedy',
      category: 'Social Impact Mobile App',
      title: 'GiveTheNeedy: A Purpose-Driven Social Impact App',
      description: 'A donation platform that connects people who want to give with those in need, through a simple, transparent flow, backed by an event-driven Node.js engine and a flexible MongoDB data layer.',
      logo: gtnLogo,
      screens: [gtnHome, gtnWelcome, gtnDonations],
      // These screenshots are device mockups on coloured strips: crop them into rounded frames
      framed: true,
      stageColor: '#ecebfb',
      platforms: ['Android', 'iOS'],
      tech: ['React Native', 'Node.js', 'Express', 'MongoDB'],
      facts: [
        { label: 'Client', value: 'GiveTheNeedy Foundation' },
        { label: 'Industry', value: 'Nonprofit & Social Good' },
        { label: 'Timeline', value: '3 months' },
      ],
    },
  ];

  const platformIcons = {
    Android: { icon: FaAndroid, color: '#3DDC84' },
    iOS: { icon: FaApple, color: '#111827' },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        canonicalPath="/case-studies"
        jsonLd={portfolioJsonLd}
      />
      <Navbar />

      <PageBanner
        title="Portfolio & Case Studies"
        crumbs={[{ name: 'Case Studies' }]}
        variant="caseStudies"
        description={[
          'Real projects we have designed, built and shipped, from a culture-inspired e-commerce app to a social impact platform for Android and iOS.',
          'Each case study walks through the challenge, our approach, the technology we chose and the results it delivered.',
        ]}
      />

      {/* Case studies: one full-width card each, visual and details alternating sides */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8 md:gap-10">
          {caseStudies.map((cs, idx) => {
            const flip = idx % 2 === 1;
            const link = `/case-studies/case-study/${cs.id}`;
            return (
              <motion.article
                key={cs.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-2 bg-white border border-line rounded-card overflow-hidden text-left transition-colors duration-300 hover:border-[#9fd6ee]"
              >
                {/* ── Visual: app screens on a matching stage ── */}
                <Link
                  to={link}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`relative block min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden ${flip ? 'lg:order-2' : ''}`}
                  style={{ backgroundColor: cs.stageColor }}
                >
                  <div className="absolute top-5 left-5 flex gap-2 z-20">
                    {cs.platforms.map((platform) => {
                      const { icon: PlatformIcon, color } = platformIcons[platform];
                      return (
                        <span
                          key={platform}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/90 text-sm font-medium text-ink"
                        >
                          <PlatformIcon size={14} style={{ color }} />
                          {platform}
                        </span>
                      );
                    })}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3 sm:gap-5 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    {cs.screens.map((screen, i) => {
                      const centre = i === 1;
                      const size = centre
                        ? 'relative z-10 w-32 sm:w-40 lg:w-44 translate-y-6'
                        : 'w-28 sm:w-32 lg:w-36 translate-y-16';
                      return cs.framed ? (
                        <div key={screen} className={`${size} aspect-[185/296] rounded-[18px] overflow-hidden bg-white`}>
                          <img src={screen} alt="" loading="lazy" className="w-full h-full object-cover scale-[1.14]" />
                        </div>
                      ) : (
                        <img key={screen} src={screen} alt="" loading="lazy" className={size} />
                      );
                    })}
                  </div>
                </Link>

                {/* ── Details ── */}
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3.5">
                    <span className="w-12 h-12 rounded-xl bg-white border border-line p-1.5 shrink-0">
                      <img src={cs.logo} alt={`${cs.name} logo`} className="w-full h-full object-contain" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[17px] font-semibold text-ink leading-tight">{cs.name}</p>
                      <p className="text-sm text-muted leading-tight mt-1">{cs.category}</p>
                    </div>
                  </div>

                  <h2 className="mt-6 text-[22px] md:text-[26px] font-semibold text-ink leading-snug tracking-tight">
                    <Link to={link} className="hover:text-primary transition-colors duration-300">
                      {cs.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-body text-base leading-relaxed">
                    {cs.description}
                  </p>

                  <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-5 border-y border-line">
                    {cs.facts.map((fact) => (
                      <div key={fact.label} className="min-w-0">
                        <dt className="text-sm text-muted">{fact.label}</dt>
                        <dd className="mt-1 text-[15px] font-medium text-ink leading-snug">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology used">
                    {cs.tech.map((techItem) => {
                      const TechIcon = getTechIcon(techItem);
                      return (
                        <li
                          key={techItem}
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-sky text-sm text-body"
                        >
                          <TechIcon size={14} style={{ color: getTechColor(techItem) }} aria-hidden="true" />
                          {techItem}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8">
                    <ArrowButton to={link} variant="solid">Read case study</ArrowButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <WebsitesShowcase />

      <Footer />
    </div>
  );
};

export default Portfolio;
