import { motion, useReducedMotion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import ArrowButton from '../components/ArrowButton';

const missionPoints = [
  'Turn complex business challenges into simple, scalable software',
  'Write clean, well-tested code that stands the test of time',
  'Communicate honestly, with clear estimates and no hidden surprises',
  'Stay a long-term partner as your business and technology grow',
];

const coreValues = [
  {
    title: 'Quality Craftsmanship',
    desc: 'Clean code and solid architecture designed to last, not just to ship.',
  },
  {
    title: 'Transparency',
    desc: 'Honest estimates, regular demos and no hidden technical debt.',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We measure success by how your business grows long after launch.',
  },
  {
    title: 'Practical Innovation',
    desc: 'Modern stacks and AI where they add real value, never hype for its own sake.',
  },
  {
    title: 'Ownership',
    desc: 'We take responsibility for outcomes, timelines and the security of your product.',
  },
  {
    title: 'People First',
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
              className="bg-sky border border-line rounded-card p-7 sm:p-9 md:p-10 text-left flex flex-col"
            >
              <span className="block text-primary text-sm font-medium mb-3">Our Vision</span>
              <h3 className="text-ink text-[22px] md:text-2xl font-semibold leading-snug tracking-tight mb-5">
                To be the most trusted technology partner from Northeast India, building software that helps
                businesses everywhere grow with confidence.
              </h3>
              <p className="text-body !text-[16px] leading-[1.8]">
                We imagine a future where every business, from a local startup to a global enterprise, has access
                to world-class engineering that is reliable, secure and built to last.
              </p>
            </motion.article>

            {/* Mission */}
            <motion.article
              {...fadeUp(0.1)}
              className="bg-sky border border-line rounded-card p-7 sm:p-9 md:p-10 text-left flex flex-col"
            >
              <span className="block text-primary text-sm font-medium mb-3">Our Mission</span>
              <h3 className="text-ink text-[22px] md:text-2xl font-semibold leading-snug tracking-tight mb-5">
                To convert complex challenges into scalable, elegant technology solutions that drive real business
                growth.
              </h3>
              <ul className="space-y-3">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-body !text-[16px] leading-relaxed">
                    <FiCheck size={17} className="text-primary shrink-0 mt-1" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <motion.article
                key={value.title}
                {...fadeUp((i % 3) * 0.06)}
                className="bg-white border border-line rounded-card p-7 text-left"
              >
                <span className="block w-8 h-[3px] rounded-full bg-primary mb-5" aria-hidden="true" />
                <h3 className="text-ink text-xl font-semibold tracking-tight mb-2.5">{value.title}</h3>
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
            Work with a team that shares your ambition, or read a personal note from our founder on why we do what
            we do.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <ArrowButton to="/contact" variant="solid" className="justify-between">
              Book a Consultation
            </ArrowButton>
            <ArrowButton to="/about/founders-desk" className="justify-between">
              From Founder&apos;s Desk
            </ArrowButton>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMission;
