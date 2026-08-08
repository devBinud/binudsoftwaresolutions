import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  HiX, 
  HiArrowLeft, 
  HiArrowRight, 
  HiLockClosed, 
  HiLockOpen, 
  HiShieldCheck, 
  HiKey, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiEye,
  HiEyeOff
} from 'react-icons/hi';

// Import local images from assets/gallery
import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import bannerBgImage from '../assets/bg4.jpg';

// Import hostel memories images
import hostel1 from '../assets/gallery/hostel_memories/1.jpeg';
import hostel2 from '../assets/gallery/hostel_memories/2.jpeg';
import hostel3 from '../assets/gallery/hostel_memories/3.jpeg';
import hostel4 from '../assets/gallery/hostel_memories/4.jpeg';
import hostel5 from '../assets/gallery/hostel_memories/5.jpeg';
import hostel6 from '../assets/gallery/hostel_memories/6.jpeg';
import hostel7 from '../assets/gallery/hostel_memories/7.jpeg';
import hostel8 from '../assets/gallery/hostel_memories/8.jpeg';
import hostel9 from '../assets/gallery/hostel_memories/9.jpeg';
import hostel10 from '../assets/gallery/hostel_memories/10.jpeg';
import hostel11 from '../assets/gallery/hostel_memories/11.jpeg';
import hostel12 from '../assets/gallery/hostel_memories/12.jpeg';
import hostel13 from '../assets/gallery/hostel_memories/13.jpeg';
import hostel14 from '../assets/gallery/hostel_memories/14.jpeg';
import hostel15 from '../assets/gallery/hostel_memories/15.jpeg';
import hostel16 from '../assets/gallery/hostel_memories/16.jpeg';
import hostel17 from '../assets/gallery/hostel_memories/17.jpeg';
import hostel18 from '../assets/gallery/hostel_memories/18.jpeg';
import hostel19 from '../assets/gallery/hostel_memories/19.jpeg';
import hostel20 from '../assets/gallery/hostel_memories/20.jpeg';
import hostel21 from '../assets/gallery/hostel_memories/21.jpeg';

/**
 * Secret passcode for academic/hostel memories
 */
