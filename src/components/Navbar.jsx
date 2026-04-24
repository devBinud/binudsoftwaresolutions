import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiPhone, HiMail, HiClock, HiLocationMarker } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

/** Returns current Guwahati (IST, UTC+5:30) time as a 12-hour string */
const getGuwahatiTime = () => {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [currentTime, setCurrentTime] = useState(getGuwahatiTime);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  // Tick every second to keep the clock live
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(getGuwahatiTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${
      scrolled ? 'shadow-sm' : 'shadow-none'
    }`}>

      {/* ── Top info bar ── */}
      <div className="bg-[#003f6e] text-white text-xs hidden md:block">
        <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between">
          {/* Left — location + live clock */}
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-blue-200">
              <HiLocationMarker size={13} className="shrink-0" />
              Guwahati, Assam, India
            </span>
            <span className="flex items-center gap-1.5 text-blue-200">
              <HiClock size={13} className="shrink-0" />
              <span className="tabular-nums font-medium text-white">{currentTime}</span>
              <span className="text-blue-300">(IST)</span>
            </span>
          </div>

          {/* Right — contact details */}
          <div className="flex items-center gap-5">
            <a
              href="tel:+919706393924"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <HiPhone size={13} className="shrink-0" />
              +91 97063 393924
            </a>
            <a
              href="mailto:binudsoftwaresolutions@gmail.com"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <HiMail size={13} className="shrink-0" />
              binudsoftwaresolutions@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Announcement bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <AnnouncementBar onClose={() => setShowBar(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav row */}
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Binud Software Solutions" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium group"
              >
                <span className={`transition-colors duration-200 ${
                  isActive ? 'text-[#005d9e]' : 'text-[#475569] group-hover:text-[#005d9e]'
                }`}>
                  {link.name}
                </span>

                {/* Active dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#005d9e]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-sm py-2 px-5">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[#475569] hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-[#005d9e] bg-[#e8f2fb]'
                      : 'text-[#475569] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-1">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
