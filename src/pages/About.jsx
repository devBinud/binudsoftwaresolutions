import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerBgImage from '../assets/bg1.jpg';
import binudAvatar from '../assets/team/binud.png';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaArrowRight,
} from 'react-icons/fa';

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
        'name': 'Binud Software Solutions',
        'foundingDate': '2021',
        'founder': {
          '@type': 'Person',
          'name': 'Binud Panging',
          'jobTitle': 'Founder & Lead Software Architect',
          'image': 'https://binudsoftwaresolutions.in/logo.png',
          'sameAs': [
            'https://linkedin.com',
            'https://x.com',
            'https://facebook.com'
          ]
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
        title="About Us | Binud Software Solutions - Engineering & Digital Innovation"
        description="Founded in 2021 by Binud Panging, Binud Software Solutions is a leading custom software, mobile app, and web development agency executing digital transformation for startups and enterprises."
        keywords={[
          'About Binud Software Solutions',
          'Binud Panging',
          'software engineering methodology',
          'IT consulting Assam',
          'custom software development agency',
          'Guwahati software architect'
        ]}
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
                className="bg-white border border-slate-200 p-10 md:p-14 flex flex-col items-center justify-center max-w-xl w-full"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-[#005eb8] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005eb8] animate-pulse" />
                  Under Construction
                </div>

                <h3 className="text-[#191919] font-black text-2xl md:text-3xl tracking-tight mb-4 font-sans">
                  We are working on this page
                </h3>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-sm">
                  We are currently preparing detailed technical articles, engineering tutorials, and industry insights from our dev team.
                </p>

                <Link
                  to="/"
                  className="bg-[#005eb8] hover:bg-[#00488e] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-none transition-all duration-300"
                >
                  Go Back Home
                </Link>
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
                  <h1 className="text-[#191919] text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight font-sans">
                    Top Web &amp; Mobile Application Development, Custom Software Engineering &amp; IT Consulting Company,
                  </h1>
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
                              <img
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
                  <div className="bg-[#ffffff] border border-slate-200 p-6 shadow-sm">
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
                  <div className="bg-[#f8fafc] border border-slate-200 p-6 text-center flex flex-col items-center shadow-sm">
                    <h4 className="text-[#172b4d] font-black text-base font-sans tracking-tight mb-2">
                      Discuss a Potential Project
                    </h4>

                    <p
                      className="text-[#172b4d]/80 text-[14px] leading-relaxed mb-5 max-w-xs"
                      style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }}
                    >
                      Schedule a direct 20-minute consultation with our lead technical architect to explore scope, timeline, and strategy.
                    </p>

                    <Link
                      to="/contact"
                      className="w-full py-3 px-4 bg-[#005eb8] hover:bg-[#00488e] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-sm font-sans"
                    >
                      <span>Schedule a Call</span>
                      <FaArrowRight size={11} />
                    </Link>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ── Founder's Vision Section ── */}
          <section className="py-20 md:py-28 bg-[#f8fafc] overflow-hidden text-left relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Column: Vision Statement */}
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-7 flex flex-col"
                >
                  <span className="inline-block px-3 py-1.5 rounded-none text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4 w-fit">
                    Founder's Vision
                  </span>

                  <h2 className="text-[#191919] text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight tracking-tight font-sans mb-6">
                    We don't just ship features, <br />
                    we shape your digital future
                  </h2>

                  <div className="mb-6">
                    <p
                      className="text-[#172b4d]/85 italic text-base sm:text-lg leading-relaxed font-normal"
                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px' }}
                    >
                      "We believe in writing clean code that stands the test of time, designing architectures that scale infinitely, and building relationships based on absolute trust. Our mission is to convert complex challenges into scalable, elegant technology solutions that drive real business growth."
                    </p>
                  </div>


                </motion.div>

                {/* Right Column: Founder Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-5 flex justify-center lg:justify-end"
                >
                  <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center shadow-sm w-full max-w-[360px]">
                    {/* Founder Photo Banner */}
                    <div className="w-full aspect-square bg-slate-100 overflow-hidden mb-6 border border-slate-200">
                      <img
                        src={binudAvatar}
                        alt="Binud Panging - Founder & CEO"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <h3 className="text-[#191919] font-black text-xl mb-1 font-sans tracking-tight">
                      Binud Panging
                    </h3>
                    <p
                      className="text-[#005eb8] font-semibold text-[12px] whitespace-nowrap mb-5 tracking-normal"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Founder &amp; CEO, Binud Software Solutions
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100 w-full justify-center text-slate-600">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={15} />
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="X / Twitter"
                      >
                        <FaTwitter size={15} />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="Facebook"
                      >
                        <FaFacebook size={15} />
                      </a>
                    </div>
                  </div>
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
