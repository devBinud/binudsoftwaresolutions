import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ArrowButton from '../components/ArrowButton';

/* Flat illustration: a developer at a laptop with chat, settings and code bubbles */
const DeveloperIllustration = ({ className = '' }) => (
  <svg viewBox="0 0 240 190" className={className} aria-hidden="true" focusable="false">
    {/* Chat bubble (left) */}
    <g>
      <rect x="6" y="58" width="58" height="40" rx="9" fill="#f7b731" />
      <path d="M48 96 L58 110 L58 96 Z" fill="#f7b731" />
      <rect x="15" y="68" width="40" height="4" rx="2" fill="#fff" />
      <rect x="15" y="76" width="40" height="4" rx="2" fill="#fff" />
      <rect x="15" y="84" width="28" height="4" rx="2" fill="#fff" />
    </g>

    {/* Settings bubble (top) */}
    <g>
      <ellipse cx="112" cy="26" rx="27" ry="22" fill="#f7b731" />
      <path d="M100 44 L96 56 L110 47 Z" fill="#f7b731" />
      <circle cx="112" cy="26" r="9.5" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="4.2 3.2" />
      <circle cx="112" cy="26" r="7" fill="#fff" />
      <circle cx="112" cy="26" r="3.2" fill="#f7b731" />
    </g>

    {/* Code bubble (right) */}
    <g>
      <circle cx="176" cy="84" r="21" fill="#f7b731" />
      <path d="M160 96 L152 108 L166 101 Z" fill="#f7b731" />
      <path d="M169 77 L162 84 L169 91 M183 77 L190 84 L183 91 M178 74 L174 94" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Chair */}
    <rect x="52" y="112" width="18" height="62" rx="5" fill="#e8504f" />
    <rect x="52" y="160" width="62" height="10" rx="4" fill="#c73e3d" />

    {/* Person */}
    <path d="M66 176 C66 140 74 124 96 122 C118 124 126 140 126 176 Z" fill="#9fd3f0" />
    <path d="M96 122 L90 132 L96 140 L102 132 Z" fill="#7cc0e6" />
    <rect x="91" y="108" width="10" height="16" rx="4" fill="#efb995" />
    {/* hair back + bun */}
    <circle cx="86" cy="76" r="9" fill="#1f2937" />
    <ellipse cx="96" cy="92" rx="17" ry="19" fill="#1f2937" />
    {/* face */}
    <ellipse cx="99" cy="96" rx="12.5" ry="15" fill="#f4c7a4" />
    <path d="M84 90 C86 76 106 74 112 88 C104 84 92 84 84 90 Z" fill="#1f2937" />
    <circle cx="95" cy="97" r="1.6" fill="#1f2937" />
    <circle cx="105" cy="97" r="1.6" fill="#1f2937" />
    <path d="M97 104 Q100 106.5 103 104" stroke="#c0705a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    {/* arm reaching to the keyboard */}
    <path d="M118 140 C130 150 140 156 156 158" stroke="#9fd3f0" strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="158" cy="158" r="6" fill="#f4c7a4" />

    {/* Desk + laptop */}
    <rect x="128" y="164" width="112" height="8" rx="2" fill="#e5edf2" />
    <rect x="146" y="124" width="74" height="42" rx="4" fill="#f4f7f9" />
    <circle cx="183" cy="145" r="3" fill="#cbd6dd" />
    <rect x="138" y="164" width="90" height="4" rx="2" fill="#cbd6dd" />
  </svg>
);

/* Decorative flowing lines in the background */
const FlowLines = () => (
  <svg
    viewBox="0 0 900 260"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 w-full h-full"
  >
    {Array.from({ length: 22 }).map((_, i) => (
      <path
        key={i}
        d={`M${180 + i * 6} 270 C ${320 + i * 5} ${180 - i * 3}, ${520 - i * 4} ${120 + i * 4}, ${760 + i * 7} -10`}
        stroke="#ffffff"
        strokeOpacity={0.07}
        strokeWidth="1"
        fill="none"
      />
    ))}
  </svg>
);

const GrowthBanner = () => {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="growth-heading" className="relative overflow-hidden bg-[#0b2a4f]">
      <FlowLines />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 lg:pt-6 pb-10 lg:pb-0 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10"
      >
        <DeveloperIllustration className="hidden sm:block w-[200px] lg:w-[230px] shrink-0 self-center lg:self-end" />

        <h2
          id="growth-heading"
          className="flex-1 text-center lg:text-left text-white text-[26px] md:text-[32px] font-semibold leading-[1.3] tracking-[-0.01em] lg:py-12"
        >
          Accelerate Your Business Growth with Custom Software &amp; AI
        </h2>

        <span aria-hidden="true" className="hidden lg:block self-stretch my-10 border-l-2 border-dashed border-white/70" />

        <div className="flex justify-center lg:block shrink-0">
          <ArrowButton to="/contact" variant="white" icon={FiArrowRight}>
            Start Your Project
          </ArrowButton>
        </div>
      </motion.div>
    </section>
  );
};

export default GrowthBanner;
