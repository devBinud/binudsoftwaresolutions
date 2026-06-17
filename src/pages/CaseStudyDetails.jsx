import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import { 
  FaChevronRight, 
  FaDownload, 
  FaCheck, 
  FaDatabase, 
  FaServer, 
  FaMobileAlt, 
  FaLock, 
  FaUsers, 
  FaShieldAlt,
  FaMicrochip,
  FaLightbulb,
  FaChartLine,
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaCreditCard,
  FaCode
} from 'react-icons/fa';

// PDF Assets
import kangkanPdf from '../assets/kangkan_case_studies.pdf';
import gtnPdf from '../assets/givetheneedy_case_studies.pdf';

// Import banner background image
import bannerBgImage from '../assets/bg.jpg';

// Kangkan Images
import kangkanLogo from '../assets/case_studies/kangkan_screenshot/app_logo.webp';
import k1 from '../assets/case_studies/kangkan_screenshot/1.webp';
import k2 from '../assets/case_studies/kangkan_screenshot/2.webp';
import k3 from '../assets/case_studies/kangkan_screenshot/3.webp';
import k4 from '../assets/case_studies/kangkan_screenshot/4.webp';
import k5 from '../assets/case_studies/kangkan_screenshot/5.webp';
import k6 from '../assets/case_studies/kangkan_screenshot/6.webp';
import k7 from '../assets/case_studies/kangkan_screenshot/7.webp';
import k8 from '../assets/case_studies/kangkan_screenshot/8.webp';

// GiveTheNeedy Images
import gtnLogo from '../assets/case_studies/givetheneedy_screenshot/logo.webp';
import g1 from '../assets/case_studies/givetheneedy_screenshot/1.webp';
import g2 from '../assets/case_studies/givetheneedy_screenshot/2.webp';
import g3 from '../assets/case_studies/givetheneedy_screenshot/3.webp';
import g4 from '../assets/case_studies/givetheneedy_screenshot/4.webp';
import g5 from '../assets/case_studies/givetheneedy_screenshot/5.webp';
import g6 from '../assets/case_studies/givetheneedy_screenshot/6.webp';
import g7 from '../assets/case_studies/givetheneedy_screenshot/7.webp';
import g8 from '../assets/case_studies/givetheneedy_screenshot/8.webp';

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

