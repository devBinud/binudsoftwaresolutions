import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import {
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  HiOutlineCpuChip,
  HiOutlineClock,
  HiOutlineTrophy,
  HiOutlineFaceSmile,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import ArrowButton from '../components/ArrowButton';
import { STATS } from '../data/stats';

const icons = {
  rocket: { icon: HiOutlineRocketLaunch, color: '#12a4a0' },
  users: { icon: HiOutlineUserGroup, color: '#e0457b' },
  grid: { icon: HiOutlineSquares2X2, color: '#6d5bd0' },
  chip: { icon: HiOutlineCpuChip, color: '#f07a3a' },
  clock: { icon: HiOutlineClock, color: '#6d5bd0' },
  award: { icon: HiOutlineTrophy, color: '#3b82f6' },
  smile: { icon: HiOutlineFaceSmile, color: '#e0457b' },
  globe: { icon: HiOutlineGlobeAlt, color: '#12a4a0' },
};

const reasons = [
  'Strong technical expertise across web, mobile & AI',
  'Transparent, milestone-based project management',
  'Direct communication with the founder',
  'Quality-first delivery with clear timelines',
  'Flexible engagement to fit your budget',
];

/* Number that counts up from 0 the first time it scrolls into view */
const CountUp = ({ value, countUp = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const skip = reduce || countUp === false;
  const [display, setDisplay] = useState(skip ? value : 0);

  useEffect(() => {
    if (skip || !inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, skip, value]);

  return <span ref={ref}>{skip ? value : display}</span>;
};

const StatCard = ({ stat }) => {
  const { icon: Icon, color } = icons[stat.icon] || icons.rocket;
  return (
    <div className="relative bg-white border border-[#c9dbe4] rounded-[var(--radius-card)] p-6 sm:p-7">
      <Icon size={34} style={{ color }} aria-hidden="true" className="absolute top-6 right-6" />
      <p className="text-[#1e9e57] font-bold tracking-tight !leading-none !text-[2.4rem] sm:!text-[2.6rem]">
        {stat.prefix}
        <CountUp value={stat.value} countUp={stat.countUp} />
        {stat.suffix}
      </p>
      <p className="mt-4 !text-[17px] sm:!text-[18px] font-semibold text-ink !leading-snug">{stat.label}</p>
    </div>
  );
};

const WhyChooseSection = () => {
  const reduce = useReducedMotion();
  const left = STATS.filter((_, i) => i % 2 === 0);
  const right = STATS.filter((_, i) => i % 2 === 1);

  const reveal = (x) => ({
    initial: reduce ? false : { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section aria-labelledby="why-heading" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* Copy */}
        <motion.div {...reveal(-24)}>
          <h2 id="why-heading" className="section-title">
            Why Choose Binud Software Solutions?
          </h2>
          <p className="mt-6 text-[#1f2f3d] !text-[16px] sm:!text-[17px] !leading-[1.8]">
            Binud Software Solutions is a software engineering partner specialising in web, mobile and AI
            development. Founded in 2021 in Guwahati, Assam, we build custom products — from business
            websites to full-scale platforms and automation systems.
          </p>
          <p className="mt-4 text-[#1f2f3d] !text-[16px] sm:!text-[17px] !leading-[1.8]">
            From early-stage startups to established businesses, we work closely with every client, keeping
            the focus on quality, clear communication and software that keeps working long after launch.
          </p>

          <ul className="mt-7 grid gap-3.5">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 !text-[16px] sm:!text-[17px] !leading-snug text-ink">
                <HiCheckCircle size={26} className="text-accent shrink-0 -mt-0.5" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ArrowButton to="/contact" variant="solid">Talk to Us</ArrowButton>
            <ArrowButton to="/about" variant="link">About Our Company</ArrowButton>
          </div>
        </motion.div>

        {/* Stat cards: two staggered columns (right column sits higher, like a masonry layout) */}
        <motion.div {...reveal(24)} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:pl-8">
          <div className="flex flex-col gap-5 sm:gap-6 sm:pt-20">
            {left.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            {right.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
