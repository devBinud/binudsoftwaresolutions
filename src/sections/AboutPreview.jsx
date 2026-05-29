import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const AboutPreview = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden select-none">
      {/* Container matches StatsSection layout constraints perfectly to guarantee pixel-perfect left-aligned symmetry */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Two-Column Corporate Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Left-Aligned Heading (Using #191919 color instead of harsh black) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            <h2 className="text-[#191919] text-3xl sm:text-[36px] lg:text-[40px] font-black leading-[1.15] tracking-tight font-sans">
              Top Web & Mobile Application Development, Custom Software Engineering & IT Consulting Company, Building Smart Solutions For A Smarter World.
            </h2>
            {/* Short clean horizontal divider in #191919 */}
            <div className="w-16 h-[3px] bg-[#191919] mt-8" />
          </motion.div>

          {/* Right Column: Narrative Block & Premium Circular About Link */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left lg:pt-2"
          >
            <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium mb-6">
              Founded in the year 2021, <strong className="text-[#191919] font-bold">Binud Software Solutions</strong> is 
              a leading Custom Software, Mobile App, and Web development agency helping global businesses 
              execute digital transformation. 
            </p>
            
            <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium mb-8">
              Being a true technological companion, we help startups and enterprise-level businesses 
              architect high-performance digital platforms to become recognized industry leaders.
            </p>

            {/* Circular outline right arrow About Link matching the mockup (Using #191919 for border & text) */}
            <Link
              to="/about"
              className="inline-flex items-center gap-4 group cursor-pointer w-fit"
            >
              {/* Circular Arrow button */}
              <div className="w-12 h-12 rounded-full border border-[#191919] flex items-center justify-center text-[#191919] group-hover:bg-[#191919] group-hover:text-white group-hover:scale-105 transition-all duration-300 shrink-0">
                <HiArrowRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
              </div>
              
              {/* Link Label */}
              <span className="text-[#191919] font-bold text-sm tracking-wide uppercase">
                About Us
              </span>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutPreview;
