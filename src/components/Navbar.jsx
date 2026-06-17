import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiMail, HiPhone, HiArrowRight } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (linkPath) => {
    const current = location.pathname + location.search;
    if (linkPath.includes('?')) {
      return current === linkPath;
    }
    return current === linkPath || (location.pathname === linkPath && !location.search);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          MAIN NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 select-none font-sans top-0 border-b ${
          scrolled
            ? 'border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'border-slate-100'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 flex items-center justify-between ${
          scrolled ? 'h-16' : 'h-20'
        }`}>

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="Binud Software Solutions"
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden xl:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[14.5px] font-sans font-bold tracking-wide transition-colors duration-200 py-2 ${isLinkActive(link.path)
                  ? 'text-[#695dd3]'
                  : 'text-slate-800 hover:text-[#695dd3]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ── Right side actions ── */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="hidden md:block bg-[#695dd3] text-white font-sans font-extrabold text-[12px] uppercase tracking-wider px-6 py-2.5 rounded-full shadow-[0_4px_18px_rgba(105,93,211,0.25)] hover:shadow-[0_6px_24px_rgba(105,93,211,0.45)] hover:scale-[1.03] hover:bg-[#574cbd] transition-all duration-300 text-center"
            >
              Contact us
            </Link>

            {/* Hamburger Toggle */}
            <button
              className="xl:hidden p-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={openDrawer}
              aria-label="Open menu"
            >
              <HiMenuAlt3 size={20} />
            </button>
          </div>

        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MOBILE DRAWER — Backdrop + Slide Panel
      ═══════════════════════════════════════════════════════ */}

      {/* Backdrop overlay */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 z-[998]"
        style={{
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Slide-out Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 z-[999] flex flex-col"
        style={{
          width: '290px',
          maxWidth: '80vw',
          height: '100vh',
          background: '#ffffff',
          boxShadow: drawerOpen ? '4px 0 25px rgba(0,0,0,0.12)' : 'none',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 pb-5 border-b border-slate-100">
          <Link to="/" className="flex items-center" onClick={closeDrawer}>
            <img
              src="/logo.png"
              alt="Binud Software Solutions"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={closeDrawer}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
            aria-label="Close menu"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeDrawer}
                  className={`flex items-center rounded-xl text-sm font-sans font-bold transition-all duration-300 py-3.5 ${
                    active
                      ? 'bg-[#695dd3]/8 text-[#695dd3] pl-6 pr-4'
                      : 'text-slate-800 hover:bg-slate-50/80 hover:text-[#695dd3] pl-4 pr-4 hover:pl-6'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-100 bg-[#fbfbfe]">
          <div className="flex flex-col gap-3.5 text-xs text-slate-500 font-bold">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold px-1">
              Connect with us
            </span>
            <a
              href="mailto:binudp.dev@gmail.com"
              className="flex items-center gap-2.5 px-1 hover:text-[#695dd3] transition-colors"
            >
              <HiMail className="text-sm text-slate-400 shrink-0" />
              <span className="truncate">binudp.dev@gmail.com</span>
            </a>
            <a
              href="tel:+919706393924"
              className="flex items-center gap-2.5 px-1 hover:text-[#695dd3] transition-colors"
            >
              <HiPhone className="text-sm text-slate-400 shrink-0" />
              <span>+91 97063 93924</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
