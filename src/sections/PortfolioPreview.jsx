import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    desc: 'Full-stack e-commerce with real-time inventory, payment gateway, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB'],
    bg: '#e8f2fb',
    accent: '#005d9e',
  },
  {
    title: 'Healthcare Mobile App',
    category: 'Mobile Development',
    desc: 'Patient management app with appointment booking and telemedicine features.',
    tags: ['Flutter', 'Firebase'],
    bg: '#eff6ff',
    accent: '#0073c4',
  },
  {
    title: 'SaaS Analytics Dashboard',
    category: 'Web Application',
    desc: 'Real-time business analytics platform with custom charts and team collaboration.',
    tags: ['React', 'Python', 'AWS'],
    bg: '#f0f9ff',
    accent: '#0284c7',
  },
];

const PortfolioPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="badge mb-3">Our Work</span>
          <h2 className="section-title mb-3">Featured Projects</h2>
          <p className="section-sub mx-auto">
            A glimpse of what we have built for clients across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card overflow-hidden group"
            >
              {/* Thumbnail */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: project.bg }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: project.accent }}
                >
                  {project.title[0]}
                </div>
                <div className="absolute inset-0 bg-[#005d9e]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <HiExternalLink size={26} className="text-white" />
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${project.accent}15`, color: project.accent }}>
                  {project.category}
                </span>
                <h3 className="text-[#0f172a] font-semibold mt-3 mb-1.5">{project.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-[#475569] rounded-md">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/portfolio" className="btn-outline">
            View All Projects <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
