import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroImage from '../assets/hero_image.png';
import heroBgImage from '../assets/founder_section_bg.jpg';

const rotatingWords = ['Software', 'Mobile Apps', 'AI Solutions', 'Web Platforms', 'Cloud Systems'];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center pt-28 pb-16 select-none overflow-hidden">

      {/* Subtle background watermark image (Light Theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-multiply">
        <img
          src={heroBgImage}
          alt=""
          className="w-full h-full object-cover object-center invert hue-rotate-180"
        />
      </div>

      {/* Ambient background blobs for soft depth */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[300px] bg-[#695dd3] rounded-full blur-[130px] pointer-events-none opacity-[0.06]" />
      <div className="absolute top-24 right-1/4 w-[400px] h-[300px] bg-[#8075e3] rounded-full blur-[130px] pointer-events-none opacity-[0.05]" />

      {/* Modern decorative SVG line curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        {/* Top-left large sweeping arc */}
        <path
          d="M -80 320 C 120 100, 400 80, 680 260 S 1100 480, 1520 300"
          fill="none"
          stroke="#695dd3"
          strokeWidth="1.2"
          strokeOpacity="0.12"
        />
        {/* Slightly offset second arc below */}
        <path
          d="M -80 400 C 140 180, 420 160, 700 340 S 1120 560, 1520 380"
          fill="none"
          stroke="#695dd3"
          strokeWidth="0.8"
          strokeOpacity="0.09"
        />
        {/* Bottom-right sweeping curve */}
        <path
          d="M 200 900 C 400 700, 700 650, 900 750 S 1200 880, 1520 720"
          fill="none"
          stroke="#695dd3"
          strokeWidth="1"
          strokeOpacity="0.10"
        />
        {/* Tight curve top-right corner */}
        <path
          d="M 900 -40 C 1050 80, 1200 200, 1520 180"
          fill="none"
          stroke="#3E4265"
          strokeWidth="1"
          strokeOpacity="0.08"
        />
        {/* Diagonal crossing line — subtle */}
        <path
          d="M 0 700 C 200 500, 600 300, 1000 180 S 1300 80, 1520 40"
          fill="none"
          stroke="#695dd3"
          strokeWidth="0.6"
          strokeOpacity="0.07"
          strokeDasharray="6 10"
        />
      </svg>

      {/* Hero content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative"
      >

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Headline, Description, Buttons, Trust Widget */}
          <div className="lg:col-span-6 flex flex-col text-left">

            {/* Headline with custom inline rotating word badge */}
            <motion.h1
              variants={itemVariants}
              className="text-[#3E4265] font-black tracking-tight font-sans leading-[1.15] mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              We Build World-Class{' '}
              <span className="inline-block relative overflow-hidden align-middle mx-1.5 bg-gradient-to-r from-[#695dd3] to-[#8075e3] border border-white/10 text-white rounded-full text-[0.8em] font-bold shadow-[0_4px_15px_rgba(105,93,211,0.2)]" style={{ minWidth: '7.8em', height: '1.45em' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              For Your Business Growth
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-base md:text-[17px] leading-relaxed mb-8 max-w-xl font-medium"
            >
              From MVPs to enterprise-grade platforms — we craft scalable, beautiful digital products that drive real business success.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-5 mb-12"
            >
              <Link
                to="/contact"
                className="bg-[#695dd3] hover:bg-[#574cbd] text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-[0_4px_22px_rgba(105,93,211,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Start a Conversation
              </Link>
              <Link
                to="/services"
                className="text-[#3E4265] hover:text-[#695dd3] font-bold text-xs sm:text-sm border-b-2 border-slate-200 hover:border-[#695dd3] transition-all duration-300 pb-0.5"
              >
                View Our Services
              </Link>
            </motion.div>

            {/* Trust Widget */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 rounded-2xl p-4 max-w-md shadow-sm"
            >
              <div className="flex -space-x-3 shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#8075e3] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">BS</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#3E4265] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">AI</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#695dd3] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">WD</div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3E4265] mb-0.5">Solutions built on scale & trust</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Providing high-performance web, mobile & AI systems globally.</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Workflow Image - Slowly rotating */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-[480px] flex items-center justify-center">
              {/* Soft ambient glow behind the image - static */}
              <div className="absolute inset-0 scale-90 bg-gradient-to-br from-[#695dd3]/20 to-[#8075e3]/10 rounded-full blur-3xl -z-10" />

              {/* Slowly rotating image */}
              <img
                src={heroImage}
                alt="Our Agile Workflow in 4 Steps"
                className="w-full h-auto object-contain drop-shadow-[0_12px_40px_rgba(105,93,211,0.12)]"
                style={{ animation: 'heroSpin 28s linear infinite' }}
              />
            </div>
          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default HeroSection;
