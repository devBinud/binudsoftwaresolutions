import { useParams, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaReact, FaLaravel, FaNodeJs, FaDatabase, FaCreditCard, FaServer, FaLock, FaCode, FaGooglePlay } from 'react-icons/fa';
import {
  FiUser,
  FiBriefcase,
  FiSmartphone,
  FiClock,
  FiDownload,
  FiCheck,
  FiServer,
  FiDatabase,
  FiLock,
  FiTarget,
  FiAlertCircle,
  FiArrowRight,
  FiBookOpen,
  FiCompass,
} from 'react-icons/fi';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArrowButton from '../components/ArrowButton';
import SectionHeading from '../components/SectionHeading';
import PhoneScreen from '../components/PhoneScreen';
import { Breadcrumbs } from '../components/PageBanner';

import kangkanPdf from '../assets/kangkan_case_studies.pdf';
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import k1 from '../assets/case_studies/kangkan_screenshot/1.webp';
import k2 from '../assets/case_studies/kangkan_screenshot/2.webp';
import k3 from '../assets/case_studies/kangkan_screenshot/3.webp';
import k4 from '../assets/case_studies/kangkan_screenshot/4.webp';
import k5 from '../assets/case_studies/kangkan_screenshot/5.webp';
import k6 from '../assets/case_studies/kangkan_screenshot/6.webp';
import k7 from '../assets/case_studies/kangkan_screenshot/7.webp';
import k8 from '../assets/case_studies/kangkan_screenshot/8.webp';

/* ── Tech pill icons (brand colours) ── */
const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return FaReact;
  if (t.includes('laravel')) return FaLaravel;
  if (t.includes('node')) return FaNodeJs;
  if (t.includes('mongodb') || t.includes('mysql') || t.includes('database')) return FaDatabase;
  if (t.includes('razorpay') || t.includes('payment')) return FaCreditCard;
  if (t.includes('express') || t.includes('server')) return FaServer;
  if (t.includes('auth') || t.includes('security')) return FaLock;
  return FaCode;
};

const getTechColor = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return '#61dafb';
  if (t.includes('laravel')) return '#ff2d20';
  if (t.includes('node')) return '#339933';
  if (t.includes('mongodb')) return '#47a248';
  if (t.includes('mysql')) return '#00758f';
  if (t.includes('razorpay') || t.includes('payment')) return '#0854d4';
  return '#0077b6';
};

