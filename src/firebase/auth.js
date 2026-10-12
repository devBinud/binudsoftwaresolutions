import { getAuth } from 'firebase/auth';
import app from './config';

/* Firebase Authentication — imported only by the admin area, keeping it out of the public site's bundle. */
export const auth = getAuth(app);
