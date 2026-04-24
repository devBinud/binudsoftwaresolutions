import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Binud Software Solutions"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Building digital solutions that drive real business growth. From web apps to enterprise software.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: FaLinkedin, href: '#' },
                { Icon: FaTwitter,  href: '#' },
                { Icon: FaInstagram, href: '#' },
                { Icon: FaGithub,   href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#005d9e] hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home',      path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Contact',  path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions', 'AI & Automation', 'IT Consulting'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-slate-400 text-sm hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#005d9e]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <HiLocationMarker className="text-[#4da6e8]" size={14} />
                </div>
                <span className="text-slate-400 text-sm leading-snug">
                  Hengrabari, Guwahati,<br />Assam, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#005d9e]/20 flex items-center justify-center shrink-0">
                  <HiPhone className="text-[#4da6e8]" size={14} />
                </div>
                <a href="tel:+919706393924" className="text-slate-400 text-sm hover:text-white transition-colors">
                  +91 97063 93924
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#005d9e]/20 flex items-center justify-center shrink-0">
                  <HiMail className="text-[#4da6e8]" size={14} />
                </div>
                <a href="mailto:binudsoftwaresolutions@gmail.com" className="text-slate-400 text-sm hover:text-white transition-colors break-all">
                  binudsoftwaresolutions@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Binud Software Solutions. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">Built with ❤️ by Binud Software Solutions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
