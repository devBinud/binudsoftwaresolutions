import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import ArrowButton from './ArrowButton';

const EASE = [0.76, 0, 0.24, 1];

/* Mobile menu: the list fades in item by item once the panel has started opening */
const listVariants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.18 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const itemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  closed: { opacity: 0, y: 14, transition: { duration: 0.2 } },
};

/* Classic three-line hamburger that turns into an X.
   Each bar's resting position is a plain `top` value (3px / 9px / 15px in a 20px box),
   so the closed icon never depends on a transform being applied. */
const MenuIcon = ({ open }) => {
  const bar =
    'absolute left-0 block w-5 h-[2px] rounded-full bg-current transition-[top,transform,opacity] duration-300 ease-in-out';
  return (
    <span aria-hidden="true" className="relative block w-5 h-[18px]">
      <span className={`${bar} ${open ? 'top-[8px] rotate-45' : 'top-[2px]'}`} />
      <span className={`${bar} top-[8px] ${open ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
      <span className={`${bar} ${open ? 'top-[8px] -rotate-45' : 'top-[14px]'}`} />
    </span>
  );
};

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

  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const reduce = useReducedMotion();

  /* Close the mobile menu if the window grows to desktop width */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setDrawerOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
                className="hidden sm:inline-flex items-center h-11 px-5 rounded-[var(--radius-btn)] bg-accent text-white text-[16px] font-medium transition-colors duration-300 ease-in-out hover:bg-primary"
              >
                Contact Us
              </Link>

              <button
                type="button"
                className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer ${
                  drawerOpen ? 'bg-transparent text-ink hover:bg-sky hover:text-primary' : 'bg-sky text-ink hover:bg-primary-light'
                }`}
                onClick={toggleDrawer}
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <MenuIcon open={drawerOpen} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Reserves the header's height so page content starts below it */}
      <div aria-hidden="true" className="h-16 md:h-20" />
      <span id="main-content" tabIndex={-1} className="sr-only">Main content</span>

      {/* ═══ Mobile menu: full-screen panel under the header that wipes down from the top ═══ */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.nav
            key="mobile-drawer"
            id="mobile-drawer"
            aria-label="Site menu"
            className="lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 flex flex-col bg-white font-sans"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.4, ease: EASE, delay: 0.1 } }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <motion.ul
              className="flex-1 overflow-y-auto px-5 pt-4 pb-4 flex flex-col gap-0.5"
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.li variants={itemVariants}>
                <Link
                  to="/"
                  onClick={closeDrawer}
                  className={`flex items-center w-full py-2.5 px-4 rounded-lg text-[15px] font-normal transition-colors ${
                    location.pathname === '/' ? 'bg-sky text-primary' : 'text-ink hover:bg-sky hover:text-primary'
                  }`}
                >
                  Home
                </Link>
              </motion.li>

              {navLinks.map((link) => {
                const active = isParentActive(link);
                const itemClass = `flex items-center justify-between w-full py-2.5 px-4 rounded-lg text-[15px] font-normal transition-colors ${
                  active ? 'bg-sky text-primary' : 'text-ink hover:bg-sky hover:text-primary'
                }`;

                if (!link.children) {
                  return (
                    <motion.li key={link.name} variants={itemVariants}>
                      <Link to={link.path} onClick={closeDrawer} className={itemClass}>
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                }

                const expanded = openSubmenu === link.name;
                const subId = `mobile-sub-${link.name.toLowerCase()}`;
                return (
                  <motion.li key={link.name} variants={itemVariants}>
                    <button
                      type="button"
                      onClick={() => setOpenSubmenu(expanded ? null : link.name)}
                      className={`${itemClass} cursor-pointer`}
                      aria-expanded={expanded}
                      aria-controls={subId}
                    >
                      <span>{link.name}</span>
                      <HiChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Submenu slides open smoothly */}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          key="sub"
                          id={subId}
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <ul className="pt-0.5 pb-1 flex flex-col gap-0">
                            {link.children.map((child) => (
                              <li key={child.name}>
                                <Link
                                  to={child.path}
                                  onClick={closeDrawer}
                                  className="block py-2 px-4 rounded-lg text-[14px] font-normal text-body hover:text-primary hover:bg-sky transition-colors"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}

              <motion.li variants={itemVariants}>
                <Link
                  to="/contact"
                  onClick={closeDrawer}
                  className={`flex items-center w-full py-2.5 px-4 rounded-lg text-[15px] font-normal transition-colors ${
                    location.pathname === '/contact' ? 'bg-sky text-primary' : 'text-ink hover:bg-sky hover:text-primary'
                  }`}
                >
                  Contact
                </Link>
              </motion.li>
            </motion.ul>

            <motion.div
              className="p-5 border-t border-line bg-sky"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ArrowButton to="/contact" variant="solid" className="w-full" onClick={closeDrawer}>
                Get a Free Consultation
              </ArrowButton>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
