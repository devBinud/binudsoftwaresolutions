import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCode, FaMobileAlt, FaPaintBrush, FaCloud, FaRobot, FaChartLine, FaDatabase, FaShieldAlt } from 'react-icons/fa';

const services = [
  {
    icon: FaCode,
    title: 'Web Development',
    desc: 'We build fast, scalable, and SEO-optimized web applications using the latest frameworks like React, Next.js, and Vue. From landing pages to complex enterprise portals.',
    features: ['Custom Web Apps', 'E-Commerce Platforms', 'CMS Development', 'API Development', 'Progressive Web Apps'],
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications for iOS and Android. We use Flutter and React Native to deliver smooth, performant apps that users love.',
    features: ['iOS & Android Apps', 'Cross-Platform (Flutter)', 'App Store Deployment', 'Push Notifications', 'Offline Support'],
  },
  {
    icon: FaPaintBrush,
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with your users in mind. We create wireframes, prototypes, and pixel-perfect designs that convert.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    icon: FaCloud,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure and DevOps services on AWS, GCP, and Azure. We handle deployment, monitoring, and optimization.',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Architecture', 'Cost Optimization'],
  },
  {
    icon: FaRobot,
    title: 'AI & Automation',
    desc: 'Leverage the power of AI to automate processes, gain insights, and build intelligent features into your products.',
    features: ['Chatbots & Assistants', 'Machine Learning', 'Data Analytics', 'Process Automation', 'NLP Solutions'],
  },
  {
    icon: FaChartLine,
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right decisions. We assess your current setup and recommend the best path forward.',
    features: ['Tech Stack Assessment', 'Digital Transformation', 'Architecture Review', 'Team Augmentation', 'Project Rescue'],
  },
  {
    icon: FaDatabase,
    title: 'Database Design',
    desc: 'Robust, optimized database architecture for your applications. SQL, NoSQL, and everything in between.',
    features: ['Schema Design', 'Performance Tuning', 'Data Migration', 'Backup & Recovery', 'Real-time Databases'],
  },
  {
    icon: FaShieldAlt,
    title: 'Cybersecurity',
    desc: 'Protect your digital assets with our security audits, penetration testing, and secure development practices.',
    features: ['Security Audits', 'Penetration Testing', 'SSL & Encryption', 'GDPR Compliance', 'Vulnerability Assessment'],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── IMAGE HERO BANNER (Hyperlink InfoSystem Style) ── */}
      <section 
        className="relative pt-44 pb-24 bg-cover bg-center select-none overflow-hidden"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        {/* Dark Translucent Mask Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 z-0" />
        
        {/* Symmetrical Left-Aligned Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            {/* Modern Spaced-out Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-6 select-none">
              <Link to="/" className="hover:text-[#9b51e0] transition-colors">Home</Link>
              <span className="text-slate-400">/</span>
              <span className="text-white">Services</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight max-w-4xl">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec]">Services</span>
            </h1>

            {/* Underline Divider */}
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#9b51e0] to-[#3081ec] mb-6 rounded-full" />

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              Comprehensive software solutions tailored to your business needs. We cover the full spectrum
              of digital development — from design to deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="card p-7 flex gap-5 hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
            >
              {/* Icon Container with Theme Gradient Background */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b51e0]/8 to-[#3081ec]/8 flex items-center justify-center shrink-0 border border-[#9b51e0]/10 text-[#9b51e0]">
                <service.icon size={20} />
              </div>
              <div>
                <h3 className="text-[#191919] font-black text-lg mb-2 leading-snug">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">{service.desc}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9b51e0] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
