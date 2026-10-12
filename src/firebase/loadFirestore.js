/**
 * Loads Firestore on demand. Public pages use this so the database library is downloaded
 * in the background after the page has rendered, instead of delaying the first paint.
 */
let firestorePromise;

/* Runs `fn` once the page has finished loading and the browser is idle. */
export const whenIdle = (fn) => {
  const schedule = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : setTimeout(fn, 1500);
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
};

export const loadFirestore = () => {
  if (!firestorePromise) {
    firestorePromise = Promise.all([import('./config'), import('firebase/firestore')]).then(
      ([{ db }, firestore]) => ({ db, ...firestore })
    );
  }
  return firestorePromise;
};
