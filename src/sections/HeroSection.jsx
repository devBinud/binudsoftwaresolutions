import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { FaCode, FaMobileAlt, FaCloud, FaRobot } from 'react-icons/fa';

const services = [
  { icon: FaCode,      label: 'Web Development' },
  { icon: FaMobileAlt, label: 'Mobile Apps' },
  { icon: FaCloud,     label: 'Cloud Solutions' },
  { icon: FaRobot,     label: 'AI & Automation' },
];

const HeroSection = () => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-[#f0f7ff]">

      {/* Light dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Soft colour blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-50/50 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge mb-5 inline-block">
                🚀 Trusted Software Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5"
            >
              We Build Digital Solutions That{' '}
              <span className="text-[#005d9e]">Drive Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#64748b] text-lg leading-relaxed mb-8 max-w-lg"
            >
              Binud Software Solutions delivers cutting-edge web, mobile, and enterprise software
              tailored to your business. From idea to launch — we've got you covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/contact" className="btn-primary">
                Start Your Project <HiArrowRight />
              </Link>
              <Link to="/portfolio" className="btn-outline">
                View Our Work
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { num: '50+', label: 'Projects' },
                { num: '30+', label: 'Clients' },
                { num: '5+', label: 'Years' },
                { num: '99%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-[#005d9e]">{s.num}</div>
                  <div className="text-xs text-[#94a3b8] font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Clean card, no logo, no animations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

              <h3 className="text-[#0f172a] font-bold text-xl mb-1">Binud Software Solutions</h3>
              <p className="text-[#64748b] text-sm mb-6">Your trusted technology partner for digital transformation.</p>

              {/* Service cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {services.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="bg-[#f0f7ff] rounded-2xl border border-blue-100 p-4 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#005d9e] flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-white" />
                    </div>
                    <span className="text-[#0f172a] text-xs font-semibold leading-snug">{label}</span>
                  </div>
                ))}
              </div>

              {/* Status row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-[#0f172a]">Available for Projects</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>⭐</span>
                  <span className="text-xs font-bold text-[#0f172a]">5.0 Client Rating</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
