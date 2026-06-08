import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';

const articles = [
  {
    id: 1,
    category: 'Company News',
    date: 'May 28, 2026',
    title: 'Binud Software Solutions Launches AI-Powered Analytics Platform for SMEs',
    excerpt:
      'We are proud to unveil our latest product — an AI-driven analytics dashboard that helps small and medium businesses make data-driven decisions in real time.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=480&q=80',
    featured: true,
    readTime: '4 min read',
  },
  {
    id: 2,
    category: 'Industry',
    date: 'May 14, 2026',
    title: 'How Custom Software is Reshaping the Way Startups Scale in 2026',
    excerpt:
      'A deep dive into why more startups are choosing tailored software over off-the-shelf SaaS solutions to gain a competitive edge.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=260&q=80',
    readTime: '6 min read',
  },
  {
    id: 3,
    category: 'Awards',
    date: 'Apr 30, 2026',
    title: 'Binud Recognised Among Top 10 Tech Startups in Northeast India',
    excerpt:
      `We were honoured to be listed among the region's most innovative technology companies for the second consecutive year.`,
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&h=260&q=80',
    readTime: '3 min read',
  },
  {
    id: 4,
    category: 'Tech Insight',
    date: 'Apr 10, 2026',
    title: 'Flutter vs React Native in 2026: Which One Should You Choose?',
    excerpt:
      'Our engineers break down the key differences, performance benchmarks, and real-world scenarios to help you pick the right stack.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=260&q=80',
    readTime: '8 min read',
  },
];

const featured = articles[0];
const secondary = articles.slice(1);

const categoryColors = {
  'Company News': { bg: '#695dd3', text: '#fff' },
  'Industry':     { bg: '#274e85', text: '#fff' },
  'Awards':       { bg: '#1a6b3c', text: '#fff' },
  'Tech Insight': { bg: '#3E4265', text: '#fff' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const NewsMediaSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#f8fafc] overflow-hidden select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#695dd3] text-sm font-bold tracking-widest uppercase mb-3">
              Latest From Us
            </p>
            <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
              News &amp; Media
            </h2>
            <p className="text-slate-400 text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans mt-0">
              Stories worth reading.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-4 group cursor-pointer w-fit pb-1 shrink-0"
          >
            <div className="w-12 h-12 rounded-full border border-[#0f172a]/30 flex items-center justify-center text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-[#0f172a] group-hover:scale-105 transition-all duration-300 shrink-0">
              <HiArrowRight size={18} className="transform group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="text-[#0f172a] font-bold text-sm tracking-wide uppercase">
              View All Articles
            </span>
          </Link>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Featured Article — left wide card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 group cursor-pointer"
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(39,78,133,0.10)] transition-all duration-500 hover:scale-[1.01] h-full flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category badge overlay */}
                <span
                  className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md"
                  style={{
                    backgroundColor: categoryColors[featured.category]?.bg,
                    color: categoryColors[featured.category]?.text,
                  }}
                >
                  {featured.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-4">
                  <span className="flex items-center gap-1.5">
                    <HiCalendar size={13} />
                    {featured.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{featured.readTime}</span>
                </div>

                <h3 className="text-[#0f172a] text-xl sm:text-2xl font-black leading-snug tracking-tight mb-3 group-hover:text-[#695dd3] transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium flex-1">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[#695dd3] font-bold text-sm group-hover:gap-3 transition-all duration-300">
                  Read Full Story
                  <HiArrowRight size={15} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Articles — right stacked list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {secondary.map((article, i) => (
              <motion.div
                key={article.id}
                custom={i + 1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(39,78,133,0.09)] transition-all duration-400 hover:scale-[1.01] flex gap-0"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden shrink-0 w-[110px] sm:w-[130px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${categoryColors[article.category]?.bg}18`,
                          color: categoryColors[article.category]?.bg,
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                        <HiCalendar size={10} />
                        {article.date}
                      </span>
                    </div>

                    <h4 className="text-[#0f172a] text-sm font-bold leading-snug tracking-tight group-hover:text-[#695dd3] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#695dd3] font-bold text-[11px] mt-3 group-hover:gap-2.5 transition-all duration-300">
                    Read More
                    <HiArrowRight size={11} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsMediaSection;
