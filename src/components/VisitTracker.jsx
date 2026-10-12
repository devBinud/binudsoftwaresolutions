import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../utils/trackVisit';

/* Records one page view every time the route changes (admin routes are skipped). */
const VisitTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackVisit(pathname);
  }, [pathname]);

  return null;
};

export default VisitTracker;
