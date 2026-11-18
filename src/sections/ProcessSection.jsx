import { motion, useReducedMotion } from 'framer-motion';
import {
  HiOutlineClipboardDocumentList,
  HiOutlinePencilSquare,
  HiOutlineCodeBracketSquare,
  HiOutlineBugAnt,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';

const steps = [
  {
    title: 'Requirements Analysis',
    icon: HiOutlineClipboardDocumentList,
    color: '#f26b1d',
    desc: 'We understand your goals and users, then define the scope, budget and product roadmap.',
  },
  {
    title: 'UI/UX Design',
    icon: HiOutlinePencilSquare,
    color: '#6d4ae0',
    desc: 'Wireframes and polished interfaces that make your product clear and enjoyable to use.',
  },
  {
    title: 'Development Process',
    icon: HiOutlineCodeBracketSquare,
    color: '#e2369a',
    desc: 'Scalable architecture and clean code built in agile sprints with regular demos.',
  },
  {
    title: 'QA & Testing',
    icon: HiOutlineBugAnt,
    color: '#2fa84f',
    desc: 'Thorough manual and automated testing so every release is stable and reliable.',
  },
  {
    title: 'Delivery & Launch',
    icon: HiOutlineRocketLaunch,
    color: '#1fb0cf',
    desc: 'Smooth deployment to your chosen platforms, followed by ongoing support.',
  },
];

/* Pointy-top hexagon with an outer outline ring, in the step's colour */
const Hexagon = ({ color, icon: Icon, className = '' }) => (
  <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
    <svg viewBox="0 0 120 136" className="absolute inset-0 w-full h-full" aria-hidden="true" focusable="false">
      <polygon points="60,3 116,35.5 116,100.5 60,133 4,100.5 4,35.5" fill="#ffffff" stroke={color} strokeOpacity="0.55" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="60,16 104.5,42 104.5,94 60,120 15.5,94 15.5,42" fill={color} stroke={color} strokeWidth="7" strokeLinejoin="round" />
    </svg>
    <Icon aria-hidden="true" className="relative w-[38%] h-[38%] text-white" />
  </span>
);

/* Large outlined step number */
const StepNumber = ({ n, className = '' }) => (
  <span
    aria-hidden="true"
    className={`font-semibold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.4px_#0b1b2b] ${className}`}
  >
    {String(n).padStart(2, '0')}
  </span>
);

const ProcessSection = () => {
  const reduce = useReducedMotion();
  const rise = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section aria-labelledby="process-heading" className="relative py-16 md:py-24 bg-sky overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 id="process-heading" className="section-title text-center">
          Our End-to-End Development Workflow
        </h2>
      </div>

      {/* ── Desktop: horizontal timeline with a full-width line ── */}
      <div className="relative hidden lg:block mt-10">
        {/* The line sits 76px from the top: right under the numbers */}
        <span aria-hidden="true" className="absolute left-0 right-0 top-[76px] h-px bg-ink" />

        <ol className="relative max-w-7xl mx-auto px-12 grid grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.li key={step.title} {...rise(i)} className="flex flex-col items-center text-center">
              <span className="h-[76px] flex items-end pb-3">
                <StepNumber n={i + 1} className="text-[46px]" />
              </span>
              <span aria-hidden="true" className="w-px h-9 bg-ink" />
              <Hexagon color={step.color} icon={step.icon} className="w-[108px] h-[122px] transition-transform duration-300 hover:-translate-y-1" />
              <h3 className="mt-6 max-w-[170px] min-h-[2.9em] text-[19px] font-semibold text-ink leading-[1.45]">{step.title}</h3>
              <p className="mt-4 max-w-[230px] !text-[15px] !leading-[1.95] text-[#1f2f3d]">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ── Phones & tablets: vertical timeline ── */}
      <ol className="relative lg:hidden max-w-2xl mx-auto px-4 sm:px-6 mt-10">
        {/* Vertical line through the hexagon centres */}
        <span aria-hidden="true" className="absolute top-10 bottom-10 left-[calc(1rem+38px)] sm:left-[calc(1.5rem+38px)] w-px bg-ink/70" />

        {steps.map((step, i) => (
          <motion.li key={step.title} {...rise(i)} className="relative flex gap-5 pb-9 last:pb-0">
            <Hexagon color={step.color} icon={step.icon} className="w-[76px] h-[86px]" />
            <div className="pt-1.5">
              <StepNumber n={i + 1} className="text-[30px]" />
              <h3 className="mt-1.5 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 !text-[15px] !leading-[1.75] text-[#1f2f3d]">{step.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};

export default ProcessSection;
