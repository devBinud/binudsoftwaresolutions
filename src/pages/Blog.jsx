import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import { blogPosts } from '../data/blogData';
import { HiArrowRight, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';

// Import banner background image
import bannerBgImage from '../assets/bg4.jpg';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Web Development', 'Mobile Apps', 'AI & Automation', 'UI/UX Design'];

  // Filter posts based on selection
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-left">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 select-none overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerBgImage}
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          {/* Solid gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 animate-fadeIn">
            Our Blog
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </section>

      {/* Main Blog Archive Section */}
      <section className="py-16 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Section Introduction */}
          <div className="text-left mb-12 select-none max-w-4xl">
            <h2 className="text-[#191919] text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Engineering Insights, Tech Trends &amp; Leadership
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
              Explore in-depth analysis and tutorials written by our developers, designers, and tech architects detailing best practices in software development.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2.5 mb-10 select-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${selectedCategory === category
                  ? 'bg-[#274e85] border-[#274e85] text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog posts grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={cardVariants}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Card Image Banner */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm text-[#274e85]">
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
          ) : (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8">
              <p className="text-slate-400 font-bold text-sm">No articles found in this category.</p>
            </div>
          )}

        </div>
      </section>

      {/* Stay Connected Section */}
      <ConnectSection onlySocials={true} />

      <Footer />
    </div>
  );
};

export default Blog;
