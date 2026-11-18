import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import ArrowButton from '../components/ArrowButton';
import BlogCard from '../components/BlogCard';
import SectionHeading from '../components/SectionHeading';

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
    <section aria-labelledby="blog-heading" className="relative py-20 md:py-28 bg-sky overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeading
          id="blog-heading"
          title={<>Latest From <span className="text-gradient">Our Blog</span></>}
          description="Practical notes on software architecture, mobile development and AI from our engineering team."
          action={<ArrowButton to="/blog">View All Posts</ArrowButton>}
          className="mb-14"
        />

        {/* ── Blogs Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
