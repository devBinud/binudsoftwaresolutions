import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import ArrowButton from '../components/ArrowButton';
import BlogCard from '../components/BlogCard';

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
    <section className="relative py-20 md:py-28 bg-[#f8fafc] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#005eb8]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div>
            <span className="badge mb-3">
              Explore Our Insights
            </span>
            <h2 className="text-[#0f172a] text-3xl sm:text-[42px] font-black leading-tight tracking-tight font-sans">
              Latest from Our Blog
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed font-sans mt-2 max-w-xl">
              Stay updated with tech insights, software architecture trends, and mobile development best practices.
            </p>
          </div>

          <ArrowButton to="/blog" className="w-fit shrink-0">View All Posts</ArrowButton>
        </div>

        {/* ── Blogs Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {latestPosts.map((post) => (
            <motion.article key={post.id} variants={cardVariants} className="h-full">
              <BlogCard post={post} />
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default LatestBlogsSection;
