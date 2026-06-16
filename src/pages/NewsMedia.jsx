import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiPhotograph, HiPlay, HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

// Import local images from assets/gallery
import img1 from '../assets/gallery/1.jpeg';
import img2 from '../assets/gallery/2.jpeg';
import img3 from '../assets/gallery/3.jpeg';
import bannerBgImage from '../assets/bg4.jpg';

/**
 * TO ADD MORE PHOTOS IN THE FUTURE:
 * 1. Place the new image in `src/assets/gallery/` (e.g., `4.jpeg`).
 * 2. Import it at the top: `import img4 from '../assets/gallery/4.jpeg';`
 * 3. Add a new object to the `galleryItems` array below:
 *    {
 *      id: 4,
 *      type: 'image',
 *      span: 'col-span-1 row-span-1', // or desired span class (e.g. col-span-2 row-span-1)
 *      label: 'Full Name — Professional Title',
 *      src: img4,
 *    }
 */
const galleryItems = [
  {
    id: 1,
    type: 'image',
    label: 'Full Team of Codepilot Technologies',
    src: img1,
  },
  {
    id: 2,
    type: 'image',
    label: 'Core Development Team Sync',
    src: img2,
  },
  {
    id: 3,
    type: 'image',
    label: "Fun Reel Concept: The 'Angry Team'",
    src: img3,
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

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-32 pb-14 select-none overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={bannerBgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-45" 
          />
          {/* Solid gradient overlay to guarantee perfect contrast and corporate look */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            News &amp; Media
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">News &amp; Media</span>
          </nav>
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
              <h2 className="text-[#0f172a] text-2xl font-black tracking-tight">Past Experiences &amp; Memories</h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Click any image to open · ← → to navigate</p>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-200 rounded-full px-4 py-2 bg-white">
              Memories
            </span>
          </motion.div>

          {/* Grid — 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => openLightbox(i)}
                className="group rounded-2xl overflow-hidden cursor-zoom-in border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 bg-white flex flex-col"
              >
                {/* Image container showing the image with uniform aspect ratio */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    draggable={false}
                  />
                </div>

                {/* Info footer always visible */}
                <div className="p-5 bg-white flex flex-col flex-1">
                  <h3 className="text-slate-800 text-[15px] font-black leading-snug tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium mt-1">
                    Memories of working at Codepilot Technologies
                  </p>
                </div>
              </motion.div>
            ))}
          </div>



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