const ACADEMIC_ACCESS_PIN = '393924';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    label: 'Full Team of Codepilot Technologies',
    src: img1,
    sub: 'Memories of working at Codepilot Technologies',
    category: 'professional',
  },
  {
    id: 2,
    type: 'image',
    label: 'Core Development Team Sync',
    src: img2,
    sub: 'Memories of working at Codepilot Technologies',
    category: 'professional',
  },
  {
    id: 3,
    type: 'image',
    label: "Fun Reel Concept: The 'Angry Team'",
    src: img3,
    sub: 'Memories of working at Codepilot Technologies',
    category: 'professional',
  },
  {
    id: 4,
    type: 'image',
    label: 'Final year hostel 1 farewell photoshoot 2015-19 batch',
    src: hostel1,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 5,
    type: 'image',
    label: 'Clips of Farewell photoshoot event',
    src: hostel2,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 6,
    type: 'image',
    label: 'Football match in last year (Hostel1 Vs Hostel2)',
    src: hostel3,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 7,
    type: 'image',
    label: 'Football match in last year (Hostel1 Vs Hostel2) - Action Clip',
    src: hostel4,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 8,
    type: 'image',
    label: '1st year AEC College Night',
    src: hostel5,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 9,
    type: 'image',
    label: '1st year AEC College Night - Performing as Dhulia',
    src: hostel6,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 10,
    type: 'image',
    label: 'Last year Picnic trip photo',
    src: hostel7,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 11,
    type: 'image',
    label: 'Won Medal on Cleanliness: Hostel 1 Award celebration moment',
    src: hostel8,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 12,
    type: 'image',
    label: 'First year memories at Deepor Beel',
    src: hostel9,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 13,
    type: 'image',
    label: 'Sivsagar Trip: Planned during third year',
    src: hostel10,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 14,
    type: 'image',
    label: 'Photoshoot with first year students during farewell',
    src: hostel11,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 15,
    type: 'image',
    label: 'Hostel Picnic photoshoot',
    src: hostel12,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 16,
    type: 'image',
    label: 'Hostel Picnic photoshoot - Fun moments',
    src: hostel13,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 17,
    type: 'image',
    label: 'First year memories at Deepor Beel - Group photo',
    src: hostel14,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 18,
    type: 'image',
    label: 'Farewell photoshoot',
    src: hostel15,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 19,
    type: 'image',
    label: '2020 Satyanarayan Puja at AEC Hostel 1',
    src: hostel16,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 20,
    type: 'image',
    label: 'Mising Community Picnic in second semester, 2016',
    src: hostel17,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 21,
    type: 'image',
    label: 'Hostel Birthday Celebration',
    src: hostel18,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 22,
    type: 'image',
    label: 'Farewell photoshoot - Batch moments',
    src: hostel19,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 23,
    type: 'image',
    label: "Farewell Photoshoot - Making '1' in Assamese representing Hostel 1",
    src: hostel20,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
  {
    id: 24,
    type: 'image',
    label: 'Farewell photoshoot at Chemical Engineering Building, AEC',
    src: hostel21,
    sub: 'Academic Days · Hostel Memories',
    category: 'college',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Lightbox Component ──────────────────────────────────────
const Lightbox = ({ items, activeIndex, onClose }) => {
  const [current, setCurrent] = useState(activeIndex);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const item = items[current] || items[0];
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 md:bg-white/10 md:hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Close"
      >
        <HiX size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-white/70 text-sm font-bold tracking-wider select-none">
        {current + 1} / {items.length}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-4 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 md:bg-white/10 md:hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Previous"
      >
        <HiArrowLeft size={22} />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-4 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 md:bg-white/10 md:hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Next"
      >
        <HiArrowRight size={22} />
      </button>

      {/* Image Container with Swipe / Drag Support */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(e, info) => {
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) {
              next();
            } else if (info.offset.x > swipeThreshold) {
              prev();
            }
          }}
          className="relative z-10 flex flex-col items-center max-w-5xl w-full px-4 md:px-16 cursor-grab active:cursor-grabbing select-none"
        >
          <img
            src={item.src}
            alt={item.label}
            className="w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/5"
            draggable={false}
          />
          {/* Caption */}
          <div className="mt-4 px-4 text-center flex items-center justify-center text-white/80 text-xs md:text-sm font-semibold leading-relaxed">
            <span>{item.label}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip - hidden on mobile */}
      {items.length <= 30 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-1.5 max-w-[90vw] overflow-x-auto py-1">
          {items.map((t, i) => (
            <button
              key={t.id || i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ImageGallery',
      '@id': 'https://binudsoftwaresolutions.in/gallery#gallery',
      'name': 'Team Memories Gallery',
      'url': 'https://binudsoftwaresolutions.in/gallery',
      'description': 'A visual journey through professional teamwork at Codepilot Technologies and the foundation of Binud Software Solutions.',
      'creator': {
        '@type': 'Organization',
        'name': 'Binud Software Solutions'
      }
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
          'name': 'Gallery',
          'item': 'https://binudsoftwaresolutions.in/gallery'
        }
      ]
    }
  ]
};

// ── Main Page ────────────────────────────────────────────────
const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Passcode unlock state
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('academic_memories_unlocked') === 'true';
    }
    return false;
  });

  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [showPinMask, setShowPinMask] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = useRef([]);

  const professionalItems = galleryItems.filter(item => item.category === 'professional');
  const collegeItems = galleryItems.filter(item => item.category === 'college');

  // Active items for Lightbox (only expose college items when unlocked)
  const activeItems = isUnlocked ? galleryItems : professionalItems;

  const openLightbox = (item) => {
    const idx = activeItems.findIndex(x => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const verifyPin = (enteredPin) => {
    if (enteredPin.length < 6) {
      setPinError('Please enter all 6 digits.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (enteredPin === ACADEMIC_ACCESS_PIN) {
      setPinSuccess(true);
      setPinError('');
      setTimeout(() => {
        setIsUnlocked(true);
        sessionStorage.setItem('academic_memories_unlocked', 'true');
        setPinSuccess(false);
      }, 450);
    } else {
      setPinError('Incorrect 6-digit PIN. Access restricted.');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setPinDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 600);
    }
  };

  const handlePinChange = (index, value) => {
    const rawDigits = value.replace(/\D/g, '');
    
    // Paste or multiple digits typed
    if (rawDigits.length > 1) {
      const chars = rawDigits.slice(0, 6).split('');
      const nextDigits = [...pinDigits];
      chars.forEach((c, idx) => {
        if (index + idx < 6) nextDigits[index + idx] = c;
      });
      setPinDigits(nextDigits);
      setPinError('');
      const nextFocus = Math.min(index + chars.length, 5);
      inputRefs.current[nextFocus]?.focus();

      if (nextDigits.join('').length === 6) {
        verifyPin(nextDigits.join(''));
      }
      return;
    }

    const nextDigits = [...pinDigits];
    nextDigits[index] = rawDigits.slice(-1);
    setPinDigits(nextDigits);
    setPinError('');

    if (rawDigits && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = nextDigits.join('');
    if (fullCode.length === 6) {
      verifyPin(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!pinDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      verifyPin(pinDigits.join(''));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const chars = pasted.split('');
      const nextDigits = ['', '', '', '', '', ''];
      chars.forEach((c, i) => {
        if (i < 6) nextDigits[i] = c;
      });
      setPinDigits(nextDigits);
      setPinError('');
      if (chars.length < 6) {
        inputRefs.current[chars.length]?.focus();
      } else {
        inputRefs.current[5]?.focus();
        verifyPin(pasted);
      }
    }
  };

  const lockAcademicSection = () => {
    setIsUnlocked(false);
    setPinDigits(['', '', '', '', '', '']);
    setPinError('');
    setPinSuccess(false);
    sessionStorage.removeItem('academic_memories_unlocked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title="Team Gallery & Memories | Binud Software Solutions"
        description="Explore our team journey, professional milestones at Codepilot Technologies, and gallery memories behind Binud Software Solutions."
        keywords={[
          'Binud Software Solutions team',
          'Codepilot Technologies memories',
          'software team culture',
          'Guwahati software engineers'
        ]}
        canonicalPath="/gallery"
        jsonLd={galleryJsonLd}
      />
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerBgImage}
            alt=""
            className="w-full h-full object-cover opacity-45"
          />
          {/* Solid gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Gallery
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-t border-slate-100 flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section 1: Professional Memories */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10 text-left"
          >
            <div>
              <h2 className="text-[#0f172a] text-2xl font-black tracking-tight">Past Experiences &amp; Memories</h2>
              <p className="text-slate-500 text-[14.5px] italic mt-2 leading-relaxed max-w-2xl font-medium">
                Every picture tells a story of collaboration and growth. What I am showing here is a collection of my <span style={{ fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive" }} className="text-xl text-[#005eb8] not-italic font-bold">past professional experiences</span> and highlights from my journey working at Codepilot Technologies.
              </p>
            </div>
          </motion.div>

          {/* Grid — Professional */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start mb-16">
            {professionalItems.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => openLightbox(item)}
                className="group rounded-none overflow-hidden cursor-zoom-in border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 bg-white flex flex-col p-4"
              >
                <div className="w-full aspect-[4/3] overflow-hidden bg-slate-50 border border-slate-100">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    draggable={false}
                  />
                </div>
                <div className="pt-4 bg-white flex flex-col flex-1">
                  <h3 className="text-slate-800 text-[15px] font-black leading-snug tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium mt-1">
                    {item.sub || 'Past Experiences & Memories'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Section 2: Protected Academic & Hostel Memories ── */}
          <div className="mt-16 pt-12 border-t border-slate-200/80">
            {isUnlocked ? (
              /* UNLOCKED VIEW */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header with Lock Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 text-left">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-[#0f172a] text-2xl font-black tracking-tight">
                        Academic Days &amp; Hostel Memories
                      </h2>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                        <HiCheckCircle className="text-emerald-600 text-sm" />
                        Unlocked with PIN
                      </span>
                    </div>
                    <p className="text-slate-500 text-[14.5px] italic mt-2 leading-relaxed max-w-2xl font-medium">
                      Before embarking on our professional careers, our foundational years were built during our academic and hostel days. This collection shares personal academic moments, hostel life highlights, and <span style={{ fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive" }} className="text-xl text-[#005eb8] not-italic font-bold">special memories</span> shared with close hostelmates and batch mates.
                    </p>
                  </div>

                  {/* Re-Lock Button */}
                  <button
                    onClick={lockAcademicSection}
                    className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
                    title="Lock and protect this section again"
                  >
                    <HiLockClosed className="text-[#005eb8] text-base" />
                    Lock Archive
                  </button>
                </div>

                {/* Grid — College Photos */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
                  {collegeItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => openLightbox(item)}
                      className="group rounded-none overflow-hidden cursor-zoom-in border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 bg-white flex flex-col p-4"
                    >
                      <div className="w-full aspect-[4/3] overflow-hidden bg-slate-50 border border-slate-100">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          draggable={false}
                        />
                      </div>
                      <div className="pt-4 bg-white flex flex-col flex-1">
                        <h3 className="text-slate-800 text-[15px] font-black leading-snug tracking-tight">
                          {item.label}
                        </h3>
                        <p className="text-slate-400 text-xs font-medium mt-1">
                          {item.sub || 'Academic Days · Hostel Memories'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* LOCKED VIEW - PIN VERIFICATION CARD */
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className={`bg-white border ${pinError ? 'border-red-300' : 'border-slate-200/90'} rounded-3xl p-8 sm:p-12 shadow-lg shadow-slate-100/80 text-center transition-all ${isShaking ? 'animate-shake' : ''}`}>
                  
                  {/* Security Icon Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#133866] to-[#005eb8] text-white flex items-center justify-center mx-auto shadow-md shadow-[#005eb8]/20 mb-6">
                    {pinSuccess ? (
                      <HiLockOpen size={30} className="animate-bounce" />
                    ) : (
                      <HiLockClosed size={28} />
                    )}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-3 border border-slate-200">
                    <HiShieldCheck className="text-[#005eb8] text-sm" />
                    Private &amp; Protected Archive
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                    Academic Days &amp; Hostel Memories
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                    This section contains personal memories and academic photographs. Enter the <span className="font-semibold text-slate-800">6-digit access PIN</span> to unlock and view the collection.
                  </p>

                  {/* 6-Digit PIN Input Box Group */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      verifyPin(pinDigits.join(''));
                    }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="flex items-center justify-center gap-2 sm:gap-3 mb-6"
                      onPaste={handlePaste}
                    >
                      {pinDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type={showPinMask ? 'text' : 'password'}
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          autoComplete="off"
                          className={`w-11 h-14 sm:w-13 sm:h-16 text-xl sm:text-2xl font-extrabold text-center rounded-xl transition-all duration-200 outline-none select-none font-mono ${
                            digit
                              ? 'bg-blue-50/50 border-2 border-[#005eb8] text-[#133866] shadow-sm'
                              : 'bg-slate-50 border-2 border-slate-200 text-slate-800 focus:bg-white focus:border-[#005eb8] focus:ring-4 focus:ring-[#005eb8]/10'
                          }`}
                          aria-label={`Digit ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Toggle Pin Mask Visibility */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setShowPinMask(!showPinMask)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {showPinMask ? (
                          <>
                            <HiEyeOff size={16} /> Hide Passcode
                          </>
                        ) : (
                          <>
                            <HiEye size={16} /> Show Passcode
                          </>
                        )}
                      </button>

                      {pinDigits.some(d => d !== '') && (
                        <button
                          type="button"
                          onClick={() => {
                            setPinDigits(['', '', '', '', '', '']);
                            setPinError('');
                            inputRefs.current[0]?.focus();
                          }}
                          className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Feedback Messages */}
                    {pinError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-bold bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl mb-6 shadow-xs"
                      >
                        <HiExclamationCircle className="text-base shrink-0" />
                        <span>{pinError}</span>
                      </motion.div>
                    )}

                    {pinSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-emerald-700 text-xs sm:text-sm font-bold bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl mb-6 shadow-xs"
                      >
                        <HiCheckCircle className="text-base shrink-0 text-emerald-600" />
                        <span>Passcode verified! Unlocking memories...</span>
                      </motion.div>
                    )}

                    {/* Unlock Action Button */}
                    <button
                      type="submit"
                      disabled={pinSuccess}
                      className="w-full sm:w-auto min-w-[220px] px-8 py-3.5 bg-gradient-to-r from-[#133866] to-[#005eb8] hover:from-[#0f2d52] hover:to-[#004b93] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                    >
                      <HiKey className="text-base" />
                      <span>Unlock Archive</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={activeItems}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

