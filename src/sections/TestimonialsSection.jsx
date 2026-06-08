import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const AUTO_DELAY = 4000;

const testimonials = [
  {
    name: 'Rahul Sharma',
    text: 'Binud Software Solutions transformed our business with a custom platform that exceeded all expectations. Their team is professional, responsive, and truly talented.',
    initials: 'RS',
    color: '#191919',
  },
  {
    name: 'Ananya Patel',
    text: 'The mobile app they built for us has over 10,000 active users. The quality of work and attention to detail is outstanding. I highly recommend Binud to anyone looking for a serious tech partner.',
    initials: 'AP',
    color: '#274e85',
  },
  {
    name: 'Arjun Das',
    text: 'Working with Binud was a game-changer. They delivered our e-commerce platform on time and within budget. Post-launch support has been exceptional every step of the way.',
    initials: 'AD',
    color: '#1a6b3c',
  },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const navigate = (dir) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_DELAY);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            <p className="text-[#191919] text-base font-semibold tracking-widest uppercase mb-4">
              Client Stories
            </p>

            <h2 className="text-[#191919] text-4xl sm:text-[44px] lg:text-[52px] font-black leading-[1.1] tracking-tight font-sans mb-6">
              From our{' '}
              <span className="italic font-black text-slate-400">community.</span>
            </h2>

            <p className="text-slate-500 text-base md:text-[17px] leading-relaxed font-medium max-w-xs mb-10">
              Here's what businesses we've partnered with had to say about working with Binud Software Solutions.
            </p>

            {/* Prev / Next arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-full border border-[#191919] flex items-center justify-center text-[#191919] hover:bg-[#191919] hover:text-white hover:scale-105 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <HiArrowLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-12 h-12 rounded-full border border-[#191919] flex items-center justify-center text-[#191919] hover:bg-[#191919] hover:text-white hover:scale-105 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <HiArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* ── Right Column: Quote Slider ── */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col"
              >
                {/* Large opening quote mark */}
                <span
                  className="text-[#E5E5E5] font-black leading-none mb-2 select-none"
                  style={{ fontSize: '5rem', lineHeight: 1 }}
                >
                  &#8220;
                </span>

                {/* Quote text */}
                <p className="text-[#3E4265] text-xl sm:text-[26px] lg:text-[28px] font-semibold leading-[1.4] tracking-tight mb-8">
                  {t.text}
                </p>

                {/* Divider */}
                <div className="w-12 h-[2px] bg-slate-200 mb-6" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-black shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[#191919] font-bold text-base">{t.name}</div>
                    <div className="text-slate-400 text-sm">{t.role}</div>
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
