import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    text: 'Binud Software Solutions transformed our business with a custom platform that exceeded all expectations. Their team is professional, responsive, and truly talented.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder, HealthPlus',
    text: 'The mobile app they built for us has over 10,000 active users. The quality of work and attention to detail is outstanding. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, RetailMax',
    text: 'Working with Binud was a game-changer. They delivered our e-commerce platform on time and within budget. Post-launch support has been exceptional.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="badge mb-3">Testimonials</span>
          <h2 className="section-title mb-3">What Our Clients Say</h2>
          <p className="section-sub mx-auto">
            Don't just take our word for it — hear from the businesses we have helped grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 relative"
            >
              <FaQuoteRight size={20} className="text-[#005d9e] opacity-20 absolute top-5 right-5" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FaStar key={j} size={13} className="text-amber-400" />
                ))}
              </div>

              <p className="text-[#475569] text-sm leading-relaxed mb-5">{t.text}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#005d9e] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[#0f172a] font-semibold text-sm">{t.name}</div>
                  <div className="text-[#94a3b8] text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
