import { motion, useReducedMotion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';

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
    features: ['Custom Web Apps', 'E-Commerce Platforms', 'CMS Development', 'API Development', 'Progressive Web Apps'],
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native. Smooth, performant apps that users love.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=350&q=80',
    features: ['iOS & Android Apps', 'Cross-Platform (Flutter)', 'App Store Deployment', 'Push Notifications', 'Offline Support'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with premium user experience in mind. Wireframes, interactive prototypes, and pixel-perfect design systems.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support. Deployment, containerization, and cost optimization.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Architecture', 'Cost Optimization'],
  },
  {
    title: 'AI & Automation',
    desc: 'Deploy smart workflows and chatbots to supercharge your business. Automate customer support, WhatsApp communication, and repetitive office tasks.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80',
    features: ['AI Chatbots & Support', 'WhatsApp Automation', 'RPA Workflow Pipelines', 'Custom GPT Integrations', 'Frictionless Automations'],
    link: '/services/ai-automation',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right technical decisions. Tech stack assessment, project rescue, and architecture reviews.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
    features: ['Tech Stack Assessment', 'Digital Transformation', 'Architecture Review', 'Team Augmentation', 'Project Rescue'],
  },
];

const Services = () => {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        canonicalPath="/services"
        jsonLd={servicesJsonLd}
      />
      <Navbar />

      <PageBanner
        title="Our Services"
        crumbs={[{ name: 'Services' }]}
        variant="services"
        description={[
          'Top-notch web, mobile and AI solutions for startups and enterprises. We architect high-performance digital platforms that help businesses execute seamless digital transformation, from design to deployment.',
          'From websites and mobile apps to custom software and AI automation, our team builds products that are fast, secure and ready to scale.',
        ]}
      />

      {/* Services Cards Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
          >
            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
              Services built around your goals
            </h2>
            <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
              Six ways we help startups and growing businesses design, build and scale digital products, from the
              first idea to long after launch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={service.link || '/contact'}
                  className="group h-full flex flex-col bg-sky border border-line rounded-card overflow-hidden text-left"
                >
                  <div className="relative aspect-[16/9] bg-line">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={service.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/45 via-navy/10 to-transparent" />
                  </div>

                  <div className="flex flex-col flex-1 p-6 sm:p-7">
                    <h3 className="text-ink text-[22px] font-semibold tracking-tight leading-snug mb-2.5">
                      {service.title}
                    </h3>
                    <p className="text-body !text-[15px] leading-[1.75] mb-5">{service.desc}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-5 border-t border-line mb-7">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 !text-[14px] text-ink/85 leading-snug">
                          <FiCheck size={15} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center justify-center w-full h-11 rounded-[var(--radius-btn)] bg-accent text-white text-[15px] font-medium transition-colors duration-300 group-hover:bg-primary">
                      {service.link ? 'View Details' : 'Discuss Your Project'}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <ConnectSection />

      <Footer />
    </div>
  );
};

export default Services;
