import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  {
    title: 'Web Development',
    desc: 'Custom web apps built with modern frameworks. Fast, highly scalable, and SEO-optimized.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Popular',
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15% OFF',
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with premium user experience in mind.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'New',
  },
  {
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15% OFF',
  },
  {
    title: 'AI & Automation',
    desc: 'Intelligent automation and AI-powered features to supercharge your business.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '20% OFF',
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right technical decisions.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Free Audit',
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
    <section className="relative py-16 md:py-24 bg-white overflow-hidden select-none border-t border-slate-100">
      {/* Container matches StatsSection and AboutPreview grid parameters exactly to guarantee pixel-perfect left boundary alignment */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header Row (Left-aligned title with right-aligned circular link matching AboutUs design) ── */}
        <div className="flex flex-col text-left mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
                Top-Notch Services
              </h2>
              <p className="text-slate-400 text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans mt-0">
                for Startups &amp; Enterprises!
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-4 group cursor-pointer w-fit pb-1"
            >
              {/* Circular Arrow button */}
              <div className="w-12 h-12 rounded-full border border-[#0f172a]/30 flex items-center justify-center text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-[#0f172a] group-hover:scale-105 transition-all duration-300 shrink-0">
                <HiArrowRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Link Label */}
              <span className="text-[#0f172a] font-bold text-sm tracking-wide uppercase">
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
              className="rounded-2xl p-[1px] bg-gradient-to-br from-[#274e85]/20 to-[#3E4265]/20 hover:from-[#274e85] hover:to-[#3E4265] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(39,78,133,0.08)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer group relative overflow-hidden"
            >
              <div className="w-full h-full rounded-2xl bg-white p-8 flex flex-col justify-start min-h-[250px] select-none text-left relative overflow-hidden">

                {/* Diagonal Corner Ribbon (Red) */}
                {service.badge && (
                  <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none z-20">
                    <div className="absolute top-3 right-[-30px] rotate-45 bg-[#695dd3] text-white text-[8px] font-black uppercase tracking-widest text-center py-1 w-28 shadow-[0_2px_10px_rgba(105,93,211,0.35)]">
                      {service.badge}
                    </div>
                  </div>
                )}

                {/* Low-opacity background image watermark (instead of icon) */}
                <div
                  className="absolute right-0 bottom-0 w-44 h-44 opacity-[0.08] pointer-events-none select-none rounded-br-2xl overflow-hidden"
                  style={{
                    maskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
                  }}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover object-center filter grayscale mix-blend-multiply group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-start relative z-10 pr-4">
                  <h3 className="text-[#3E4265] text-lg font-black tracking-tight mb-3 font-sans leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[#3E4265]/80 text-xs sm:text-sm leading-relaxed font-medium max-w-[85%]">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesPreview;
