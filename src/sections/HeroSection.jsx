import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ArrowButton from '../components/ArrowButton';
import bgImage from '../assets/33353.webp';

const rotatingWords = [
  'Software Solutions',
  'Mobile Applications',
  'AI & Automation',
  'Web Platforms',
  'Cloud Architecture',
];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full bg-slate-50 font-sans">
      {/* ── Main Hero Area ── */}
      <section className="relative min-h-[calc(85vh-4rem)] md:min-h-[calc(85vh-4.5rem)] lg:min-h-[calc(92vh-4.5rem)] flex items-center py-16 md:py-24 overflow-hidden">

        {/* Background Image (33353.jpg) */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Binud Software Solutions - Enterprise Software Development, Mobile Apps and AI Engineering"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
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
              className="badge mb-6"
            >
              Your Vision, Our Expertise
            </motion.div>

            {/* Main Headline (Inspired by CoPilot layout) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#191919] font-black tracking-tight leading-[1.15] mb-6 font-sans text-3xl sm:text-5xl lg:text-6xl"
            >
              Build &amp; Scale <br />
              <span className="inline-block max-w-full relative text-[#005eb8] uppercase tracking-tight my-1 text-[clamp(1.25rem,7vw,1.875rem)] sm:text-4xl md:text-5xl lg:text-6xl">
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

            {/* Action Buttons — stacked full-width on phones, side by side from sm */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <ArrowButton to="/contact" variant="solid" size="lg" className="w-full sm:w-auto justify-between">
                Start a Project
              </ArrowButton>
              <ArrowButton to="/services" size="lg" className="w-full sm:w-auto justify-between">
                Explore Services
              </ArrowButton>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
