import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { 
  HiSparkles, 
  HiChatAlt2, 
  HiTrendingUp, 
  HiCog, 
  HiDocumentText, 
  HiMail, 
  HiPhone, 
  HiArrowRight, 
  HiArrowLeft, 
  HiCheckCircle, 
  HiChip, 
  HiLightningBolt, 
  HiDatabase,
  HiCurrencyDollar,
  HiChartBar,
  HiHeart
} from 'react-icons/hi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerBgImage from '../assets/bg2.jpg';

const aiAutomationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://binudsoftwaresolutions.in/services/ai-automation#service',
      'name': 'AI & Intelligent Workflow Automation Services',
      'serviceType': 'Artificial Intelligence & RPA',
      'provider': {
        '@type': 'Organization',
        'name': 'Binud Software Solutions',
        'url': 'https://binudsoftwaresolutions.in/'
      },
      'description': 'Design, construct, and integrate custom AI systems, smart GPT-4 chatbots, official WhatsApp automation pipelines, and software RPA robots to streamline business capacity.',
      'areaServed': 'Worldwide'
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What AI tools and automation capabilities do you implement?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We specialize in 24/7 AI customer support agents with Retrieval Augmented Generation (RAG), official WhatsApp Business API automation, auto-OCR document parsing, Robotic Process Automation (RPA), and custom GPT-4 integrations.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can AI chatbots integrate with our existing database and CRM?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, we architect stateless API connectors and vector databases that sync seamlessly with your MySQL, MongoDB, PostgreSQL, Salesforce, HubSpot, or custom CRM systems.'
          }
        }
      ]
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://binudsoftwaresolutions.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Services',
          'item': 'https://binudsoftwaresolutions.in/services'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'AI & Automation',
          'item': 'https://binudsoftwaresolutions.in/services/ai-automation'
        }
      ]
    }
  ]
};

// Flag Components for Phone Dropdown (Matching ConnectSection.jsx)
const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 rounded-[1px] shadow-sm border border-slate-100 object-cover shrink-0">
    <rect width="900" height="200" fill="#f93" />
    <rect y="200" width="900" height="200" fill="#fff" />
    <rect y="400" width="900" height="200" fill="#128807" />
    <g transform="translate(450,300)">
      <circle r="92" fill="none" stroke="#000080" strokeWidth="6" />
      <circle r="16" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2="0"
          y2="-92"
          stroke="#000080"
          strokeWidth="4"
          transform={`rotate(${i * 15})`}
        />
      ))}
    </g>
  </svg>
);

const AUFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] shadow-sm border border-slate-100 object-cover shrink-0">
    <rect width="60" height="30" fill="#000033" />
    <g transform="scale(0.5)">
      <clipPath id="us">
        <path d="M0 0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="ut">
        <path d="M0 0 L60 30 M60 0 L0 30" />
      </clipPath>
      <g clipPath="url(#us)">
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#00247d" strokeWidth="4" />
        <g clipPath="url(#ut)">
          <path d="M0 0 L60 30" stroke="#cf142b" strokeWidth="2" />
          <path d="M60 0 L0 30" stroke="#cf142b" strokeWidth="2" />
        </g>
        <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="6" />
      </g>
    </g>
    <circle cx="15" cy="22.5" r="3" fill="#fff" />
    <circle cx="45" cy="7.5" r="1.2" fill="#fff" />
    <circle cx="45" cy="22.5" r="1.2" fill="#fff" />
    <circle cx="37.5" cy="16.5" r="1.2" fill="#fff" />
    <circle cx="52.5" cy="16.5" r="1.2" fill="#fff" />
    <circle cx="48" cy="19.5" r="0.6" fill="#fff" />
  </svg>
);

