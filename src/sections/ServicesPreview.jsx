import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaMobileAlt, FaPaintBrush, FaCloud, FaRobot, FaChartLine } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  {
    icon: FaCode,
    title: 'Web Development',
    desc: 'Custom web apps built with modern frameworks. Fast, highly scalable, and SEO-optimized.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&h=350&q=80',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=350&q=80',
  },
  {
    icon: FaPaintBrush,
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with premium user experience in mind.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
  },
  {
    icon: FaCloud,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
  },
  {
    icon: FaRobot,
    title: 'AI & Automation',
    desc: 'Intelligent automation and AI-powered features to supercharge your business.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80',
  },
  {
    icon: FaChartLine,
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right technical decisions.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
  },
];

const ServicesPreview = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden select-none border-t border-slate-100">
      {/* Container matches StatsSection and AboutPreview grid parameters exactly to guarantee pixel-perfect left boundary alignment */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header Row (Left-aligned title with right-aligned circular link matching AboutUs design) ── */}
        <div className="flex flex-col text-left mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-[#191919] text-3xl sm:text-[36px] lg:text-[40px] font-black leading-tight tracking-tight font-sans max-w-xl">
              Services that we offer
            </h2>

            <Link
              to="/services"
              className="inline-flex items-center gap-4 group cursor-pointer w-fit pb-1"
            >
              {/* Circular Arrow button */}
              <div className="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center text-slate-900 group-hover:bg-[#191919] group-hover:text-white group-hover:border-[#191919] group-hover:scale-105 transition-all duration-300 shrink-0">
                <HiArrowRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Link Label */}
              <span className="text-[#191919] font-bold text-sm tracking-wide uppercase">
                View All Services
              </span>
            </Link>
          </div>
        </div>

        {/* ── Services Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#8b3fd0] to-[#2071dc] p-8 min-h-[460px] flex flex-col justify-between group shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              {/* Card Header & Content (Removed horizontal white divider line completely) */}
              <div>
                <h3 className="text-white text-2xl font-black tracking-tight mb-5 leading-tight font-sans">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Card Bottom Graphics Blending with full-height soft gradient mask (0% to 100%) to completely dissolve dividing line borders, even on hover */}
              <div
                className="mt-8 -mx-8 -mb-8 overflow-hidden h-[180px] relative rounded-b-[28px]"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 60%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 60%)'
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60 mix-blend-luminosity group-hover:opacity-85 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesPreview;
