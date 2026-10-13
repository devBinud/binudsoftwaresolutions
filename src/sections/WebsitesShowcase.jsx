import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiX } from 'react-icons/hi';
import { FiMaximize2 } from 'react-icons/fi';
import ArrowButton from '../components/ArrowButton';
import { websites } from '../data/websitesData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 15 } },
};

// ── Lightbox: the screenshot shown large on its coloured panel ──
const SiteLightbox = ({ sites, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const hasMany = sites.length > 1;

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + sites.length) % sites.length);
  }, [sites.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % sites.length);
  }, [sites.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (hasMany && e.key === 'ArrowLeft') prev();
      if (hasMany && e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next, hasMany]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const site = sites[current];
  // Arrows on larger screens only; on phones you swipe.
  const navButton = 'hidden sm:flex absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95';

  // Rendered into <body> so it sits above the navbar and isn't affected by the section's transforms.
  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} website screenshot`}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-16 sm:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="absolute top-5 right-5 z-30 w-12 h-12 rounded-full border border-white/30 bg-black/20 hover:bg-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Close"
      >
        <HiX size={22} />
      </button>

      {hasMany && (
        <>
          <button type="button" onClick={prev} className={`${navButton} left-6`} aria-label="Previous website">
            <HiArrowLeft size={22} />
          </button>
          <button type="button" onClick={next} className={`${navButton} right-6`} aria-label="Next website">
            <HiArrowRight size={22} />
          </button>
        </>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={site.id}
          initial={{ opacity: 0, x: direction * 60, scale: direction ? 1 : 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -direction * 60 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          drag={hasMany ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(e, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
          className="relative z-10 w-full rounded-2xl sm:rounded-3xl p-[5%] sm:p-[7%] shadow-2xl select-none"
          style={{ maxWidth: 'min(72rem, calc((100vh - 8rem) * 1.6))', backgroundColor: site.stageColor }}
        >
          <img
            src={site.image}
            alt={`${site.name} website homepage`}
            draggable={false}
            className="w-full aspect-video object-cover object-top rounded-lg sm:rounded-xl shadow-[0_24px_50px_-12px_rgba(15,23,42,0.45)]"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>,
    document.body
  );
};

// ── Card ──
const WebsiteCard = ({ site, onOpen }) => (
  <motion.article
    variants={cardVariants}
    className="bg-white border border-slate-200/80 rounded-card overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,94,184,0.12)] hover:border-[#005eb8]/30 transition-all duration-300 flex flex-col h-full text-left"
  >
    {/* Screenshot on a coloured panel; hover blurs it and shows an expand button, click opens the lightbox */}
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger screenshot of ${site.name}`}
      className="group relative block w-full overflow-hidden cursor-zoom-in focus-visible:outline-none"
      style={{ backgroundColor: site.stageColor }}
    >
      <div className="p-[6%] transition duration-300 group-hover:blur-[3px] group-hover:scale-[1.03] group-focus-visible:blur-[3px]">
        <img
          src={site.image}
          alt={`${site.name} website homepage`}
          width={1440}
          height={810}
          loading="lazy"
          decoding="async"
          className="w-full aspect-video object-cover object-top rounded-md shadow-[0_12px_30px_-8px_rgba(15,23,42,0.4)]"
        />
      </div>
      <span className="absolute inset-0 flex items-center justify-center bg-slate-900/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
        <span className="w-12 h-12 rounded-full bg-slate-900/85 ring-1 ring-white/25 text-white flex items-center justify-center shadow-lg">
          <FiMaximize2 size={18} />
        </span>
      </span>
    </button>

    <div className="flex flex-col flex-grow p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight leading-tight mb-3">
        {site.name}
      </h3>
      <p className="text-slate-500 leading-relaxed mb-6">{site.description}</p>

      <div className="mt-auto">
        <ArrowButton href={site.url} target="_blank" rel="noopener noreferrer" size="sm">
          Visit Live Site
        </ArrowButton>
      </div>
    </div>
  </motion.article>
);

/**
 * Showcase of live client websites.
 * limit: how many sites to show (Home shows a few; the Case Studies page shows all)
 */
const WebsitesShowcase = ({ limit }) => {
  const shown = limit ? websites.slice(0, limit) : websites;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <section className="relative py-16 md:py-24 bg-slate-50/70 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="max-w-2xl mb-14">
          <span className="badge mb-3">
            Our Portfolio
          </span>
          <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans mb-3">
            Projects We Build and Evolve
          </h2>
          <p className="text-slate-500">
            Real websites we designed and built for businesses across Assam & Globe, live and serving their customers today.
          </p>
        </div>

        {/* ── Website Cards (3 per row on desktop) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {shown.map((site, i) => (
            <WebsiteCard key={site.id} site={site} onOpen={() => setLightboxIndex(i)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <SiteLightbox sites={shown} startIndex={lightboxIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WebsitesShowcase;
