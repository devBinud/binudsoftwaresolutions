import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ArrowButton from '../components/ArrowButton';

/* Tiled rounded-square pattern for the background (slightly lighter than the base colour) */
const tilePattern =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Crect x='3' y='3' width='28' height='28' rx='8' fill='%23ffffff' fill-opacity='0.06'/%3E%3C/svg%3E\")";

const ConsultationBanner = () => {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="consult-heading"
      className="relative overflow-hidden bg-[#0d5a7e]"
      style={{ backgroundImage: tilePattern }}
    >
      {/* Soft darkening at the edges so the pattern fades out, like a vignette */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_50%,transparent_40%,rgba(6,36,58,0.45)_100%)]" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 lg:py-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10"
      >
        <div className="flex-1 text-center lg:text-left">
          <h2
            id="consult-heading"
            className="text-white text-[26px] md:text-[32px] font-semibold leading-tight tracking-[-0.01em]"
          >
            Looking for a Reliable Development Partner?
          </h2>
          <p className="mt-4 text-white/90 !text-[16px] sm:!text-[17px]">
            Design, build, automate and scale — your technology partner at every stage.
          </p>
        </div>

        <span aria-hidden="true" className="hidden lg:block self-stretch min-h-[140px] border-l-2 border-dashed border-white/80" />

        <div className="flex justify-center lg:block shrink-0 lg:pl-6">
          <ArrowButton to="/contact" variant="white" icon={FiArrowRight}>
            Book a Consultation
          </ArrowButton>
        </div>
      </motion.div>
    </section>
  );
};

export default ConsultationBanner;
