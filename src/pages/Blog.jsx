import { motion } from 'framer-motion';
import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';
import BlogCard from '../components/BlogCard';

// Import banner background image

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

      <PageBanner
        title="Our Blog"
        crumbs={[{ name: 'Blog' }]}
        variant="blog"
        description={[
          'Engineering insights, tech trends and leadership lessons from the team at Binud Software Solutions.',
          'Explore in-depth analysis and tutorials written by our developers, designers and tech architects on best practices in software development.',
        ]}
      />

      {/* Main Blog Archive Section */}
      <section className="py-16 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-card text-xs font-bold transition-all duration-300 border ${selectedCategory === category
                  ? 'bg-[#0077b6] border-[#0077b6] text-white '
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
