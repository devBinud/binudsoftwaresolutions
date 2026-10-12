import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowButton from './ArrowButton';
import { HiMenuAlt3, HiX, HiMail, HiPhone, HiChevronDown } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
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
    {
      name: 'About Us',
      path: '/about',
      children: [
        { name: 'About Company', path: '/about' },
        { name: 'Vision & Mission', path: '/about/vision-mission' },
        { name: "From Founder's Desk", path: '/about/founders-desk' },
      ],
    },
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

  const isParentActive = (link) =>
    isLinkActive(link.path) || (link.children || []).some((child) => isLinkActive(child.path));

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          MAIN NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 mx-auto max-w-7xl px-6 md:px-12 font-navbar pointer-events-none transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'
          }`}
      >
        <div className={`pointer-events-auto h-16 pl-4 pr-2 sm:pl-6 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-between transition-shadow duration-300 ${scrolled
          ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
          : 'shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
          }`}>

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="Binud Software Solutions"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden xl:flex items-center xl:gap-9 2xl:gap-10 h-full">
            {navLinks.map((link) => {
              const active = isParentActive(link);
              const linkStyle = {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                color: active ? '#005eb8' : 'rgb(34, 34, 34)',
              };
              const linkClass = `text-[15px] 2xl:text-[16px] transition-colors duration-200 py-2 whitespace-nowrap hover:text-[#005eb8] ${active ? 'font-bold' : ''}`;

              if (!link.children) {
                return (
                  <Link key={link.name} to={link.path} style={linkStyle} className={linkClass}>
                    {link.name}
                  </Link>
                );
              }

              return (
                <div key={link.name} className="relative group/dd h-full flex items-center">
                  <Link
                    to={link.path}
                    style={linkStyle}
                    className={`${linkClass} inline-flex items-center gap-1`}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <HiChevronDown size={15} className="transition-transform duration-200 group-hover/dd:rotate-180 group-focus-within/dd:rotate-180" />
                  </Link>

                  {/* Dropdown Panel — hangs directly below the bar, left-aligned with the menu item */}
                  <div className="absolute -left-4 top-full opacity-0 invisible group-hover/dd:opacity-100 group-hover/dd:visible group-focus-within/dd:opacity-100 group-focus-within/dd:visible transition-opacity duration-200">
                    <div className="w-64 bg-white rounded-b-card overflow-hidden shadow-[0_16px_40px_rgba(15,23,42,0.14)] divide-y divide-black/[0.06]">
                      {link.children.map((child) => {
                        const childActive = isLinkActive(child.path);
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                            className={`block px-5 py-3 text-[14px] font-medium transition-colors duration-150 hover:bg-[#005eb8] hover:text-white ${childActive
                              ? 'bg-[#005eb8] text-white'
                              : 'text-[#222222]'
                              }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right side actions ── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:block">
              <ArrowButton to="/contact">Book a Call</ArrowButton>
            </div>

            {/* Hamburger Toggle */}
            <button
              className="xl:hidden p-2.5 mr-1 md:mr-0 rounded-full border border-slate-200 text-[#222222] hover:bg-slate-50 transition-colors"
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
            className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isParentActive(link);
              const itemStyle = {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 600,
                color: active ? '#005eb8' : 'rgb(34, 34, 34)',
              };
              const itemClass = `flex items-center justify-between w-full text-sm transition-all duration-200 py-3.5 px-5 rounded-card ${active
                ? 'bg-[#005eb8]/8 font-bold'
                : 'hover:bg-slate-50 hover:text-[#005eb8]'
                }`;

              if (!link.children) {
                return (
                  <Link key={link.name} to={link.path} onClick={closeDrawer} style={itemStyle} className={itemClass}>
                    <span>{link.name}</span>
                  </Link>
                );
              }

              const expanded = openSubmenu === link.name;
              return (
                <div key={link.name}>
                  <button
                    type="button"
                    onClick={() => setOpenSubmenu(expanded ? null : link.name)}
                    style={itemStyle}
                    className={`${itemClass} cursor-pointer`}
                    aria-expanded={expanded}
                  >
                    <span>{link.name}</span>
                    <HiChevronDown size={16} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                  </button>

                  {expanded && (
                    <div className="mt-1 ml-5 pl-3 border-l-2 border-slate-100 flex flex-col gap-1">
                      {link.children.map((child) => {
                        const childActive = isLinkActive(child.path);
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={closeDrawer}
                            className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${childActive
                              ? 'text-[#005eb8] bg-[#005eb8]/8'
                              : 'text-slate-600 hover:text-[#005eb8] hover:bg-slate-50'
                              }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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
