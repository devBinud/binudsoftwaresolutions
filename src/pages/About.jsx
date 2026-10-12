import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerBgImage from '../assets/bg1.webp';
import binudAvatar from '../assets/team/binud.png';
import { FaArrowRight, FaEye } from 'react-icons/fa';
import ArrowButton from '../components/ArrowButton';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://binudsoftwaresolutions.in/about#aboutpage',
      'url': 'https://binudsoftwaresolutions.in/about',
      'name': 'About Us | Binud Software Solutions',
      'description': 'Founded in 2021 by Binud Panging, Binud Software Solutions is a leading custom software, mobile app, and web development agency executing digital transformation for startups and enterprises.',
      'mainEntity': {
        '@type': 'Organization',
        '@id': 'https://binudsoftwaresolutions.in/#organization',
        'name': 'Binud Software Solutions',
        'foundingDate': '2021',
        'founder': {
          '@type': 'Person',
          'name': 'Binud Panging',
          'jobTitle': 'Founder & Lead Software Architect',
          'image': 'https://binudsoftwaresolutions.in/logo.png'
        }
      }
    },
    {
      '@type': 'HowTo',
      'name': '7-Step Software Engineering & Delivery Process',
      'description': 'A proven, structured 7-step software engineering methodology for building robust, scalable digital platforms.',
      'step': [
        {
          '@type': 'HowToStep',
          'position': 1,
          'name': 'Discover',
          'text': 'Understand the vision, capture business logic, technical feasibility analysis, and define measurable deliverables.'
        },
        {
          '@type': 'HowToStep',
          'position': 2,
          'name': 'Strategize',
          'text': 'Architectural blueprint, modern tech stack recommendation, and sprint milestone roadmap.'
        },
        {
          '@type': 'HowToStep',
          'position': 3,
          'name': 'Design',
          'text': 'User journey mapping, wireframing, high-fidelity Figma UI systems, and clickable prototypes.'
        },
        {
          '@type': 'HowToStep',
          'position': 4,
          'name': 'Develop',
          'text': 'Modular full-stack engineering, daily Git commits, automated CI/CD builds, and agile sprint demos.'
        },
        {
          '@type': 'HowToStep',
          'position': 5,
          'name': 'Validate',
          'text': 'Automated unit, integration, and E2E testing, responsive auditing, and security penetration scans.'
        },
        {
          '@type': 'HowToStep',
          'position': 6,
          'name': 'Launch',
          'text': 'Production deployment on AWS/cloud, SSL encryption, CDN acceleration, and zero downtime release.'
        },
        {
          '@type': 'HowToStep',
          'position': 7,
          'name': 'Evolve',
          'text': '24/7 uptime monitoring, security updates, database tuning, and continuous feature iterations.'
        }
      ]
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
          'name': 'About Us',
          'item': 'https://binudsoftwaresolutions.in/about'
        }
      ]
    }
  ]
};

