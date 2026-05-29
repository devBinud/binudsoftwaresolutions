import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiExternalLink } from 'react-icons/hi';

const categories = ['All', 'Web', 'Mobile', 'Design', 'Cloud'];

const projects = [
  { title: 'E-Commerce Platform', category: 'Web', desc: 'Full-stack e-commerce with real-time inventory and payment gateway.', tags: ['React', 'Node.js', 'MongoDB'], bg: '#faf9ff', accent: '#9b51e0' },
  { title: 'Healthcare Mobile App', category: 'Mobile', desc: 'Patient management with telemedicine and health tracking.', tags: ['Flutter', 'Firebase'], bg: '#f5f7ff', accent: '#3081ec' },
  { title: 'SaaS Analytics Dashboard', category: 'Web', desc: 'Real-time business analytics with custom charts and reports.', tags: ['React', 'Python', 'AWS'], bg: '#faf9ff', accent: '#9b51e0' },
  { title: 'Restaurant Booking App', category: 'Mobile', desc: 'Table reservation and food ordering app for restaurants.', tags: ['React Native', 'Node.js'], bg: '#f5f7ff', accent: '#3081ec' },
  { title: 'Corporate Brand Identity', category: 'Design', desc: 'Complete brand identity and design system for a tech company.', tags: ['Figma', 'Illustrator'], bg: '#faf9ff', accent: '#9b51e0' },
  { title: 'Cloud Migration Project', category: 'Cloud', desc: 'Migrated legacy infrastructure to AWS with zero downtime.', tags: ['AWS', 'Docker', 'Terraform'], bg: '#f5f7ff', accent: '#3081ec' },
  { title: 'Real Estate Portal', category: 'Web', desc: 'Property listing platform with advanced search and virtual tours.', tags: ['Next.js', 'PostgreSQL'], bg: '#faf9ff', accent: '#9b51e0' },
  { title: 'Fitness Tracking App', category: 'Mobile', desc: 'Workout tracking with AI-powered recommendations.', tags: ['Flutter', 'ML Kit'], bg: '#f5f7ff', accent: '#3081ec' },
  { title: 'EdTech Learning Platform', category: 'Web', desc: 'Online learning platform with video courses and quizzes.', tags: ['React', 'Node.js', 'MongoDB'], bg: '#faf9ff', accent: '#9b51e0' },
];

const Portfolio = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isCaseStudies = queryParams.get('tab') === 'case-studies';

  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── IMAGE HERO BANNER (Hyperlink InfoSystem Style) ── */}
      <section 
        className="relative pt-44 pb-24 bg-cover bg-center select-none overflow-hidden"
        style={{ 
          backgroundImage: `url('${isCaseStudies ? 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80' : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80'}')` 
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
              <span className="text-white">{isCaseStudies ? 'Case Studies' : 'Projects'}</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight max-w-4xl">
              {isCaseStudies ? 'Case ' : 'Our '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec]">{isCaseStudies ? 'Studies' : 'Projects'}</span>
            </h1>

            {/* Underline Divider */}
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#9b51e0] to-[#3081ec] mb-6 rounded-full" />

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              {isCaseStudies 
                ? "Detailed breakdowns of our most complex digital solutions, client success stories, and engineering achievements."
                : "A showcase of premium software applications, custom engineering, and smart digital systems we've built."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Modern Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  active === cat
                    ? 'bg-gradient-to-r from-[#9b51e0] to-[#3081ec] text-white shadow-md shadow-purple-500/10'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-[#9b51e0]/5 hover:text-[#9b51e0]'
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
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="card overflow-hidden group hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="h-44 flex items-center justify-center relative overflow-hidden"
                    style={{ background: project.bg }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white"
                      style={{ background: project.accent }}
                    >
                      {project.title[0]}
                    </div>
                    {/* Hover Overlay with Theme Accent */}
                    <div className="absolute inset-0 bg-[#9b51e0]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <HiExternalLink size={26} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border"
                      style={{ background: `${project.accent}08`, color: project.accent, borderColor: `${project.accent}15` }}>
                      {project.category}
                    </span>
                    <h3 className="text-[#191919] font-black text-lg mt-4 mb-2 leading-tight">{project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
