import { motion } from 'framer-motion';
import axomTechie from '../assets/axomtechie_logo.webp';
import { FaHandshake } from 'react-icons/fa';

const CollaborationsSection = () => {
  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[240px] bg-[#005eb8]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[#005eb8] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            Official Collaboration
          </p>
          <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
            Our Technology Partners
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed font-sans mt-3 max-w-xl mx-auto">
            A strategic technology alliance delivering stronger digital solutions and engineering excellence across Northeast India.
          </p>
        </motion.div>

        {/* ── Seamless Floating Container (No box, No borders, No panel background) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-6 sm:py-8"
        >
          <div className="relative flex flex-col items-center">
            
            {/* ── ROW 1: Logos & Badge with animated line running straight through center ── */}
            <div className="relative w-full flex items-center justify-between">
              
              {/* Continuous running animated dashed line with warm yellow (#f8c543) */}
              <div className="absolute left-10 sm:left-24 right-10 sm:right-24 top-1/2 -translate-y-1/2 h-6 overflow-hidden pointer-events-none z-0">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line
                    x1="0%"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="#f8c543"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    className="animate-flow-dash"
                  />
                </svg>
              </div>

              {/* ── LEFT: BSS Logo ── */}
              <div className="relative z-10 bg-white px-4 sm:px-6 py-3 flex items-center justify-center w-36 sm:w-48 h-16 sm:h-20">
                <img
                  src="/logo.png"
                  alt="Binud Software Solutions"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* ── CENTER: Partnership Badge (Line passes right through it) ── */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#005eb8] to-[#004080] text-white shadow-lg shadow-[#005eb8]/30 border-2 border-white ring-2 ring-[#f8c543]">
                  <FaHandshake className="text-[#f8c543] text-base sm:text-xl animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap">
                    Partnership
                  </span>
                </div>
              </div>

              {/* ── RIGHT: AxomTechie Logo ── */}
              <div className="relative z-10 bg-white px-4 sm:px-6 py-3 flex items-center justify-center w-36 sm:w-48 h-16 sm:h-20">
                <img
                  src={axomTechie}
                  alt="AxomTechie"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

            </div>

            {/* ── ROW 2: Partner Names aligned under each logo ── */}
            <div className="relative w-full flex items-center justify-between mt-3 px-1">
              <p className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 w-36 sm:w-48 text-center">
                Binud Software Solutions
              </p>
              <div className="flex-1" />
              <p className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 w-36 sm:w-48 text-center">
                AxomTechie
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationsSection;
