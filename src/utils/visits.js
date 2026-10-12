import { collection, getDocs, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const MAX_VISITS = 5000;

/* Visits recorded while developing locally are excluded from stats by default. */
export const isLocalVisit = (host) => !host || host === 'localhost' || host === '127.0.0.1';

/* Most recent page views from the last `days` days (newest first, capped at MAX_VISITS). */
export const fetchVisitsSince = async (days) => {
  const since = Timestamp.fromDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
  const snap = await getDocs(
    query(collection(db, 'visits'), where('createdAt', '>=', since), orderBy('createdAt', 'desc'), limit(MAX_VISITS))
  );
  return snap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, date: data.createdAt?.toDate?.() ?? null };
  });
};
