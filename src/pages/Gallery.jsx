import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

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

      {/* Thumbnail strip - hidden on mobile to avoid overflow of 24 dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-2">
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
const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 select-none overflow-hidden border-b border-slate-800">
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
                Every picture tells a story of collaboration and growth. What I am showing here is a collection of my <span style={{ fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive" }} className="text-xl text-[#274e85] not-italic font-bold">past professional experiences</span> and highlights from my journey working at Codepilot Technologies.
              </p>
            </div>
          </motion.div>

          {/* Grid — Professional */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start mb-16">
            {galleryItems.filter(item => item.category === 'professional').map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => openLightbox(galleryItems.indexOf(item))}
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

          {/* Section 2: College Memories / Academic Foundations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10 mt-16 text-left"
          >
            <div>
              <h2 className="text-[#0f172a] text-2xl font-black tracking-tight">Academic Days &amp; Hostel Memories</h2>
              <p className="text-slate-500 text-[14.5px] italic mt-2 leading-relaxed max-w-2xl font-medium">
                Before embarking on our professional careers, our foundational years were built during our academic and hostel days. This collection shares the personal academic moments, hostel life highlights, and <span style={{ fontFamily: "'Caveat', 'Dancing Script', 'Brush Script MT', cursive" }} className="text-xl text-[#274e85] not-italic font-bold">special memories</span> shared with close hostelmates and batch mates.
              </p>
            </div>
          </motion.div>

          {/* Grid — College */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {galleryItems.filter(item => item.category === 'college').map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                onClick={() => openLightbox(galleryItems.indexOf(item))}
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

export default Gallery;
