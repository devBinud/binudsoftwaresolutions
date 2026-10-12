import { motion } from 'framer-motion';
import ArrowButton from '../components/ArrowButton';

const CTASection = () => {
  return (
    <section className="bg-white py-12 md:py-16 font-sans w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-left"
        >
          {/* Left Text */}
          <div className="max-w-2xl">
            <h3 className="text-[#191919] text-2xl md:text-3xl font-black tracking-tight mb-2.5 font-sans">
              Let's Discuss Your Business Needs
            </h3>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
              Tell us what you're looking to achieve. We'll help you evaluate your options, identify potential risks, and recommend the most effective next steps.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="w-full md:w-auto shrink-0">
            <ArrowButton to="/contact" size="lg" className="w-full md:w-auto justify-between">
              Schedule a 30-Minute Call
            </ArrowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
