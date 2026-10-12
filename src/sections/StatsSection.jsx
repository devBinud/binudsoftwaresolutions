import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';

const stats = [
  {
    value: 50,
    label: 'Projects Delivered',
    desc: 'Web, mobile and AI solutions taken from idea to production.',
  },
  {
    value: 5,
    label: 'Years of Experience',
    desc: 'Building reliable, scalable software since 2021.',
  },
  {
    value: 30,
    label: 'Happy Clients',
    desc: 'Startups and businesses that trust us with their technology.',
  },
];

/* Counts up from 0 to `to` the first time it scrolls into view. */
const CountUp = ({ to, duration = 1.6 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{value}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="pt-14 md:pt-20 pb-2 md:pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-card bg-[#092c4c] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
        >
          {/* Ambient glows */}
          <div className="absolute -top-40 -left-32 w-[460px] h-[460px] rounded-full bg-[#005eb8]/50 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-48 -right-24 w-[480px] h-[480px] rounded-full bg-[#5b5bd6]/25 blur-[130px] pointer-events-none" />

          {/* Faint grid texture, fading out towards the edges */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* ── Intro ── */}
            <div className="lg:col-span-4 text-left">
              <h2 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-4">
                Numbers that speak for our work
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Every project, client and year of experience has shaped how we build dependable software today.
              </p>
            </div>

            {/* ── Stats ── */}
            <div className="lg:col-span-8 grid grid-cols-3 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 sm:px-6 lg:px-8 sm:first:pl-0 lg:first:pl-8 text-center sm:text-left">
                  <div className="text-[40px] sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white">
                    <CountUp to={stat.value} />
                    <span className="text-[#f8c543]">+</span>
                  </div>
                  <div className="mt-3 sm:mt-4 text-[13px] sm:text-base font-bold text-white leading-snug">
                    {stat.label}
                  </div>
                  <div className="hidden md:block mt-2 text-sm text-slate-400 leading-relaxed">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
