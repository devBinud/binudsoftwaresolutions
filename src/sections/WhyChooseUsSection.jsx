import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineArrowPath,
  HiOutlineSignal,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';

/* Every value here mirrors a claim already made on the About / Services pages. */
const highlights = [
  {
    value: '7',
    label: 'Step Process',
    caption: 'A proven method from discovery to launch',
    desc: 'Discover, strategize, design, develop, validate, launch and evolve. A structured path that keeps every project predictable from day one.',
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    value: '2wk',
    label: 'Agile Sprints',
    caption: 'Working software demoed every two weeks',
    desc: 'We build in two-week sprint cycles and demo working software at the end of each one, so you always see real progress.',
    icon: HiOutlineArrowPath,
  },
  {
    value: '24/7',
    label: 'Monitoring',
    caption: 'Round-the-clock uptime monitoring',
    desc: 'After launch we keep watch around the clock, with uptime monitoring and proactive performance optimisation.',
    icon: HiOutlineSignal,
  },
  {
    value: '0',
    label: 'Hidden Tech Debt',
    caption: 'Transparent estimates, maintainable code',
    desc: 'Transparent resource estimates and clean architecture mean no surprises later, and code your team can maintain.',
    icon: HiOutlineShieldCheck,
  },
  {
    value: '2-in-1',
    label: 'Cross-Platform',
    caption: 'Android and iOS from a single codebase',
    desc: 'With React Native we ship Android and iOS apps from a single codebase, saving time without compromising quality.',
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    value: '6',
    label: 'Core Services',
    caption: 'Web, mobile, UI/UX, cloud, AI & consulting',
    desc: 'Web development, mobile apps, UI/UX design, cloud solutions, AI & automation and IT consulting, all under one roof.',
    icon: HiOutlineSquares2X2,
  },
];

const AUTO_DELAY = 2800;

/* ── Arc geometry (SVG units; the wheel scales with its container) ── */
const BOX_W = 540;
const BOX_H = 620;
const CENTER = { x: 470, y: 310 };
const ARC_R = 170;
const PILL_R = 300;
const ANGLES = [112, 140, 166, 194, 220, 248];

const polar = (r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER.x + r * Math.cos(rad), y: CENTER.y - r * Math.sin(rad) };
};

const arcStart = polar(ARC_R, 100);
const arcEnd = polar(ARC_R, 260);
const ARC_PATH = `M ${arcStart.x} ${arcStart.y} A ${ARC_R} ${ARC_R} 0 0 0 ${arcEnd.x} ${arcEnd.y}`;

const WhyChooseUsSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [paused]);

  const current = highlights[active];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 lg:mb-16"
        >
          <h2 className="text-[#191919] text-3xl sm:text-[42px] font-black leading-tight tracking-tight mb-4">
            Why Businesses <span className="text-[#005eb8]">Choose Us</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Everything you need to build, launch and grow great software, backed by a process you can see and trust.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* ── Left: Highlights Wheel (desktop) ── */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative w-full max-w-[540px] aspect-[540/620] mx-auto">
              <svg viewBox={`0 0 ${BOX_W} ${BOX_H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
                <path d={ARC_PATH} fill="none" stroke="#e8f1fb" strokeWidth="14" strokeLinecap="round" />
                {ANGLES.map((angle, i) => {
                  const from = polar(PILL_R, angle);
                  const to = polar(ARC_R, angle);
                  const isActive = i === active;
                  return (
                    <g key={angle}>
                      <line
                        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                        stroke={isActive ? '#005eb8' : '#e2e8f0'}
                        strokeWidth="2"
                        style={{ transition: 'stroke 0.3s' }}
                      />
                      <circle
                        cx={to.x} cy={to.y} r={isActive ? 9 : 7}
                        fill={isActive ? '#005eb8' : '#ffffff'}
                        stroke={isActive ? '#005eb8' : '#cbd5e1'}
                        strokeWidth="2"
                        style={{ transition: 'all 0.3s' }}
                      />
                    </g>
                  );
                })}
              </svg>

              {highlights.map((item, i) => {
                const pos = polar(PILL_R, ANGLES[i]);
                const isActive = i === active;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{ left: `${(pos.x / BOX_W) * 100}%`, top: `${(pos.y / BOX_H) * 100}%`, fontFamily: "'Open Sans', sans-serif" }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-[215px] h-[52px] flex items-center rounded-full text-left cursor-pointer transition-all duration-300 ${isActive
                      ? 'bg-[#005eb8] text-white shadow-[0_12px_28px_rgba(0,94,184,0.3)]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                      }`}
                  >
                    <span className={`w-[52px] h-[52px] shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-colors duration-300 ${isActive
                      ? 'bg-white text-[#005eb8] border-[#005eb8]'
                      : 'bg-white text-slate-700 border-slate-100'
                      }`}>
                      {item.value}
                    </span>
                    <span className="px-4 text-[15px] font-semibold leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Single Active Highlight (desktop) ── */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative min-h-[340px] flex flex-col justify-center lg:pl-6 xl:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative"
                >
                  <div className="text-[#005eb8] text-6xl xl:text-7xl font-black tracking-tight leading-none mb-4">
                    {current.value}
                  </div>
                  <h3 className="text-[#191919] text-2xl xl:text-3xl font-black tracking-tight mb-3">
                    {current.label}
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-md">{current.desc}</p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* ── Small screens: compact grid of all highlights ── */}
          <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-card border border-slate-200 p-4 sm:p-5 text-left">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-[#005eb8]/10 text-[#005eb8] flex items-center justify-center">
                      <Icon size={26} />
                    </div>
                    <div>
                      <div className="text-[28px] sm:text-3xl font-black text-[#191919] tracking-tight leading-none">{item.value}</div>
                      <div className="text-sm font-bold text-slate-600 mt-1.5">{item.label}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">{item.caption}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
