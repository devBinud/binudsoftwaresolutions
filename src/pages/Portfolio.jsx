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
import { FiUser, FiBriefcase, FiClock } from 'react-icons/fi';

// Import assets for Kangkan Case Study
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import kangkanHome from '../assets/case_studies/kangkan_screenshot/1.webp';
import kangkanCategories from '../assets/case_studies/kangkan_screenshot/2.webp';
import kangkanCart from '../assets/case_studies/kangkan_screenshot/4.webp';
import ArrowButton from '../components/ArrowButton';
import WebsitesShowcase from '../sections/WebsitesShowcase';
import PhoneScreen from '../components/PhoneScreen';

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
      // Each 166×296 screenshot has the phone at x 15–150, y 8–286 on a flat background
      screenBox: { width: 166, height: 296, left: 15, top: 8, right: 150, bottom: 286 },
      stage: 'linear-gradient(140deg, #fbf5f4 0%, #efe3e2 50%, #e0cbc9 100%)',
      dotColor: 'rgba(122, 52, 52, 0.28)',
      platforms: ['Android', 'iOS'],
      tech: ['React Native', 'Laravel', 'MySQL', 'Razorpay', 'REST APIs'],
      facts: [
        { label: 'Client', value: 'Kangkan Retail Brands', icon: FiUser },
        { label: 'Industry', value: 'E-commerce & Retail', icon: FiBriefcase },
        { label: 'Duration', value: '13 months', icon: FiClock },
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
          'Real projects we have designed, built and shipped, from a culture-inspired e-commerce app for Android and iOS to live websites for businesses across Assam.',
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
                  className={`relative block min-h-[420px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden ${flip ? 'lg:order-2' : ''}`}
                  style={{ background: cs.stage }}
                >
                  {/* Decoration: soft glow behind the phones, rings top-right, dot grid bottom-left */}
                  <span aria-hidden="true" className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-white/55 blur-3xl" />
                  <span aria-hidden="true" className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/70" />
                  <span aria-hidden="true" className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/60" />
                  <span
                    aria-hidden="true"
                    className="absolute left-6 bottom-6 w-32 h-24"
                    style={{ backgroundImage: `radial-gradient(${cs.dotColor} 1.2px, transparent 1.4px)`, backgroundSize: '14px 14px' }}
                  />

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

                  {/* Three phones fanned out: the centre one in front, the side ones tilted behind it.
                      On hover the fan opens slightly; the card itself never moves. */}
                  <div className="absolute inset-0 flex items-center justify-center pt-16 lg:pt-10">
                    <div className="flex items-center">
                      {cs.screens.map((screen, i) => {
                        const pose = [
                          'relative z-0 w-28 sm:w-32 lg:w-36 rounded-[15px] -mr-8 sm:-mr-10 translate-y-8 -rotate-[9deg] group-hover:-translate-x-2 group-hover:-rotate-[12deg]',
                          'relative z-10 w-36 sm:w-40 lg:w-44 rounded-[19px] group-hover:-translate-y-2',
                          'relative z-0 w-28 sm:w-32 lg:w-36 rounded-[15px] -ml-8 sm:-ml-10 translate-y-8 rotate-[9deg] group-hover:translate-x-2 group-hover:rotate-[12deg]',
                        ][i];
                        return (
                          <PhoneScreen
                            key={screen}
                            src={screen}
                            box={cs.screenBox}
                            className={`${pose} shadow-[0_30px_55px_-18px_rgba(70,25,25,0.45)] ring-1 ring-black/10 transition-transform duration-500 ease-out`}
                          />
                        );
                      })}
                    </div>
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

                  <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {cs.facts.map(({ label, value, icon: FactIcon }) => (
                      <div key={label} className="min-w-0 rounded-xl bg-sky border border-line px-4 py-3.5">
                        <dt className="flex items-center gap-1.5 text-[13px] text-muted">
                          <FactIcon size={14} className="text-primary shrink-0" aria-hidden="true" />
                          {label}
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-semibold text-ink leading-snug">{value}</dd>
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
