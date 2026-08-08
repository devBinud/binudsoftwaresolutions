import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import bannerBgImage from '../assets/bg2.jpg';

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://binudsoftwaresolutions.in/services#services',
      'name': 'Custom Software & Mobile App Development Services',
      'provider': {
        '@type': 'Organization',
        'name': 'Binud Software Solutions',
        'url': 'https://binudsoftwaresolutions.in/'
      },
      'serviceType': 'Software Development',
      'description': 'End-to-end software engineering: Custom Web Apps, Cross-Platform Mobile Apps (Flutter, React Native), UI/UX Design, Cloud DevOps, AI Automation, and IT Consulting.',
      'areaServed': 'Worldwide',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Technology Services',
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
              'name': 'Mobile App Development (iOS & Android)'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'UI/UX Interface & Interaction Design'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Cloud Solutions, DevOps & Microservices'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'AI & Intelligent Workflow Automation'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Strategic IT Consulting & Architecture Reviews'
            }
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
          'name': 'Services',
          'item': 'https://binudsoftwaresolutions.in/services'
        }
      ]
    }
  ]
};

const services = [
  {
    title: 'Web Development',
    desc: 'Custom web apps built with modern frameworks. Fast, highly scalable, and SEO-optimized from landing pages to complex enterprise portals.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Popular',
    features: ['Custom Web Apps', 'E-Commerce Platforms', 'CMS Development', 'API Development', 'Progressive Web Apps'],
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native. Smooth, performant apps that users love.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15%',
    features: ['iOS & Android Apps', 'Cross-Platform (Flutter)', 'App Store Deployment', 'Push Notifications', 'Offline Support'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with premium user experience in mind. Wireframes, interactive prototypes, and pixel-perfect design systems.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'New',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support. Deployment, containerization, and cost optimization.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15% OFF',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Architecture', 'Cost Optimization'],
  },
  {
    title: 'AI & Automation',
    desc: 'Deploy smart workflows and chatbots to supercharge your business. Automate customer support, WhatsApp communication, and repetitive office tasks.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '20%',
    features: ['AI Chatbots & Support', 'WhatsApp Automation', 'RPA Workflow Pipelines', 'Custom GPT Integrations', 'Frictionless Automations'],
    link: '/services/ai-automation',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right technical decisions. Tech stack assessment, project rescue, and architecture reviews.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Free Audit',
    features: ['Tech Stack Assessment', 'Digital Transformation', 'Architecture Review', 'Team Augmentation', 'Project Rescue'],
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        title="Software Development Services | Web, Mobile, Cloud & IT Consulting"
        description="Explore our end-to-end technology services: custom web apps, cross-platform mobile apps (Flutter, React Native), UI/UX design, cloud DevOps on AWS, AI chatbots, and IT consulting."
        keywords={[
          'software development services',
          'custom web application development',
          'mobile app development Flutter React Native',
          'UI UX design systems',
          'cloud solutions AWS DevOps',
          'AI chatbots workflow automation',
          'IT consulting Guwahati Assam'
        ]}
        canonicalPath="/services"
        jsonLd={servicesJsonLd}
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

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Our Services
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </nav>
        </div>
      </section>

      {/* Hero Header Section */}
      <section className="relative pt-16 pb-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            <h1 className="text-3xl sm:text-[42px] lg:text-[48px] font-black text-[#191919] leading-[1.15] tracking-tight mb-4 max-w-4xl">
              Top-Notch Web, Mobile & AI Solutions
            </h1>
            <p className="text-slate-400 text-3xl sm:text-[42px] lg:text-[48px] font-black leading-[1.15] tracking-tight mt-0 mb-6 max-w-4xl">
              for Startups &amp; Enterprises!
            </p>
            <div className="w-16 h-[3px] bg-[#005eb8] mb-8 rounded-full" />
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              We architect high-performance digital platforms, helping global businesses execute seamless digital transformation from design to deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="bg-slate-50 border border-slate-200/90 hover:border-[#005eb8] rounded-none p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md text-left cursor-pointer group"
              >
                <Link to={service.link || '/contact'} className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Image Banner */}
                    <div className="w-full h-40 sm:h-44 overflow-hidden bg-slate-200 mb-4 relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {service.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-[#005eb8] text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-none shadow-sm">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-slate-900 font-extrabold text-base sm:text-lg leading-snug mb-2 group-hover:text-[#005eb8] transition-colors font-sans">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                      {service.desc}
                    </p>

                    {/* Features list */}
                    <ul className="grid grid-cols-1 gap-1.5 pb-4">
                      {service.features.map((f) => (
                        <li key={f} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-none bg-[#005eb8] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full Width Dashed Footer Bar */}
                  <div className="-mx-4 px-4 pt-3 border-t border-dashed border-slate-300 mt-auto flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-bold text-[#005eb8] uppercase tracking-wider group-hover:underline">
                      View Details
                    </span>
                    <div className="w-6 h-6 rounded-none bg-white border border-slate-200 flex items-center justify-center text-[#005eb8] group-hover:bg-[#005eb8] group-hover:text-white transition-colors">
                      <HiChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <ConnectSection />

      <Footer />
    </div>
  );
};

export default Services;
