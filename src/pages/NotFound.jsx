import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArrowButton from '../components/ArrowButton';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col justify-between">
      <SEOHead
        title="404 - Page Not Found | Binud Software Solutions"
        description="The page you are looking for does not exist or has been moved."
        noIndex={true}
      />
      <Navbar />

      {/* Main Content with generous top and bottom padding accounting for fixed navbar */}
      <main className="flex-1 flex flex-col items-center justify-center pt-36 pb-28 md:pt-44 md:pb-36 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#005eb8]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10 w-full">
          {/* 404 Big Hero Typography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 select-none"
          >
            <h1 className="text-8xl sm:text-9xl md:text-[140px] font-black tracking-tight text-[#005eb8] leading-none">
              404
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 max-w-lg mx-auto"
          >
            <h2 className="text-[#191919] text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-sans">
              Page Not Found
            </h2>
          </motion.div>

          {/* Action Navigation Buttons - Single Line on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto px-2"
          >
            <ArrowButton to="/" variant="solid" className="justify-between">Back to Home</ArrowButton>
            <ArrowButton to="/contact" className="justify-between">Contact Us</ArrowButton>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
