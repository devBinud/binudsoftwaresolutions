import { loadFirestore, whenIdle } from '../firebase/loadFirestore';

/**
 * First-party, privacy-friendly page-view tracking stored in Firestore (`visits` collection).
 * Stores no IP address or personal data — only the page, referring site, device type,
 * browser and a random anonymous visitor ID kept in the visitor's own browser.
 */

const VISITOR_KEY = 'bss_visitor_id';
const BOT_PATTERN = /bot|crawler|spider|crawling|headless|lighthouse|pagespeed|preview|slurp/i;
const DUPLICATE_WINDOW_MS = 2000;

const isFirebaseConfigured =
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !/^your_project_id$/i.test(import.meta.env.VITE_FIREBASE_PROJECT_ID);

let lastTracked = { path: '', time: 0 };

const randomId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const getVisitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
};

const getDevice = (ua) => {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'Tablet';
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'Mobile';
  return 'Desktop';
};

const getBrowser = (ua) => {
  if (/Edg\//i.test(ua)) return 'Edge';
  if (/OPR\/|Opera/i.test(ua)) return 'Opera';
  if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
  if (/Firefox|FxiOS/i.test(ua)) return 'Firefox';
  if (/Chrome|CriOS/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua)) return 'Safari';
  return 'Other';
};

/* Only the referring site's domain is kept; internal navigation counts as "direct". */
const getReferrer = () => {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? '' : host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

export const trackVisit = (path) => {
  if (!isFirebaseConfigured || typeof window === 'undefined') return;
  if (path.startsWith('/admin')) return;

  const ua = navigator.userAgent || '';
  if (navigator.webdriver || BOT_PATTERN.test(ua)) return;

  // Ignore duplicate fires for the same page (e.g. React StrictMode double effects in dev)
  const now = Date.now();
  if (lastTracked.path === path && now - lastTracked.time < DUPLICATE_WINDOW_MS) return;
  lastTracked = { path, time: now };

  const visit = {
    path: path.slice(0, 300),
    referrer: getReferrer().slice(0, 200),
    device: getDevice(ua),
    browser: getBrowser(ua),
    visitorId: getVisitorId(),
    host: window.location.hostname.slice(0, 100),
  };

  // Recorded once the page is idle, so tracking never slows down what the visitor sees
  whenIdle(() => {
    loadFirestore()
      .then(({ db, addDoc, collection, serverTimestamp }) =>
        addDoc(collection(db, 'visits'), { ...visit, createdAt: serverTimestamp() })
      )
      .catch(() => {
        // Tracking must never affect the visitor experience.
      });
  });
};
