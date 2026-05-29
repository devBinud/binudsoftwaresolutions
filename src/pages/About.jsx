import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiCheckCircle } from 'react-icons/hi';

const values = [
  { num: '01', title: 'Innovation', desc: 'We stay ahead of the curve, adopting the latest technologies to deliver cutting-edge solutions.' },
  { num: '02', title: 'Integrity', desc: 'Transparent communication and honest relationships are the foundation of everything we do.' },
  { num: '03', title: 'Excellence', desc: 'We hold ourselves to the highest standards in code quality, design, and delivery.' },
  { num: '04', title: 'Collaboration', desc: 'We work as an extension of your team, not just a vendor.' },
];

const blogPosts = [
  {
    title: 'The Future of AI in Custom Software Development',
    category: 'Technology',
    date: 'May 28, 2026',
    author: 'Binud Dev Team',
    desc: 'How intelligent AI and modern LLMs are transforming software engineering productivity and delivery timelines.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    accent: '#9b51e0'
  },
  {
    title: 'Why Cloud Migration is Critical for Scalability',
    category: 'Cloud Systems',
    date: 'May 15, 2026',
    author: 'Cloud Solutions Architect',
    desc: 'A comprehensive guide on moving legacy server architectures to highly resilient, auto-scaling AWS environments.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    accent: '#3081ec'
  },
  {
    title: 'Building Premium User Interfaces: A Design Philosophy',
    category: 'UI/UX Design',
    date: 'May 02, 2026',
    author: 'Lead Designer',
    desc: 'Exploring core design systems, typography hierarchies, micro-animations, and vibrant color harmonizations.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    accent: '#9b51e0'
  },
  {
    title: 'Designing API Gateways for High Availability',
    category: 'Backend Architecture',
    date: 'April 20, 2026',
    author: 'Senior Engineer',
    desc: 'Best practices for implementing reverse proxies, rate limiting, and caching for modern microservices architectures.',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    accent: '#3081ec'
  },
  {
    title: 'Securing React Applications in Production',
    category: 'Cybersecurity',
    date: 'April 08, 2026',
    author: 'Security Lead',
    desc: 'Essential strategies for preventing XSS, securing token storage, and configuring robust Content Security Policies.',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    accent: '#9b51e0'
  },
  {
    title: 'Agile Software Delivery: Lessons from the Trenches',
    category: 'Agile PM',
    date: 'March 25, 2026',
    author: 'Product Manager',
    desc: 'How transparent sprints, daily standups, and rigorous code reviews empower rapid high-quality product shipments.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    accent: '#3081ec'
  }
];

const About = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isBlog = queryParams.get('tab') === 'blog';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section 
        className="relative pt-44 pb-24 bg-cover bg-center select-none overflow-hidden"
        style={{ 
          backgroundImage: `url('${isBlog ? 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80' : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80'}')` 
        }}
      >
        <div className="absolute inset-0 bg-slate-950/75 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-6 select-none">
              <Link to="/" className="hover:text-[#9b51e0] transition-colors">Home</Link>
              <span className="text-slate-400">/</span>
              <span className="text-white">{isBlog ? 'Blog' : 'About Us'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight max-w-4xl">
              {isBlog ? 'Our ' : 'We Are '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec]">{isBlog ? 'Blog' : 'Binud Software Solutions'}</span>
            </h1>

            <div className="w-16 h-[3px] bg-gradient-to-r from-[#9b51e0] to-[#3081ec] mb-6 rounded-full" />

            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              {isBlog
                ? "Insights, research papers, and technical guides from our elite software engineering team."
                : "A passionate team of software engineers, designers, and strategists on a mission to help businesses thrive in the digital age."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {isBlog ? (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card overflow-hidden group hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-white flex flex-col h-full"
                >
                  <div className="h-52 overflow-hidden relative select-none shrink-0 bg-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-white bg-white/10 backdrop-blur-md border border-white/10">
                      {post.category}
                    </span>
                    <span className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-200">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
                        <span>{post.date}</span>
                        <span className="text-[#9b51e0]">•</span>
                        <span>{post.author}</span>
                      </div>
                      <h3 className="text-[#191919] group-hover:text-[#9b51e0] font-black text-lg leading-tight mb-2.5 transition-colors duration-200 font-sans">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-5 font-medium line-clamp-3">
                        {post.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#9b51e0] group-hover:text-[#3081ec] transition-colors duration-300">
                      Read Article <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge mb-3">Our Story</span>
                <h2 className="text-[#191919] text-3xl md:text-[38px] font-black leading-tight tracking-tight font-sans mb-5">
                  From a Vision to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec]">Trusted Partner</span>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 font-medium text-sm md:text-base">
                  Binud Software Solutions was founded with a simple belief: every business deserves access to
                  world-class software. We started small, taking on projects that others wouldn't, and delivering
                  results that spoke for themselves.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm md:text-base">
                  Today, we've grown into a full-service software company serving clients across industries —
                  from startups to established enterprises. Our commitment to quality and client success has never wavered.
                </p>
                <ul className="space-y-3">
                  {['Client-first approach', 'Agile & transparent process', 'Continuous learning & improvement', 'Long-term partnerships'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                      <HiCheckCircle className="text-[#9b51e0] shrink-0" size={19} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { num: '50+', label: 'Projects Delivered' },
                  { num: '30+', label: 'Happy Clients' },
                  { num: '5+', label: 'Years Experience' },
                  { num: '10+', label: 'Team Members' },
                ].map((stat) => (
                  <div key={stat.label} className="card p-6 text-center hover:scale-[1.03] transition-transform duration-300 bg-white border border-slate-100">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec] mb-1">{stat.num}</div>
                    <div className="text-slate-500 font-bold text-xs uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-[#faf9ff]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-left mb-12">
                <span className="badge mb-3">Our Values</span>
                <h2 className="text-[#191919] text-3xl md:text-[38px] font-black leading-tight tracking-tight font-sans">What We Stand For</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="card p-6 bg-white hover:scale-[1.03] transition-transform duration-300 border border-slate-100"
                  >
                    <div className="text-[#9b51e0] font-black text-2xl mb-3">{v.num}</div>
                    <h3 className="text-[#191919] font-black mb-2 text-base leading-tight">{v.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default About;
