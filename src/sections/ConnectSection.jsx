import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { HiMail, HiPhone, HiPaperClip, HiChevronDown, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { loadFirestore } from '../firebase/loadFirestore';
import ArrowButton from '../components/ArrowButton';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

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
  const [attachedFiles, setAttachedFiles] = useState([]);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const fullPhone = `${selectedCountry.code} ${data.phone || ''}`.trim();
      const fileNames = attachedFiles.map((f) => f.name).join(', ');

      // 1. Try sending via Email API (non-blocking)
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            purpose: 'Consultation Inquiry',
            name: data.name,
            email: data.email,
            company: data.company || 'N/A',
            phone: fullPhone,
            message: data.message,
            filesAttached: fileNames || 'None',
            ndaRequested: wantNda ? 'Yes' : 'No',
            preferredComm: preferredComm,
          }),
        });
      } catch (err) {
        console.warn('Backend email endpoint not reachable, continuing:', err);
      }

      // 2. Save to Firestore (only if Firebase is configured with real credentials)
      const isFirebaseConfigured =
        import.meta.env.VITE_FIREBASE_PROJECT_ID &&
        import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'YOUR_PROJECT_ID';

      if (isFirebaseConfigured) {
        try {
          const { db, addDoc, collection, serverTimestamp } = await loadFirestore();
          const dbPromise = addDoc(collection(db, 'messages'), {
            name: data.name,
            email: data.email,
            company: data.company || '',
            phone: fullPhone,
            message: data.message,
            filesAttached: fileNames || 'None',
            ndaRequested: wantNda,
            preferredComm: preferredComm,
            createdAt: serverTimestamp(),
            read: false,
          });

          // 3.5s timeout safeguard so UI never hangs indefinitely
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore timeout')), 3500)
          );

          await Promise.race([dbPromise, timeoutPromise]);
        } catch (dbError) {
          console.warn('Firestore save timed out (non-critical):', dbError);
        }
      }

      // 3. Local storage fallback backup
      try {
        const localInquiries = JSON.parse(localStorage.getItem('binud_consultation_inquiries') || '[]');
        localInquiries.unshift({
          name: data.name,
          email: data.email,
          company: data.company || '',
          phone: fullPhone,
          message: data.message,
          filesAttached: fileNames || 'None',
          ndaRequested: wantNda,
          preferredComm: preferredComm,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('binud_consultation_inquiries', JSON.stringify(localInquiries.slice(0, 50)));
      } catch {
        // Local storage unavailable (private mode or blocked): skip the backup copy
      }

      // 4. Show success notification
      await Swal.fire({
        title: 'Consultation Request Sent!',
        text: 'Thank you for reaching out. Our software team will contact you shortly.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#0077b6',
        customClass: {
          confirmButton: 'rounded-card px-8 py-3 text-xs uppercase font-extrabold tracking-wider',
        },
      });

      reset();
      setAttachedFiles([]);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const fieldClass = (hasError) =>
    `w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-slate-400 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 ${
      hasError ? 'border-red-400' : 'border-line hover:border-[#b9dcee]'
    }`;
  const labelClass = 'block text-sm font-medium text-ink mb-2';
  const errorClass = 'text-red-500 text-xs mt-1.5';

  const contactMethods = [
    { label: 'Call us', value: '+91 97063 93924', href: 'tel:+919706393924', icon: HiPhone },
    { label: 'Email us', value: 'binudsoftwaresolutions@gmail.com', href: 'mailto:binudsoftwaresolutions@gmail.com', icon: HiMail },
    { label: 'WhatsApp', value: 'Chat with us on WhatsApp', href: 'https://wa.me/919706393924', icon: FaWhatsapp, external: true },
  ];

  return (
    <section className="py-16 md:py-24 bg-sky font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Left: intro + direct contact ── */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-28">
            <span className="block text-primary text-sm font-medium mb-3">Contact us</span>
            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold tracking-tight leading-tight mb-4">
              Need a consultation on your software project?
            </h2>
            <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8] mb-8">
              Tell us a little about what you are building. Our team will review your request and get back to you
              with clear next steps.
            </p>

            <ul className="rounded-2xl bg-white border border-line overflow-hidden">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <li key={method.label}>
                    <a
                      href={method.href}
                      {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-200 hover:bg-sky"
                    >
                      <span className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted">{method.label}</span>
                        <span className="block text-[15px] font-medium text-ink truncate">{method.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line p-6 sm:p-8 md:p-10 text-left">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cf-name" className={labelClass}>Full name <span className="text-red-500">*</span></label>
                  <input
                    id="cf-name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register('name', { required: 'Full name is required' })}
                    placeholder="Your name"
                    className={fieldClass(errors.name)}
                  />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="cf-company" className={labelClass}>Company</label>
                  <input
                    id="cf-company"
                    type="text"
                    autoComplete="organization"
                    {...register('company')}
                    placeholder="Company name"
                    className={fieldClass(false)}
                  />
                </div>

                <div>
                  <label htmlFor="cf-email" className={labelClass}>Work email <span className="text-red-500">*</span></label>
                  <input
                    id="cf-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register('email', {
                      required: 'Work email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' },
                    })}
                    placeholder="you@company.com"
                    className={fieldClass(errors.email)}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="cf-phone" className={labelClass}>Phone number <span className="text-red-500">*</span></label>
                  <div
                    className={`relative flex h-12 rounded-xl border bg-white transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 ${
                      errors.phone ? 'border-red-400' : 'border-line hover:border-[#b9dcee]'
                    }`}
                  >
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={showCountryDropdown}
                        aria-label={`Country code ${selectedCountry.code}`}
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="h-full pl-3.5 pr-3 rounded-l-xl flex items-center gap-2 border-r border-line text-sm font-medium text-ink hover:bg-sky cursor-pointer"
                      >
                        {selectedCountry.flag}
                        <span>{selectedCountry.code}</span>
                        <HiChevronDown size={14} className="text-muted" aria-hidden="true" />
                      </button>

                      {showCountryDropdown && (
                        <ul role="listbox" className="absolute left-0 top-full mt-2 bg-white rounded-xl overflow-hidden border border-line z-50 py-1 min-w-[190px]">
                          {countries.map((c) => (
                            <li key={c.code}>
                              <button
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
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <input
                      id="cf-phone"
                      type="tel"
                      autoComplete="tel-national"
                      aria-invalid={!!errors.phone}
                      {...register('phone', { required: 'Phone number is required' })}
                      placeholder="98765 43210"
                      className="w-full min-w-0 px-4 text-[15px] text-ink placeholder:text-slate-400 bg-transparent focus:outline-none rounded-r-xl"
                    />
                  </div>
                  {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="cf-message" className={labelClass}>How can we help you? <span className="text-red-500">*</span></label>
                <textarea
                  id="cf-message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  {...register('message', { required: 'Please describe how we can help you' })}
                  placeholder="Tell us about your project, goals and timeline…"
                  className={`${fieldClass(errors.message)} h-auto py-3.5 resize-y min-h-[140px] leading-relaxed`}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </div>

              {/* Attachments */}
              <div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-sm transition-colors ${
                    isDragging ? 'border-primary bg-primary-light' : 'border-[#b9dcee] bg-sky/60'
                  }`}
                >
                  <HiPaperClip size={18} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="text-body">
                    Drag and drop files here, or{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-primary font-medium underline underline-offset-2 cursor-pointer"
                    >
                      browse
                    </button>
                  </span>
                  <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
                </div>

                {attachedFiles.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-3">
                    {attachedFiles.map((file, idx) => (
                      <li
                        key={`${file.name}-${idx}`}
                        className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1 rounded-full bg-primary-light text-primary text-xs font-medium"
                      >
                        <span className="truncate max-w-[180px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          aria-label={`Remove ${file.name}`}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/70 cursor-pointer"
                        >
                          <HiX size={12} aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <fieldset>
                  <legend className={labelClass}>Preferred way to reach you</legend>
                  <div className="inline-flex p-1 rounded-xl bg-sky border border-line" role="radiogroup">
                    {['Any', 'E-Mail', 'Phone'].map((mode) => (
                      <label
                        key={mode}
                        className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                          preferredComm === mode ? 'bg-white text-primary font-medium ' : 'text-body hover:text-ink'
                        }`}
                      >
                        <input
                          type="radio"
                          name="communication"
                          value={mode}
                          checked={preferredComm === mode}
                          onChange={() => setPreferredComm(mode)}
                          className="sr-only"
                        />
                        {mode === 'E-Mail' ? 'Email' : mode}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <span className={labelClass} id="nda-label">Confidentiality</span>
                  <div className="flex items-center justify-between gap-3 h-[46px] px-4 rounded-xl border border-line">
                    <span className="text-sm text-body">I&apos;d like to sign an NDA</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={wantNda}
                      aria-labelledby="nda-label"
                      onClick={() => setWantNda(!wantNda)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer shrink-0 ${
                        wantNda ? 'bg-primary' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
                          wantNda ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                <p className="!text-xs text-muted">
                  By sending this form you agree to our{' '}
                  <Link to="/privacy" className="text-primary underline underline-offset-2">Privacy Policy</Link>.
                </p>
                <ArrowButton type="submit" variant="solid" loading={isSubmitting} disabled={isSubmitting} className="justify-between sm:min-w-[190px]">
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </ArrowButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