const processSteps = [
  {
    id: 'discover',
    number: '01',
    numLabel: '1',
    name: 'Discover',
    tagline: 'Understand the Vision',
    desc: 'We begin by understanding your business, challenges, users, and goals to define what success looks like.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'In-depth stakeholder sessions to capture business logic and product goals.',
      'Comprehensive technical feasibility analysis and requirement mapping.',
      'Definition of success metrics, KPIs, and measurable deliverables.',
    ],
  },
  {
    id: 'strategize',
    number: '02',
    numLabel: '2',
    name: 'Strategize',
    tagline: 'Turn Ideas Into a Plan',
    desc: 'We translate your requirements into a clear product strategy, feature roadmap, technology stack, and execution plan.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'Architectural blueprint and modern tech stack recommendation.',
      'Milestone-driven roadmap with predictable sprint timelines.',
      'Transparent resource estimation with zero hidden technical debt.',
    ],
  },
  {
    id: 'design',
    number: '03',
    numLabel: '3',
    name: 'Design',
    tagline: 'Create the Experience',
    desc: 'We design intuitive, modern interfaces that balance user experience, functionality, and your brand identity.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'User journey mapping, wireframing, and core interaction flows.',
      'High-fidelity Figma UI design systems and interactive clickable prototypes.',
      'Stakeholder design reviews and iterative usability validation.',
    ],
  },
  {
    id: 'develop',
    number: '04',
    numLabel: '4',
    name: 'Develop',
    tagline: 'Build With Precision',
    desc: 'Our team transforms the approved solution into robust, scalable, and production-ready software.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'Modular full-stack engineering written in 2-week agile sprint cycles.',
      'Daily Git commits, automated CI/CD builds, and clean architecture.',
      'Regular sprint demo sessions so you see continuous tangible progress.',
    ],
  },
  {
    id: 'validate',
    number: '05',
    numLabel: '5',
    name: 'Validate',
    tagline: 'Test. Refine. Perfect.',
    desc: 'We rigorously test functionality, usability, responsiveness, performance, and real-world user flows before launch.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'Automated unit, integration, and end-to-end (E2E) test coverage.',
      'Cross-browser, multi-device, and responsive usability auditing.',
      'Security penetration scans, load benchmarking, and speed tuning.',
    ],
  },
  {
    id: 'launch',
    number: '06',
    numLabel: '6',
    name: 'Launch',
    tagline: 'Go Live With Confidence',
    desc: 'We deploy your solution, configure the production environment, and ensure everything is ready for real users.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      'Production deployment on AWS, GCP, or Azure with zero downtime.',
      'SSL encryption, domain DNS configuration, and CDN acceleration.',
      'Post-launch smoke testing and full administrative handover.',
    ],
  },
  {
    id: 'evolve',
    number: '07',
    numLabel: '7',
    name: 'Evolve',
    tagline: 'Keep Building Forward',
    desc: 'We provide ongoing support, optimization, maintenance, and enhancements as your business and technology needs evolve.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&h=350&q=80',
    details: [
      '24/7 uptime monitoring and proactive performance optimization.',
      'Routine security patches, framework updates, and database tuning.',
      'Continuous feature iterations based on real-world user analytics.',
    ],
  },
];