const CaseStudyDetails = () => {
  const { id } = useParams();

  // Define static data with exact text and paths
  const caseStudiesData = {
    kangkan: {
      title: 'Kangkan: A Scalable Mobile-First E-commerce Platform',
      subtitle: 'Unified React Native Mobile App & Laravel REST API',
      logo: kangkanLogo,
      pdf: kangkanPdf,
      primaryColor: '#274e85',
      accentColor: '#1d3d6b',
      lightColor: '#e8eef7',
      gradient: 'from-[#274e85]/10 via-[#274e85]/5 to-transparent',
      meta: {
        client: 'Kangkan Retail Brands',
        industry: 'E-commerce & Local Retail',
        platform: 'Android & iOS (Cross-Platform)',
        tech: 'React Native, Laravel, MySQL, Razorpay',
        duration: '4 Months'
      },
      screenshots: [k1, k2, k3, k4, k5, k6, k7, k8],
      introduction: 'Kangkan is a mobile-first e-commerce platform developed to deliver a seamless and scalable shopping experience while promoting culturally inspired and modern products. The application is designed to combine high performance, usability, and system reliability, ensuring a consistent experience across Android and iOS devices.',
      problemContext: 'The rapid growth of e-commerce has increased user expectations around speed, reliability, and usability. At the same time, many emerging platforms face challenges in handling concurrent users, maintaining low latency, and ensuring stable transaction processing. The key challenge in building Kangkan was to design a system that could efficiently manage multiple active users while delivering a smooth and responsive shopping experience.',
      objective: [
        'Support concurrent user activity without performance degradation.',
        'Provide a fast, intuitive, and modern mobile user experience.',
        'Ensure secure, validated, and reliable payment processing.',
        'Establish a strong technical foundation for future scalability.'
      ],
      architecture: [
        {
          title: 'Frontend (Mobile App)',
          desc: 'Developed using React Native, enabling a unified codebase for both Android and iOS platforms. This ensures visual/functional consistency while reducing development overhead.',
          icon: FaMobileAlt
        },
        {
          title: 'Backend Services',
          desc: 'Implemented using Laravel, following the Model-View-Controller (MVC) architecture. RESTful APIs facilitate highly efficient, low-overhead communication between client and server.',
          icon: FaServer
        },
        {
          title: 'Database System',
          desc: 'MySQL relational database with optimized schema design, indexing, and transactional integrity validation to guarantee fast retrieval and zero data corruption.',
          icon: FaDatabase
        },
        {
          title: 'Payment Integration',
          desc: 'Razorpay payment gateway configured with secure server-side validation, webhook handling, and comprehensive error fallback states for safe checkout.',
          icon: FaLock
        }
      ],
      optimizations: [
        {
          title: 'API Optimization',
          desc: 'Efficient API design was implemented to reduce payload size, minimize redundant requests, compress responses, and improve overall response times.'
        },
        {
          title: 'Database Tuning',
          desc: 'Database queries were optimized using indexing, eager loading of relations, and query refactoring to ensure fast data retrieval and reduced latency.'
        },
        {
          title: 'Concurrent User Handling',
          desc: 'A stateless backend architecture was adopted to support multiple simultaneous users and enable efficient horizontal request scaling.'
        },
        {
          title: 'Mobile Performance',
          desc: 'The mobile app was optimized through controlled rendering, memoized lists, state management hooks, and minimizing unnecessary render cycles.'
        }
      ],
      challenges: [
        {
          title: 'Scalability & Load',
          desc: 'Ensuring that the system could handle multiple active users without performance degradation. Resolved via a stateless API design and structured indexing.'
        },
        {
          title: 'Checkout Latency',
          desc: 'Maintaining low latency across product browsing and checkout flows. Resolved by database eager-loading, API response caching, and payload minimization.'
        },
        {
          title: 'Cross-Platform Feel',
          desc: 'Delivering a consistent and natural native experience across Android and iOS platforms. Solved by tuning platform-specific UI overrides in React Native.'
        },
        {
          title: 'Payment Security',
          desc: 'Ensuring secure and consistent transaction processing. Achieved through Razorpay integration with robust server-side signature validation.'
        }
      ],
      strategy: 'The platform was designed with a focus on simplicity and efficiency. The interface emphasizes intuitive navigation, streamlined product discovery, and a frictionless checkout process. A mobile-first approach ensures accessibility and performance across a wide range of devices and variable network conditions.',
      outcome: 'Kangkan has been successfully deployed as a live application on the Google Play Store. The platform demonstrates stable performance, efficient handling of user interactions, and a reliable transaction system in a production environment.',
      learnings: [
        'Scalability should be considered from the early stages of system design.',
        'Backend efficiency directly impacts overall perceived mobile user experience.',
        'Clean RESTful API designs play a critical role in mobile application performance.',
        'Real-world usage and load testing help identify and resolve system limitations.'
      ],
      roadmap: [
        'Implementation of Redis caching mechanisms to further improve API response times.',
        'Introduction of load balancing configurations for better scalability.',
        'Expansion of platform capabilities for broader multi-vendor marketplace features.',
        'Integration of telemetry, analytics, and performance monitoring systems.'
      ]
    },
    givetheneedy: {
      title: 'GiveTheNeedy: A Purpose-Driven Social Impact App',
      subtitle: 'Event-Driven Node.js Engine & Flexible MongoDB NoSQL Stack',
      logo: gtnLogo,
      pdf: gtnPdf,
      primaryColor: '#695dd3',
      accentColor: '#574cbd',
      lightColor: '#f3f2fc',
      gradient: 'from-[#695dd3]/10 via-[#695dd3]/5 to-transparent',
      meta: {
        client: 'GiveTheNeedy Foundation',
        industry: 'Nonprofit, Social Good & NGO',
        platform: 'Android & iOS (Cross-Platform)',
        tech: 'React Native, Node.js, MongoDB, Express',
        duration: '3 Months'
      },
      screenshots: [g1, g2, g3, g4, g5, g6, g7, g8],
      introduction: 'GiveTheNeedy is a purpose-driven digital platform focused on creating meaningful social impact by connecting individuals who are willing to contribute with those in need. The application fosters a culture of compassion by enabling users to participate in humanitarian efforts through a seamless and transparent system.',
      problemContext: 'Donation environments often suffer from a lack of transparency and visual connection to where resources are deployed. Giving needs to be simplified, immediate, and direct, ensuring donors that their contributions reach the intended recipient without intermediary friction.',
      objective: [
        'Bridge the gap between donors and beneficiaries efficiently.',
        'Offer a highly reliable platform that simplifies the process of giving.',
        'Ensure direct, measurable social impact and transparency for every campaign.',
        'Create a secure environment to protect donor data and financial transactions.'
      ],
      architecture: [
        {
          title: 'Frontend (Mobile App)',
          desc: 'Developed with React Native for Android and iOS. Delivers native look and feel, unified custom UI components, and optimized image processing layouts.',
          icon: FaMobileAlt
        },
        {
          title: 'Backend (API Engine)',
          desc: 'Built using Node.js and Express, implementing a lightweight, event-driven architecture to coordinate notifications and transactions smoothly.',
          icon: FaServer
        },
        {
          title: 'Database System',
          desc: 'MongoDB NoSQL document database, allowing flexible schema designs for various donation campaigns, user histories, and beneficiary records.',
          icon: FaDatabase
        },
        {
          title: 'Verified Authentication',
          desc: 'Secure JWT authentication combined with strict permission levels, keeping volunteer profiles, admin roles, and donor databases encrypted.',
          icon: FaLock
        }
      ],
      optimizations: [
        {
          title: 'Verified Beneficiary System',
          desc: 'Ensures absolute authenticity of causes, enabling verification checklists and audit trails to build strong donor trust.'
        },
        {
          title: 'Real-Time Engagement',
          desc: 'Keeps users dynamically informed about their contributions, campaign updates, and progress logs via integrated notifications.'
        },
        {
          title: 'Secure Transactions',
          desc: 'Employs safe encryption and transactional validation to process donations without payment leaks or intercept risks.'
        },
        {
          title: 'Community-Centric Approach',
          desc: 'Incorporates features that encourage volunteer coordination, local campaign sharing, and social networking for charity.'
        }
      ],
      challenges: [
        {
          title: 'Fraud Prevention',
          desc: 'Validating the legitimacy of beneficiaries. Solved by implementing an identity verification pipeline and automated NGO matching.'
        },
        {
          title: 'Visualizing Direct Impact',
          desc: 'Proving donation delivery to the donor. Solved by supporting live updates, visual receipts, and media attachments uploaded by volunteers.'
        },
        {
          title: 'Variable Network Performance',
          desc: 'Donors and volunteers in remote areas accessing the app. Solved by designing light payloads and supporting offline queues.'
        },
        {
          title: 'Data Privacy',
          desc: 'Ensuring anonymity for donors who request it. Achieved through strict object-level access controls in MongoDB.'
        }
      ],
      strategy: 'GiveTheNeedy provides a centralized ecosystem where contributors and beneficiaries can interact securely and efficiently. The platform enables users to discover genuine causes, contribute resources, and track outcomes, thereby enhancing trust and engagement.',
      outcome: 'GiveTheNeedy has transformed small acts of kindness into meaningful societal change, strengthening local community connections, promoting transparent aid distribution, and encouraging ongoing volunteer contributions.',
      learnings: [
        'NGO and beneficiary verification checks are fundamental to platform trust.',
        'Event-driven backend logic helps dispatch real-time campaign updates smoothly.',
        'A NoSQL database allows high agility when campaign metadata requirements shift.',
        'Donor retention is highly correlated with transaction security and direct impact reports.'
      ],
      roadmap: [
        'Integration of intelligent recommendation engines to match donors with matching interests.',
        'Expansion of platform capabilities to wider geographic regions and local dialects.',
        'Developing structural partnerships with global NGOs and civic institutions.',
        'Introducing advanced analytics and KPI telemetry tracking for enterprise sponsors.'
      ]
    }
  };

  const data = caseStudiesData[id];

  if (!data) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-left">
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
            {id === 'kangkan' ? 'Kangkan Case Study' : 'GiveTheNeedy Case Study'}
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-white">{id === 'kangkan' ? 'Kangkan' : 'GiveTheNeedy'}</span>
          </nav>
        </div>
      </section>

      {/* Main Overview Section */}
      <section className="relative py-16 bg-white border-b border-slate-100 overflow-hidden">
        {/* Decorative subtle background colors */}
        <div className={`absolute top-0 right-0 w-[45%] h-[350px] bg-gradient-to-bl ${data.gradient} rounded-full blur-[100px] pointer-events-none`} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7">
              <span 
                className="inline-block px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-5"
                style={{ backgroundColor: data.lightColor, color: data.primaryColor }}
              >
                Case Study Overview
              </span>
              
              <h1 className="text-3xl sm:text-[40px] lg:text-[46px] font-black text-[#191919] leading-[1.15] tracking-tight mb-4">
                {data.title}
              </h1>
              
              <p className="text-slate-400 text-lg font-bold mb-6 leading-snug">
                {data.subtitle}
              </p>

              {/* Meta details list */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-slate-100 my-8">
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Client</span>
                  <span className="text-xs font-bold text-slate-800">{data.meta.client}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Industry</span>
                  <span className="text-xs font-bold text-slate-800">{data.meta.industry}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Platform</span>
                  <span className="text-xs font-bold text-slate-800">{data.meta.platform}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Timeline</span>
                  <span className="text-xs font-bold text-slate-800">{data.meta.duration}</span>
                </div>
              </div>

              {/* PDF Download Action */}
              <a 
                href={data.pdf} 
                download
                className="inline-flex items-center gap-2 bg-[#274e85] hover:bg-[#1d3d6b] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95"
              >
                <FaDownload className="w-3.5 h-3.5" />
                Download Full PDF Case Study
              </a>
            </div>

            {/* Hero Right: Brand Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl max-w-sm w-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: data.primaryColor }} />
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3.5 mb-6 mx-auto">
                  <img src={data.logo} alt="Client Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-center font-black text-slate-800 text-lg tracking-tight mb-3">Technical Summary</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {data.meta.tech.split(',').map((techItem) => {
                    const trimmed = techItem.trim();
                    const TechIcon = getTechIcon(trimmed);
                    const techColor = getTechColor(trimmed);
                    return (
                      <span 
                        key={trimmed}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <TechIcon style={{ color: techColor }} size={11} />
                        {trimmed}
                      </span>
                    );
                  })}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold">1</span>
                    React Native Mobile Stack
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold">2</span>
                    Production Deployed App
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-bold">3</span>
                    Optimized Backend Architecture
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Visual Showcase (Auto-scroll Ticker) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100 overflow-hidden relative select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="text-center">
            <span 
              className="inline-block px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3"
              style={{ backgroundColor: data.lightColor, color: data.primaryColor }}
            >
              Application Interface
            </span>
            <h2 className="text-2xl sm:text-[34px] font-black text-[#191919] tracking-tight leading-tight">
              Production Mobile Showcase
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-lg mx-auto mt-2 font-medium">
              A smooth auto-scrolling display of live application workflows. Hover over a screen to pause.
            </p>
          </div>
        </div>

        {/* Scrolling Ticker Wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left and Right Fade Overlays for Depth */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="ticker-track flex">
            {/* Render screenshots twice for seamless infinite loop */}
            {[...data.screenshots, ...data.screenshots].map((src, index) => (
              <div 
                key={index} 
                className="w-[180px] sm:w-[220px] aspect-[9/19] rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white shrink-0 mx-4 transition-all duration-300 hover:shadow-md"
              >
                <img 
                  src={src} 
                  alt={`App Screen ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Narrative Details */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Introduction */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded-full" style={{ backgroundColor: data.primaryColor }} />
                  1. Project Introduction
                </h3>
                <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                  {data.introduction}
                </p>
              </div>

              {/* Problem context */}
              {data.problemContext && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-6 rounded-full" style={{ backgroundColor: data.primaryColor }} />
                    2. Problem Context
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                    {data.problemContext}
                  </p>
                </div>
              )}

              {/* Objectives list */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded-full" style={{ backgroundColor: data.primaryColor }} />
                  3. Key Project Objectives
                </h3>
                <ul className="space-y-3">
                  {data.objective.map((obj, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-500 text-[15px] font-medium leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-[#274e85] flex items-center justify-center shrink-0 mt-0.5">
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* UX Strategy */}
              {data.strategy && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-6 rounded-full" style={{ backgroundColor: data.primaryColor }} />
                    4. User Experience Strategy
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                    {data.strategy}
                  </p>
                </div>
              )}

              {/* Outcomes */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-6 rounded-full" style={{ backgroundColor: data.primaryColor }} />
                  5. Project Outcome & Metrics
                </h3>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <div className="flex gap-4 items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-green-500 shrink-0">
                      <FaChartLine className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm">Successful Deliverable</h4>
                      <p className="text-slate-500 text-[14px] leading-relaxed font-medium mt-1">
                        {data.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Architecture & Optimizations */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Architecture stack cards */}
              <div>
                <h3 className="text-xl font-black text-[#191919] tracking-tight mb-6">
                  System Architecture
                </h3>
                <div className="space-y-4">
                  {data.architecture.map((arch, index) => {
                    const ArchIcon = arch.icon;
                    return (
                      <div key={index} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-500 shrink-0">
                          <ArchIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[#191919] font-black text-sm">{arch.title}</h4>
                          <p className="text-slate-500 text-[13px] leading-relaxed font-medium mt-1">{arch.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optimizations or considerations cards */}
              <div>
                <h3 className="text-xl font-black text-[#191919] tracking-tight mb-6">
                  Engineering &amp; Optimization
                </h3>
                <div className="space-y-4">
                  {data.optimizations.map((opt, index) => (
                    <div key={index} className="border-l-[3px] pl-4 py-1.5" style={{ borderColor: data.primaryColor }}>
                      <h4 className="text-slate-800 font-black text-xs uppercase tracking-wider">{opt.title}</h4>
                      <p className="text-slate-500 text-[13px] leading-relaxed font-medium mt-1">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 select-none">
            <span 
              className="inline-block px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3"
              style={{ backgroundColor: data.lightColor, color: data.primaryColor }}
            >
              Technical Execution
            </span>
            <h2 className="text-2xl sm:text-[34px] font-black text-[#191919] tracking-tight leading-tight">
              Solving Complex Challenges
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold max-w-lg mx-auto mt-2">
              Every major milestone brings technical roadblocks. Here is how our engineering team overcame them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.challenges.map((chal, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#191919] font-black text-sm">{chal.title}</h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed font-medium mt-1">{chal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnings & Future Roadmap */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Key Learnings */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                  <FaLightbulb className="w-5 h-5" />
                </div>
                Key Engineering Learnings
              </h3>
              <div className="space-y-4">
                {data.learnings.map((learn, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">L{index + 1}.</span>
                    <p className="text-slate-500 text-[14px] leading-relaxed font-medium">{learn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Scope */}
            <div className="pt-8 lg:pt-0 border-t lg:border-t-0 lg:pl-16 lg:border-l border-slate-100">
              <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                  <FaMicrochip className="w-5 h-5" />
                </div>
                Future Roadmap Scope
              </h3>
              <div className="space-y-4">
                {data.roadmap.map((road, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">R{index + 1}.</span>
                    <p className="text-slate-500 text-[14px] leading-relaxed font-medium">{road}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stay Connected CTA Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div 
            className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
            style={{ backgroundColor: data.primaryColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                Interested in building a similar app?
              </h3>
              <p className="text-white/80 text-sm md:text-base font-medium mb-8">
                Let's discuss how we can architect a high-performance, scalable cross-platform application tailored to your project requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/contact"
                  className="bg-white hover:bg-slate-100 text-[#191919] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
                >
                  Start A Conversation
                </Link>
                <a
                  href={data.pdf}
                  download
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <FaDownload className="w-4 h-4" />
                  Get PDF Copy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConnectSection onlySocials={true} />

      <Footer />
    </div>
  );
};

export default CaseStudyDetails;
