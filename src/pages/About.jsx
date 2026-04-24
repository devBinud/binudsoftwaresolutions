import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamSection from '../sections/TeamSection';
import CTASection from '../sections/CTASection';
import { HiCheckCircle } from 'react-icons/hi';

const values = [
  { num: '01', title: 'Innovation', desc: 'We stay ahead of the curve, adopting the latest technologies to deliver cutting-edge solutions.' },
  { num: '02', title: 'Integrity', desc: 'Transparent communication and honest relationships are the foundation of everything we do.' },
  { num: '03', title: 'Excellence', desc: 'We hold ourselves to the highest standards in code quality, design, and delivery.' },
  { num: '04', title: 'Collaboration', desc: 'We work as an extension of your team, not just a vendor.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 pt-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-5">
              We Are <span className="text-[#005d9e]">Binud Software Solutions</span>
            </h1>
            <p className="text-[#64748b] text-lg leading-relaxed max-w-2xl mx-auto">
              A passionate team of software engineers, designers, and strategists on a mission to help
              businesses thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="badge mb-3">Our Story</span>
            <h2 className="section-title mb-4">
              From a Vision to a <span className="text-[#005d9e]">Trusted Partner</span>
            </h2>
            <p className="text-[#64748b] leading-relaxed mb-4">
              Binud Software Solutions was founded with a simple belief: every business deserves access to
              world-class software. We started small, taking on projects that others wouldn't, and delivering
              results that spoke for themselves.
            </p>
            <p className="text-[#64748b] leading-relaxed mb-6">
              Today, we've grown into a full-service software company serving clients across industries —
              from startups to established enterprises. Our commitment to quality and client success has never wavered.
            </p>
            <ul className="space-y-2.5">
              {['Client-first approach', 'Agile & transparent process', 'Continuous learning & improvement', 'Long-term partnerships'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[#475569] text-sm">
                  <HiCheckCircle className="text-[#005d9e] shrink-0" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: '50+', label: 'Projects Delivered' },
              { num: '30+', label: 'Happy Clients' },
              { num: '5+', label: 'Years Experience' },
              { num: '10+', label: 'Team Members' },
            ].map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <div className="text-3xl font-bold text-[#005d9e] mb-1">{stat.num}</div>
                <div className="text-[#64748b] text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="badge mb-3">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 bg-white"
              >
                <div className="text-[#005d9e] font-bold text-2xl mb-3">{v.num}</div>
                <h3 className="text-[#0f172a] font-semibold mb-2">{v.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
