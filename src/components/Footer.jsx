import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaArrowRight } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Case Studies', path: '/portfolio?tab=case-studies' },
    { name: 'Blog', path: '/about?tab=blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Cloud Solutions',
    'AI & Automation',
    'IT Consulting',
  ];

  const socials = [
    { Icon: FaLinkedin, href: '#', label: 'LinkedIn', color: '#0077B5' },
    { Icon: FaTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { Icon: FaInstagram, href: '#', label: 'Instagram', color: '#E1306C' },
    { Icon: FaGithub, href: '#', label: 'GitHub', color: '#6e5494' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#fbfcff] via-[#f7f9fc] to-[#f0f4f8] select-none">
      {/* Light Minimalist Gradient Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main footer body (Wrapped in standard page boundaries for pixel-perfect alignment) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="Binud Software Solutions"
                className="h-10 w-auto object-contain block mix-blend-multiply"
              />
            </div>

            <p className="text-slate-600 text-[14px] leading-relaxed mb-6 max-w-[275px] font-medium">
              Building digital solutions that drive real business growth — from web apps to enterprise software.
            </p>

            {/* CTA mini Button (Uses Hero-Matching Purple-to-Blue Gradient) */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9b51e0] to-[#3081ec] text-white text-[11px] font-extrabold uppercase tracking-wider px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(155,81,224,0.35)] hover:shadow-[0_6px_28px_rgba(155,81,224,0.55)] hover:scale-[1.03] transition-all duration-300 w-fit mb-6"
            >
              Start a Project <FaArrowRight size={10} />
            </Link>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = color;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.color = '';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[#191919] font-black text-xs tracking-[0.15em] uppercase mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-[#9b51e0] text-sm font-medium transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9b51e0] scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#191919] font-black text-xs tracking-[0.15em] uppercase mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-slate-600 hover:text-[#9b51e0] text-sm font-medium transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9b51e0] scale-0 group-hover:scale-100 transition-transform duration-200 shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#191919] font-black text-xs tracking-[0.15em] uppercase mb-6">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b51e0]/8 to-[#3081ec]/8 text-[#9b51e0] shrink-0 border border-[#9b51e0]/15 flex items-center justify-center">
                  <HiLocationMarker size={14} />
                </div>
                <span className="text-slate-600 text-sm font-medium leading-relaxed pt-0.5">
                  Hengrabari, Guwahati,<br />Assam, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b51e0]/8 to-[#3081ec]/8 text-[#9b51e0] shrink-0 border border-[#9b51e0]/15 flex items-center justify-center">
                  <HiPhone size={14} />
                </div>
                <a
                  href="tel:+919706393924"
                  className="text-slate-600 hover:text-[#9b51e0] text-sm font-medium transition-colors duration-200"
                >
                  +91 97063 93924
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b51e0]/8 to-[#3081ec]/8 text-[#9b51e0] shrink-0 border border-[#9b51e0]/15 flex items-center justify-center">
                  <HiMail size={14} />
                </div>
                <a
                  href="mailto:binudsoftwaresolutions@gmail.com"
                  className="text-slate-600 hover:text-[#9b51e0] text-sm font-medium transition-colors duration-200 break-all"
                >
                  binudsoftwaresolutions@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>



        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-semibold">
            © {new Date().getFullYear()} Binud Software Solutions. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs font-semibold flex items-center gap-1">
            Built with <span className="text-rose-500 animate-pulse">❤️</span> in Assam, India
          </p>
        </div>
      </div>

      {/* ── Giant Premium Watermark Bottom Section (Inherits footer background for seamless unity) ── */}
      <div className="w-full relative select-none pointer-events-none pb-12 mt-4">
        <div className="text-center px-4">
          {/* Giant Outlined / Faint Text */}
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b3fd0] to-[#2071dc] uppercase font-black tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
              lineHeight: 0.85,
              fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            BINUD
          </div>
          <div
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b3fd0] to-[#2071dc] font-extrabold uppercase tracking-[0.25em] mt-1"
            style={{
              fontSize: 'clamp(1rem, 3.5vw, 2.5rem)',
              fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            Software Solutions
          </div>
          <div className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mt-3 opacity-90">
            Turning Ideas Into Digital Reality
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
