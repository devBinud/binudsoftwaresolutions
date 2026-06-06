import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';

const Portfolio = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isCaseStudies = queryParams.get('tab') === 'case-studies';

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-16 bg-white overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            {isCaseStudies ? (
              <>
                <h1 className="text-3xl sm:text-[42px] lg:text-[48px] font-black text-[#191919] leading-[1.15] tracking-tight mb-4 max-w-4xl">
                  Real-World Success Stories
                </h1>
                <p className="text-slate-400 text-3xl sm:text-[42px] lg:text-[48px] font-black leading-[1.15] tracking-tight mt-0 mb-6 max-w-4xl">
                  and Engineering Milestones!
                </p>
                <div className="w-16 h-[3px] bg-[#274e85] mb-8 rounded-full" />
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Discover how we architect complex digital solutions, resolve critical business problems, and scale infrastructure to support global growth.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-[42px] lg:text-[48px] font-black text-[#191919] leading-[1.15] tracking-tight mb-4 max-w-4xl">
                  Top-Notch Engineered Projects
                </h1>
                <p className="text-slate-400 text-3xl sm:text-[42px] lg:text-[48px] font-black leading-[1.15] tracking-tight mt-0 mb-6 max-w-4xl">
                  for Startups &amp; Enterprises!
                </p>
                <div className="w-16 h-[3px] bg-[#274e85] mb-8 rounded-full" />
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  A showcase of premium software applications, custom engineering, and smart digital systems we've built for scale and performance.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Placeholder Grid Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#274e85]/5 rounded-full blur-[120px] pointer-events-none select-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
            className="rounded-3xl p-[1px] bg-gradient-to-br from-[#274e85]/20 to-[#695dd3]/20 hover:from-[#274e85] hover:to-[#695dd3] transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(39,78,133,0.12)] max-w-xl w-full group"
          >
            <div className="bg-white rounded-[23px] p-10 md:p-14 flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* Top status indicator badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-[#274e85] mb-8 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#274e85] animate-pulse" />
                Under Construction
              </div>

              {/* Engineering Gear Icon with rotating animation */}
              <div className="w-20 h-20 rounded-2xl bg-[#274e85]/5 flex items-center justify-center text-[#274e85] mb-8 border border-[#274e85]/10 relative group-hover:scale-105 transition-all duration-300">
                <svg className="w-9 h-9 animate-[spin_12s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-[#191919] font-black text-2xl md:text-3xl tracking-tight mb-4 select-none font-sans">
                We are working on this page
              </h3>
              
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-sm">
                {isCaseStudies 
                  ? "We are currently preparing detailed success stories, architectural insights, and case studies of our premium software systems."
                  : "We are actively updating this section with a showcase of our custom engineering projects, enterprise solutions, and web systems."
                }
              </p>

              {/* Action Button */}
              <Link
                to="/"
                className="bg-[#274e85] hover:bg-[#1d3d6b] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full shadow-[0_4px_18px_rgba(39,78,133,0.2)] hover:shadow-[0_6px_24px_rgba(39,78,133,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Go Back Home
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Stay Connected Section */}
      <ConnectSection onlySocials={true} />

      <Footer />
    </div>
  );
};

export default Portfolio;
