import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerBgImage from '../assets/bg1.jpg';
import binudAvatar from '../assets/team/binud.png';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const About = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isBlog = queryParams.get('tab') === 'blog';

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={bannerBgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-35" 
          />
          {/* Solid gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10 text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            {isBlog ? 'Our Blog' : 'About Us'}
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {isBlog ? (
              <>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <span>/</span>
                <span className="text-white">Blog</span>
              </>
            ) : (
              <span className="text-white">About Us</span>
            )}
          </nav>
        </div>
      </section>

      {isBlog ? (
        /* Blog View */
        <>
          {/* Blog Introduction Header */}
          <section className="relative pt-16 pb-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col text-left"
              >
                <h2 className="text-[#3E4265] text-2xl md:text-3xl font-black mb-3 tracking-tight leading-tight">
                  Insights &amp; Engineering Perspectives
                </h2>
                <div className="w-16 h-[3px] bg-[#005eb8] mb-6 rounded-full" />
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Insights, research papers, and technical guides from our elite software engineering team.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Placeholder Grid Section */}
          <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-200 p-10 md:p-14 flex flex-col items-center justify-center max-w-xl w-full"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-[#005eb8] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005eb8] animate-pulse" />
                  Under Construction
                </div>

                <h3 className="text-[#191919] font-black text-2xl md:text-3xl tracking-tight mb-4 font-sans">
                  We are working on this page
                </h3>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-sm">
                  We are currently preparing detailed technical articles, engineering tutorials, and industry insights from our dev team.
                </p>

                <Link
                  to="/"
                  className="bg-[#005eb8] hover:bg-[#00488e] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-none transition-all duration-300"
                >
                  Go Back Home
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      ) : (
        /* About Us View */
        <>
          {/* Hero Header Section */}
          <section className="relative pt-16 pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col text-left"
                >
                  <h1 className="text-[#191919] text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight font-sans">
                    Top Web &amp; Mobile Application Development, Custom Software Engineering &amp; IT Consulting Company,
                  </h1>
                  <p className="text-slate-400 text-3xl sm:text-[38px] lg:text-[42px] font-black leading-[1.15] tracking-tight mt-0 font-sans">
                    Building Smart Solutions For A Smarter World.
                  </p>
                </motion.div>

                {/* Right Column: Narrative Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex flex-col text-left lg:pt-2"
                >
                  <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium mb-6">
                    Founded in the year 2021, <strong className="text-[#191919] font-bold">Binud Software Solutions</strong> is
                    a leading Custom Software, Mobile App, and Web development agency helping global businesses
                    execute digital transformation.
                  </p>

                  <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium">
                    Being a true technological companion, we help startups and enterprise-level businesses
                    architect high-performance digital platforms to become recognized industry leaders.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Founder's Vision Section ── */}
          <section className="py-20 md:py-28 bg-[#f8fafc] border-t border-slate-200/80 overflow-hidden text-left relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Column: Vision Statement */}
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-7 flex flex-col"
                >
                  <span className="inline-block px-3 py-1.5 rounded-none text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4 w-fit">
                    Founder's Vision
                  </span>

                  <h2 className="text-[#191919] text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight tracking-tight font-sans mb-6">
                    We don't just ship features, <br />
                    we shape your digital future
                  </h2>

                  <div className="border-l-4 border-[#005eb8] pl-6 py-2 mb-8 bg-white/60 p-4 border-r border-y border-slate-200/60">
                    <p className="text-slate-600 italic text-base sm:text-lg leading-relaxed font-medium">
                      "We believe in writing clean code that stands the test of time, designing architectures that scale infinitely, and building relationships based on absolute trust. Our mission is to convert complex challenges into scalable, elegant technology solutions that drive real business growth."
                    </p>
                  </div>

                  <div className="text-2xl font-black text-[#005eb8] font-sans tracking-wide">
                    Binud Panging
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Founder &amp; Lead Software Architect
                  </div>
                </motion.div>

                {/* Right Column: Founder Profile Card */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-5 flex justify-center lg:justify-end"
                >
                  <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center shadow-sm w-full max-w-[360px]">
                    {/* Founder Photo Banner */}
                    <div className="w-full aspect-square bg-slate-100 overflow-hidden mb-6 border border-slate-200">
                      <img
                        src={binudAvatar}
                        alt="Binud Panging - Founder & CEO"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <h3 className="text-[#191919] font-black text-xl mb-1 font-sans tracking-tight">
                      Binud Panging
                    </h3>
                    <p className="text-[#005eb8] font-bold text-[11px] uppercase tracking-wider mb-5">
                      Founder &amp; CEO, Binud Software Solutions
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100 w-full justify-center text-slate-600">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="LinkedIn"
                      >
                        <FaLinkedin size={15} />
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="X / Twitter"
                      >
                        <FaTwitter size={15} />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-slate-200 flex items-center justify-center hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                        title="Facebook"
                      >
                        <FaFacebook size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default About;
