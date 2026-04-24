import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaMobileAlt, FaPaintBrush, FaCloud, FaRobot, FaChartLine } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  { icon: FaCode, title: 'Web Development', desc: 'Custom web apps built with modern frameworks. Fast, scalable, and SEO-optimized.' },
  { icon: FaMobileAlt, title: 'Mobile Apps', desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native.' },
  { icon: FaPaintBrush, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed with your users in mind.' },
  { icon: FaCloud, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support.' },
  { icon: FaRobot, title: 'AI & Automation', desc: 'Intelligent automation and AI-powered features to supercharge your business.' },
  { icon: FaChartLine, title: 'IT Consulting', desc: 'Strategic technology consulting to help you make the right decisions.' },
];

const ServicesPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="badge mb-3">What We Do</span>
          <h2 className="section-title mb-3">Our Services</h2>
          <p className="section-sub mx-auto">
            End-to-end software solutions designed to transform your business and accelerate growth.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#e8f2fb] flex items-center justify-center mb-4 group-hover:bg-[#005d9e] transition-colors">
                <service.icon size={18} className="text-[#005d9e] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#0f172a] font-semibold text-base mb-2">{service.title}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link to="/services" className="btn-outline">
            View All Services <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
