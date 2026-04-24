import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { FaBolt, FaShieldAlt, FaHeadset, FaMedal } from 'react-icons/fa';

const reasons = [
  { icon: FaBolt, title: 'Fast Delivery', desc: 'Agile methodology ensures on-time delivery without compromising quality.' },
  { icon: FaMedal, title: 'Quality Assured', desc: 'Rigorous testing and code reviews ensure every product is production-ready.' },
  { icon: FaShieldAlt, title: 'Secure by Default', desc: 'Security is baked into every layer — from architecture to deployment.' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'Our team is always available post-launch with maintenance and updates.' },
];

const points = [
  'Client-first approach in everything we do',
  'Transparent pricing with no hidden costs',
  'Dedicated team assigned to your project',
  'Regular updates and clear communication',
  'Post-launch support and maintenance',
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="badge mb-3">Why Choose Us</span>
            <h2 className="section-title mb-4">
              We Don't Just Build Software,<br />
              We Build <span className="text-[#005d9e]">Partnerships</span>
            </h2>
            <p className="text-[#64748b] leading-relaxed mb-7">
              At Binud Software Solutions, we take the time to understand your business, your goals,
              and your challenges — then craft solutions that truly make a difference.
            </p>
            <ul className="space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[#475569] text-sm">
                  <HiCheckCircle className="text-[#005d9e] shrink-0" size={18} />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8f2fb] flex items-center justify-center mb-3">
                  <reason.icon size={17} className="text-[#005d9e]" />
                </div>
                <h4 className="text-[#0f172a] font-semibold text-sm mb-1.5">{reason.title}</h4>
                <p className="text-[#64748b] text-xs leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
