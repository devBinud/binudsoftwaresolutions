import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import founderPhoto from '../assets/team/founder.png';

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
        variant="founder"
        description={[
          'A personal note from Binud Panging, Founder & CEO, on why Binud Software Solutions exists and what every client can expect when working with us.',
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Founder Profile Card ── */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-28 w-full max-w-sm mx-auto lg:max-w-none bg-white border border-slate-200 rounded-card overflow-hidden"
          >
            <div className="relative aspect-[4/5] bg-gradient-to-b from-[#e6f5fc] to-[#cfe0f5] overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0077b6]/10 to-transparent" />
              <img
                src={founderPhoto}
                alt="Binud Panging - Founder & CEO"
                className="relative w-full h-full object-cover object-bottom"
              />
            </div>
          </motion.aside>

          {/* ── Founder's Letter ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 text-left lg:pt-2"
          >
            <FaQuoteLeft size={34} className="text-[#0077b6]/15 mb-6" />

            <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight mb-8">
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

              <blockquote className="my-8 bg-[#0077b6]/5 rounded-xl px-6 py-5 text-ink font-semibold leading-relaxed">
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
            <div className="mt-6 pt-6 border-t border-dashed border-slate-200">
              <span
                className="block text-[#06243a] text-4xl leading-none mb-2"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
              >
                Binud Panging
              </span>
              <span className="block text-sm font-bold text-ink">Binud Panging</span>
              <span className="block text-xs font-semibold text-slate-500">
                Founder &amp; CEO, Binud Software Solutions
              </span>
            </div>
          </motion.article>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoundersDesk;
