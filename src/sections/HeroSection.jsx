import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import heroImage from '../assets/hero-image.png';
import heroMainBg from '../assets/hero-main-bg.png';
import binud from '../assets/team/binud.png';

const HeroSection = () => {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Standard slide up animation for items
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#0a0316] select-none"
      style={{
        backgroundImage: `url(${heroMainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dynamic Glowing Ambient Blobs for Volume & Depth */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[90px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* ── Left Social Sidebar (no background image) ── */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
        <div className="flex flex-col items-center gap-6">
          {/* Vertical rotated text */}
          <span className="[writing-mode:vertical-lr] rotate-180 text-white/50 text-[10px] tracking-[0.25em] font-extrabold uppercase select-none">
            Follow Us On
          </span>

          {/* Small separation line */}
          <div className="w-[1px] h-12 bg-white/20" />

          {/* Icon Circle Buttons */}
          <div className="flex flex-col gap-3">
            {[
              { Icon: FaYoutube, url: 'https://youtube.com', color: 'hover:text-red-500' },
              { Icon: FaInstagram, url: 'https://instagram.com', color: 'hover:text-pink-500' },
              { Icon: FaTwitter, url: 'https://twitter.com', color: 'hover:text-sky-400' },
              { Icon: FaFacebookF, url: 'https://facebook.com', color: 'hover:text-blue-500' },
            ].map(({ Icon, url, color }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 ${color} hover:bg-white/10 hover:border-white/30 transition-all duration-300 shadow-sm`}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Layout Container ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10 relative">

        {/* Left Column: Text & Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Futuristic Title */}
          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-black leading-[1.1] tracking-tight mb-6 font-sans"
          >
            Your Vision <br className="hidden sm:inline" />
            with AI-Driven <br />
            Innovation.
          </motion.h1>

          {/* Sleek Subtext Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl font-medium leading-relaxed"
          >
            In today's competitive business, the demand for efficient and
            cost-effective IT solutions for your company.
          </motion.p>

          {/* Premium Glowing Gradient Button */}
          <motion.div variants={itemVariants} className="mb-10">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#9b51e0] to-[#3081ec] text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-[0_4px_24px_rgba(155,81,224,0.4)] hover:shadow-[0_8px_32px_rgba(155,81,224,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Satisfied Clients overlapping avatars */}
          <motion.div
            variants={itemVariants}
            className="flex items-center"
          >
            <div className="flex -space-x-3.5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Client 1"
                className="w-10 h-10 rounded-full border-2 border-[#0a0316] object-cover shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Client 2"
                className="w-10 h-10 rounded-full border-2 border-[#0a0316] object-cover shadow-lg"
              />
              <img
                src={binud}
                alt="Client 3"
                className="w-10 h-10 rounded-full border-2 border-[#0a0316] object-cover shadow-lg bg-slate-900"
              />
            </div>

            <span className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wide ml-4 hover:text-white transition-colors duration-200 cursor-default">
              Join our 50503+ Satisfied World Clients
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: AI Cybernetic Woman Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Subtle Cyber Glow Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/15 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

          {/* Cyber Character with premium smooth hover animation */}
          <motion.img
            src={heroImage}
            alt="AI Cybernetic Character"
            className="w-[85%] md:w-[70%] lg:w-[95%] h-auto object-contain drop-shadow-[0_12px_40px_rgba(138,43,226,0.35)] relative z-10"
            animate={{
              y: [0, -14, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

      </div>

      {/* ── Absolute Background Watermark ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-black text-[7vw] sm:text-[8vw] tracking-[0.25em] text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap z-0 font-sans">
        BINUD SOFTWARE
      </div>
    </section>
  );
};

export default HeroSection;
