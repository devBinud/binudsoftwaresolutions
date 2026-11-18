import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNodedotjs, SiFlutter, SiFirebase, SiOpenai } from 'react-icons/si';
import { FaAws, FaWhatsapp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiArrowRight } from 'react-icons/fi';
import heroImage from '../assets/hero-team.webp';

/* Text that cycles inside the outlined tag above the headline */
const tagWords = [
  'Custom Software Development',
  'Web Development',
  'Mobile App Development',
  'AI & Automation',
  'Hire Dedicated Developers',
];

/* Round badges under the buttons */
const stack = [
  { name: 'React', icon: SiReact, color: '#149eca' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
  { name: 'Flutter', icon: SiFlutter, color: '#0468d7' },
  { name: 'Firebase', icon: SiFirebase, color: '#f58220' },
  { name: 'AWS', icon: FaAws, color: '#232f3e' },
  { name: 'OpenAI', icon: SiOpenai, color: '#0b1b2b' },
];

const GOOGLE_URL = 'https://www.google.com/search?q=Binud+Software+Solutions';
const WHATSAPP_URL = 'https://wa.me/919706393924';

/* Shared size for the three tiles in the action row */
const tile =
  'h-[66px] w-full sm:w-[216px] rounded-[10px] flex items-center justify-center gap-3.5 transition-[background-color,border-color,color] duration-300 ease-in-out';

const HeroSection = () => {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setWordIndex((i) => (i + 1) % tagWords.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-sky font-sans">
      {/* Photo on the right, fading into the light-blue background (large screens) */}
      <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[55%]">
        <img
          src={heroImage}
          alt=""
          width={1400}
          height={960}
          fetchpriority="high"
          className="w-full h-full object-cover object-[72%_center] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_18%,rgba(0,0,0,0.85)_38%,black_55%)]"
        />
        {/* Soft blue wash and a faint tech grid over the photo's left edge, like a light haze */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky via-sky/30 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-dot-grid opacity-40 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 pb-12 md:pt-14 md:pb-16 lg:min-h-[min(calc(100vh-5rem),720px)] lg:flex lg:items-center">
        <div className="w-full lg:max-w-[760px]">
          {/* Rotating outlined tag */}
          <motion.p
            {...rise(0)}
            className="relative inline-flex items-center h-11 sm:h-12 px-4 sm:px-5 rounded-[6px] border border-[#9fd3ea] bg-[#e4f4fc] text-primary text-lg sm:text-[26px] font-medium !leading-none overflow-hidden"
          >
            <span className="sr-only">Custom software development company</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={wordIndex}
                aria-hidden="true"
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45 }}
                className="whitespace-nowrap"
              >
                {tagWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* Two-line headline */}
          <motion.h1
            id="hero-heading"
            {...rise(0.06)}
            className="mt-6 font-semibold tracking-[-0.015em] leading-[1.22] text-[30px] sm:text-[36px] xl:text-[40px]"
          >
            <span className="text-gradient lg:whitespace-nowrap">Software, Apps &amp; AI Solutions</span>
            <br />
            <span className="text-ink lg:whitespace-nowrap">That Move Your Business Forward</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-5 text-[#1f2f3d] !text-[16px] sm:!text-[17.5px] !leading-[1.8] max-w-[730px]"
          >
            From web platforms and mobile apps to AI-powered automation, we help businesses modernise
            operations, delight their customers and grow faster. Since 2021, our engineers have been
            delivering tailored, reliable software for clients in India and around the world.
          </motion.p>

          {/* Action row: WhatsApp card · Let's Talk · Google card */}
          <motion.div {...rise(0.18)} className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tile} bg-white border border-[#cfd8de] hover:bg-[#effcf4] hover:border-[#25d366]`}
            >
              <FaWhatsapp size={34} className="text-[#25d366] shrink-0" aria-hidden="true" />
              <span className="flex flex-col text-left leading-none">
                <span className="text-[15px] font-semibold text-ink">Chat With Us</span>
                <span className="mt-1.5 text-[12px] font-medium tracking-[0.12em] uppercase text-muted">On WhatsApp</span>
              </span>
            </a>

            <Link
              to="/contact"
              className={`${tile} order-first sm:order-none bg-primary text-white text-lg font-semibold hover:bg-primary-dark`}
            >
              Let&apos;s Talk
              <FiArrowRight size={20} aria-hidden="true" />
            </Link>

            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tile} bg-white border border-[#cfd8de] hover:bg-[#eef4ff] hover:border-[#4285f4]`}
            >
              <FcGoogle size={38} className="shrink-0" aria-hidden="true" />
              <span className="flex flex-col text-left leading-none">
                <span className="text-[15px] font-semibold text-ink">Find Us on Google</span>
                <span className="mt-1.5 text-[12px] font-medium tracking-[0.12em] uppercase text-muted">Business Profile</span>
              </span>
            </a>
          </motion.div>

          {/* Large round technology badges */}
          <motion.ul
            {...rise(0.26)}
            aria-label="Technologies we build with"
            className="mt-10 md:mt-12 flex flex-wrap gap-4 sm:gap-5"
          >
            {stack.map(({ name, icon: Icon, color }) => (
              <li key={name} title={name}>
                <span className="w-[68px] h-[68px] sm:w-[86px] sm:h-[86px] rounded-full bg-white border-[3px] border-[#d6ecf6] ring-1 ring-[#bfe2f2] ring-offset-2 ring-offset-sky flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }} aria-hidden="true" />
                  <span className="sr-only">{name}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Photo for phones and tablets */}
      <div className="lg:hidden px-4 sm:px-6 md:px-12 pb-12">
        <img
          src={heroImage}
          alt="Software developers collaborating at their workstations"
          width={1400}
          height={960}
          className="w-full aspect-[16/10] object-cover object-[70%_center] rounded-[var(--radius-card)]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
