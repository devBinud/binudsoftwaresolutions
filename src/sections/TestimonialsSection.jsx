import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { loadFirestore } from '../firebase/loadFirestore';
import { DEFAULT_TESTIMONIALS, PREVIEW_TESTIMONIALS, sortTestimonials } from '../data/testimonials';
import Skeleton from '../components/Skeleton';

const isFirebaseConfigured =
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !/^your_project_id$/i.test(import.meta.env.VITE_FIREBASE_PROJECT_ID);

const ratingOf = (t) => Math.min(5, Math.max(1, Number(t.rating) || 5));

// Strip quote marks the review may already have; the card adds curly ones.
const cleanQuote = (text = '') => text.trim().replace(/^["“”]+|["“”]+$/g, '');

// Moving rows only switch on once there are enough reviews to split across two rows
// without the same review showing twice on screen.
const MARQUEE_MIN = 8;

// Longer reviews get wider cards, so rows look naturally staggered.
const clampPx = (value, min, max) => `${Math.round(Math.min(max, Math.max(min, value)))}px`;
const widthFor = (text = '') => clampPx(text.length * 2.4, 360, 580);

// Repeat the list so one copy is wide enough to fill large screens (needs ~6 cards).
const fillRow = (list) => {
  if (!list.length) return [];
  const times = Math.max(1, Math.ceil(6 / list.length));
  return Array.from({ length: times }, () => list).flat();
};

const Stars = ({ rating, size = 18 }) => (
  <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
    {[...Array(5)].map((_, s) => (
      <HiStar key={s} size={size} className={s < Math.round(rating) ? 'text-amber-500' : 'text-slate-200'} />
    ))}
  </div>
);

const TestimonialCard = ({ t, className = '', style }) => (
  <figure className={`flex flex-col bg-[#f5f6f8] rounded-card p-7 sm:p-8 text-left ${className}`} style={style}>
    <figcaption>
      <span className="block text-[#191919] text-[17px] font-bold">{t.name}</span>
      {t.role && <span className="block mt-0.5 text-sm text-slate-500">{t.role}</span>}
    </figcaption>

    <blockquote className="flex-grow mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
      “{cleanQuote(t.text)}”
    </blockquote>

    <div className="mt-6">
      <Stars rating={ratingOf(t)} />
      {t.company && <span className="block mt-1.5 text-sm font-bold text-[#191919]">{t.company}</span>}
    </div>
  </figure>
);

/* One endlessly scrolling row. Two copies of the cards sit side by side and the track moves by half its width. */
const MarqueeRow = ({ list, reverse = false, seconds }) => {
  const set = fillRow(list);
  return (
    <div className="ticker-track" style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[0, 1].map((copy) =>
        set.map((t, i) => (
          <div
            key={`${copy}-${i}-${t.id || t.name}`}
            className="pr-6 shrink-0"
            aria-hidden={copy === 1 || i >= list.length || undefined}
          >
            <div className="h-full w-[300px] sm:w-[var(--card-w)]" style={{ '--card-w': widthFor(t.text) }}>
              <TestimonialCard t={t} className="h-full" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/* Placeholder card shown while testimonials load from the database. */
const CardSkeleton = () => (
  <div className="flex flex-col rounded-card p-7 sm:p-8 bg-[#f5f6f8]">
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="space-y-3 mt-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="mt-6 space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-28" />
    </div>
  </div>
);

const TestimonialsSection = () => {
  // null = still loading; the built-in testimonials are used when nothing is managed in the admin panel yet
  const [items, setItems] = useState(isFirebaseConfigured ? null : DEFAULT_TESTIMONIALS);
  const [nearView, setNearView] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Only fetch once the section is about to scroll into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!isFirebaseConfigured || !node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !nearView) return undefined;
    let active = true;
    loadFirestore()
      .then(({ db, collection, getDocs }) => getDocs(collection(db, 'testimonials')))
      .then((snap) => {
        if (!active) return;
        if (snap.empty) {
          setItems(DEFAULT_TESTIMONIALS);
          return;
        }
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((t) => t.visible !== false);
        setItems(sortTestimonials(list));
      })
      .catch(() => {
        if (active) setItems(DEFAULT_TESTIMONIALS);
      });
    return () => {
      active = false;
    };
  }, [nearView]);

  if (items && items.length === 0) return null;

  const loading = items === null;
  // The rating summary counts real reviews only
  const count = items?.length || 0;
  const average = count ? items.reduce((sum, t) => sum + ratingOf(t), 0) / count : 0;
  // In development (npm run dev) dummy reviews are added to preview the full design; production builds never include them
  const cards = import.meta.env.DEV && items ? [...items, ...PREVIEW_TESTIMONIALS] : items || [];
  // Moving rows need enough reviews (and are skipped for visitors who prefer reduced motion)
  const marquee = cards.length >= MARQUEE_MIN && !reduceMotion;
  // Each row gets its own half of the reviews, so nothing repeats on screen
  const rowA = marquee ? cards.filter((_, i) => i % 2 === 0) : [];
  const rowB = marquee ? cards.filter((_, i) => i % 2 === 1) : [];
  const secondsFor = (row) => Math.max(40, fillRow(row).length * 9);
  // Still layout: up to 3 reviews share one row; more wrap into rows of two, like the moving version
  const basisFor = (text = '') => (cards.length <= 3 ? clampPx(text.length * 1.9, 280, 460) : widthFor(text));

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-white overflow-hidden font-sans">
      {/* ── Header: heading on the left, rating summary on the right ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-14"
      >
        <div className="max-w-2xl text-left">
          <span className="badge mb-3">What Clients Say</span>
          <h2 className="text-[#191919] text-3xl sm:text-[42px] font-black leading-tight tracking-tight mb-3">
            Client <span className="text-[#005eb8]">Testimonials</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Hear from the businesses we have partnered with, in their own words.
          </p>
        </div>

        {!loading && (
          <div className="flex items-center gap-3.5 shrink-0">
            <span className="text-5xl font-black text-[#191919] tracking-tight">{average.toFixed(1)}</span>
            <div>
              <Stars rating={average} size={20} />
              <span className="block mt-1 text-sm text-slate-500">
                From {count} client review{count === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Cards ── */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading testimonials">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : marquee ? (
        // Two rows drifting in opposite directions, faded at the screen edges; hovering a row pauses it
        <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <MarqueeRow list={rowA} seconds={secondsFor(rowA)} />
          <MarqueeRow list={rowB} seconds={secondsFor(rowB) + 10} reverse />
        </div>
      ) : (
        // Each card's width follows its text length, so rows look staggered; on phones they stack
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row sm:flex-wrap gap-6">
          {cards.map((t) => (
            <TestimonialCard
              key={t.id || t.name}
              t={t}
              className="sm:[flex:var(--grow)_1_var(--basis)]"
              style={{ '--grow': (t.text || '').length || 1, '--basis': basisFor(t.text) }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
