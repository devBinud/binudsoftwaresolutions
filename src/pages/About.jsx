import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import founderPhoto from '../assets/team/founder.png';
import { FiCheck } from 'react-icons/fi';
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

      <PageBanner
        title={isBlog ? 'Our Blog' : 'About Us'}
        crumbs={isBlog ? [{ name: 'About Us', path: '/about' }, { name: 'Blog' }] : [{ name: 'About Us' }]}
        variant={isBlog ? 'blog' : 'about'}
        description={isBlog ? [
          'Insights, research papers and technical guides from our software engineering team.',
        ] : [
          'Founded in 2021, Binud Software Solutions is a custom software, mobile app and web development company helping businesses execute digital transformation.',
          'As a true technology partner, we help startups and enterprises architect high-performance digital platforms and grow into recognised leaders in their industries.',
        ]}
      />

      {isBlog ? (
        /* Blog View */
        <>
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-[#0077b6] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077b6] animate-pulse" />
                  Under Construction
                </div>

                <h3 className="text-ink font-semibold text-[22px] md:text-2xl tracking-tight mb-4 font-sans">
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
          {/* ── Our Process Section (Step-by-Step Methodology) ── */}
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

              {/* Section Header */}
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
                <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
                  How We Engineer &amp; Deliver
                </h2>
                <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
                  A proven, structured 7-step software engineering methodology designed for startups and enterprises
                  seeking a long-term technology partner.
                </p>
              </div>

              {/* Step cards */}
              <div className="flex flex-wrap justify-center gap-6">
                {processSteps.map((step, i) => (
                  <motion.article
                    key={step.id}
                    id={`step-${step.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-sky border border-line rounded-card p-5 sm:p-6 text-left scroll-mt-28"
                  >
                    <div className="aspect-[16/9] rounded-xl overflow-hidden bg-line mb-5">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={step.image}
                        alt={`${step.name} - ${step.tagline}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="block text-primary text-sm font-medium mb-2">{step.tagline}</span>

                    <h3 className="text-ink text-[22px] font-semibold tracking-tight leading-snug mb-3">
                      {step.name}
                    </h3>
                    <p className="text-body !text-[15px] leading-[1.75] mb-4">{step.desc}</p>

                    <ul className="space-y-2.5">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5 !text-[15px] text-ink/85 leading-relaxed">
                          <FiCheck size={16} className="text-primary shrink-0 mt-1" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Explore More: Vision & Mission / Founder's Desk ── */}
          <section className="py-16 md:py-24 bg-sky">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
              <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
                <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
                  What drives us, and who leads us
                </h2>
                <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
                  The purpose behind our work, and the person who started it all.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Vision & Mission */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-line rounded-card p-7 sm:p-9 flex flex-col text-left"
                >
                  <span className="block text-primary text-sm font-medium mb-2">Vision &amp; Mission</span>
                  <h3 className="text-ink text-[22px] font-semibold leading-snug tracking-tight mb-3">
                    Building smart solutions for a smarter world
                  </h3>
                  <p className="text-body !text-[15px] md:!text-[16px] leading-[1.75] mb-6">
                    Where we are headed, what we set out to do for every client, and the values behind every line
                    of code.
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="rounded-xl bg-sky border border-line p-5">
                      <dt className="text-ink font-semibold mb-1.5">Our Vision</dt>
                      <dd className="text-body !text-[15px] leading-relaxed">
                        To be the most trusted technology partner from Northeast India.
                      </dd>
                    </div>
                    <div className="rounded-xl bg-sky border border-line p-5">
                      <dt className="text-ink font-semibold mb-1.5">Our Mission</dt>
                      <dd className="text-body !text-[15px] leading-relaxed">
                        To turn complex challenges into scalable, elegant technology solutions.
                      </dd>
                    </div>
                  </dl>

                  <ArrowButton to="/about/vision-mission" variant="link" className="mt-auto w-fit">
                    Read our Vision &amp; Mission
                  </ArrowButton>
                </motion.article>

                {/* From Founder's Desk */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border border-line rounded-card overflow-hidden flex flex-col sm:flex-row text-left"
                >
                  <div className="sm:w-[40%] shrink-0 bg-gradient-to-b from-sky to-primary-light flex items-end justify-center h-64 sm:h-auto">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={founderPhoto}
                      alt="Binud Panging, Founder & CEO"
                      className="h-full w-full object-cover object-top sm:object-bottom"
                    />
                  </div>

                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    <span className="block text-primary text-sm font-medium mb-2">From Founder&apos;s Desk</span>
                    <h3 className="text-ink text-[22px] font-semibold leading-snug tracking-tight mb-3">
                      &ldquo;We don&apos;t just ship features, we shape your digital future.&rdquo;
                    </h3>
                    <p className="text-body !text-[15px] md:!text-[16px] leading-[1.75] mb-6">
                      A personal note on why Binud Software Solutions was started, and how we approach every
                      partnership.
                    </p>

                    <div className="mt-auto pt-5 border-t border-line">
                      <span className="block text-ink font-semibold">Binud Panging</span>
                      <span className="block text-sm text-muted mb-4">Founder &amp; CEO</span>
                      <ArrowButton to="/about/founders-desk" variant="link" className="w-fit">
                        Read the message
                      </ArrowButton>
                    </div>
                  </div>
                </motion.article>

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
