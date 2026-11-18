import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiMail, HiPhone, HiChevronDown } from 'react-icons/hi';
import ArrowButton from './ArrowButton';

/* Menu structure. Items with `children` open a dropdown of simple links. */
const navLinks = [
  {
    name: 'Services',
    path: '/services',
    children: [
      { name: 'Web Development', path: '/services' },
      { name: 'Mobile App Development', path: '/services' },
      { name: 'AI & Automation', path: '/services/ai-automation' },
      { name: 'Cloud & DevOps', path: '/services' },
      { name: 'UI/UX Design', path: '/services' },
      { name: 'IT Consulting', path: '/services' },
    ],
  },
  { name: 'Case Studies', path: '/case-studies' },
  {
    name: 'Company',
    path: '/about',
    children: [
      { name: 'About Company', path: '/about' },
      { name: 'Vision & Mission', path: '/about/vision-mission' },
      { name: "From Founder's Desk", path: '/about/founders-desk' },
      { name: 'Gallery', path: '/gallery' },
    ],
  },
  {
    name: 'Resources',
    path: '/blog',
    children: [
      { name: 'Blog', path: '/blog' },
      { name: 'Coding Guides', path: '/coding-guides' },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // mobile accordion
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const location = useLocation();
  const triggerRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menus on route change (adjusting state during render, as React recommends) */
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setDrawerOpen(false);
    setOpenMenu(null);
  }

  /* Lock body scroll and allow Escape while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    if (!drawerOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const isLinkActive = (path) => location.pathname === path;
  const isParentActive = (link) =>
    isLinkActive(link.path) ||
    (link.children || []).some((child) => location.pathname === child.path);

  /* Close a desktop dropdown when focus leaves it entirely */
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
  };

  const handleMenuKeyDown = (e, name) => {
    if (e.key === 'Escape') {
      setOpenMenu(null);
      triggerRefs.current[name]?.focus();
    }
  };

  const linkBase =
    'relative inline-flex items-center gap-1 h-full text-[16px] font-semibold transition-colors duration-200 whitespace-nowrap';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <header className="fixed left-0 right-0 top-0 z-50 font-sans">
        <nav
          aria-label="Main"
          className={`transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_24px_-6px_rgba(3,47,49,0.16)]'
              : 'bg-white shadow-[0_6px_20px_-6px_rgba(3,47,49,0.12)]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-20 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" aria-label="Binud Software Solutions — Home">
              <img
                src="/logo-navbar.png"
                alt="Binud Software Solutions"
                width={470}
                height={120}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-8 h-full">
              {navLinks.map((link) => {
                const active = isParentActive(link);
                // Active page: blue text only, no underline
                const colour = active ? 'text-primary' : 'text-ink hover:text-primary';

                if (!link.children) {
                  return (
                    <li key={link.name} className="h-full flex items-center">
                      <Link
                        to={link.path}
                        className={`${linkBase} ${colour}`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                }

                const open = openMenu === link.name;
                const panelId = `menu-${link.name.toLowerCase()}`;
                return (
                  <li
                    key={link.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setOpenMenu(link.name)}
                    onMouseLeave={() => setOpenMenu((current) => (current === link.name ? null : current))}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleMenuKeyDown(e, link.name)}
                  >
                    <span className={`${linkBase} ${colour}`}>
                      <Link to={link.path} className="py-2">
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        ref={(el) => { triggerRefs.current[link.name] = el; }}
                        onClick={() => setOpenMenu(open ? null : link.name)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        aria-label={`${link.name} submenu`}
                        className="p-1 -mr-1 rounded cursor-pointer"
                      >
                        <HiChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </span>

                    {/* Dropdown panel: simple one-line links */}
                    <div
                      id={panelId}
                      className={`absolute top-full -left-4 pt-2 transition-opacity duration-300 ease-in-out ${
                        open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                      }`}
                    >
                      <ul className="w-60 bg-white rounded-xl border border-line overflow-hidden">
                        {link.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              to={child.path}
                              className="block px-5 py-3 text-[15px] font-medium text-ink whitespace-nowrap transition-colors duration-300 ease-in-out hover:bg-sky hover:text-primary focus-visible:bg-sky focus-visible:outline-offset-[-3px]"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center h-11 px-4 rounded-[var(--radius-btn)] bg-accent text-white text-[17px] font-medium transition-colors duration-300 ease-in-out hover:bg-primary"
              >
                Contact Us
              </Link>

              <button
                type="button"
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-[10px] border border-line bg-white text-ink hover:bg-sky transition-colors"
                onClick={openDrawer}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <HiMenuAlt3 size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Reserves the header's height so page content starts below it */}
      <div aria-hidden="true" className="h-16 md:h-20" />
      <span id="main-content" tabIndex={-1} className="sr-only">Main content</span>

      {/* ═══ Mobile drawer ═══ */}
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={`fixed inset-0 z-[998] bg-navy/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!drawerOpen}
        className={`fixed top-0 right-0 bottom-0 z-[999] flex flex-col w-full sm:w-[400px] bg-white transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <Link to="/" className="flex items-center gap-2.5" onClick={closeDrawer}>
            <img
              src="/logo-navbar.png"
              alt="Binud Software Solutions"
              width={470}
              height={120}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={closeDrawer}
            className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-line hover:bg-sky text-ink transition-colors"
            aria-label="Close menu"
          >
            <HiX size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                to="/"
                onClick={closeDrawer}
                className={`flex items-center w-full py-3.5 px-4 rounded-xl text-[15px] font-semibold ${
                  location.pathname === '/' ? 'bg-sky text-primary' : 'text-ink hover:bg-sky'
                }`}
              >
                Home
              </Link>
            </li>
            {navLinks.map((link) => {
              const active = isParentActive(link);
              const itemClass = `flex items-center justify-between w-full py-3.5 px-4 rounded-xl text-[15px] font-semibold transition-colors ${
                active ? 'bg-sky text-primary' : 'text-ink hover:bg-sky hover:text-primary'
              }`;

              if (!link.children) {
                return (
                  <li key={link.name}>
                    <Link to={link.path} onClick={closeDrawer} className={itemClass}>
                      {link.name}
                    </Link>
                  </li>
                );
              }

              const expanded = openSubmenu === link.name;
              return (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => setOpenSubmenu(expanded ? null : link.name)}
                    className={`${itemClass} cursor-pointer`}
                    aria-expanded={expanded}
                  >
                    <span>{link.name}</span>
                    <HiChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {expanded && (
                    <ul className="mt-1 mb-2 ml-4 pl-3 border-l-2 border-line flex flex-col gap-0.5">
                      {link.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.path}
                            onClick={closeDrawer}
                            className="block py-2.5 px-3 rounded-lg text-sm font-medium text-body hover:text-primary hover:bg-sky transition-colors"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                to="/contact"
                onClick={closeDrawer}
                className={`flex items-center w-full py-3.5 px-4 rounded-xl text-[15px] font-semibold ${
                  location.pathname === '/contact' ? 'bg-sky text-primary' : 'text-ink hover:bg-sky'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-5 border-t border-line bg-sky">
          <ArrowButton to="/contact" variant="solid" className="w-full mb-4" onClick={closeDrawer}>
            Get a Free Consultation
          </ArrowButton>
          <div className="flex flex-col gap-3 text-sm font-medium text-body">
            <a href="mailto:binudp.dev@gmail.com" className="flex items-center gap-2.5 hover:text-primary transition-colors">
              <HiMail className="text-primary shrink-0" size={18} aria-hidden="true" />
              <span className="truncate">binudp.dev@gmail.com</span>
            </a>
            <a href="tel:+919706393924" className="flex items-center gap-2.5 hover:text-primary transition-colors">
              <HiPhone className="text-primary shrink-0" size={18} aria-hidden="true" />
              <span>+91 97063 93924</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
