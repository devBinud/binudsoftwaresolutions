import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaFacebook, FaQuoteLeft } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import bannerBgImage from '../assets/bg1.webp';
import binudAvatar from '../assets/team/binud.png';
import ArrowButton from '../components/ArrowButton';

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
  { name: 'X / Twitter', href: 'https://x.com', icon: FaTwitter },
  { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebook },
];

const founderFacts = [
  { label: 'Founded', value: '2021' },
  { label: 'Based in', value: 'Guwahati, Assam' },
];

const FoundersDesk = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        canonicalPath="/about/founders-desk"
      />
      <Navbar />

      <PageBanner
        title="From Founder's Desk"
        crumbs={[{ name: 'About Us', path: '/about' }, { name: "From Founder's Desk" }]}
        image={bannerBgImage}
      />

      <section className="py-16 md:py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Founder Profile Card ── */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-28 bg-white border border-slate-200 rounded-card shadow-sm overflow-hidden text-center"
          >
            <div className="relative aspect-square bg-gradient-to-b from-[#e8f1fb] to-[#cfe0f5] overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#005eb8]/10 to-transparent" />
              <img
                src={binudAvatar}
                alt="Binud Panging - Founder & CEO"
                className="relative w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-[#191919] font-black text-xl tracking-tight mb-1">Binud Panging</h2>
              <span className="block text-[#005eb8] font-semibold text-sm mb-6">
                Founder &amp; CEO, Binud Software Solutions
              </span>

              <dl className="grid grid-cols-2 rounded-xl border border-slate-200 divide-x divide-slate-200 mb-6">
                {founderFacts.map((fact) => (
                  <div key={fact.label} className="px-3 py-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{fact.label}</dt>
                    <dd className="text-[13px] font-bold text-slate-800">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#005eb8] hover:text-white hover:border-[#005eb8] transition-colors"
                      title={social.name}
                      aria-label={social.name}
                    >
                      <SocialIcon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.aside>

          {/* ── Founder's Letter ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 bg-white border border-slate-200 rounded-card shadow-sm p-6 sm:p-10 md:p-14 text-left"
          >
            <FaQuoteLeft size={34} className="text-[#005eb8]/15 mb-6" />

            <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4">
              A Message From Our Founder
            </span>
            <h2 className="text-[#191919] text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-8">
              We don't just ship features, we shape your digital future
            </h2>

            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>Dear friends, clients and partners,</p>
              <p>
                When I founded Binud Software Solutions in 2021 here in Guwahati, the idea was simple: build
                software the way I would want it built for my own business. Carefully, honestly and to last.
              </p>
              <p>
                I started this company because I believe every business deserves a technology partner who cares
                as much about the years after launch as about launch day itself.
              </p>

              <blockquote className="my-8 bg-[#005eb8]/5 rounded-xl px-6 py-5 text-[#191919] font-semibold leading-relaxed">
                We believe in writing clean code that stands the test of time, designing architectures that scale,
                and building relationships based on absolute trust.
              </blockquote>

              <p>
                Every engagement starts with listening, because technology only matters when it solves a real
                problem for real people. It has been a privilege to work with ambitious teams along the way, from
                Kangkan, a culture-inspired e-commerce brand, to GiveTheNeedy, a platform built for social good.
                Each project has reminded us that the best software comes from true partnership.
              </p>
              <p>
                Whether you are a startup with a bold idea or an established business ready for your next step, I
                would love to hear what you are building. My door is always open.
              </p>
              <p>Warm regards,</p>
            </div>

            {/* Signature */}
            <div className="mt-6 pt-6 border-t border-dashed border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span
                  className="block text-[#092c4c] text-4xl leading-none mb-2"
                  style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
                >
                  Binud Panging
                </span>
                <span className="block text-sm font-bold text-[#191919]">Binud Panging</span>
                <span className="block text-xs font-semibold text-slate-500">
                  Founder &amp; CEO, Binud Software Solutions
                </span>
              </div>

              <ArrowButton to="/contact" className="w-full sm:w-auto justify-between">Book a Call</ArrowButton>
            </div>
          </motion.article>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoundersDesk;