const About = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isBlog = queryParams.get('tab') === 'blog';

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        canonicalPath="/about"
        jsonLd={aboutJsonLd}
      />
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerBgImage}
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          {/* Solid gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10 text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            {isBlog ? 'Our Blog' : 'About Us'}
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {isBlog ? (
              <>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <span>/</span>
                <span className="text-white">Blog</span>
              </>
            ) : (
              <span className="text-white">About Us</span>
            )}
          </nav>
        </div>
      </section>

      {isBlog ? (
        /* Blog View */
        <>
          {/* Blog Introduction Header */}
          <section className="relative pt-16 pb-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col text-left"
              >
                <h2 className="text-[#3E4265] text-2xl md:text-3xl font-black mb-3 tracking-tight leading-tight">
                  Insights &amp; Engineering Perspectives
                </h2>
                <div className="w-16 h-[3px] bg-[#005eb8] mb-6 rounded-full" />
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Insights, research papers, and technical guides from our elite software engineering team.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Placeholder Grid Section */}
          <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-card border border-slate-200 p-10 md:p-14 flex flex-col items-center justify-center max-w-xl w-full"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-[#005eb8] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005eb8] animate-pulse" />
                  Under Construction
                </div>

                <h3 className="text-[#191919] font-black text-2xl md:text-3xl tracking-tight mb-4 font-sans">
                  We are working on this page
                </h3>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-sm">
                  We are currently preparing detailed technical articles, engineering tutorials, and industry insights from our dev team.
                </p>

                <ArrowButton to="/">Go Back Home</ArrowButton>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        /* About Us View */
        <>
          {/* Hero Header Section */}
          <section className="relative pt-16 pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col text-left"
                >
                  <h2 className="text-[#191919] text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight font-sans">
                    Top Web &amp; Mobile Application Development, Custom Software Engineering &amp; IT Consulting Company,
                  </h2>
                  <p className="text-slate-400 text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight mt-0 font-sans">
                    Building Smart Solutions For A Smarter World.
                  </p>
                </motion.div>

                {/* Right Column: Narrative Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex flex-col text-left lg:pt-2"
                >
                  <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium mb-6">
                    Founded in the year 2021, <strong className="text-[#191919] font-bold">Binud Software Solutions</strong> is
                    a leading Custom Software, Mobile App, and Web development agency helping global businesses
                    execute digital transformation.
                  </p>

                  <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium">
                    Being a true technological companion, we help startups and enterprise-level businesses
                    architect high-performance digital platforms to become recognized industry leaders.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Our Process Section (Step-by-Step Methodology) ── */}
          <section
            className="py-16 md:py-24 bg-[#ffffff] text-[#172b4d] overflow-hidden text-left relative"
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(23, 43, 77)',
              fontFamily: "'Open Sans', sans-serif"
            }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

              {/* Section Header */}
              <div className="mb-14 max-w-3xl">
                <span className="inline-block px-3.5 py-1.5 bg-[#e8f1fb] text-[#005eb8] font-bold text-xs uppercase tracking-wider mb-4 font-sans">
                  Our Process
                </span>
                <h2 className="text-[#172b4d] text-3xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tight font-sans mb-3">
                  How We Engineer &amp; Deliver
                </h2>
                <p
                  className="text-[#172b4d]/80 text-[16px] leading-relaxed"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, fontSize: '16px' }}
                >
                  A proven, structured 7-step software engineering methodology designed for startups and enterprises seeking a long-term technology partner.
                </p>
              </div>

              {/* Main 2-Column Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* Left Column: Step-by-Step Editorial Flow */}
                <div className="lg:col-span-8 flex flex-col space-y-12">
                  {processSteps.map((step) => (
                    <div
                      key={step.id}
                      id={`step-${step.id}`}
                      className="pb-12 last:pb-0 scroll-mt-28"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                        {/* Step Number & Title + Left Side Visual Container */}
                        <div className="md:col-span-5 flex flex-col">
                          <h3 className="text-[#172b4d] font-black text-xl sm:text-2xl font-sans tracking-tight leading-snug">
                            <span className="text-[#005eb8] mr-2">{step.numLabel}.</span>
                            {step.name}
                          </h3>
                          <span className="text-[#005eb8] text-xs sm:text-sm font-bold italic mt-1.5 mb-3.5">
                            {step.tagline}
                          </span>

                          {/* Left Side Image / Graphic Container */}
                          <div className="w-full max-w-[240px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-sm relative group">
                            {step.image ? (
                              <img loading="lazy" decoding="async"
                                src={step.image}
                                alt={`${step.name} - ${step.tagline}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                                <span className="text-2xl mb-1">🖼️</span>
                                <span className="text-[11px] font-semibold">Image Placeholder</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description & Structured Deliverables */}
                        <div className="md:col-span-7 flex flex-col justify-center">
                          <p
                            className="text-[#172b4d] text-[16px] leading-relaxed mb-4"
                            style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, fontSize: '16px' }}
                          >
                            {step.desc}
                          </p>

                          <ul className="space-y-3">
                            {step.details.map((detail, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-start gap-3 text-[16px] text-[#172b4d] leading-relaxed"
                                style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, fontSize: '16px' }}
                              >
                                <span className="w-1.5 h-1.5 bg-[#005eb8] rounded-none mt-2.5 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Sticky Table of Contents & Action Widget */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">

                  {/* Table of Contents Box */}
                  <div className="bg-[#ffffff] rounded-card border border-slate-200 p-6 shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#172b4d] pb-3 border-b border-slate-200 mb-4 font-sans">
                      Table of Contents
                    </h4>

                    <nav className="flex flex-col space-y-1">
                      {processSteps.map((step) => (
                        <a
                          key={step.id}
                          href={`#step-${step.id}`}
                          className="px-3 py-2 text-[14px] text-[#172b4d]/85 hover:text-[#005eb8] hover:bg-slate-50 border-l-2 border-transparent hover:border-[#005eb8] transition-all flex items-center justify-between group"
                          style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-[#005eb8] font-bold text-xs font-sans">{step.number}.</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">{step.name}</span>
                          </span>
                          <span className="text-slate-400 text-[11px] italic hidden sm:inline">{step.tagline}</span>
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Schedule a Call Widget */}
                  <div className="bg-[#f8fafc] rounded-card border border-slate-200 p-6 text-center flex flex-col items-center shadow-sm">
                    <h4 className="text-[#172b4d] font-black text-base font-sans tracking-tight mb-2">
                      Discuss a Potential Project
                    </h4>

                    <p
                      className="text-[#172b4d]/80 text-[14px] leading-relaxed mb-5 max-w-xs"
                      style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }}
                    >
                      Schedule a direct 20-minute consultation with our lead technical architect to explore scope, timeline, and strategy.
                    </p>

                    <ArrowButton to="/contact" className="w-full justify-between">Schedule a Call</ArrowButton>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ── Explore More: Vision & Mission / Founder's Desk ── */}
          <section className="py-20 md:py-24 bg-[#f8fafc] text-left">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="max-w-2xl mb-10">
                <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4">
                  Get to Know Us
                </span>
                <h2 className="text-[#191919] text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  What drives us, and who leads us
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Vision & Mission */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden bg-[#092c4c] text-white rounded-card p-8 sm:p-10 flex flex-col"
                >
                  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#005eb8]/40 blur-3xl pointer-events-none" />
                  <div className="relative flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                      <FaEye size={22} className="text-blue-300" />
                    </div>
                    <span className="block text-xs font-extrabold uppercase tracking-widest text-blue-300 mb-3">
                      Vision &amp; Mission
                    </span>
                    <h3 className="text-2xl font-black leading-snug tracking-tight mb-3">
                      Building smart solutions for a smarter world
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-8">
                      Discover where we are headed, what we set out to do for every client, and the core values
                      behind every line of code.
                    </p>
                    <Link
                      to="/about/vision-mission"
                      className="group/cta mt-auto inline-flex items-center gap-2 w-fit text-sm font-bold uppercase tracking-wider text-white hover:text-blue-300 transition-colors"
                    >
                      Read Our Vision &amp; Mission
                      <FaArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>

                {/* From Founder's Desk */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border border-slate-200 rounded-card p-8 sm:p-10 shadow-sm flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img loading="lazy" decoding="async"
                      src={binudAvatar}
                      alt="Binud Panging - Founder & CEO"
                      className="w-14 h-14 rounded-full object-cover object-top bg-[#e8f1fb] ring-2 ring-white shadow-md"
                    />
                    <div>
                      <span className="block text-[#191919] font-black tracking-tight">Binud Panging</span>
                      <span className="block text-xs font-semibold text-[#005eb8]">Founder &amp; CEO</span>
                    </div>
                  </div>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-[#005eb8] mb-3">
                    From Founder's Desk
                  </span>
                  <h3 className="text-[#191919] text-2xl font-black leading-snug tracking-tight mb-3">
                    We don't just ship features, we shape your digital future
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    A personal note from our founder on why Binud Software Solutions was started, and how we
                    approach every partnership.
                  </p>
                  <Link
                    to="/about/founders-desk"
                    className="group/cta mt-auto inline-flex items-center gap-2 w-fit text-sm font-bold uppercase tracking-wider text-[#191919] hover:text-[#005eb8] transition-colors"
                  >
                    Read the Message
                    <FaArrowRight size={12} className="group-hover/cta:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>

              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default About;