/* ── Case study content ── */
const caseStudiesData = {
  kangkan: {
    name: 'Kangkan',
    category: 'E-commerce Mobile App',
    title: 'Kangkan: A Scalable Mobile-First E-commerce Platform',
    subtitle: 'A unified React Native app for Android and iOS, powered by a Laravel REST API.',
    logo: kangkanLogo,
    pdf: kangkanPdf,
    facts: [
      { label: 'Client', value: 'Kangkan Retail Brands', icon: FiUser },
      { label: 'Industry', value: 'E-commerce & Local Retail', icon: FiBriefcase },
      { label: 'Platform', value: 'Android & iOS', icon: FiSmartphone },
      { label: 'Duration', value: '13 Months', icon: FiClock },
    ],
    tech: ['React Native', 'Laravel', 'MySQL', 'Razorpay', 'REST APIs'],
    // All screenshots are 166×296 with the phone at x 15–150, y 8–286 on a flat background
    screenBox: { width: 166, height: 296, left: 15, top: 8, right: 150, bottom: 286 },
    heroScreens: [k2, k1, k4],
    screenshots: [k1, k2, k3, k4, k5, k6, k7, k8],
    introduction:
      'Kangkan is a mobile-first e-commerce platform built to deliver a seamless, scalable shopping experience while promoting culturally inspired and modern products. It combines high performance, usability and reliability, giving shoppers the same smooth experience on Android and iOS.',
    problemContext:
      'The rapid growth of e-commerce has raised expectations around speed, reliability and usability. Many emerging platforms struggle to handle concurrent users, keep latency low and process transactions reliably. The key challenge with Kangkan was a system that could serve many active shoppers at once while staying fast and responsive.',
    objective: [
      'Support concurrent user activity without performance degradation.',
      'Provide a fast, intuitive and modern mobile shopping experience.',
      'Ensure secure, validated and reliable payment processing.',
      'Establish a strong technical foundation for future growth.',
    ],
    architecture: [
      {
        title: 'Mobile App',
        tag: 'React Native',
        desc: 'One codebase for Android and iOS, keeping the look and behaviour consistent while reducing development and maintenance effort.',
        icon: FiSmartphone,
      },
      {
        title: 'Backend Services',
        tag: 'Laravel · REST',
        desc: 'An MVC architecture with RESTful APIs for efficient, low-overhead communication between the app and the server.',
        icon: FiServer,
      },
      {
        title: 'Database',
        tag: 'MySQL',
        desc: 'An optimised relational schema with indexing and transactional integrity for fast lookups and safe, consistent data.',
        icon: FiDatabase,
      },
      {
        title: 'Payments',
        tag: 'Razorpay',
        desc: 'Server-side signature validation, webhook handling and clear fallback states for a safe, reliable checkout.',
        icon: FiLock,
      },
    ],
    optimizations: [
      {
        title: 'API Optimisation',
        desc: 'Smaller payloads, fewer redundant requests and compressed responses for faster load times.',
      },
      {
        title: 'Database Tuning',
        desc: 'Indexing, eager loading of relations and refactored queries to cut latency on every screen.',
      },
      {
        title: 'Concurrent Users',
        desc: 'A stateless backend that serves many shoppers at once and scales horizontally when traffic grows.',
      },
      {
        title: 'Mobile Performance',
        desc: 'Controlled rendering, memoised lists and lean state management to avoid unnecessary re-renders.',
      },
    ],
    challenges: [
      {
        title: 'Scalability & Load',
        problem: 'Handling many active users at once without the app slowing down.',
        solution: 'A stateless API design and structured database indexing.',
      },
      {
        title: 'Checkout Latency',
        problem: 'Keeping product browsing and checkout fast from start to finish.',
        solution: 'Eager loading, API response caching and smaller payloads.',
      },
      {
        title: 'Cross-Platform Feel',
        problem: 'Giving Android and iOS users an experience that feels native on each.',
        solution: 'Platform-specific UI tuning inside the shared React Native codebase.',
      },
      {
        title: 'Payment Security',
        problem: 'Processing every transaction securely and consistently.',
        solution: 'Razorpay integration with robust server-side signature validation.',
      },
    ],
    strategy:
      'The interface is designed for simplicity and speed: intuitive navigation, effortless product discovery and a frictionless checkout. A mobile-first approach keeps the app fast and accessible across a wide range of devices and network conditions.',
    outcome:
      'Kangkan is live on the Google Play Store, with stable performance, smooth handling of user interactions and a reliable transaction system in production.',
    learnings: [
      'Scalability should be considered from the earliest stages of system design.',
      'Backend efficiency directly shapes how fast the app feels to shoppers.',
      'Clean RESTful API design plays a critical role in mobile performance.',
      'Real-world usage and load testing reveal limits that are worth fixing early.',
    ],
    roadmap: [
      'Redis caching to further improve API response times.',
      'Load balancing for better scalability during traffic peaks.',
      'Multi-vendor marketplace features to broaden the platform.',
      'Analytics, telemetry and performance monitoring.',
    ],
  },
};