const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 741 390" className="w-5 h-3.5 rounded-[1px] shadow-sm border border-slate-100 object-cover shrink-0">
    <rect width="741" height="390" fill="#b22234" />
    <path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#fff" strokeWidth="30" />
    <rect width="296" height="210" fill="#3c3b6e" />
    <g fill="#fff">
      <circle cx="25" cy="21" r="5" /><circle cx="75" cy="21" r="5" /><circle cx="125" cy="21" r="5" /><circle cx="175" cy="21" r="5" /><circle cx="225" cy="21" r="5" /><circle cx="275" cy="21" r="5" />
      <circle cx="50" cy="42" r="5" /><circle cx="100" cy="42" r="5" /><circle cx="150" cy="42" r="5" /><circle cx="200" cy="42" r="5" /><circle cx="250" cy="42" r="5" />
      <circle cx="25" cy="63" r="5" /><circle cx="75" cy="63" r="5" /><circle cx="125" cy="63" r="5" /><circle cx="175" cy="63" r="5" /><circle cx="225" cy="63" r="5" /><circle cx="275" cy="63" r="5" />
      <circle cx="50" cy="84" r="5" /><circle cx="100" cy="84" r="5" /><circle cx="150" cy="84" r="5" /><circle cx="200" cy="84" r="5" /><circle cx="250" cy="84" r="5" />
      <circle cx="25" cy="105" r="5" /><circle cx="75" cy="105" r="5" /><circle cx="125" cy="105" r="5" /><circle cx="175" cy="105" r="5" /><circle cx="225" cy="105" r="5" /><circle cx="275" cy="105" r="5" />
      <circle cx="50" cy="126" r="5" /><circle cx="100" cy="126" r="5" /><circle cx="150" cy="126" r="5" /><circle cx="200" cy="126" r="5" /><circle cx="250" cy="126" r="5" />
      <circle cx="25" cy="147" r="5" /><circle cx="75" cy="147" r="5" /><circle cx="125" cy="147" r="5" /><circle cx="175" cy="147" r="5" /><circle cx="225" cy="147" r="5" /><circle cx="275" cy="147" r="5" />
      <circle cx="50" cy="168" r="5" /><circle cx="100" cy="168" r="5" /><circle cx="150" cy="168" r="5" /><circle cx="200" cy="168" r="5" /><circle cx="250" cy="168" r="5" />
      <circle cx="25" cy="189" r="5" /><circle cx="75" cy="189" r="5" /><circle cx="125" cy="189" r="5" /><circle cx="175" cy="189" r="5" /><circle cx="225" cy="189" r="5" /><circle cx="275" cy="189" r="5" />
    </g>
  </svg>
);

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] shadow-sm border border-slate-100 object-cover shrink-0">
    <clipPath id="s"><path d="M0 0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="t"><path d="M0 0 L60 30 M60 0 L0 30" /></clipPath>
    <g clipPath="url(#s)">
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#00247d" strokeWidth="4" />
      <g clipPath="url(#t)">
        <path d="M0 0 L60 30" stroke="#cf142b" strokeWidth="2" />
        <path d="M60 0 L0 30" stroke="#cf142b" strokeWidth="2" />
      </g>
      <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="6" />
    </g>
  </svg>
);

const countries = [
  { code: '+91', flag: <IndiaFlag />, name: 'India', placeholder: '98765 43210' },
  { code: '+61', flag: <AUFlag />, name: 'Australia', placeholder: '0416 555 222' },
  { code: '+1', flag: <USFlag />, name: 'United States', placeholder: '201 555 0123' },
  { code: '+44', flag: <UKFlag />, name: 'United Kingdom', placeholder: '7911 123456' },
];

