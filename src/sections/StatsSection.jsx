import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '50+', label: 'Projects Delivered', desc: 'Across various industries' },
  { value: '30+', label: 'Happy Clients', desc: 'Worldwide partnerships' },
  { value: '5+', label: 'Years Experience', desc: 'In software development' },
  { value: '99%', label: 'Satisfaction Rate', desc: 'Client retention score' },
];

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-[#f8fafc] border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#005d9e] mb-1">{stat.value}</div>
              <div className="text-[#0f172a] font-semibold text-sm mb-0.5">{stat.label}</div>
              <div className="text-[#94a3b8] text-xs">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