const CaseStudyDetails = () => {
  const { id } = useParams();
  const reduce = useReducedMotion();
  const data = caseStudiesData[id];

  if (!data) {
    return <Navigate to="/case-studies" replace />;
  }

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay },
  });

  const pageUrl = `https://binudsoftwaresolutions.in/case-studies/case-study/${id}`;
  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.title,
        description: data.introduction,
        image: 'https://binudsoftwaresolutions.in/og-image.png',
        author: { '@id': 'https://binudsoftwaresolutions.in/#organization' },
        publisher: { '@id': 'https://binudsoftwaresolutions.in/#organization' },
        mainEntityOfPage: pageUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://binudsoftwaresolutions.in/' },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://binudsoftwaresolutions.in/case-studies' },
          { '@type': 'ListItem', position: 3, name: data.title, item: pageUrl },
        ],
      },
    ],
  };

  const box = data.screenBox;

  return (
    <div className="min-h-screen bg-white font-sans text-left">
      <SEOHead canonicalPath={`/case-studies/case-study/${id}`} ogType="article" jsonLd={caseStudyJsonLd} />
      <Navbar />

      {/* ═══ Hero ═══ */}
      <section className="bg-sky overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-5 pb-14 md:pb-20">
          <Breadcrumbs
            crumbs={[{ name: 'Case Studies', path: '/case-studies' }, { name: data.name }]}
            className="mb-8 md:mb-10"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text */}
            <motion.div {...fadeUp()} className="lg:col-span-6">
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-14 h-14 rounded-2xl bg-white border border-line p-2 shrink-0">
                  <img src={data.logo} alt={`${data.name} logo`} className="w-full h-full object-contain" />
                </span>
                <div>
                  <p className="text-ink text-[17px] font-semibold leading-tight">{data.name}</p>
                  <p className="text-muted text-sm mt-1">Case Study · {data.category}</p>
                </div>
              </div>

              <h1 className="text-ink text-[30px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.15] tracking-tight">
                {data.title}
              </h1>
              <p className="mt-5 text-body !text-[17px] leading-[1.75] max-w-xl">{data.subtitle}</p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology used">
                {data.tech.map((t) => {
                  const TechIcon = getTechIcon(t);
                  return (
                    <li key={t} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white border border-line text-sm text-body">
                      <TechIcon size={14} style={{ color: getTechColor(t) }} aria-hidden="true" />
                      {t}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <ArrowButton href={data.pdf} download variant="solid" icon={FiDownload}>
                  Download PDF Case Study
                </ArrowButton>
                <ArrowButton to="/contact">Start a Similar Project</ArrowButton>
              </div>
            </motion.div>

            {/* Phones */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-6">
              <div
                className="relative h-[400px] sm:h-[460px] lg:h-[520px] rounded-[28px] overflow-hidden"
                style={{ background: 'linear-gradient(140deg, #ffffff 0%, #dcf0fa 50%, #b9e0f4 100%)' }}
              >
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-white/60 blur-3xl" />
                <span aria-hidden="true" className="absolute -right-24 -top-24 w-72 h-72 rounded-full border border-white/80" />
                <span aria-hidden="true" className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/70" />
                <span
                  aria-hidden="true"
                  className="absolute left-6 bottom-6 w-32 h-24"
                  style={{ backgroundImage: 'radial-gradient(rgba(0,119,182,0.3) 1.2px, transparent 1.4px)', backgroundSize: '14px 14px' }}
                />

                <div className="absolute inset-0 flex items-center justify-center pt-12 sm:pt-6">
                  <div className="flex items-center">
                    {data.heroScreens.map((src, i) => {
                      const pose = [
                        'z-0 w-28 sm:w-32 lg:w-36 rounded-[15px] -mr-8 sm:-mr-10 translate-y-8 -rotate-[9deg]',
                        'z-10 w-36 sm:w-40 lg:w-44 rounded-[19px]',
                        'z-0 w-28 sm:w-32 lg:w-36 rounded-[15px] -ml-8 sm:-ml-10 translate-y-8 rotate-[9deg]',
                      ][i];
                      return (
                        <PhoneScreen
                          key={src}
                          src={src}
                          box={box}
                          alt={i === 1 ? `${data.name} app home screen` : ''}
                          className={`${pose} shadow-[0_30px_55px_-18px_rgba(6,36,58,0.45)] ring-1 ring-black/10`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-white/95 text-sm font-medium text-ink shadow-[0_6px_18px_-8px_rgba(6,36,58,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Live on Google Play
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project facts */}
          <motion.dl {...fadeUp(0.15)} className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {data.facts.map(({ label, value, icon: FactIcon }) => (
              <div key={label} className="bg-white border border-line rounded-card p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0" aria-hidden="true">
                  <FactIcon size={19} />
                </span>
                <div className="min-w-0">
                  <dt className="text-[13px] text-muted">{label}</dt>
                  <dd className="mt-0.5 text-[15px] sm:text-base font-semibold text-ink leading-snug">{value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ═══ Overview: challenge + goals ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div {...fadeUp()} className="lg:col-span-7">
            <span className="block text-primary text-sm font-medium mb-3">Project Overview</span>
            <h2 className="section-title">About the project</h2>
            <p className="mt-5 text-body !text-[16px] md:!text-[17px] leading-[1.8]">{data.introduction}</p>

            <h3 className="mt-10 text-ink text-xl md:text-[22px] font-semibold tracking-tight">The challenge</h3>
            <p className="mt-3 text-body !text-[16px] md:!text-[17px] leading-[1.8]">{data.problemContext}</p>
          </motion.div>

          <motion.aside {...fadeUp(0.1)} className="lg:col-span-5">
            <div className="bg-sky border border-line rounded-card p-7 sm:p-8 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center" aria-hidden="true">
                  <FiTarget size={20} />
                </span>
                <h3 className="text-ink text-xl font-semibold tracking-tight">Project goals</h3>
              </div>
              <ul className="space-y-4">
                {data.objective.map((obj) => (
                  <li key={obj} className="flex items-start gap-3 text-body !text-[15px] leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-white border border-line text-primary flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <FiCheck size={14} />
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ═══ App screens ═══ */}
      <section className="py-16 md:py-24 bg-sky overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SectionHeading
            title={<>Inside the <span className="text-gradient">App</span></>}
            description="Real screens from the live app, from browsing and product details to cart, checkout and order tracking. Hover to pause."
            align="center"
            className="mb-12"
          />
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-sky to-transparent z-10 pointer-events-none" />
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-sky to-transparent z-10 pointer-events-none" />
          <div className="ticker-track py-6">
            {[...data.screenshots, ...data.screenshots].map((src, index) => (
              <PhoneScreen
                key={index}
                src={src}
                box={box}
                alt={index < data.screenshots.length ? `${data.name} app screen ${index + 1}` : ''}
                className="w-[150px] sm:w-[170px] rounded-[18px] mx-3 sm:mx-4 shrink-0 shadow-[0_20px_40px_-18px_rgba(6,36,58,0.35)] ring-1 ring-black/10"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Architecture ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SectionHeading
            title={<>How We <span className="text-gradient">Built It</span></>}
            description="A clean, four-part architecture chosen for speed today and room to grow tomorrow."
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.architecture.map(({ title, tag, desc, icon: ArchIcon }, i) => (
              <motion.article
                key={title}
                {...fadeUp(i * 0.06)}
                className="bg-white border border-line rounded-card p-6 sm:p-7 flex flex-col transition-colors duration-300 hover:border-[#9fd6ee]"
              >
                <span className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-5" aria-hidden="true">
                  <ArchIcon size={22} />
                </span>
                <h3 className="text-ink text-lg font-semibold tracking-tight">{title}</h3>
                <span className="mt-1 text-primary text-sm font-medium">{tag}</span>
                <p className="mt-3 text-body !text-[15px] leading-[1.7]">{desc}</p>
              </motion.article>
            ))}
          </div>

          {/* Engineering & optimisation */}
          <motion.div {...fadeUp()} className="mt-14 md:mt-16 rounded-[24px] bg-navy text-white p-7 sm:p-10 lg:p-12 relative overflow-hidden">
            <span aria-hidden="true" className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <h3 className="text-white text-2xl md:text-[28px] font-semibold tracking-tight">Engineering &amp; optimisation</h3>
              <p className="mt-3 text-white/75 max-w-2xl">The details that keep the app fast and stable under real-world traffic.</p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {data.optimizations.map((opt, i) => (
                  <div key={opt.title} className="lg:border-l lg:border-white/15 lg:pl-6 first:lg:border-l-0 first:lg:pl-0">
                    <span className="block text-[#7cc8ec] text-sm font-semibold tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                    <h4 className="mt-2 text-white text-lg font-semibold">{opt.title}</h4>
                    <p className="mt-2 text-white/75 !text-[15px] leading-[1.7]">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Challenges ═══ */}
      <section className="py-16 md:py-24 bg-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SectionHeading
            title={<>Challenges We <span className="text-gradient">Solved</span></>}
            description="Every serious product hits roadblocks. Here is what stood in the way, and how we got past it."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {data.challenges.map((chal, i) => (
              <motion.article
                key={chal.title}
                {...fadeUp((i % 2) * 0.06)}
                className="bg-white border border-line rounded-card p-6 sm:p-8"
              >
                <h3 className="text-ink text-xl font-semibold tracking-tight">{chal.title}</h3>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle size={19} className="text-muted shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-body !text-[15px] leading-relaxed">
                      <span className="font-semibold text-ink">Challenge: </span>
                      {chal.problem}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-primary-light/70 px-4 py-3.5">
                    <FiArrowRight size={19} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-body !text-[15px] leading-relaxed">
                      <span className="font-semibold text-primary">Solution: </span>
                      {chal.solution}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Approach & outcome ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.article {...fadeUp()} className="bg-sky border border-line rounded-card p-7 sm:p-10">
            <span className="block text-primary text-sm font-medium mb-3">Our Approach</span>
            <h2 className="text-ink text-2xl md:text-[28px] font-semibold tracking-tight">User experience strategy</h2>
            <p className="mt-4 text-body !text-[16px] leading-[1.8]">{data.strategy}</p>
          </motion.article>

          <motion.article
            {...fadeUp(0.1)}
            className="rounded-card p-7 sm:p-10 text-white relative overflow-hidden bg-gradient-to-br from-primary via-deep to-navy"
          >
            <span aria-hidden="true" className="absolute -right-16 -bottom-16 w-60 h-60 rounded-full border border-white/15" />
            <div className="relative">
              <span className="block text-[#bfe6f7] text-sm font-medium mb-3">The Outcome</span>
              <h2 className="text-white text-2xl md:text-[28px] font-semibold tracking-tight">Live and performing</h2>
              <p className="mt-4 text-white/85 !text-[16px] leading-[1.8]">{data.outcome}</p>
              <span className="mt-6 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                <FaGooglePlay size={14} aria-hidden="true" />
                Available on Google Play
              </span>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ═══ Learnings & roadmap ═══ */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Key learnings', icon: FiBookOpen, items: data.learnings },
            { title: "What's next", icon: FiCompass, items: data.roadmap },
          ].map(({ title, icon: BlockIcon, items }, b) => (
            <motion.article key={title} {...fadeUp(b * 0.1)} className="bg-white border border-line rounded-card p-7 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center" aria-hidden="true">
                  <BlockIcon size={20} />
                </span>
                <h2 className="text-ink text-xl md:text-[22px] font-semibold tracking-tight">{title}</h2>
              </div>
              <ol className="space-y-4">
                {items.map((item, i) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-primary text-sm font-semibold tabular-nums mt-[3px] w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body !text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div {...fadeUp()} className="relative overflow-hidden rounded-[28px] bg-navy px-6 py-12 sm:px-12 md:py-16 text-center">
            <span aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-primary/35 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-white text-[26px] md:text-[34px] font-semibold tracking-tight leading-tight">
                Planning an app like {data.name}?
              </h2>
              <p className="mt-4 text-white/80 !text-[16px] md:!text-[17px] leading-[1.75]">
                Let&apos;s talk about your idea and how we can build a fast, scalable app for Android and iOS that your
                customers will love.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <ArrowButton to="/contact" variant="white">Start a Conversation</ArrowButton>
                <ArrowButton href={data.pdf} download variant="ghost" icon={FiDownload}>
                  Download PDF
                </ArrowButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetails;
