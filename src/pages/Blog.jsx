import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';
import BlogCard from '../components/BlogCard';

// Import banner background image
import bannerBgImage from '../assets/bg4.webp';

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': 'https://binudsoftwaresolutions.in/blog#blog',
      'name': 'Engineering Insights & Tech Perspectives | Binud Software Solutions',
      'url': 'https://binudsoftwaresolutions.in/blog',
      'description': 'Explore in-depth software engineering analysis, mobile performance architectures, headless Laravel systems, and AI automation tutorials written by our tech leads.',
      'publisher': {
        '@type': 'Organization',
        'name': 'Binud Software Solutions',
        'url': 'https://binudsoftwaresolutions.in/'
      },
      'blogPost': blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        'headline': post.title,
        'url': `https://binudsoftwaresolutions.in/blog/${post.id}`,
        'datePublished': post.date,
        'description': post.excerpt,
        'author': {
          '@type': 'Person',
          'name': post.author.name
        }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://binudsoftwaresolutions.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': 'https://binudsoftwaresolutions.in/blog'
        }
      ]
    }
  ]
};

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
      <SEOHead
        canonicalPath="/blog"
        jsonLd={blogJsonLd}
      />
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white py-14 overflow-hidden border-b border-slate-800">
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
          <div className="text-left mb-12 max-w-4xl">
            <h2 className="text-[#191919] text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Engineering Insights, Tech Trends &amp; Leadership
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
              Explore in-depth analysis and tutorials written by our developers, designers, and tech architects detailing best practices in software development.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-card text-xs font-bold transition-all duration-300 border ${selectedCategory === category
                  ? 'bg-[#005eb8] border-[#005eb8] text-white shadow-sm'
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              {filteredPosts.map((post) => (
                <motion.article key={post.id} variants={cardVariants} className="h-full">
                  <BlogCard post={post} />
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-200/90 rounded-card p-8">
              <p className="text-slate-400 font-bold text-sm">No articles found in this category.</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
