import { motion, useReducedMotion } from 'framer-motion';
import { FiAward, FiEye, FiTrendingUp, FiZap, FiShield, FiUsers } from 'react-icons/fi';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import ArrowButton from '../components/ArrowButton';

const coreValues = [
  {
    title: 'Quality Craftsmanship',
    icon: FiAward,
    desc: 'Clean code and solid architecture designed to last, not just to ship.',
  },
  {
    title: 'Transparency',
    icon: FiEye,
    desc: 'Honest estimates, regular demos and no hidden technical debt.',
  },
  {
    title: 'Long-Term Partnership',
    icon: FiTrendingUp,
    desc: 'We measure success by how your business grows long after launch.',
  },
  {
    title: 'Practical Innovation',
    icon: FiZap,
    desc: 'Modern stacks and AI where they add real value, never hype for its own sake.',
  },
  {
    title: 'Ownership',
    icon: FiShield,
    desc: 'We take responsibility for outcomes, timelines and the security of your product.',
  },
  {
    title: 'People First',
    icon: FiUsers,
    desc: 'Every decision starts with the people who will use what we build.',
  },
];

const VisionMission = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead canonicalPath="/about/vision-mission" />
      <Navbar />

      <PageBanner
        title="Vision & Mission"
        crumbs={[{ name: 'About Us', path: '/about' }, { name: 'Vision & Mission' }]}
        variant="vision"
        description={[
          'Building smart solutions for a smarter world. Since 2021, everything we build at Binud Software Solutions has been guided by a clear sense of where we are going and why we do what we do.',
          'Our vision sets the direction, our mission shapes the work, and our values guide every decision we make along the way.',
        ]}
      />

      {/* ── Vision & Mission ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div {...fadeUp()} className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
              Where we are going, and how we get there
            </h2>
            <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
              Two simple ideas sit behind every project we take on: the future we are building towards, and the
              way we work to get there.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Vision */}
            <motion.article
              {...fadeUp()}
              className="bg-[#eaf7f0] rounded-[24px] p-7 sm:p-9 md:p-10 text-left"
            >
              <h3 className="text-ink text-2xl md:text-[28px] font-semibold tracking-tight mb-3">Our Vision</h3>
              <p className="text-ink/85 !text-[16px] md:!text-[17px] leading-[1.7]">
                To be the most trusted technology partner from Northeast India, building software that helps
                businesses everywhere grow with confidence. We imagine a future where every business, from a local
                startup to a global enterprise, has access to world-class engineering that is reliable, secure and
                built to last.
              </p>
            </motion.article>

            {/* Mission */}
            <motion.article
              {...fadeUp(0.1)}
              className="bg-[#e3eff5] rounded-[24px] p-7 sm:p-9 md:p-10 text-left"
            >
              <h3 className="text-ink text-2xl md:text-[28px] font-semibold tracking-tight mb-3">Our Mission</h3>
              <p className="text-ink/85 !text-[16px] md:!text-[17px] leading-[1.7]">
                To convert complex challenges into scalable, elegant technology solutions that drive real business
                growth. We write clean, well-tested code, communicate honestly with clear estimates and no hidden
                surprises, and stay a long-term partner as your business and technology grow.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 md:py-24 bg-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div {...fadeUp()} className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
              The principles behind every project
            </h2>
            <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8]">
              These values shape how we write code, how we work with clients and how we grow as a team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, i) => (
              <motion.article
                key={value.title}
                {...fadeUp((i % 2) * 0.06)}
                className="bg-white rounded-card p-6 sm:p-8 text-left shadow-[0_10px_30px_-12px_rgba(3,47,49,0.14)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-primary text-white"
                    aria-hidden="true"
                  >
                    <value.icon size={26} />
                  </span>
                  <h3 className="text-ink text-xl md:text-[22px] font-semibold tracking-tight">{value.title}</h3>
                </div>
                <p className="text-body !text-[16px] leading-[1.75]">{value.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="py-16 md:py-20 bg-white">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-4">
            Let&apos;s build something that lasts
          </h2>
          <p className="text-body !text-[16px] md:!text-[17px] leading-[1.8] mb-8">
            Work with a team that shares your ambition and cares about getting it right, from the first idea to
            long after launch.
          </p>
          <div className="flex justify-center">
            <ArrowButton to="/contact" variant="solid">
              Book a Consultation
            </ArrowButton>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMission;
