import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiChevronRight } from 'react-icons/hi';

const services = [
  {
    title: 'Web Platforms & APIs',
    category: 'FULL-STACK ENGINEERING',
    desc: 'High-performance React, Next.js & Node.js web systems built for speed, security, and scale.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services',
  },
  {
    title: 'Cross-Platform Mobile Apps',
    category: 'IOS & ANDROID',
    desc: 'Native React Native & Flutter mobile applications with rich offline support and real-time push.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services',
  },
  {
    title: 'AI & Automation Systems',
    category: 'GPT-4 & RAG PIPELINES',
    desc: 'Smart AI chatbots, OCR parsing, custom LLMs, and automated workflow pipelines.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services/ai-automation',
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    category: 'AWS & GCP CLOUD',
    desc: 'Scalable cloud deployment, Docker containerization, Kubernetes clusters, and CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services',
  },
  {
    title: 'UI/UX & Product Design',
    category: 'USER EXPERIENCE',
    desc: 'Beautiful, intuitive user interfaces, design systems, and interactive prototypes built for engagement.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services',
  },
  {
    title: 'IT Strategy & Consulting',
    category: 'TECH ARCHITECTURE',
    desc: 'Strategic technology assessment, legacy project rescue, security audits, and team augmentation.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=380&q=80',
    link: '/services',
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
    <section className="relative py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header Row ── */}
        <div className="flex flex-col text-left mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#005eb8] text-xs font-black uppercase tracking-widest block mb-2">
                Our Capabilities
              </span>
              <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
                Our Services
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-4 group cursor-pointer w-fit pb-1"
            >
              <div className="w-12 h-12 rounded-full border border-[#0f172a]/30 flex items-center justify-center text-[#0f172a] group-hover:bg-[#005eb8] group-hover:text-white group-hover:border-[#005eb8] group-hover:scale-105 transition-all duration-300 shrink-0">
                <HiArrowRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>

              <span className="text-[#0f172a] font-bold text-sm tracking-wide uppercase">
                View All Services
              </span>
            </Link>
          </div>
        </div>

        {/* ── 3-Column Services Cards Grid matching screenshot ── */}
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
                    <span className="absolute top-2.5 left-2.5 bg-[#005eb8] text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-none shadow-sm">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-slate-900 font-extrabold text-base sm:text-lg leading-snug mb-2 group-hover:text-[#005eb8] transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    {service.desc}
                  </p>
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
  );
};

export default ServicesPreview;
