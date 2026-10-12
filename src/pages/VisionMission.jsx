import { motion } from 'framer-motion';
import {
  FaEye,
  FaBullseye,
  FaCode,
  FaComments,
  FaHandshake,
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
  FaCheck,
} from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import bannerBgImage from '../assets/bg1.webp';
import ArrowButton from '../components/ArrowButton';

const missionPoints = [
  'Turn complex business challenges into simple, scalable software',
  'Write clean, well-tested code that stands the test of time',
  'Communicate honestly, with clear estimates and no hidden surprises',
  'Stay a long-term partner as your business and technology grow',
];

const coreValues = [
  {
    icon: FaCode,
    title: 'Quality Craftsmanship',
    desc: 'Clean code and solid architecture designed to last, not just to ship.',
  },
  {
    icon: FaComments,
    title: 'Transparency',
    desc: 'Honest estimates, regular demos and no hidden technical debt.',
  },
  {
    icon: FaHandshake,
    title: 'Long-Term Partnership',
    desc: 'We measure success by how your business grows long after launch.',
  },
  {
    icon: FaLightbulb,
    title: 'Practical Innovation',
    desc: 'Modern stacks and AI where they add real value, never hype for its own sake.',
  },
  {
    icon: FaShieldAlt,
    title: 'Ownership',
    desc: 'We take responsibility for outcomes, timelines and the security of your product.',
  },
  {
    icon: FaUsers,
    title: 'People First',
    desc: 'Every decision starts with the people who will use what we build.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const VisionMission = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead
        canonicalPath="/about/vision-mission"
      />
      <Navbar />

      <PageBanner
        title="Vision & Mission"
        crumbs={[{ name: 'About Us', path: '/about' }, { name: 'Vision & Mission' }]}
        image={bannerBgImage}
      />

      {/* ── Intro ── */}
      <section className="pt-16 md:pt-20 pb-12 bg-white">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4">
            Our Purpose
          </span>
          <h2 className="text-[#191919] text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight tracking-tight mb-5">
            Building Smart Solutions For A Smarter World
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Since 2021, everything we build at Binud Software Solutions has been guided by a clear sense of where
            we are going and why we do what we do.
          </p>
        </motion.div>
      </section>

      {/* ── Vision & Mission Cards ── */}
      <section className="pb-20 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Vision */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden bg-[#092c4c] text-white rounded-card p-8 sm:p-10 md:p-12 text-left"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#005eb8]/40 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                <FaEye size={22} className="text-blue-300" />
              </div>
              <span className="block text-xs font-extrabold uppercase tracking-widest text-blue-300 mb-3">
                Our Vision
              </span>
              <h3 className="text-2xl sm:text-[28px] font-black leading-snug tracking-tight mb-5">
                To be the most trusted technology partner from Northeast India, building software that helps
                businesses everywhere grow with confidence.
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We imagine a future where every business, from a local startup to a global enterprise, has access
                to world-class engineering that is reliable, secure and built to last.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-card p-8 sm:p-10 md:p-12 shadow-sm text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-[#005eb8]/10 border border-[#005eb8]/15 flex items-center justify-center mb-6">
              <FaBullseye size={22} className="text-[#005eb8]" />
            </div>
            <span className="block text-xs font-extrabold uppercase tracking-widest text-[#005eb8] mb-3">
              Our Mission
            </span>
            <h3 className="text-[#191919] text-2xl sm:text-[28px] font-black leading-snug tracking-tight mb-6">
              To convert complex challenges into scalable, elegant technology solutions that drive real business
              growth.
            </h3>
            <ul className="space-y-3">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-[#005eb8] text-white flex items-center justify-center shrink-0 mt-1">
                    <FaCheck size={9} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 text-left">
            <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4">
              Core Values
            </span>
            <h2 className="text-[#191919] text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-3">
              The principles behind every project
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These values shape how we write code, how we work with clients and how we grow as a team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value, i) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white border border-slate-200 rounded-card p-6 sm:p-7 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#005eb8]/10 flex items-center justify-center mb-5">
                    <ValueIcon size={20} className="text-[#005eb8]" />
                  </div>
                  <h3 className="text-[#191919] text-lg font-black tracking-tight mb-2">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-16 md:py-20 bg-white">
        <motion.div
          {...fadeUp}
          className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8 text-left"
        >
          <div className="max-w-2xl">
            <h3 className="text-[#191919] text-2xl md:text-3xl font-black tracking-tight mb-2.5">
              Let's build something that lasts
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Work with a team that shares your ambition, or read a personal note from our founder on why we do
              what we do.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <ArrowButton to="/contact" variant="solid" className="justify-between">
              Book a Consultation
            </ArrowButton>
            <ArrowButton to="/about/founders-desk" className="justify-between">
              From Founder's Desk
            </ArrowButton>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMission;
