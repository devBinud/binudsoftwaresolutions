import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiArrowRight, HiChevronRight, HiCheckCircle } from 'react-icons/hi';
import bgImage from '../assets/33353.jpg';

const rotatingWords = [
  'Software Solutions',
  'Mobile Applications',
  'AI & Automation',
  'Web Platforms',
  'Cloud Architecture',
];

const heroServices = [
  {
    id: 1,
    title: 'Web Platforms & APIs',
    category: 'Full-Stack Engineering',
    desc: 'High-performance React, Next.js & Node web systems.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    link: '/services',
  },
  {
    id: 2,
    title: 'Cross-Platform Mobile Apps',
    category: 'iOS & Android',
    desc: 'Native React Native & Flutter mobile applications.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80',
    link: '/services',
  },
  {
    id: 3,
    title: 'AI & Automation Systems',
    category: 'GPT-4 & RAG Pipelines',
    desc: 'Smart AI chatbots, OCR parsing & custom LLMs.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
    link: '/services/ai-automation',
  },
  {
    id: 4,
    title: 'Enterprise DevOps & Cloud',
    category: 'AWS & Microservices',
    desc: 'Docker, CI/CD pipelines & zero-downtime hosting.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    link: '/services',
  },
];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const handleNextService = () => {
    setServiceIndex((prev) => (prev + 1) % heroServices.length);
  };

  const handlePrevService = () => {
    setServiceIndex((prev) => (prev - 1 + heroServices.length) % heroServices.length);
  };

  return (
    <div className="relative w-full bg-slate-50 font-sans">
      {/* ── Main Hero Area ── */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-28 pb-28 md:pt-36 md:pb-36 overflow-hidden">

        {/* Background Image (33353.jpg) */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Executive Light Overlay for Maximum Text Contrast & Elegance */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,94,184,0.06),transparent_60%)]" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
          <div className="max-w-3xl text-left">

            {/* Quality Guarantee Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#005eb8] text-white text-[11px] font-black px-4 py-2 uppercase tracking-widest mb-6 shadow-sm"
            >
              <span>ENTERPRISE QUALITY GUARANTEED</span>
              <HiCheckCircle className="text-white text-base" />
            </motion.div>

            {/* Main Headline (Inspired by CoPilot layout) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#191919] font-black tracking-tight leading-[1.15] mb-6 font-sans text-3xl sm:text-5xl lg:text-6xl"
            >
              Build &amp; Scale <br />
              <span className="inline-block max-w-full relative bg-[#005eb8] text-white px-2.5 sm:px-3.5 py-0.5 sm:py-1 uppercase tracking-tight my-1 shadow-md text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="inline-block max-w-full truncate sm:whitespace-nowrap align-bottom"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span> <br />
              For Your Business Growth
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium"
            >
              Experience world-class software development, mobile applications, and intelligent AI solutions crafted to drive measurable impact.
            </motion.p>

            {/* Action Buttons — Single Line on Mobile UI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="flex-1 sm:flex-initial justify-center bg-[#f8c543] hover:bg-[#ebb52d] text-slate-900 font-extrabold text-[11px] xs:text-xs sm:text-sm px-3.5 sm:px-8 py-3 sm:py-4 rounded-none border border-[#e0af34] uppercase tracking-wider inline-flex items-center gap-1.5 sm:gap-2 transition-colors duration-200 shadow-sm whitespace-nowrap"
              >
                <span>Start a Project</span>
                <HiArrowRight size={14} className="shrink-0" />
              </Link>
              <Link
                to="/services"
                className="flex-1 sm:flex-initial justify-center bg-white border-2 border-slate-300 hover:border-[#005eb8] hover:bg-slate-50 text-slate-800 hover:text-[#005eb8] font-bold text-[11px] xs:text-xs sm:text-sm px-3.5 sm:px-8 py-3 sm:py-4 rounded-none uppercase tracking-wider inline-flex items-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                <span>Explore Services</span>
                <HiChevronRight size={14} className="shrink-0" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Overlapping Floating Services Bar (Exact CoPilot Bottom Card Style) ── */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 -mt-20 lg:-mt-24 z-20 pb-16">
        <div className="bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.09)] rounded-none p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Heading & Link */}
            <div className="lg:col-span-3 text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-[#005eb8] text-[10px] font-extrabold uppercase tracking-widest mb-1.5 block">
                Our Capabilities
              </span>
              <h3 className="text-[#191919] text-2xl font-black tracking-tight mb-4 leading-tight">
                Our Services
              </h3>
              <Link
                to="/services"
                className="bg-[#005eb8] hover:bg-[#00488e] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-none inline-flex items-center gap-2 transition-colors duration-200"
              >
                <span>View All</span>
                <HiArrowRight size={14} />
              </Link>
            </div>

            {/* Right Column: Interactive Featured Services Cards */}
            <div className="lg:col-span-9 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {heroServices.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="group bg-slate-50 border border-slate-200/90 hover:border-[#005eb8] rounded-none p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md text-left"
                  >
                    <div>
                      <div className="w-full h-32 overflow-hidden bg-slate-200 mb-3.5 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-[#005eb8] text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5">
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-slate-900 font-bold text-sm leading-snug mb-1.5 group-hover:text-[#005eb8] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>

                    <div className="-mx-4 px-4 pt-2.5 border-t border-dashed border-slate-300 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#005eb8] uppercase tracking-wider group-hover:underline">
                        View details
                      </span>
                      <div className="w-6 h-6 rounded-none bg-white border border-slate-200 flex items-center justify-center text-[#005eb8] group-hover:bg-[#005eb8] group-hover:text-white transition-colors">
                        <HiChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
