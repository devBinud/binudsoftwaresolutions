import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiMail, HiPhone, HiChatAlt2, HiShieldCheck, HiPaperClip } from 'react-icons/hi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import cufBg from '../assets/cuf-form-background.svg';

const socials = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
];

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
  </svg>
);

const ConnectSection = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  
  const countries = [
    { code: '+91', flag: <IndiaFlag />, name: 'India' },
    { code: '+1', flag: <USFlag />, name: 'United States' },
    { code: '+61', flag: <AUFlag />, name: 'Australia' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [wantNda, setWantNda] = useState(false);
  const [preferredComm, setPreferredComm] = useState('Any');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data) => {
    try {
      const fullPhone = `${selectedCountry.code} ${data.phone || ''}`.trim();

      let emailSuccess = false;
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            purpose: 'Consultation Inquiry',
            name: data.name,
            email: data.email,
            company: data.company || 'N/A',
            phone: fullPhone,
            message: data.message,
            ndaRequested: wantNda ? 'Yes' : 'No',
            preferredComm: preferredComm,
          }),
        });

        if (response.ok) {
          emailSuccess = true;
        } else if (import.meta.env.DEV) {
          emailSuccess = true;
        }
      } catch (err) {
        if (import.meta.env.DEV) emailSuccess = true;
      }

      if (emailSuccess) {
        try {
          await addDoc(collection(db, 'messages'), {
            name: data.name,
            email: data.email,
            company: data.company || '',
            phone: fullPhone,
            message: data.message,
            ndaRequested: wantNda,
            preferredComm: preferredComm,
            createdAt: serverTimestamp(),
            read: false,
          });
        } catch (_) {}

        await Swal.fire({
          title: 'Consultation Request Sent!',
          text: 'Thank you for reaching out. Our software team will contact you shortly.',
          icon: 'success',
          confirmButtonText: 'Great!',
          confirmButtonColor: '#005eb8',
          customClass: {
            confirmButton: 'rounded-none px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
          }
        });
        reset();
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    }
  };

  return (
    <section 
      className="relative py-16 md:py-24 bg-cover bg-center overflow-hidden font-sans border-t border-slate-200/60"
      style={{ backgroundImage: `url(${cufBg})` }}
    >
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left Column: Consultation Form Card (8 cols) ── */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10 text-left relative">
            
            {/* Top Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-[#191919] text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  Need a Consultation on Your Software Project?
                </h2>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Drop us a line! We are here to answer your questions 24/7.
                </p>
              </div>

              {/* Verified & Secured Badge */}
              <div className="shrink-0 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 shadow-sm">
                <HiShieldCheck size={16} className="text-emerald-600" />
                <span>VERIFIED &amp; SECURED</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Main Message Box */}
              <div>
                <div className="border border-slate-300 focus-within:border-[#005eb8] transition-colors p-3 bg-slate-50/50">
                  <textarea
                    {...register('message', { required: 'Please describe how we can help you' })}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium resize-none"
                  />
                  
                  {/* File Drag & Drop Hint Line */}
                  <div className="pt-2 border-t border-dashed border-slate-300 flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <HiPaperClip size={16} className="text-[#005eb8]" />
                    <span>Drag and drop or <button type="button" className="text-[#005eb8] font-bold underline cursor-pointer">browse</button> to upload your file(s)</span>
                  </div>
                </div>
                {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message.message}</p>}
              </div>

              {/* NDA Toggle Switch */}
              <div className="flex items-center gap-3 pt-1">
                <label className="text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                  I'd like to sign an NDA
                </label>
                <button
                  type="button"
                  onClick={() => setWantNda(!wantNda)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                    wantNda ? 'bg-[#005eb8]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      wantNda ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2x2 Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <input
                    type="text"
                    {...register('name', { required: 'Full name is required' })}
                    placeholder="Full name *"
                    className="w-full border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:border-[#005eb8] focus:outline-none bg-white transition-colors"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>}
                </div>

                {/* Company */}
                <div>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="Company"
                    className="w-full border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:border-[#005eb8] focus:outline-none bg-white transition-colors"
                  />
                </div>

                {/* Work email */}
                <div>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Work email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    placeholder="Work email *"
                    className="w-full border border-slate-300 px-4 py-3 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:border-[#005eb8] focus:outline-none bg-white transition-colors"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
                </div>

                {/* Phone number */}
                <div className="relative flex border border-slate-300 focus-within:border-[#005eb8] bg-white transition-colors">
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="h-full px-3 flex items-center gap-1.5 border-r border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute left-0 top-full mt-1 bg-white border border-slate-200 shadow-xl z-50 py-1 min-w-[140px]">
                        {countries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setShowCountryDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                          >
                            <span>{c.flag}</span>
                            <span>{c.code}</span>
                            <span>({c.name})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder="Phone number *"
                    className="w-full px-4 py-3 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Preferred way of communication */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 font-medium pt-2">
                <span className="font-bold text-slate-800">Preferred way of communication:</span>
                {['Any', 'E-Mail', 'Phone'].map((mode) => (
                  <label key={mode} className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="communication"
                      value={mode}
                      checked={preferredComm === mode}
                      onChange={() => setPreferredComm(mode)}
                      className="accent-[#005eb8]"
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#f8c543] hover:bg-[#ebb52d] text-slate-900 font-extrabold text-sm uppercase tracking-wider px-10 py-3.5 rounded-none border border-[#e0af34] transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'Send'}
                </button>
              </div>

            </form>
          </div>

          {/* ── Right Column: Get in touch instantly (4 cols) ── */}
          <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-slate-200 p-6 sm:p-8 text-left space-y-6 shadow-sm">
            <h3 className="text-[#191919] text-xl font-black tracking-tight border-b border-slate-200 pb-4">
              Get in touch instantly
            </h3>

            <div className="space-y-4 text-sm font-bold text-slate-700">
              
              {/* Call us */}
              <a 
                href="tel:+919706393924"
                className="flex items-center gap-3.5 p-3 hover:bg-slate-50 border border-transparent hover:border-[#005eb8] transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#005eb8] text-white flex items-center justify-center shrink-0 group-hover:bg-[#00488e] transition-colors">
                  <HiPhone size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Call us</div>
                  <div className="text-slate-900 group-hover:text-[#005eb8] transition-colors text-xs sm:text-sm font-bold truncate">
                    +91 97063 93924
                  </div>
                </div>
              </a>

              {/* Email us */}
              <a 
                href="mailto:binudsoftwaresolutions@gmail.com"
                className="flex items-center gap-3.5 p-3 hover:bg-slate-50 border border-transparent hover:border-[#005eb8] transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#005eb8] text-white flex items-center justify-center shrink-0 group-hover:bg-[#00488e] transition-colors">
                  <HiMail size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Email us</div>
                  <div className="text-slate-900 group-hover:text-[#005eb8] transition-colors text-xs sm:text-sm font-bold truncate">
                    binudsoftwaresolutions@gmail.com
                  </div>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/919706393924" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 hover:bg-slate-50 border border-transparent hover:border-[#005eb8] transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#005eb8] text-white flex items-center justify-center shrink-0 group-hover:bg-[#00488e] transition-colors">
                  <FaWhatsapp size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">WhatsApp</div>
                  <div className="text-slate-900 group-hover:text-[#005eb8] transition-colors text-xs sm:text-sm font-bold truncate">
                    Chat on WhatsApp
                  </div>
                </div>
              </a>

              {/* Live Chat */}
              <a 
                href="mailto:binudsoftwaresolutions@gmail.com"
                className="flex items-center gap-3.5 p-3 hover:bg-slate-50 border border-transparent hover:border-[#005eb8] transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#005eb8] text-white flex items-center justify-center shrink-0 group-hover:bg-[#00488e] transition-colors">
                  <HiChatAlt2 size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Live chat</div>
                  <div className="text-slate-900 group-hover:text-[#005eb8] transition-colors text-xs sm:text-sm font-bold truncate">
                    Direct Support
                  </div>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
