import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import {
  FaAndroid,
  FaApple,
  FaArrowRight,
  FaCode,
  FaReact,
  FaLaravel,
  FaDatabase,
  FaCreditCard,
  FaNodeJs,
  FaServer,
  FaLock
} from 'react-icons/fa';

// Import banner background image
import bannerBgImage from '../assets/bg5.jpg';

// Import assets for Kangkan Case Study
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import kangkanPreview from '../assets/case_studies/kangkan_screenshot/1.webp';

// Import assets for GiveTheNeedy Case Study
import gtnLogo from '../assets/case_studies/givetheneedy_screenshot/logo.webp';
import gtnPreview from '../assets/case_studies/givetheneedy_screenshot/1.webp';

const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return FaReact;
  if (t.includes('laravel')) return FaLaravel;
  if (t.includes('node')) return FaNodeJs;
  if (t.includes('mongodb') || t.includes('mysql') || t.includes('database') || t.includes('nosql')) return FaDatabase;
  if (t.includes('razorpay') || t.includes('gateway') || t.includes('payment') || t.includes('credit')) return FaCreditCard;
  if (t.includes('express') || t.includes('server')) return FaServer;
  if (t.includes('auth') || t.includes('security') || t.includes('lock') || t.includes('verified')) return FaLock;
  return FaCode;
};

const getTechColor = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return '#61dafb';
  if (t.includes('laravel')) return '#ff2d20';
  if (t.includes('node')) return '#339933';
  if (t.includes('mongodb')) return '#47a248';
  if (t.includes('mysql')) return '#00758f';
  if (t.includes('database') || t.includes('nosql')) return '#00758f';
  if (t.includes('razorpay') || t.includes('gateway') || t.includes('payment') || t.includes('credit')) return '#0854d4';
  if (t.includes('express')) return '#303030';
  if (t.includes('auth') || t.includes('security') || t.includes('lock') || t.includes('verified')) return '#10b981';
  return '#0ea5e9';
};

const Portfolio = () => {
  // Static Case Studies Data
  const caseStudies = [
    {
      id: 'kangkan',
      title: 'Kangkan: A Scalable Mobile-First E-commerce Platform',
      subtitle: 'React Native & Laravel Production Architecture',
      description: 'A premium, culture-inspired mobile e-commerce platform designed to handle massive concurrent traffic, utilizing a stateless backend API and optimized Razorpay checkout integrations.',
      logo: kangkanLogo,
      preview: kangkanPreview,
      primaryColor: '#274e85',
      platform: 'Android & iOS Mobile App',
      tech: ['React Native', 'Laravel PHP', 'MySQL Database', 'Razorpay Gateway', 'RESTful APIs'],
    },
    {
      id: 'givetheneedy',
      title: 'GiveTheNeedy: A Purpose-Driven Social Impact App',
      subtitle: 'Event-Driven Node.js & MongoDB Platform',
      description: 'A transparent donation and community contribution platform connecting donors directly to verified beneficiaries, complete with real-time updates and an intuitive mobile user experience.',
      logo: gtnLogo,
      preview: gtnPreview,
      primaryColor: '#695dd3',
      platform: 'Android & iOS Mobile App',
      tech: ['React Native', 'Node.js', 'MongoDB NoSQL', 'Express API', 'Verified Auth'],
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 select-none overflow-hidden border-b border-slate-800">
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

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Case Studies
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Case Studies</span>
          </nav>
        </div>
      </section>

      {/* Case Studies Grid Section */}
      <section className="py-16 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Section Introduction */}
          <div className="text-left mb-12 select-none max-w-4xl">
            <h2 className="text-[#191919] text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Real-World Success Stories &amp; Engineering Milestones
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
              Discover how we architect complex digital solutions, resolve critical business problems, and scale mobile infrastructure to support global growth and social impact.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left relative overflow-hidden"
              >
                {/* Diagonal Ribbon */}
                <div className="absolute top-4 right-[-35px] rotate-45 bg-[#695dd3] text-white text-[8px] font-black uppercase tracking-widest text-center py-1 w-36 shadow-[0_2px_10px_rgba(105,93,211,0.35)]">
                  Android &amp; iOS
                </div>

                {/* Logo & Platform Icons Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 p-3.5 border border-slate-100/80 flex items-center justify-center shadow-sm shrink-0">
                      <img src={cs.logo} alt={cs.title} className="w-full h-full object-contain" />
                    </div>
                    {/* Platform Indicators */}
                    <div className="flex flex-col gap-1 select-none">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Platforms</span>
                      <div className="flex gap-1.5 mt-0.5">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[#3DDC84]" title="Android App">
                          <FaAndroid size={13} />
                          <span className="text-[10px] font-bold text-slate-600">Android</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800" title="iOS App">
                          <FaApple size={13} />
                          <span className="text-[10px] font-bold text-slate-600">iOS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight hover:text-[#274e85] transition-colors duration-300 mb-2 leading-tight">
                    {cs.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mb-4 tracking-wide">{cs.subtitle}</p>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    {cs.description}
                  </p>

                  {/* Technologies label with icon */}
                  <div className="flex items-center gap-1 text-slate-400 font-extrabold text-[10px] uppercase tracking-wider mb-3 mt-auto select-none">
                    <FaCode size={11} className="text-[#695dd3]/70" />
                    <span>Technologies</span>
                  </div>

                  {/* Tech stack badges - Square Card Type */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {cs.tech.map((techItem) => {
                      const TechIcon = getTechIcon(techItem);
                      const techColor = getTechColor(techItem);
                      return (
                        <div 
                          key={techItem}
                          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80 w-[84px] h-[84px] text-center select-none cursor-default"
                        >
                          <TechIcon style={{ color: techColor }} size={22} className="mb-1.5" />
                          <span className="text-[9.5px] font-bold text-slate-500 leading-tight font-sans">
                            {techItem}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/case-studies/case-study/${cs.id}`}
                    className="inline-flex items-center gap-4 group/btn cursor-pointer w-fit mt-auto pt-4"
                  >
                    {/* Circular Arrow button */}
                    <div className="w-12 h-12 rounded-full border border-[#191919] group-hover/btn:border-[#695dd3] text-[#191919] group-hover/btn:bg-[#695dd3] group-hover/btn:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                      <FaArrowRight size={14} className="transform group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                    
                    {/* Link Label */}
                    <span className="text-[#191919] group-hover/btn:text-[#695dd3] font-bold text-xs sm:text-[13px] tracking-wider uppercase transition-colors duration-300">
                      Explore Case Study
                    </span>
                  </Link>
                </div>
              </div>
            ))}
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
