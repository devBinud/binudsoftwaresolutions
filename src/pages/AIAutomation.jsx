import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { HiArrowRight, HiArrowLeft, HiCheckCircle, HiCheck } from 'react-icons/hi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import ArrowButton from '../components/ArrowButton';

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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 rounded-[1px] border border-slate-100 object-cover shrink-0">
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] border border-slate-100 object-cover shrink-0">
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 741 390" className="w-5 h-3.5 rounded-[1px] border border-slate-100 object-cover shrink-0">
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] border border-slate-100 object-cover shrink-0">
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

// Shared survey form styles
const labelClass = 'block text-sm font-medium text-ink mb-2';
const inputClass =
  'w-full h-12 bg-white border border-line hover:border-[#b9dcee] rounded-xl px-4 text-ink placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-[border-color,box-shadow] duration-200 text-[15px]';
const backBtnClass =
  'inline-flex items-center gap-2 h-11 px-5 rounded-[var(--radius-btn)] border border-line bg-white text-body hover:text-primary hover:border-primary font-medium text-[16px] transition-colors duration-300 cursor-pointer';

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
      color: 'from-[#0077b6] to-[#005f92]',
      image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'WhatsApp Automation & AI',
      desc: 'Deploy custom AI workflows on WhatsApp using official APIs to interact with users, send smart notifications, answer support questions, and handle bookings automatically.',
      features: ['Official WhatsApp Business API', 'AI Agent Contact Delegation', 'Auto-Reply & Notification Triggers', 'Interactive Catalog Integration'],
      color: 'from-[#0077b6] to-[#005f92]',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Robotic Process Automation (RPA)',
      desc: 'Say goodbye to repetitive manual entries. We construct software workflows that sync documents, auto-parse file data, generate invoice reconciliations, and bridge legacy systems.',
      features: ['OCR Document Classification', 'No-code / Low-code Automation Pipelines', 'Automated Email & SMS Alerts', 'System-to-System Integration API'],
      color: 'from-[#0077b6] to-[#005f92]',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Custom AI Agents & Integrations',
      desc: 'Develop autonomous AI agents capable of performing multi-step tasks like drafting responses, researching files, validating system outputs, and updating database values automatically.',
      features: ['Multi-agent Task Orchestration', 'Custom API Connectors', 'Human-in-the-loop Safeguards', 'Real-time Vector Databases'],
      color: 'from-[#0077b6] to-[#005f92]',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const surveyInterests = [
    { id: 'chatbots', label: 'AI Chatbots & Customer Support' },
    { id: 'whatsapp', label: 'WhatsApp Automation & AI Agents' },
    { id: 'document', label: 'Document Parsing (OCR) & Data Sync' },
    { id: 'rpa', label: 'Workflow Automation (RPA)' },
    { id: 'llms', label: 'Custom GPTs & LLM Integrations' },
  ];

  const surveySteps = ['Capabilities', 'Goal', 'Your details'];

  const surveyGoals = [
    { id: 'costs', label: 'Reduce operational costs' },
    { id: 'productivity', label: 'Boost team productivity & eliminate manual tasks' },
    { id: 'retention', label: 'Improve customer experience & response times' },
    { id: 'capacity', label: 'Standardize & scale technical workflows' },
  ];

  const handleInterestToggle = (interestLabel) => {
    setSelectedInterests(prev =>
      prev.includes(interestLabel)
        ? prev.filter(i => i !== interestLabel)
        : [...prev, interestLabel]
    );
  };

  // Next is disabled until the step has an answer, so no warning popup is needed
  const handleNextStep = () => {
    if (surveyStep === 1 && selectedInterests.length === 0) return;
    if (surveyStep === 2 && !selectedGoal) return;
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
          } catch {
            // Response body was not JSON; keep the generic message
          }
          
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
          confirmButtonColor: '#0077b6',
          customClass: {
            popup: 'rounded-card',
            title: 'font-sans text-ink font-extrabold',
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
        confirmButtonColor: '#0077b6',
        customClass: {
          popup: 'rounded-card',
          title: 'font-sans text-ink font-extrabold',
          confirmButton: 'rounded-full px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
        }
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0077b6] selection:text-white overflow-hidden">
      <SEOHead
        canonicalPath="/services/ai-automation"
        jsonLd={aiAutomationJsonLd}
      />
      <Navbar />

      <PageBanner
        title="AI & Automation Services"
        crumbs={[{ name: 'Services', path: '/services' }, { name: 'AI & Automation' }]}
        variant="ai"
        description={[
          'We design, build and integrate custom AI systems, smart chatbots and automated software robots that remove bottlenecks and scale your business capacity.',
        ]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <ArrowButton href="#survey-section" variant="solid" className="justify-between">
            Take AI Survey
          </ArrowButton>
          <ArrowButton href="#services-detail" className="justify-between">
            Explore Capabilities
          </ArrowButton>
        </div>
      </PageBanner>

      {/* ── Centers of Excellence Style Services Carousel ── */}
      <section id="services-detail" className="py-20 md:py-28 relative border-t border-blue-100/50 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Title & Intro (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left">
              <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-[1.15] tracking-tight mb-5">
                Specialized Care. <br />
                Automation Excellence.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed mb-8 max-w-sm">
                Our advanced automated solutions provide specialized integrations using the latest technology and custom workflows for superior business outcomes.
              </p>
              
              <div className="flex items-center gap-6">
                <ArrowButton href="#survey-section">Explore Services</ArrowButton>
                
                {/* Navigation Arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollSlider('left')}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-650 hover:bg-slate-50 hover:border-slate-350 cursor-pointer transition-colors duration-300 ease-in-out"
                    aria-label="Scroll left"
                  >
                    <HiArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => scrollSlider('right')}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-650 hover:bg-slate-50 hover:border-slate-350 cursor-pointer transition-colors duration-300 ease-in-out"
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
                  return (
                    <div
                      key={cap.title}
                      className="w-[200px] sm:w-[230px] md:w-[244px] h-[360px] rounded-card overflow-hidden relative group shrink-0 snap-start border border-slate-100/50 cursor-pointer"
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
                      
                      {/* Bottom Text Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-[40%] z-10 text-left">
                        <h3 className="text-white text-base md:text-lg font-semibold group-hover:text-blue-300 transition-colors leading-tight">
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

      {/* ── AI needs survey: 3-step form ── */}
      <section id="survey-section" className="py-16 md:py-24 bg-sky scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
              What AI solutions interest you?
            </h2>
            <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
              Answer three quick questions and we&apos;ll send you a strategy outline tailored to your business.
            </p>
          </div>

          <div className="bg-white border border-line rounded-3xl shadow-[0_20px_50px_-20px_rgba(3,47,49,0.18)] p-6 sm:p-8 md:p-12 text-left">

            {/* Step indicator */}
            {!submitSuccess && (
              <ol className="flex items-center mb-10 md:mb-12" aria-label="Survey progress">
                {surveySteps.map((label, i) => {
                  const n = i + 1;
                  const done = surveyStep > n;
                  const current = surveyStep === n;
                  return (
                    <li key={label} className={`flex items-center ${i < surveySteps.length - 1 ? 'flex-1' : ''}`} aria-current={current ? 'step' : undefined}>
                      <span className="shrink-0" aria-label={`Step ${n}: ${label}`}>
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                            done ? 'bg-primary text-white' : current ? 'bg-primary text-white ring-4 ring-primary/15' : 'bg-sky text-muted border border-line'
                          }`}
                        >
                          {done ? <HiCheck size={16} aria-hidden="true" /> : n}
                        </span>
                      </span>
                      {i < surveySteps.length - 1 && (
                        <span className="flex-1 h-[2px] bg-line overflow-hidden" aria-hidden="true">
                          <span className={`block h-full bg-primary transition-[width] duration-500 ${done ? 'w-full' : 'w-0'}`} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <span className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-6">
                    <HiCheckCircle className="text-primary w-11 h-11" aria-hidden="true" />
                  </span>
                  <h3 className="text-ink text-[22px] font-semibold mb-3">Thanks, we&apos;ve got it!</h3>
                  <p className="text-body !text-[16px] max-w-md leading-relaxed mb-8">
                    We&apos;ll review your answers and get back to you with suggestions on how AI can fit into your workflow.
                  </p>
                  <ArrowButton
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSurveyStep(1);
                    }}
                  >
                    Submit another inquiry
                  </ArrowButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmitSurvey)}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <AnimatePresence mode="wait" initial={false}>

                    {/* STEP 1: CAPABILITIES (multi-select) */}
                    {surveyStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-ink text-xl md:text-[22px] font-semibold leading-snug mb-1.5">
                          Which AI capabilities do you want to implement?
                        </h3>
                        <p className="text-muted !text-[15px] mb-6">Choose all that apply.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {surveyInterests.map((interest) => {
                            const active = selectedInterests.includes(interest.label);
                            return (
                              <button
                                key={interest.id}
                                type="button"
                                role="checkbox"
                                aria-checked={active}
                                onClick={() => handleInterestToggle(interest.label)}
                                className={`flex items-center justify-between gap-4 text-left rounded-xl border px-5 py-4 min-h-[64px] cursor-pointer select-none transition-colors duration-200 ${
                                  active ? 'border-primary bg-primary-light' : 'border-line bg-white hover:border-primary/40'
                                }`}
                              >
                                <span className="text-[15px] font-medium text-ink leading-snug">{interest.label}</span>
                                <span
                                  aria-hidden="true"
                                  className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-colors duration-200 ${
                                    active ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {active && <HiCheck size={13} />}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex justify-end mt-10">
                          <ArrowButton variant="solid" onClick={handleNextStep} disabled={selectedInterests.length === 0}>
                            Next
                          </ArrowButton>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: MAIN GOAL (single choice) */}
                    {surveyStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-ink text-xl md:text-[22px] font-semibold leading-snug mb-1.5">
                          What is your main goal with AI?
                        </h3>
                        <p className="text-muted !text-[15px] mb-6">Pick the one that matters most.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" role="radiogroup" aria-label="Main goal with AI">
                          {surveyGoals.map((goal) => {
                            const active = selectedGoal === goal.label;
                            return (
                              <button
                                key={goal.id}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                onClick={() => setSelectedGoal(goal.label)}
                                className={`flex items-center justify-between gap-4 text-left rounded-xl border px-5 py-4 min-h-[64px] cursor-pointer select-none transition-colors duration-200 ${
                                  active ? 'border-primary bg-primary-light' : 'border-line bg-white hover:border-primary/40'
                                }`}
                              >
                                <span className="text-[15px] font-medium text-ink leading-snug">{goal.label}</span>
                                <span
                                  aria-hidden="true"
                                  className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors duration-200 ${
                                    active ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {active && <span className="w-2 h-2 rounded-full bg-white" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-10">
                          <button type="button" onClick={handlePrevStep} className={backBtnClass}>
                            <HiArrowLeft size={15} aria-hidden="true" /> Back
                          </button>
                          <ArrowButton variant="solid" onClick={handleNextStep} disabled={!selectedGoal}>
                            Next
                          </ArrowButton>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: CONTACT DETAILS */}
                    {surveyStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="text-ink text-xl md:text-[22px] font-semibold leading-snug mb-1.5">
                          Where should we send your outline?
                        </h3>
                        <p className="text-muted !text-[15px] mb-6">A few details and we&apos;ll get in touch.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                          <div>
                            <label htmlFor="survey-name" className={labelClass}>Name</label>
                            <input
                              id="survey-name"
                              type="text"
                              autoComplete="name"
                              {...register('name', { required: 'Name is required' })}
                              placeholder="Your name"
                              aria-invalid={!!errors.name}
                              className={`${inputClass} ${errors.name ? '!border-red-400' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
                          </div>

                          <div>
                            <label htmlFor="survey-email" className={labelClass}>Email</label>
                            <input
                              id="survey-email"
                              type="email"
                              autoComplete="email"
                              {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                              })}
                              placeholder="you@company.com"
                              aria-invalid={!!errors.email}
                              className={`${inputClass} ${errors.email ? '!border-red-400' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
                          </div>

                          {/* Phone with country code dropdown */}
                          <div>
                            <label htmlFor="survey-phone" className={labelClass}>Phone</label>
                            <div
                              className={`flex items-center h-12 bg-white border rounded-xl transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 ${
                                errors.phone ? 'border-red-400' : 'border-line hover:border-[#b9dcee]'
                              }`}
                            >
                              <div ref={dropdownRef} className="relative h-full">
                                <button
                                  type="button"
                                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                  aria-haspopup="listbox"
                                  aria-expanded={showCountryDropdown}
                                  aria-label={`Country code ${selectedCountry.code}`}
                                  className="h-full flex items-center gap-1.5 pl-3.5 pr-3 border-r border-line text-ink text-sm font-medium rounded-l-xl hover:bg-sky focus:outline-none cursor-pointer"
                                >
                                  {selectedCountry.flag}
                                  <span>{selectedCountry.code}</span>
                                </button>

                                {showCountryDropdown && (
                                  <div role="listbox" className="absolute left-0 bottom-full mb-2 bg-white border border-line rounded-xl shadow-[0_12px_32px_-8px_rgba(3,47,49,0.22)] z-50 py-1 min-w-[190px] max-h-48 overflow-y-auto">
                                    {countries.map((c) => (
                                      <button
                                        key={c.code}
                                        type="button"
                                        role="option"
                                        aria-selected={c.code === selectedCountry.code}
                                        onClick={() => {
                                          setSelectedCountry(c);
                                          setShowCountryDropdown(false);
                                        }}
                                        className="w-full text-left px-3.5 py-2.5 text-sm hover:bg-sky flex items-center gap-2.5 text-ink cursor-pointer"
                                      >
                                        {c.flag}
                                        <span className="font-medium">{c.code}</span>
                                        <span className="text-muted">{c.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <input
                                id="survey-phone"
                                type="tel"
                                autoComplete="tel-national"
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
                                placeholder={selectedCountry.placeholder}
                                aria-invalid={!!errors.phone}
                                className="w-full min-w-0 bg-transparent h-full px-3.5 text-ink placeholder:text-slate-400 focus:outline-none text-[15px] rounded-r-xl"
                              />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="survey-message" className={labelClass}>
                            About your business <span className="font-normal text-muted">(optional)</span>
                          </label>
                          <textarea
                            id="survey-message"
                            {...register('message')}
                            placeholder="What do you want to automate?"
                            rows={3}
                            className={`${inputClass} !h-auto py-3.5 resize-y min-h-[110px] leading-relaxed`}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-10">
                          <button type="button" onClick={handlePrevStep} className={backBtnClass}>
                            <HiArrowLeft size={15} aria-hidden="true" /> Back
                          </button>
                          <ArrowButton type="submit" variant="solid" loading={isSubmittingForm}>
                            {isSubmittingForm ? 'Sending' : 'Send survey'}
                          </ArrowButton>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </motion.form>
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