const AIAutomation = () => {
  const [surveyStep, setSurveyStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dropdownRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 260; // card width + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          // Reset to start
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 260, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const aiCapabilities = [
    {
      title: 'AI Chatbots & Support Assistants',
      desc: 'Build smart customer support agents powered by GPT-4 and custom knowledge bases. Automate 24/7 conversations, handle queries, and collect qualified leads without human intervention.',
      features: ['Retrieval Augmented Generation (RAG)', 'Context-aware Dialogues', 'Multi-channel Deployment (Web, WhatsApp, Slack)', 'CRM & Lead Database Sync'],
      icon: HiChatAlt2,
      color: 'from-[#005eb8] to-[#00488e]',
      image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Smooth WhatsApp Automation & AI',
      desc: 'Deploy custom AI workflows on WhatsApp using official APIs to interact with users, send smart notifications, answer support questions, and handle bookings automatically.',
      features: ['Official WhatsApp Business API', 'AI Agent Contact Delegation', 'Auto-Reply & Notification Triggers', 'Interactive Catalog Integration'],
      icon: HiLightningBolt,
      color: 'from-[#005eb8] to-[#00488e]',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Robotic Process Automation (RPA)',
      desc: 'Say goodbye to repetitive manual entries. We construct software workflows that sync documents, auto-parse file data, generate invoice reconciliations, and bridge legacy systems.',
      features: ['OCR Document Classification', 'No-code / Low-code Automation Pipelines', 'Automated Email & SMS Alerts', 'System-to-System Integration API'],
      icon: HiCog,
      color: 'from-[#005eb8] to-[#00488e]',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Custom AI Agents & Integrations',
      desc: 'Develop autonomous AI agents capable of performing multi-step tasks like drafting responses, researching files, validating system outputs, and updating database values automatically.',
      features: ['Multi-agent Task Orchestration', 'Custom API Connectors', 'Human-in-the-loop Safeguards', 'Real-time Vector Databases'],
      icon: HiSparkles,
      color: 'from-[#005eb8] to-[#00488e]',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const surveyInterests = [
    { id: 'chatbots', label: '24/7 AI Chatbots & Customer Support', icon: HiChatAlt2 },
    { id: 'whatsapp', label: 'Smooth WhatsApp Automation & AI Agents', icon: HiLightningBolt },
    { id: 'document', label: 'Auto-OCR Document Parsing & Data Sync', icon: HiDocumentText },
    { id: 'rpa', label: 'Workflow Automation & RPA Pipelines', icon: HiCog },
    { id: 'llms', label: 'Custom GPTs & LLM Integrations', icon: HiChip },
  ];

  const surveyGoals = [
    { id: 'costs', label: 'Reduce operational costs', icon: HiCurrencyDollar },
    { id: 'productivity', label: 'Boost team productivity & eliminate manual tasks', icon: HiLightningBolt },
    { id: 'retention', label: 'Improve customer experience & response times', icon: HiHeart },
    { id: 'capacity', label: 'Standardize & scale technical workflows', icon: HiCog },
  ];

  const handleInterestToggle = (interestLabel) => {
    setSelectedInterests(prev =>
      prev.includes(interestLabel)
        ? prev.filter(i => i !== interestLabel)
        : [...prev, interestLabel]
    );
  };

  const handleNextStep = () => {
    if (surveyStep === 1 && selectedInterests.length === 0) {
      Swal.fire({
        title: 'Selection Required',
        text: 'Please select at least one AI tool or capability of interest to proceed.',
        icon: 'warning',
        confirmButtonText: 'Understood',
        confirmButtonColor: '#695dd3',
        customClass: {
          popup: 'rounded-2xl',
          title: 'font-sans text-[#3E4265] font-extrabold',
          confirmButton: 'rounded-full px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
        }
      });
      return;
    }
    if (surveyStep === 2 && !selectedGoal) {
      Swal.fire({
        title: 'Selection Required',
        text: 'Please select your primary business goal with AI to proceed.',
        icon: 'warning',
        confirmButtonText: 'Understood',
        confirmButtonColor: '#695dd3',
        customClass: {
          popup: 'rounded-2xl',
          title: 'font-sans text-[#3E4265] font-extrabold',
          confirmButton: 'rounded-full px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
        }
      });
      return;
    }
    setSurveyStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setSurveyStep(prev => prev - 1);
  };

  const onSubmitSurvey = async (data) => {
    setIsSubmittingForm(true);
    try {
      const fullPhone = `${selectedCountry.code} ${data.phone || ''}`.trim();
      const interestsStr = selectedInterests.join(', ');
      
      const formattedMessage = `[Survey Response]
- Tools of Interest: ${interestsStr}
- Primary Business Goal: ${selectedGoal}
- User Message: ${data.message || 'No custom message provided.'}`;

      // 1. Send Email (using existing SMTP endpoint)
      let emailSuccess = false;
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            purpose: 'AI & Automation Survey Response',
            name: data.name,
            email: data.email,
            phone: fullPhone,
            message: formattedMessage,
          }),
        });

        if (response.ok) {
          emailSuccess = true;
        } else {
          let errMsg = 'Failed to send email';
          try {
            const errorData = await response.json();
            errMsg = errorData.details ? `${errorData.error}: ${errorData.details}` : (errorData.error || errMsg);
          } catch (_) {}
          
          if (import.meta.env.DEV) {
            console.warn(`[DEV MODE] Email endpoint returned ${response.status} (${errMsg}). Mocking success.`);
            emailSuccess = true;
          } else {
            throw new Error(errMsg);
          }
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn('[DEV MODE] Email send failed. Mocking success locally.', err);
          emailSuccess = true;
        } else {
          throw err;
        }
      }

      if (emailSuccess) {
        // 2. Save to Firestore (only if Firebase is configured with real credentials)
        const isFirebaseConfigured = 
          import.meta.env.VITE_FIREBASE_API_KEY && 
          import.meta.env.VITE_FIREBASE_API_KEY !== 'your_api_key_here';

        if (isFirebaseConfigured) {
          try {
            const dbPromise = addDoc(collection(db, 'messages'), {
              purpose: 'AI & Automation Inquiry',
              name: data.name,
              email: data.email,
              phone: fullPhone,
              service: 'AI & Automation',
              message: formattedMessage,
              createdAt: serverTimestamp(),
              read: false,
              surveyData: {
                interests: selectedInterests,
                goal: selectedGoal
              }
            });

            // 5 seconds timeout to prevent unconfigured/offline Firestore from hanging
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Firestore timeout')), 5000)
            );

            await Promise.race([dbPromise, timeoutPromise]);
          } catch (dbError) {
            console.warn('Firestore save failed (non-critical):', dbError);
          }
        } else {
          console.warn('Firestore save skipped: Firebase is not configured.');
        }

        // Show a beautiful success SweetAlert modal
        await Swal.fire({
          title: 'Survey Submitted!',
          text: 'Thank you for sharing your interest. We will analyze your inputs and get in touch with some suggestions at binudp.dev@gmail.com.',
          icon: 'success',
          confirmButtonText: 'Great!',
          confirmButtonColor: '#695dd3',
          customClass: {
            popup: 'rounded-2xl',
            title: 'font-sans text-[#3E4265] font-extrabold',
            confirmButton: 'rounded-full px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
          }
        });

        setSubmitSuccess(true);
        reset();
        setSelectedInterests([]);
        setSelectedGoal('');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Submission Failed',
        text: err.message || 'Please try again or email us directly at binudp.dev@gmail.com.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#695dd3',
        customClass: {
          popup: 'rounded-2xl',
          title: 'font-sans text-[#3E4265] font-extrabold',
          confirmButton: 'rounded-full px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
        }
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#005eb8] selection:text-white overflow-hidden">
      <SEOHead
        title="AI & Automation Services | Custom Chatbots, GPT-4, WhatsApp & RPA"
        description="Deploy intelligent AI chatbots, custom GPT-4 workflows, official WhatsApp automation, and Robotic Process Automation (RPA) to eliminate bottlenecks and scale business capacity."
        keywords={[
          'AI automation services',
          'GPT-4 chatbot development',
          'WhatsApp Business API automation',
          'Robotic Process Automation RPA',
          'OCR document parsing',
          'custom LLM integration',
          'AI customer support agent'
        ]}
        canonicalPath="/services/ai-automation"
        jsonLd={aiAutomationJsonLd}
      />
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

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white">
            AI & Automation Services
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-blue-400">AI & Automation</span>
          </nav>
        </div>
      </section>

      {/* ── Futuristic Hero Section ── */}
      <section className="relative pt-20 pb-24 md:py-32 overflow-hidden">
        {/* Glow grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6 uppercase tracking-wider animate-pulse">
              <HiSparkles className="text-blue-500" /> Shaping The Future of Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#3E4265] leading-[1.1] tracking-tight mb-6">
              Supercharge Operations With <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#005eb8] via-[#00488e] to-[#003975] bg-clip-text text-transparent">
                Intelligent AI & Automation
              </span>
            </h1>
            
            <p className="text-slate-500 text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
              We design, build, and integrate custom AI systems, smart chatbots, and automated software robots that eliminate bottlenecks and scale business capacity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#survey-section"
                className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-[#005eb8] hover:bg-[#00488e] text-white text-sm font-bold tracking-wide uppercase transition-colors duration-200"
              >
                Take AI Survey
              </a>
              <a
                href="#services-detail"
                className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-sm font-bold tracking-wide uppercase hover:bg-slate-50 transition-colors duration-200"
              >
                Explore Capabilities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Centers of Excellence Style Services Carousel ── */}
      <section id="services-detail" className="py-20 md:py-28 relative border-t border-blue-100/50 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Title & Intro (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left">
              <span className="text-[#005eb8] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3 inline-block">
                Our Services
              </span>
              <h2 className="text-[#3E4265] text-3xl sm:text-4xl font-black leading-[1.15] tracking-tight mb-5">
                Specialized Care. <br />
                Automation Excellence.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-sm">
                Our advanced automated solutions provide specialized integrations using the latest technology and custom workflows for superior business outcomes.
              </p>
              
              <div className="flex items-center gap-6">
                <a
                  href="#survey-section"
                  className="px-8 py-3.5 rounded-none bg-[#005eb8] hover:bg-[#00488e] text-white text-xs font-bold tracking-wider uppercase transition-colors duration-200"
                >
                  Explore Services
                </a>
                
                {/* Navigation Arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollSlider('left')}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-650 hover:bg-slate-50 hover:border-slate-350 cursor-pointer active:scale-95 transition-all"
                    aria-label="Scroll left"
                  >
                    <HiArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollSlider('right')}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-650 hover:bg-slate-50 hover:border-slate-350 cursor-pointer active:scale-95 transition-all"
                    aria-label="Scroll right"
                  >
                    <HiArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column: Scrolling Cards (8 Columns) */}
            <div className="lg:col-span-8 relative w-full overflow-hidden">
              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {aiCapabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={cap.title}
                      className="w-[200px] sm:w-[230px] md:w-[244px] h-[360px] rounded-3xl overflow-hidden relative group shrink-0 snap-start shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-slate-100/50 cursor-pointer"
                    >
                      {/* Background Image */}
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                      
                      {/* Floating Icon Badge */}
                      <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white z-10 border border-white/20">
                        <Icon size={18} />
                      </div>
                      
                      {/* Bottom Text Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-[40%] z-10 text-left">
                        <h3 className="text-white text-base md:text-lg font-black group-hover:text-blue-300 transition-colors leading-tight">
                          {cap.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
        </div>
      </section>

      {/* ── Interactive Poll Survey Section ── */}
      <section id="survey-section" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60">
        {/* Glow backdrops */}
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#005eb8] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3 inline-block">
              Interactive Survey
            </span>
            <h2 className="text-[#3E4265] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              What AI Solutions Interest You?
            </h2>
            <p className="text-slate-550 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Select your preferences below to let us know what features or workflows you want to construct, and request a tailored strategy outline.
            </p>
          </div>

          {/* Survey Card Container */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.055)]">
            
            {/* Progress indicators */}
            {!submitSuccess && (
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Step {surveyStep} of 3
                </span>
                <div className="flex gap-2">
                  <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${surveyStep >= 1 ? 'bg-[#005eb8]' : 'bg-slate-100'}`} />
                  <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${surveyStep >= 2 ? 'bg-[#005eb8]' : 'bg-slate-100'}`} />
                  <div className={`h-1.5 w-10 rounded-full transition-all duration-300 ${surveyStep >= 3 ? 'bg-[#005eb8]' : 'bg-slate-100'}`} />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                // SUCCESS SCREEN
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <HiCheckCircle className="text-emerald-500 w-20 h-20 mb-6 drop-shadow-[0_4px_10px_rgba(16,185,129,0.15)] animate-bounce" />
                  <h3 className="text-[#3E4265] text-2xl font-bold mb-3">Survey Submitted!</h3>
                  <p className="text-slate-500 text-sm max-w-md leading-relaxed font-medium mb-8">
                    Thank you for sharing your interest. We will analyze your inputs and get in touch with some suggestions on how we can implement AI tools in your workflow.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSurveyStep(1);
                    }}
                    className="px-8 py-3.5 rounded-none bg-white border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitSurvey)}>
                  
                  {/* STEP 1: INTERESTS SELECTOR */}
                  {surveyStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-slate-800 text-base sm:text-lg font-bold mb-6 text-left">
                        Which AI tools or capabilities are you interested in implementing?
                      </h3>
                      
                      <div className="flex flex-col gap-3 mb-10">
                        {surveyInterests.map((interest) => {
                          const Icon = interest.icon;
                          const active = selectedInterests.includes(interest.label);
                          return (
                            <button
                              key={interest.id}
                              type="button"
                              onClick={() => handleInterestToggle(interest.label)}
                              className={`w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-between cursor-pointer select-none ${
                                active
                                  ? 'bg-blue-50/50 text-[#005eb8] border-[#005eb8]/45 shadow-sm'
                                  : 'bg-slate-50/60 text-slate-650 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${active ? 'bg-blue-100 text-[#005eb8]' : 'bg-slate-100 text-slate-400'}`}>
                                  <Icon size={16} />
                                </div>
                                <span className="pr-2 text-left leading-snug">{interest.label}</span>
                              </div>
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                active ? 'border-[#005eb8] bg-[#005eb8] text-white' : 'border-slate-350 bg-white'
                              }`}>
                                {active && (
                                  <svg className="w-3.5 h-3.5 stroke-current stroke-3" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex items-center gap-2 px-8 py-3.5 rounded-none bg-[#005eb8] hover:bg-[#00488e] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Next <HiArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: BUSINESS GOALS */}
                  {surveyStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-slate-800 text-base sm:text-lg font-bold mb-6 text-left">
                        What is your primary business goal with AI?
                      </h3>

                      <div className="flex flex-col gap-3 mb-10">
                        {surveyGoals.map((goal) => {
                          const Icon = goal.icon;
                          const active = selectedGoal === goal.label;
                          return (
                            <button
                              key={goal.id}
                              type="button"
                              onClick={() => setSelectedGoal(goal.label)}
                              className={`w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold transition-all border flex items-center justify-between cursor-pointer select-none ${
                                active
                                  ? 'bg-blue-50/50 text-[#005eb8] border-[#005eb8]/45 shadow-sm'
                                  : 'bg-slate-50/60 text-slate-650 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${active ? 'bg-blue-100 text-[#005eb8]' : 'bg-slate-100 text-slate-400'}`}>
                                  <Icon size={16} />
                                </div>
                                <span className="pr-2 text-left leading-snug">{goal.label}</span>
                              </div>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                active ? 'border-[#005eb8] bg-[#005eb8]' : 'border-slate-350 bg-white'
                              }`}>
                                {active && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex items-center gap-2 px-6 py-3.5 rounded-none bg-white border border-slate-200 text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors hover:bg-slate-50 cursor-pointer"
                        >
                          <HiArrowLeft size={14} /> Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex items-center gap-2 px-8 py-3.5 rounded-none bg-[#005eb8] hover:bg-[#00488e] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Next <HiArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTACT FORM */}
                  {surveyStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-slate-800 text-lg sm:text-xl font-bold mb-6">
                        Provide your details so we can send a custom brief
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                        {/* Name */}
                        <div className="relative">
                          <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Your Name"
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:border-[#005eb8] focus:bg-white focus:outline-none transition-all duration-300 text-sm font-medium"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <input
                            type="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                            })}
                            placeholder="Your Email"
                            className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:border-[#005eb8] focus:bg-white focus:outline-none transition-all duration-300 text-sm font-medium"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
                        </div>

                        {/* Phone Number with custom flag dropdown */}
                        <div className="relative md:col-span-2">
                          <div className="flex items-center bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-1.5 focus-within:border-[#005eb8] focus-within:bg-white transition-all duration-300">
                            {/* Dropdown Toggle */}
                            <div ref={dropdownRef} className="relative">
                              <button
                                type="button"
                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                className="flex items-center gap-1.5 pr-2 text-slate-600 hover:text-slate-800 text-sm font-bold focus:outline-none cursor-pointer"
                              >
                                <span>{selectedCountry.flag}</span>
                                <span>{selectedCountry.code}</span>
                                <span className="text-[8px] text-slate-400 ml-0.5">▼</span>
                              </button>

                              {/* Country Dropdown list */}
                              {showCountryDropdown && (
                                <div className="absolute left-0 bottom-full mb-3 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1.5 min-w-[170px] max-h-48 overflow-y-auto">
                                  {countries.map((c) => (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCountry(c);
                                        setShowCountryDropdown(false);
                                      }}
                                      className="w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-bold cursor-pointer"
                                    >
                                      <span>{c.flag}</span>
                                      <span>{c.code}</span>
                                      <span className="text-slate-400 font-sans">({c.name})</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="h-5 w-[1px] bg-slate-200 mx-2" />

                            <input
                              type="tel"
                              maxLength={10}
                              onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) e.preventDefault();
                              }}
                              {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: 'Phone number must be exactly 10 digits'
                                }
                              })}
                              placeholder="Phone Number (10 digits)"
                              className="w-full bg-transparent py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium"
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>}
                        </div>
                      </div>

                      {/* Tell us more */}
                      <div className="relative mb-8">
                        <textarea
                          {...register('message')}
                          placeholder="Tell us a bit about your business or what you want to automate..."
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200/85 rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 focus:border-[#005eb8] focus:bg-white focus:outline-none transition-all duration-300 text-sm font-medium resize-none"
                        />
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex items-center gap-2 px-6 py-3.5 rounded-none bg-white border border-slate-200 text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors hover:bg-slate-50"
                        >
                          <HiArrowLeft size={14} /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmittingForm}
                          className="flex items-center gap-2 px-8 py-3.5 rounded-none bg-[#005eb8] hover:bg-[#00488e] disabled:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-500/10 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {isSubmittingForm ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Submitting...
                            </span>
                          ) : 'Submit Survey'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomation;
