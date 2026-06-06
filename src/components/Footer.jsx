import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaGithub, FaArrowRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/portfolio' },
    { name: 'Case Studies', path: '/portfolio?tab=case-studies' },
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
    { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0077B5' },
    { Icon: FaXTwitter, href: 'https://x.com', label: 'Twitter', color: '#000000' },
    { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: '#E1306C' },
    { Icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: '#333333' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0c0818] via-[#120824] to-[#200938] select-none text-white rounded-t-[48px] md:rounded-t-[64px] border-t border-white/[0.08] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] z-20">
      {/* Light Minimalist Gradient Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="flex flex-col">
            {/* Sleek Glassmorphic Logo Container */}
            <div className="mb-6 bg-white/95 rounded-2xl px-5 py-3 w-fit border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center hover:border-white/20 transition-all duration-300">
              <img
                src="/logo.png"
                alt="Binud Software Solutions"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-slate-400 text-[14px] leading-relaxed mb-6 max-w-[275px] font-medium">
              Building digital solutions that drive real business growth — from web apps to enterprise software.
            </p>

            {/* CTA mini Button (Uses Brand Color Purple) */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#695dd3] text-white text-[11px] font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_4px_18px_rgba(105,93,211,0.25)] hover:shadow-[0_6px_28px_rgba(105,93,211,0.45)] hover:bg-[#574cbd] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-fit mb-6"
            >
              Start a Project <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Socials */}
            <div className="flex gap-3.5">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = color;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${color}40`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-slate-400 font-extrabold text-[13.5px] tracking-wide mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-white text-[14px] font-medium transition-all duration-300 flex items-center gap-2 group hover:translate-x-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#695dd3] scale-0 group-hover:scale-100 transition-transform duration-300 shrink-0 shadow-[0_0_8px_#695dd3]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-400 font-extrabold text-[13.5px] tracking-wide mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-white text-[14px] font-medium transition-all duration-300 flex items-center gap-2 group hover:translate-x-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#695dd3] scale-0 group-hover:scale-100 transition-transform duration-300 shrink-0 shadow-[0_0_8px_#695dd3]" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-400 font-extrabold text-[13.5px] tracking-wide mb-6">
              Get in touch
            </h4>
            <div className="flex flex-col gap-3.5">
              {/* Location Card */}
              <div className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4 hover:bg-white/[0.06] hover:border-white/15 hover:translate-y-[-2px] transition-all duration-300 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-white/5 text-slate-300 shrink-0 border border-white/10 flex items-center justify-center group-hover:bg-[#695dd3] group-hover:border-[#695dd3] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(105,93,211,0.3)] transition-all duration-300">
                  <HiLocationMarker size={16} />
                </div>
                <div>
                  <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 mb-1">Office</h5>
                  <span className="text-slate-300 text-[13.5px] font-semibold leading-relaxed">
                    Hengrabari, Guwahati,<br />Assam, India
                  </span>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href="tel:+919706393924"
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4 hover:bg-white/[0.06] hover:border-white/15 hover:translate-y-[-2px] transition-all duration-300 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 text-slate-300 shrink-0 border border-white/10 flex items-center justify-center group-hover:bg-[#695dd3] group-hover:border-[#695dd3] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(105,93,211,0.3)] transition-all duration-300 shrink-0">
                  <HiPhone size={16} />
                </div>
                <div>
                  <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 mb-1">Call Us</h5>
                  <span className="text-slate-300 text-[13.5px] font-bold group-hover:text-white transition-colors duration-200">
                    +91 97063 93924
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:binudsoftwaresolutions@gmail.com"
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4 hover:bg-white/[0.06] hover:border-white/15 hover:translate-y-[-2px] transition-all duration-300 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 text-slate-300 shrink-0 border border-white/10 flex items-center justify-center group-hover:bg-[#695dd3] group-hover:border-[#695dd3] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(105,93,211,0.3)] transition-all duration-300 shrink-0">
                  <HiMail size={16} />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 mb-1">Email Us</h5>
                  <span className="text-slate-300 text-[13.5px] font-bold group-hover:text-white transition-colors duration-200 break-all">
                    binudsoftwaresolutions@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center pt-8 border-t border-white/[0.08]">
          <p className="text-slate-500 text-xs font-semibold text-center">
            © {new Date().getFullYear()} Binud Software Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
