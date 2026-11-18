import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import ArrowButton from '../components/ArrowButton';

const services = [
  {
    name: 'AI & Automation',
    link: '/services/ai-automation',
    intro:
      'We help businesses put AI to practical use - automating repetitive work, answering customers instantly and turning documents and data into decisions.',
    detail:
      'From chatbots grounded in your own knowledge base to workflow bots that connect your tools, we design AI systems that are reliable, measurable and safe to run in production.',
    points: [
      'AI Chatbots & Virtual Assistants',
      'RAG Pipelines on Your Own Data',
      'Document Processing & OCR',
      'Workflow & Process Automation',
      'LLM Integration (OpenAI, Claude)',
      'AI Strategy & Proof of Concept',
    ],
  },
  {
    name: 'Web Development',
    link: '/services',
    intro:
      'We build fast, secure and scalable web applications - from marketing websites to complex dashboards, portals and SaaS platforms.',
    detail:
      'Using React, Next.js and Node.js, we deliver clean, well-tested code with strong SEO, accessibility and performance built in from day one.',
    points: [
      'Custom Web Applications',
      'React & Next.js Development',
      'Node.js & REST / GraphQL APIs',
      'SaaS Platform Development',
      'Admin Panels & Dashboards',
      'Website Performance & SEO',
    ],
  },
  {
    name: 'Mobile App Development',
    link: '/services',
    intro:
      'We create iOS and Android apps that people enjoy using - smooth, dependable and ready to grow with your audience.',
    detail:
      'With Flutter and React Native, one codebase reaches both platforms, cutting cost and time to market without compromising on the native feel.',
    points: [
      'Flutter App Development',
      'React Native App Development',
      'iOS & Android Apps',
      'Offline Support & Real-Time Sync',
      'Push Notifications & In-App Payments',
      'App Store & Play Store Launch',
    ],
  },
  {
    name: 'Cloud & DevOps',
    link: '/services',
    intro:
      'We help businesses modernise their infrastructure with reliable cloud solutions and efficient DevOps practices that speed up releases and reduce downtime.',
    detail:
      'By combining automation, monitoring and continuous delivery, we build secure, high-performing environments that scale smoothly with demand.',
    points: [
      'Cloud Migration & Setup',
      'CI/CD Pipeline Implementation',
      'Docker & Kubernetes',
      'Server Monitoring & Optimisation',
      'AWS, GCP & Firebase Hosting',
      'Backup & Disaster Recovery',
    ],
  },
  {
    name: 'UI/UX Design',
    link: '/services',
    intro:
      'We design clear, attractive interfaces that make complex products feel simple - grounded in research and tested with real users.',
    detail:
      'From wireframes to polished, clickable prototypes and design systems, our designs are built to be handed straight to development.',
    points: [
      'User Research & UX Audits',
      'Wireframes & User Flows',
      'UI Design for Web & Mobile',
      'Interactive Prototypes (Figma)',
      'Design Systems',
      'Accessibility (WCAG) Reviews',
    ],
  },
  {
    name: 'E-Commerce Development',
    link: '/services',
    intro:
      'We build online stores and marketplaces that load fast, convert well and are easy for your team to manage day to day.',
    detail:
      'Secure checkouts, payment gateways, inventory and order management - everything needed to sell confidently online, on web and mobile.',
    points: [
      'Custom Online Stores',
      'Payment Gateway Integration',
      'Product & Inventory Management',
      'Order Tracking & Notifications',
      'Multi-Vendor Marketplaces',
      'Conversion & Speed Optimisation',
    ],
  },
  {
    name: 'IT Consulting',
    link: '/services',
    intro:
      'We act as your technical advisor - helping you make the right technology decisions before they become expensive to change.',
    detail:
      'Whether you are planning a new product, rescuing a stalled project or preparing to scale, we give clear, practical recommendations.',
    points: [
      'Technology & Architecture Review',
      'Legacy Project Rescue',
      'Security & Code Audits',
      'Product Roadmap Planning',
      'Tech Stack Selection',
      'Team Augmentation',
    ],
  },
];

const ServicesPreview = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  /* WAI-ARIA tabs: arrow keys move between tabs (both directions, since the list is
     vertical on desktop and horizontal on phones), Home/End jump to the ends */
  const onKeyDown = (e) => {
    const last = services.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const service = services[active];

  return (
    <section aria-labelledby="services-heading" className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <h2 id="services-heading" className="section-title">
              Complete Range of Software &amp; AI Services
            </h2>
            <p className="mt-3 text-[#1f2f3d] !text-[16px] sm:!text-[17px]">
              We solve real business challenges with a full suite of engineering services - one team, every layer of your product.
            </p>
          </div>
          <ArrowButton to="/services" variant="solid" className="w-fit shrink-0">
            View All Services
          </ArrowButton>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Tab list: vertical panel on desktop, sideways-scrolling chips on phones/tablets */}
          <div className="lg:col-span-4 rounded-[var(--radius-card)] border border-line bg-sky p-2.5 lg:p-5">
            <div
              role="tablist"
              aria-label="Our services"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex lg:flex-col gap-1.5 lg:gap-2 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_82%,transparent)] lg:[mask-image:none]"
            >
              {services.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.name}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`service-tab-${i}`}
                    aria-selected={selected}
                    aria-controls="service-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`shrink-0 text-left whitespace-nowrap lg:whitespace-normal rounded-[10px] px-4 py-3 lg:px-7 lg:py-[18px] text-[15px] lg:text-[17px] font-semibold transition-colors duration-300 ease-in-out cursor-pointer ${
                      selected
                        ? 'bg-primary text-white '
                        : 'text-ink hover:bg-white hover:text-primary'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content panel */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            tabIndex={0}
            className="lg:col-span-8 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-8 lg:p-10 lg:min-h-[480px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-[22px] md:text-2xl font-semibold text-ink tracking-tight">{service.name}</h3>
                <p className="mt-4 text-[#1f2f3d] !text-[16px] sm:!text-[17px] !leading-[1.85]">{service.intro}</p>
                <p className="mt-4 text-[#1f2f3d] !text-[16px] sm:!text-[17px] !leading-[1.85]">{service.detail}</p>

                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 !text-[15.5px] sm:!text-[16.5px] !leading-snug text-ink">
                      <HiCheckCircle size={24} className="text-accent shrink-0 -mt-px" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  to={service.link}
                  className="mt-8 inline-flex items-center gap-2 text-[17px] font-semibold text-primary underline underline-offset-4 decoration-2 decoration-primary/40 transition-colors duration-300 hover:text-primary-dark hover:decoration-primary"
                >
                  Explore {service.name}
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
