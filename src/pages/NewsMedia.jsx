import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiPhotograph, HiPlay, HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

// Placeholder gallery items — replace with real content later
const galleryItems = [
  {
    id: 1,
    type: 'image',
    span: 'col-span-2 row-span-2',
    label: 'Company Event',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=900&q=85',
  },
  {
    id: 2,
    type: 'image',
    span: 'col-span-1 row-span-1',
    label: 'Team Meeting',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=600&q=85',
  },
  {
    id: 3,
    type: 'video',
    span: 'col-span-1 row-span-1',
    label: 'Product Demo',
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&h=600&q=85',
  },
  {
    id: 4,
    type: 'image',
    span: 'col-span-1 row-span-1',
    label: 'Award Night',
    src: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&h=600&q=85',
  },
  {
    id: 5,
    type: 'image',
    span: 'col-span-2 row-span-1',
    label: 'Office Life',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=600&q=85',
  },
  {
    id: 6,
    type: 'image',
    span: 'col-span-1 row-span-1',
    label: 'Workshop',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&h=600&q=85',
  },
  {
    id: 7,
    type: 'video',
    span: 'col-span-1 row-span-1',
    label: 'Client Visit',
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=600&q=85',
  },
  {
    id: 8,
    type: 'image',
    span: 'col-span-1 row-span-1',
    label: 'Launch Event',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&h=600&q=85',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
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

  const item = items[current];

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
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Close"
      >
        <HiX size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-bold tracking-wider">
        {current + 1} / {items.length}
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Previous"
      >
        <HiArrowLeft size={20} />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        aria-label="Next"
      >
        <HiArrowRight size={20} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center max-w-5xl w-full px-16"
        >
          <img
            src={item.src}
            alt={item.label}
            className="w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
            draggable={false}
          />
          {/* Caption */}
          <div className="mt-4 flex items-center gap-2 text-white/70 text-sm font-semibold">
            {item.type === 'video' ? <HiPlay size={15} /> : <HiPhotograph size={15} />}
            {item.label}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {items.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ── Main Page ────────────────────────────────────────────────
const NewsMedia = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── Hero Header ── */}
      <section className="relative pt-36 pb-16 bg-white overflow-hidden select-none">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 400">
          <path d="M -80 200 C 200 60, 500 40, 780 160 S 1200 320, 1520 180" fill="none" stroke="#695dd3" strokeWidth="1.2" strokeOpacity="0.10" />
          <path d="M -80 280 C 200 140, 500 120, 780 240 S 1200 400, 1520 260" fill="none" stroke="#274e85" strokeWidth="0.8" strokeOpacity="0.08" />
          <path d="M 900 -20 C 1050 60, 1250 140, 1520 120" fill="none" stroke="#695dd3" strokeWidth="1" strokeOpacity="0.07" />
        </svg>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#695dd3] text-sm font-bold tracking-widest uppercase mb-4">Press / Stories / Coverage</p>
            <h1 className="text-[#0f172a] text-4xl sm:text-5xl lg:text-[56px] font-black leading-tight tracking-tight mb-5">
              News &amp; Media
            </h1>
            <p className="text-slate-400 text-4xl sm:text-5xl lg:text-[56px] font-black leading-tight tracking-tight">
              Our story, in pictures.
            </p>
            <div className="w-16 h-[3px] bg-[#695dd3] mt-8 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-t border-slate-100 flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-[#0f172a] text-2xl font-black tracking-tight">Media Gallery</h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Click any image to open · ← → to navigate</p>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-4 py-2 bg-white">
              Placeholder
            </span>
          </motion.div>

          {/* Grid — 2 cols on mobile, 4 cols on desktop */}
          <div
            className="grid gap-3 grid-cols-2 lg:grid-cols-4"
            style={{ gridAutoRows: '180px' }}
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => openLightbox(i)}
                className={`relative group rounded-2xl overflow-hidden cursor-zoom-in ${item.span}`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Video badge */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <HiPlay size={22} className="text-[#695dd3] ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    {item.type === 'image' ? <HiPhotograph size={14} className="text-white/80" /> : <HiPlay size={14} className="text-white/80" />}
                    <span className="text-white text-xs font-bold">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-slate-400 text-sm font-medium mt-10"
          >
            Real photos and videos will be added here soon. Stay tuned! 📸
          </motion.p>

        </div>
      </section>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsMedia;
