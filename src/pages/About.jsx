import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';

const About = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isBlog = queryParams.get('tab') === 'blog';

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {isBlog ? (
        /* Blog View */
        <>
          {/* Blog Hero Header */}
          <section className="relative pt-36 pb-16 bg-white overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3E4265] mb-5 tracking-tight leading-tight">
                  Our <span className="text-[#274e85]">Blog</span>
                </h1>
                <div className="w-16 h-[3px] bg-[#274e85] mb-6 rounded-full" />
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Insights, research papers, and technical guides from our elite software engineering team.
                </p>
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
                className="rounded-3xl p-[1px] bg-gradient-to-br from-[#274e85]/20 to-[#695dd3]/20 hover:from-[#274e85] hover:to-[#695dd3] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(39,78,133,0.12)] max-w-xl w-full group"
              >
                <div className="bg-white rounded-[23px] p-10 md:p-14 flex flex-col items-center justify-center relative overflow-hidden">

                  {/* Top status indicator badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-[#274e85] mb-8 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#274e85] animate-pulse" />
                    Under Construction
                  </div>

                  {/* Blog/Article Icon with pulse animation */}
                  <div className="w-20 h-20 rounded-2xl bg-[#274e85]/5 flex items-center justify-center text-[#274e85] mb-8 border border-[#274e85]/10 relative group-hover:scale-105 transition-all duration-300">
                    <svg className="w-9 h-9 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>

                  <h3 className="text-[#191919] font-black text-2xl md:text-3xl tracking-tight mb-4 select-none font-sans">
                    We are working on this page
                  </h3>

                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-sm">
                    We are currently preparing detailed technical articles, engineering tutorials, and industry insights from our dev team.
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
        </>
      ) : (
        /* About Us View */
        <>
          {/* Hero Header Section (utilizing the AboutPreview layout without the button) */}
          <section className="relative pt-36 pb-24 bg-white overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col text-left"
                >
                  <h1 className="text-[#3E4265] text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight">
                    Top Web & Mobile Application Development, Custom Software Engineering & IT Consulting Company,
                  </h1>
                  <p className="text-slate-400 text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight mt-0">
                    Building Smart Solutions For A Smarter World.
                  </p>
                  <div className="w-16 h-[3px] bg-[#274e85] mt-8 rounded-full" />
                </motion.div>

                {/* Right Column: Narrative Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex flex-col text-left lg:pt-2"
                >
                  <p className="text-slate-500 text-base md:text-[17px] leading-relaxed font-medium mb-6">
                    Founded in the year 2021, <strong className="text-[#3E4265] font-bold">Binud Software Solutions</strong> is
                    a leading Custom Software, Mobile App, and Web development agency helping global businesses
                    execute digital transformation.
                  </p>

                  <p className="text-slate-500 text-base md:text-[17px] leading-relaxed font-medium">
                    Being a true technological companion, we help startups and enterprise-level businesses
                    architect high-performance digital platforms to become recognized industry leaders.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Vision & Mission Section (TechVariable Minimal Style) */}
          <section className="py-20 md:py-28 bg-white select-none border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
              
              {/* Centered Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#695dd3] bg-white border border-[#695dd3]/30 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#695dd3]" />
                Purpose &amp; Focus
              </div>

              {/* Headline */}
              <h2 className="text-[#191919] text-3xl sm:text-[40px] font-black leading-tight tracking-tight font-sans mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#695dd3] to-[#8075e3]">Vision &amp; Mission</span>
              </h2>

              {/* Subtitle */}
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-20">
                We align our engineering principles with your business goals, ensuring every line of code we write translates to scalable, long-term success.
              </p>

              {/* Grid Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 max-w-4xl mx-auto text-left">
                
                {/* Column 1: Our Mission */}
                <div className="flex flex-col items-start pr-0 md:pr-12">
                  {/* Circular Icon Container */}
                  <div className="w-12 h-12 rounded-full border border-[#695dd3]/20 bg-[#695dd3]/5 flex items-center justify-center text-[#695dd3] mb-6">
                    {/* Rocket Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699-2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-[#191919] font-black text-xl mb-3 font-sans tracking-tight">
                    Our Mission
                  </h3>
                  
                  <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                    To build robust, scalable, and high-performance digital products that empower startups and enterprise businesses to innovate, execute, and lead in a rapidly evolving technological landscape.
                  </p>
                </div>

                {/* Column 2: Our Vision */}
                <div className="flex flex-col items-start pt-8 md:pt-0 md:pl-16 border-t md:border-t-0 md:border-l border-slate-100">
                  {/* Circular Icon Container */}
                  <div className="w-12 h-12 rounded-full border border-[#274e85]/20 bg-[#274e85]/5 flex items-center justify-center text-[#274e85] mb-6">
                    {/* Eye Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-[#191919] font-black text-xl mb-3 font-sans tracking-tight">
                    Our Vision
                  </h3>
                  
                  <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                    To be a global benchmark for engineering excellence, trusted for designing smart, future-proof software architectures that drive positive business outcomes and meaningful societal impact.
                  </p>
                </div>

              </div>
            </div>
          </section>

        </>
      )}

      {/* Stay Connected & Founder Section */}
      <ConnectSection hideForm={true} />

      <Footer />
    </div>
  );
};

export default About;
