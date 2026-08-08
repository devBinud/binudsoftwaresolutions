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
    { name: 'Coding Guides', path: '/coding-guides' },
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
        className={`fixed left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 font-navbar top-0 border-b ${scrolled
          ? 'border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
          : 'border-slate-100'
          }`}
      >
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'
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
          <div className="hidden xl:flex items-center gap-4 xl:gap-5.5 2xl:gap-6.5 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 600,
                  color: isLinkActive(link.path) ? '#005eb8' : 'rgb(34, 34, 34)',
                }}
                className={`text-[15px] 2xl:text-[16px] transition-colors duration-200 py-2 whitespace-nowrap hover:text-[#005eb8] ${isLinkActive(link.path) ? 'font-bold' : ''
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
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                color: 'rgb(34, 34, 34)',
              }}
              className="hidden md:block bg-[#f8c543] hover:bg-[#ebb52d] text-[13.5px] px-5 py-2 rounded-none border border-[#e0af34] transition-colors duration-200 text-center shadow-sm cursor-pointer"
            >
              Contact us
            </Link>

            {/* Hamburger Toggle */}
            <button
              className="xl:hidden p-2 rounded-none border border-slate-200 text-[#222222] hover:bg-slate-50 transition-colors"
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
        className="fixed top-0 left-0 bottom-0 z-[999] flex flex-col font-navbar w-full h-screen bg-white"
        style={{
          width: '100%',
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
            className="p-1.5 rounded-none border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
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
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    color: active ? '#005eb8' : 'rgb(34, 34, 34)',
                  }}
                  className={`flex items-center text-sm transition-all duration-200 py-3.5 px-5 rounded-none ${active
                      ? 'bg-[#005eb8]/8 font-bold'
                      : 'hover:bg-slate-50 hover:text-[#005eb8]'
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-100 bg-[#fbfbfe] font-navbar">
          <div className="flex flex-col gap-3.5 text-xs text-slate-500 font-bold font-navbar">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold px-1">
              Connect with us
            </span>
            <a
              href="mailto:binudp.dev@gmail.com"
              className="flex items-center gap-2.5 px-1 hover:text-[#005eb8] transition-colors"
            >
              <HiMail className="text-sm text-slate-400 shrink-0" />
              <span className="truncate">binudp.dev@gmail.com</span>
            </a>
            <a
              href="tel:+919706393924"
              className="flex items-center gap-2.5 px-1 hover:text-[#005eb8] transition-colors"
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
