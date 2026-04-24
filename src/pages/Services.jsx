import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../sections/CTASection';
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

      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 pt-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-5">
              Our <span className="text-[#005d9e]">Services</span>
            </h1>
            <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs. We cover the full spectrum
              of digital development — from design to deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6 pt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="card p-7 flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e8f2fb] flex items-center justify-center shrink-0">
                <service.icon size={20} className="text-[#005d9e]" />
              </div>
              <div>
                <h3 className="text-[#0f172a] font-bold text-base mb-2">{service.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed mb-4">{service.desc}</p>
                <ul className="grid grid-cols-2 gap-1">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs text-[#64748b] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005d9e] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
