import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { HiArrowRight, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';

const LatestBlogsSection = () => {
  // Get latest 3 blog posts
  const latestPosts = blogPosts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#f8fafc] overflow-hidden select-none border-t border-slate-100">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#274e85]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div>
            <p className="text-[#695dd3] text-sm font-bold tracking-widest uppercase mb-3">
              Explore Our Insights
            </p>
            <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
              Latest from Our Blog
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed font-sans mt-2 max-w-xl">
              In-depth articles, engineering tips, and design guides written by our tech experts.
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
              View All Blogs
            </span>
          </Link>
        </div>

        {/* ── Blogs Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(39,78,133,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card Image Banner */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-sm shadow-sm text-[#274e85]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow text-left">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3 select-none">
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineCalendar className="text-slate-400 text-sm" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineClock className="text-slate-400 text-sm" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#191919] group-hover:text-[#274e85] leading-snug tracking-tight mb-2.5 transition-colors duration-300 line-clamp-2">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {post.excerpt}
                </p>

                {/* Author profile & Action row */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 leading-none mb-0.5">{post.author.name}</span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none">{post.author.role}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-xs font-extrabold text-[#274e85] group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1"
                  >
                    Read Post <HiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default LatestBlogsSection;
