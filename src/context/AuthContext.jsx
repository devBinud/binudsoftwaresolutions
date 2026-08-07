import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.warn('Auth state changed error:', error);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn('Auth state initialization error:', err);
      setLoading(false);
    }

    // Safety fallback: Ensure app renders even if Auth listener hangs or takes too long
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
