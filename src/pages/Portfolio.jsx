import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../sections/CTASection';
import { HiExternalLink } from 'react-icons/hi';

const categories = ['All', 'Web', 'Mobile', 'Design', 'Cloud'];

const projects = [
  { title: 'E-Commerce Platform', category: 'Web', desc: 'Full-stack e-commerce with real-time inventory and payment gateway.', tags: ['React', 'Node.js', 'MongoDB'], bg: '#e8f2fb', accent: '#005d9e' },
  { title: 'Healthcare Mobile App', category: 'Mobile', desc: 'Patient management with telemedicine and health tracking.', tags: ['Flutter', 'Firebase'], bg: '#eff6ff', accent: '#0073c4' },
  { title: 'SaaS Analytics Dashboard', category: 'Web', desc: 'Real-time business analytics with custom charts and reports.', tags: ['React', 'Python', 'AWS'], bg: '#f0f9ff', accent: '#0284c7' },
  { title: 'Restaurant Booking App', category: 'Mobile', desc: 'Table reservation and food ordering app for restaurants.', tags: ['React Native', 'Node.js'], bg: '#e8f2fb', accent: '#005d9e' },
  { title: 'Corporate Brand Identity', category: 'Design', desc: 'Complete brand identity and design system for a tech company.', tags: ['Figma', 'Illustrator'], bg: '#eff6ff', accent: '#0073c4' },
  { title: 'Cloud Migration Project', category: 'Cloud', desc: 'Migrated legacy infrastructure to AWS with zero downtime.', tags: ['AWS', 'Docker', 'Terraform'], bg: '#f0f9ff', accent: '#0284c7' },
  { title: 'Real Estate Portal', category: 'Web', desc: 'Property listing platform with advanced search and virtual tours.', tags: ['Next.js', 'PostgreSQL'], bg: '#e8f2fb', accent: '#005d9e' },
  { title: 'Fitness Tracking App', category: 'Mobile', desc: 'Workout tracking with AI-powered recommendations.', tags: ['Flutter', 'ML Kit'], bg: '#eff6ff', accent: '#0073c4' },
  { title: 'EdTech Learning Platform', category: 'Web', desc: 'Online learning platform with video courses and quizzes.', tags: ['React', 'Node.js', 'MongoDB'], bg: '#f0f9ff', accent: '#0284c7' },
];

const Portfolio = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto pt-6 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4">Our Work</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-5">
              Our <span className="text-[#005d9e]">Portfolio</span>
            </h1>
            <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl mx-auto">
              A showcase of projects we've built for clients across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6 pt-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-[#005d9e] text-white'
                    : 'bg-gray-100 text-[#475569] hover:bg-[#e8f2fb] hover:text-[#005d9e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="card overflow-hidden group"
                >
                  <div
                    className="h-40 flex items-center justify-center relative overflow-hidden"
                    style={{ background: project.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                      style={{ background: project.accent }}
                    >
                      {project.title[0]}
                    </div>
                    <div className="absolute inset-0 bg-[#005d9e]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <HiExternalLink size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${project.accent}15`, color: project.accent }}>
                      {project.category}
                    </span>
                    <h3 className="text-[#0f172a] font-semibold mt-3 mb-1.5">{project.title}</h3>
                    <p className="text-[#64748b] text-sm mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-[#475569] rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Portfolio;
