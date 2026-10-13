import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineEye } from 'react-icons/hi';
import { fetchVisitorCount } from '../utils/visitorCount';

/* "12,345 visitors" pill; renders nothing until a count is available. */
const VisitorCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let active = true;
    fetchVisitorCount().then((value) => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!count) return null;

  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
      <span className="relative flex w-2 h-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
        <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
      </span>
      <HiOutlineEye size={15} aria-hidden="true" />
      <span>
        <span className="font-bold text-white tabular-nums">{count.toLocaleString('en-IN')}</span> visitors
      </span>
    </span>
  );
};

const Footer = () => {
  const companyLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Coding Guides', path: '/coding-guides' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Web Development', path: '/services' },
    { name: 'Mobile Apps', path: '/services' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'Cloud Solutions', path: '/services' },
    { name: 'AI & Automation', path: '/services/ai-automation' },
    { name: 'IT Consulting', path: '/services' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <FaLinkedin size={16} /> },
    { name: 'X (Twitter)', href: 'https://x.com', icon: <FaXTwitter size={15} /> },
    { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook size={16} /> },
    { name: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram size={16} /> },
    { name: 'YouTube', href: 'https://youtube.com', icon: <FaYoutube size={17} /> },
  ];

  const headingClass = 'text-white text-sm font-bold uppercase tracking-wide';
  const linkClass = 'text-slate-300 hover:text-white text-sm font-medium transition-colors inline-block';

  return (
    <footer className="bg-[#092c4c] text-white border-t border-slate-700/60 font-sans z-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8">

        {/* ── Main Columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 text-left">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              {/* logo-on-dark.png: same logo with its see-through "bp" filled white, for the dark footer */}
              <img src="/logo-on-dark.png" alt="" className="h-11 w-11 shrink-0 object-contain" />
              <span className="text-xl font-black tracking-tight text-white">
                Binud Software Solutions
              </span>
            </Link>

            <p className="mt-5 text-base font-semibold text-white">
              <span className="text-blue-300">Engineered</span> for Growth.{' '}
              <span className="text-amber-300">Built</span> to Last.
            </p>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-sm">
              We are a custom software engineering company in Guwahati, Assam, building
              web platforms, mobile apps and AI automation that help businesses scale.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6 text-slate-300">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title={social.name}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className={`${headingClass} mb-5`}>Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h4 className={`${headingClass} mb-5`}>Services</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-6">
            <div>
              <h4 className={`${headingClass} mb-3`}>Office Address</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Guwahati, Assam, India
              </p>
            </div>

            <div>
              <h4 className={`${headingClass} mb-3`}>Email Address</h4>
              <a
                href="mailto:binudsoftwaresolutions@gmail.com"
                className={`${linkClass} break-all`}
              >
                binudsoftwaresolutions@gmail.com
              </a>
            </div>

            <div>
              <h4 className={`${headingClass} mb-3`}>Contact Us</h4>
              <a href="tel:+919706393924" className={linkClass}>
                (+91) 97063 93924
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 border-t border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
          <p>© {new Date().getFullYear()} Binud Software Solutions. All rights reserved.</p>
          <VisitorCounter />
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
