import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiStar } from 'react-icons/hi';

const AUTO_DELAY = 5000;

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'CEO & Founder',
    company: 'ScaleTech Solutions',
    text: 'Binud Software Solutions transformed our business with a custom platform that exceeded all expectations. Their team is professional, responsive, and truly talented.',
  },
  {
    name: 'Ananya Patel',
    role: 'Product Director',
    company: 'AppFlow Technologies',
    text: 'The mobile app they built for us has over 10,000 active users. The quality of work and attention to detail is outstanding. I highly recommend Binud to anyone looking for a serious tech partner.',
  },
  {
    name: 'Arjun Das',
    role: 'Managing Director',
    company: 'Das Commerce Platform',
    text: 'Working with Binud was a game-changer. They delivered our e-commerce platform on time and within budget. Post-launch support has been exceptional every step of the way.',
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
};

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const navigate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_DELAY);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative py-16 md:py-24 bg-slate-50/60 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── Left Column: Section Header ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col text-left"
          >
            <span className="text-[#005eb8] text-xs font-black uppercase tracking-widest block mb-2">
              CLIENT STORIES
            </span>

            <h2 className="text-[#191919] text-3xl sm:text-[40px] font-black leading-tight tracking-tight font-sans mb-4">
              From our{' '}
              <span className="italic font-black text-slate-400">community.</span>
            </h2>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium max-w-sm mb-8">
              Here's what businesses we've partnered with had to say about working with Binud Software Solutions.
            </p>

            {/* Navigation Arrows (Sharp #005eb8 buttons) */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 bg-white border border-slate-200 text-[#005eb8] hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors rounded-none flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Previous testimonial"
              >
                <HiArrowLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 bg-[#005eb8] border border-[#005eb8] text-white hover:bg-[#00488e] transition-colors rounded-none flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Next testimonial"
              >
                <HiArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* ── Right Column: Testimonial Card ── */}
          <div className="lg:col-span-7 relative overflow-hidden bg-white border border-slate-200/90 shadow-sm p-8 sm:p-10 text-left">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex flex-col"
              >
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={18} />
                  ))}
                </div>

                {/* Quote Text (Refined smaller font size) */}
                <p className="text-slate-800 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-6 font-sans">
                  "{t.text}"
                </p>

                {/* Dashed Separator Line */}
                <div className="w-full border-t border-dashed border-slate-200 mb-6" />

                {/* Author Info (Clean text without rounded initials circle) */}
                <div>
                  <div className="text-[#191919] font-extrabold text-base sm:text-lg">
                    {t.name}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#005eb8]">
                    {t.role} <span className="text-slate-400 font-normal">| {t.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
