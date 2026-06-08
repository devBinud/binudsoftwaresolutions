import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import binud from '../assets/team/binud.png';
import founderSectionBg from '../assets/founder_section_bg.jpg';
const socials = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
];

const ConnectSection = ({ hideVision = false, onlySocials = false, hideForm = false }) => {
  const shouldHideVision = hideVision || onlySocials;
  const shouldHideForm = onlySocials || hideForm;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  
  const countries = [
    { code: '+91', flag: '🇮🇳', name: 'India', placeholder: '98765 43210' },
    { code: '+61', flag: '🇦🇺', name: 'Australia', placeholder: '0416 555 222' },
    { code: '+1', flag: '🇺🇸', name: 'United States', placeholder: '201 555 0123' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom', placeholder: '7911 123456' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
      const fullPhone = `${selectedCountry.code} ${data.phone || ''}`.trim();

      // 1. Send email via SMTP (Vercel Serverless Function)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: data.purpose,
          name: data.name,
          email: data.email,
          phone: fullPhone,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      // 2. Also save to Firestore 'messages' collection for Admin Dashboard
      try {
        await addDoc(collection(db, 'messages'), {
          purpose: data.purpose,
          name: data.name,
          email: data.email,
          phone: fullPhone,
          message: data.message,
          createdAt: serverTimestamp(),
          read: false,
        });
      } catch (dbError) {
        // Non-critical: email already sent, just log the DB error
        console.warn('Firestore save failed (non-critical):', dbError);
      }

      setSubmitStatus('success');
      toast.success('✅ Message sent! We\'ll get back to you soon.');
      reset();
      setSelectedCountry(countries[0]);
      // Auto-clear success message after 6 seconds
      setTimeout(() => setSubmitStatus(null), 6000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      toast.error('❌ Failed to send. Please try again or email us directly.');
    }
  };

  return (
    <section className={`${shouldHideVision ? 'bg-white' : 'bg-[#0c0818]'} pt-0 select-none overflow-hidden`}>
      
      {/* Founder's Vision Outer Wrapper (Full width relative container for background image) */}
      {!shouldHideVision && (
        <div className="relative w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={founderSectionBg} 
            alt="" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity" 
          />
          {/* Modern dark gradient overlay with subtle purple tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0818] via-[#0c0818]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0818] via-[#0c0818]/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(105,93,211,0.15),transparent_50%)]" />
        </div>

        {/* Founder's Vision & Pillars Section (Dark Theme) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20 md:pt-32 md:pb-24 text-left relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Founder Quote & Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[#8075e3] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4 inline-block">
                Founder's Vision
              </span>
              <h2 className="text-white text-3xl sm:text-[40px] font-medium leading-tight tracking-tight mb-8 font-sans">
                "We don't just ship features — <br className="hidden sm:inline" />
                we shape your digital future."
              </h2>
              
              <blockquote className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-medium max-w-2xl border-l-4 border-[#695dd3] pl-6 italic">
                "We believe in writing clean code that stands the test of time, designing architectures that scale infinitely, and building relationships based on absolute trust. Our mission is to convert complex challenges into scalable, elegant technology solutions that drive real business growth."
              </blockquote>
              
              <div className="pl-6">
                <h4 style={{ fontFamily: "'Dancing Script', cursive" }} className="text-white text-2xl font-bold">Binud Panging</h4>
              </div>
            </div>

            {/* Right Column: Founder's Profile Card (TechVariable Style) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#695dd3] via-[#8075e3] to-[#9d4edd] shadow-2xl">
                {/* Card light overlay & grid pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
                
                {/* Founder Photo Cutout */}
                <img 
                  src={binud} 
                  alt="Binud Panging" 
                  className="absolute inset-x-0 bottom-[90px] h-[78%] object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                />
                
                {/* Frosted Glass Overlay Card — compact, sits cleanly at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md border-t border-white/40 rounded-b-[32px] py-3 px-4 text-center z-20">
                  <h3 className="text-slate-900 text-lg sm:text-xl font-bold font-sans tracking-tight mb-1">
                    Binud Panging
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold mb-3">
                    Founder & CEO, Binud Software Solutions
                  </p>
                  
                  {/* Social Buttons */}
                  <div className="flex justify-center gap-2">
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-7 h-7 rounded bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={14} />
                    </a>
                    <a 
                      href="https://x.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-7 h-7 rounded bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
                      title="X (Twitter)"
                    >
                      <FaXTwitter size={13} />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-7 h-7 rounded bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
                      title="Facebook"
                    >
                      <FaFacebook size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      )}

      {/* Rounded white card wrapper sitting on dark background */}
      <div className={`${shouldHideVision ? 'bg-white ' + (shouldHideForm ? 'pt-8' : 'pt-12 md:pt-16') : 'bg-white rounded-t-[40px] md:rounded-t-[60px] ' + (shouldHideForm ? 'pt-12 md:pt-16' : 'pt-20 md:pt-28')} pb-16 md:pb-24 px-6 md:px-12 relative z-10`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          {!shouldHideForm && (
            <div className="text-center mb-20">
              <h2 className="text-[#3E4265] text-4xl sm:text-[46px] font-medium tracking-tight mb-4 font-sans">
                Let's Connect!
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium font-sans">
                Use the form below, or send us an email
              </p>
            </div>
          )}

          {/* Form */}
          {/* Form */}
          {!shouldHideForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto mb-28">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-12">
                {/* Purpose of Contact */}
                <div className="relative">
                  <input 
                    type="text" 
                    {...register('purpose', { required: 'Purpose of contact is required' })}
                    placeholder="Purpose of Contact"
                    className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-800 placeholder-slate-400 focus:border-[#3E4265] focus:outline-none transition-all duration-300 font-sans text-base sm:text-[17px]"
                  />
                  {errors.purpose && <p className="text-red-500 text-xs mt-1 font-semibold absolute">{errors.purpose.message}</p>}
                </div>

                {/* Your Name */}
                <div className="relative">
                  <input 
                    type="text" 
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-800 placeholder-slate-400 focus:border-[#3E4265] focus:outline-none transition-all duration-300 font-sans text-base sm:text-[17px]"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold absolute">{errors.name.message}</p>}
                </div>

                {/* Your Email */}
                <div className="relative">
                  <input 
                    type="email" 
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    placeholder="Your Email"
                    className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-800 placeholder-slate-400 focus:border-[#3E4265] focus:outline-none transition-all duration-300 font-sans text-base sm:text-[17px]"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold absolute">{errors.email.message}</p>}
                </div>

                {/* Phone Number with custom flag dropdown */}
                <div className="relative">
                  <div className="flex items-end border-b border-slate-200 focus-within:border-[#3E4265] transition-all duration-300">
                    <div ref={dropdownRef} className="relative pb-1">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-1.5 pb-3 pr-1 text-slate-800 hover:text-slate-600 font-sans text-base sm:text-[17px] font-medium focus:outline-none cursor-pointer"
                      >
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <span className="text-[9px] text-slate-400 ml-0.5">▼</span>
                      </button>
                      
                      {showCountryDropdown && (
                        <div className="absolute left-0 bottom-full mb-2 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1.5 min-w-[160px]">
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
                              <span className="text-slate-400 font-sans">({c.name})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="h-5 w-[1px] bg-slate-200 mx-2 mb-3.5" />
                    
                    <input 
                      type="tel" 
                      maxLength={10}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Phone number must be exactly 10 digits'
                        }
                      })}
                      placeholder=""
                      className="w-full bg-transparent pb-3 text-slate-800 placeholder-slate-400 focus:outline-none font-sans text-base sm:text-[17px]"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold absolute">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Tell us about your project */}
              <div className="relative mb-14">
                <textarea 
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Tell us about your project"
                  rows={2}
                  className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 placeholder-slate-400 focus:border-[#3E4265] focus:outline-none transition-all duration-300 font-sans text-base sm:text-[17px] resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold absolute">{errors.message.message}</p>}
              </div>

              {/* Send Request Button + Status Message */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-[#3E4265] text-[#3E4265] font-bold text-xs sm:text-[13px] tracking-wider px-9 py-3.5 rounded-full hover:bg-[#3E4265] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none uppercase w-fit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      SENDING...
                    </span>
                  ) : 'SEND REQUEST'}
                </button>

                {/* Inline Status Message */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm animate-fadeIn">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message sent! We'll get back to you soon.</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 font-semibold text-sm animate-fadeIn">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Failed to send. Please try again or email <a href="mailto:binudp.dev@gmail.com" className="underline">binudp.dev@gmail.com</a>.</span>
                  </div>
                )}
              </div>
            </form>
          )}


          {/* Social Links (matching the design in the reference image) */}
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start ${shouldHideForm ? 'pt-4' : 'pt-16 border-t border-slate-100'}`}>
            {/* Left Column: Header */}
            <div className="lg:col-span-5 text-left">
              <h3 className="text-[#3E4265]/80 text-4xl sm:text-[46px] font-medium leading-tight tracking-tight font-sans">
                Stay Connected
              </h3>
            </div>

            {/* Right Column: Bordered Social Rows */}
            <div className="lg:col-span-7 w-full flex flex-col">
              <div className="border-t border-slate-200 w-full" />
              {socials.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center justify-between py-8 border-b border-slate-200 hover:border-[#3E4265] text-slate-400 hover:text-[#3E4265] group transition-all duration-300 w-full"
                >
                  {/* Social Name & Diagonal Arrow */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-medium tracking-tight font-sans transition-colors duration-300">
                      {social.name}
                    </span>
                    {/* Diagonal Up-Right Arrow Icon appears on hover next to name */}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#3E4265]">
                      <svg className="w-6 h-6 sm:w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </div>
                  
                  {/* Social Icon (No border, directly right-aligned) */}
                  <div className="text-slate-400 group-hover:text-[#3E4265] shrink-0 transition-colors duration-300">
                    <social.icon size={28} className="transform group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectSection;


