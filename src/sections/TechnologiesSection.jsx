import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { TECH_GROUPS } from '../data/technologies';

/* Turn a hex colour into a soft tinted background for the icon tile */
const tint = (hex, alpha = 0.1) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const TechnologiesSection = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  /* WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to the ends */
  const onKeyDown = (e) => {
    const last = TECH_GROUPS.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const group = TECH_GROUPS[active];

  return (
    <section aria-labelledby="tech-heading" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 id="tech-heading" className="section-title text-center">
          Core Technologies Behind Our Work
        </h2>

        {/* Pill tabs (scroll sideways on small screens) */}
        <div className="mt-8 md:mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Technology categories"
            onKeyDown={onKeyDown}
            className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:[mask-image:none]"
          >
            {TECH_GROUPS.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.name}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`tech-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="tech-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[15px] sm:text-[17px] font-medium whitespace-nowrap transition-colors duration-300 ease-in-out cursor-pointer ${
                    selected ? 'bg-primary text-white ' : 'text-ink hover:bg-sky hover:text-primary'
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Icon tiles */}
        <div
          id="tech-panel"
          role="tabpanel"
          aria-labelledby={`tech-tab-${active}`}
          tabIndex={0}
          className="mt-10 md:mt-12 min-h-[150px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={group.name}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap justify-center gap-x-5 gap-y-7 sm:gap-x-7"
            >
              {group.items.map(({ name, icon: Icon, color }) => (
                <li key={name} className="group w-[84px] sm:w-[92px] flex flex-col items-center gap-3">
                  <span
                    className="w-[76px] h-[76px] sm:w-[90px] sm:h-[90px] rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: tint(color === '#000000' || color === '#0b1b2b' ? '#64748b' : color) }}
                  >
                    <Icon className="w-9 h-9 sm:w-11 sm:h-11" style={{ color }} aria-hidden="true" />
                  </span>
                  <span className="text-center text-[14px] sm:text-[15px] font-medium text-ink leading-tight">{name}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
