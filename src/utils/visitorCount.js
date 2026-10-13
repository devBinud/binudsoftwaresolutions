import { loadFirestore, whenIdle } from '../firebase/loadFirestore';

/**
 * Public visitor counter shown in the footer, stored in Firestore at `stats/site` → { visitors }.
 * Each browser adds 1 the first time it visits (bots, admin pages and localhost are skipped by the
 * caller / below). Firestore rules let the public read it and only ever raise it by exactly 1.
 */

const COUNTED_KEY = 'bss_visitor_counted';

const isFirebaseConfigured =
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !/^your_project_id$/i.test(import.meta.env.VITE_FIREBASE_PROJECT_ID);

const isLocalHost = () => ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

// Resolves once this browser's +1 (if any) has been written, so the footer can show a count that includes it.
let pendingIncrement = Promise.resolve();
let cachedCount = null;

/* Adds this browser to the counter once, ever. Safe to call on every page view. */
export const countVisitorOnce = () => {
  if (!isFirebaseConfigured || typeof window === 'undefined' || isLocalHost()) return;
  try {
    if (localStorage.getItem(COUNTED_KEY)) return;
  } catch {
    return; // Storage blocked: skip rather than count the same person on every page.
  }

  pendingIncrement = new Promise((resolve) => {
    whenIdle(() => {
      loadFirestore()
        .then(({ db, doc, setDoc, increment }) =>
          setDoc(doc(db, 'stats', 'site'), { visitors: increment(1) }, { merge: true })
        )
        .then(() => {
          try {
            localStorage.setItem(COUNTED_KEY, '1');
          } catch {
            // Ignore — worst case this browser is counted again on a later visit.
          }
        })
        .catch(() => {
          // Counting must never affect the visitor experience.
        })
        .finally(resolve);
    });
  });
};

/* Total visitors, or null when unavailable. Read once per page load and cached. */
export const fetchVisitorCount = () => {
  if (!isFirebaseConfigured) return Promise.resolve(null);
  if (cachedCount !== null) return Promise.resolve(cachedCount);
  return pendingIncrement
    .then(() => new Promise((resolve) => whenIdle(resolve)))
    .then(() => loadFirestore())
    .then(({ db, doc, getDoc }) => getDoc(doc(db, 'stats', 'site')))
    .then((snap) => {
      const value = Number(snap.data()?.visitors);
      cachedCount = Number.isFinite(value) && value > 0 ? value : null;
      return cachedCount;
    })
    .catch(() => null);
};
