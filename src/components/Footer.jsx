import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Use', path: '/terms' },
  ];

  return (
    <footer className="bg-[#092c4c] text-white border-t border-slate-700/60 font-sans z-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-10">

        {/* ── Brand Logo & Social Icons Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-700/70 text-left">

          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-white font-sans">
              Binud Software Solutions
            </span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-300">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="X (Twitter)">
              <FaXTwitter size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube">
              <FaYoutube size={22} />
            </a>
          </div>

        </div>

        {/* ── Quick Navigation Links & Corporate Badges ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 items-center text-left">

          {/* Quick Links Column (4 cols) */}
          <div className="lg:col-span-4">
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Badges & Awards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Badge 1 */}
            <div className="bg-white/10 border border-white/15 p-4 rounded-none text-left">
              <div className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">
                TOP RATED SOFTWARE
              </div>
              <div className="text-xs font-bold text-white mb-1">
                FASTEST GROWING IT COMPANY
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                5 Year Excellence Champion
              </div>
            </div>

            {/* Badge 2 */}
            <div className="bg-white/10 border border-white/15 p-4 rounded-none text-left">
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                EXCELLENCE LEADER
              </div>
              <div className="text-xs font-bold text-white mb-1">
                FULL-STACK &amp; AI SYSTEMS
              </div>
              <div className="text-[10px] text-slate-300 font-medium">
                Verified Tech Solutions
              </div>
            </div>

            {/* Badge 3 */}
            <div className="bg-white/10 border border-white/15 p-4 rounded-none text-left flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
                  SECURITY &amp; AUDIT
                </div>
                <div className="text-xs font-bold text-white">
                  SECURITY RATING
                </div>
              </div>
              <div className="text-emerald-400 font-extrabold text-sm mt-2 flex items-center gap-1">
                <HiCheckCircle size={16} /> 99.8 / 100
              </div>
            </div>

          </div>

        </div>

        {/* ── Bottom Copyright Bar ── */}
        <div className="pt-8 border-t border-slate-700/70 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Binud Software Solutions. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
