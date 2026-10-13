import { motion } from 'framer-motion';
import ArrowButton from '../components/ArrowButton';

const AboutPreview = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Same container width and padding as the other home sections, so content lines up */}
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
              Top Web & Mobile Application Development, Custom Software Engineering & IT Consulting Company,
            </h2>
            <p className="text-slate-400 text-3xl sm:text-[36px] lg:text-[40px] font-black leading-[1.15] tracking-tight font-sans mt-0">
              Building Smart Solutions For A Smarter World.
            </p>
          </motion.div>

          {/* Right Column: Narrative Block & About Us button */}
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

            <ArrowButton to="/about" className="w-fit self-start">About Us</ArrowButton>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutPreview;
