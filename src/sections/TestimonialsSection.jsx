import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { FaQuoteRight } from 'react-icons/fa';
import { loadFirestore } from '../firebase/loadFirestore';
import { DEFAULT_TESTIMONIALS, sortTestimonials } from '../data/testimonials';
import Skeleton from '../components/Skeleton';

const isFirebaseConfigured =
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !/^your_project_id$/i.test(import.meta.env.VITE_FIREBASE_PROJECT_ID);

/* Layout for 1–3 cards; more than 3 switches to a horizontal scroller. */
const GRID_LAYOUT = {
  1: 'grid grid-cols-1 gap-6 max-w-xl mx-auto',
  2: 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto',
  3: 'grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8',
};

const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ t, featured, className = '' }) => {
  const rating = Math.min(5, Math.max(1, Number(t.rating) || 5));
  return (
    <figure
      className={`relative flex flex-col h-full rounded-card p-7 sm:p-8 text-left ${featured
        ? 'bg-[#092c4c] text-white shadow-[0_24px_60px_rgba(9,44,76,0.25)]'
        : 'bg-white text-[#191919] border border-slate-200 shadow-[0_12px_40px_rgba(15,23,42,0.05)]'
        } ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
          {[...Array(5)].map((_, s) => (
            <HiStar key={s} size={18} className={s < rating ? 'text-amber-400' : featured ? 'text-white/20' : 'text-slate-200'} />
          ))}
        </div>
        <FaQuoteRight size={30} className={featured ? 'text-white/20' : 'text-[#005eb8]/15'} />
      </div>

      <blockquote className={`flex-grow text-[17px] leading-relaxed font-medium ${featured ? 'text-white/90' : 'text-slate-700'}`}>
        {t.text}
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3.5">
        <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-sm font-black ${featured
          ? 'bg-white text-[#092c4c]'
          : 'bg-[#005eb8] text-white'
          }`}>
          {initialsOf(t.name)}
        </span>
        <span className="block min-w-0">
          <span className="block font-black text-base">{t.name}</span>
          {(t.role || t.company) && (
            <span className={`block text-sm ${featured ? 'text-slate-300' : 'text-slate-500'}`}>
              {t.role && <span className={`font-semibold ${featured ? 'text-blue-300' : 'text-[#005eb8]'}`}>{t.role}</span>}
              {t.role && t.company && ', '}
              {t.company}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
};

/* Placeholder cards shown while testimonials load from the database. */
const CardSkeleton = () => (
  <div className="flex flex-col h-full rounded-card p-7 sm:p-8 bg-white border border-slate-200">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-7 w-8" />
    </div>
    <div className="space-y-3 flex-grow">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="mt-8 flex items-center gap-3.5">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  // null = still loading; the built-in testimonials are used when nothing is managed in the admin panel yet
  const [items, setItems] = useState(isFirebaseConfigured ? null : DEFAULT_TESTIMONIALS);
  const [nearView, setNearView] = useState(false);
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
  const scrollable = !loading && items.length > 3;

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-slate-50/70 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 lg:mb-16"
        >
          <h2 className="text-[#191919] text-3xl sm:text-[42px] font-black leading-tight tracking-tight mb-4">
            Client <span className="text-[#005eb8]">Testimonials</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Hear from the businesses we have partnered with, in their own words.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        {loading ? (
          <div className={`${GRID_LAYOUT[3]} items-stretch`} role="status" aria-label="Loading testimonials">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : scrollable ? (
          <div className="testimonial-scroll flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory px-1 pt-2 pb-8">
            {items.map((t, i) => (
              <div
                key={t.id || t.name}
                className="snap-start shrink-0 w-[86%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
              >
                <TestimonialCard t={t} featured={i % 3 === 1} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`${GRID_LAYOUT[items.length]} items-stretch`}>
            {items.map((t, i) => (
              <motion.div
                key={t.id || t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TestimonialCard t={t} featured={items.length === 3 && i === 1} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;
