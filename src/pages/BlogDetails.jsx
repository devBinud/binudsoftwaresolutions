import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { blogPostSeo, toIsoDate } from '../seo/routes';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineShare } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ArrowButton from '../components/ArrowButton';

// Heading text → anchor id, for the "On this page" links
const slugify = (text) =>
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const BlogDetails = () => {
  const { id } = useParams();

  // Find current blog post
  const post = blogPosts.find(p => p.id === id);

  // If blog post not found, redirect to blog home
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Find related articles (same category or others, up to 2 items)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // Section headings, listed in the sidebar
  const sections = post.content
    .filter((block) => block.type === 'heading')
    .map((block) => ({ id: slugify(block.text), text: block.text }));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `https://binudsoftwaresolutions.in/blog/${post.id}#article`,
        'headline': post.title,
        'description': post.excerpt,
        'image': post.image,
        'datePublished': toIsoDate(post.date),
        'dateModified': toIsoDate(post.date),
        'author': {
          '@type': 'Person',
          'name': post.author.name,
          'jobTitle': post.author.role
        },
        'publisher': { '@id': 'https://binudsoftwaresolutions.in/#organization' },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://binudsoftwaresolutions.in/blog/${post.id}`
        },
        'keywords': post.tags.join(', ')
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
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': post.title,
            'item': `https://binudsoftwaresolutions.in/blog/${post.id}`
          }
        ]
      }
    ]
  };

  // Unsplash covers are stored at w=800; ask for a sharper copy for the wide cover
  const coverImage = post.image?.includes('images.unsplash.com')
    ? post.image.replace(/([?&])w=\d+/, '$1w=1600')
    : post.image;

  // Share handler (using browser native share or copy url)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {}); // closing the share sheet rejects; nothing to report
    } else {
      navigator.clipboard?.writeText(window.location.href)
        .then(() => toast.success('Link copied'))
        .catch(() => toast.error("Couldn't copy the link"));
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-left">
      <SEOHead
        {...blogPostSeo(post)}
        keywords={post.tags}
        canonicalPath={`/blog/${post.id}`}
        author={post.author.name}
        publishedTime={toIsoDate(post.date)}
        jsonLd={articleJsonLd}
      />
      <Navbar />

      <PageBanner crumbs={[{ name: 'Blog', path: '/blog' }, { name: post.title }]} />

      {/* ── Article: full site width, content (left) + sticky sidebar (right) ── */}
      <article className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-16 md:pb-20 text-left">

          {/* Header */}
          <header className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted mb-5">
              <span className="inline-flex items-center h-7 px-3 rounded-full bg-primary-light text-primary font-medium">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineCalendar aria-hidden="true" />
                <time dateTime={toIsoDate(post.date)}>{post.date}</time>
              </span>
              <span aria-hidden="true" className="text-line">•</span>
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineClock aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-[28px] md:text-[34px] font-semibold text-ink leading-[1.2] tracking-tight max-w-4xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-[17px] md:text-lg text-body leading-relaxed max-w-4xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt=""
                className="w-11 h-11 rounded-full object-cover bg-sky shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-ink leading-tight">{post.author.name}</p>
                <p className="text-sm text-muted leading-tight mt-1">{post.author.role}</p>
              </div>
            </div>
          </header>

          {/* Cover image */}
          <div className="mt-10 aspect-[16/9] md:aspect-[21/9] w-full rounded-card overflow-hidden bg-sky">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Body */}
            <div className="lg:col-span-8 min-w-0">
              {post.content.map((block, i) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={i} className="text-body text-[17px] leading-[1.85] mb-6">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={i}
                      id={slugify(block.text)}
                      className="text-xl md:text-[22px] font-semibold text-ink leading-snug tracking-tight mt-10 mb-4 scroll-mt-28"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={i} className="my-6 space-y-3">
                      {block.items.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-body text-[17px] leading-[1.75]">
                          <span aria-hidden="true" className="mt-[11px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote key={i} className="my-10 border-l-4 border-accent bg-sky rounded-r-card px-6 py-5 md:px-8 md:py-6">
                      <p className="text-ink text-lg md:text-xl font-medium leading-relaxed">{block.text}</p>
                    </blockquote>
                  );
                }
                return null;
              })}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-line flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center h-8 px-3 rounded-full bg-sky text-body text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author */}
              <div className="mt-10 bg-sky rounded-card p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
                <img
                  loading="lazy"
                  decoding="async"
                  src={post.author.avatar}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover bg-white shrink-0"
                />
                <div>
                  <p className="text-sm text-muted">Written by</p>
                  <p className="text-lg font-semibold text-ink leading-snug">{post.author.name}</p>
                  <p className="text-sm text-primary font-medium mt-0.5">{post.author.role}</p>
                  <p className="text-body text-[15px] leading-relaxed mt-3">
                    Passionate about web architecture, mobile optimization, and building secure systems. Working with businesses to design responsive infrastructure that scales.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                {sections.length > 0 && (
                  <nav aria-label="On this page" className="border border-line rounded-card p-6">
                    <p className="text-base font-semibold text-ink mb-4">On this page</p>
                    <ol className="space-y-1">
                      {sections.map((sec) => (
                        <li key={sec.id}>
                          <a
                            href={`#${sec.id}`}
                            className="block py-1.5 text-[15px] text-body leading-snug hover:text-accent transition-colors"
                          >
                            {sec.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <div className="border border-line rounded-card p-6">
                  <p className="text-base font-semibold text-ink mb-3">Share this article</p>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius-btn)] border-2 border-line text-body text-[15px] font-medium hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                  >
                    <HiOutlineShare size={17} aria-hidden="true" />
                    Share
                  </button>
                </div>

                <div className="rounded-card bg-navy text-white p-6 sm:p-7">
                  <p className="text-xl font-semibold !text-white leading-snug">Have a project in mind?</p>
                  <p className="mt-2 text-[15px] text-white/75 leading-relaxed">
                    Tell us what you want to build and we'll suggest the right approach.
                  </p>
                  <ArrowButton to="/contact" variant="solid" className="mt-5">
                    Contact Us
                  </ArrowButton>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── Related articles ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-sky border-t border-line py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-[28px] font-semibold text-ink tracking-tight">
                You might also like
              </h2>
              <Link to="/blog" className="text-[15px] font-medium text-accent hover:text-primary transition-colors whitespace-nowrap">
                All articles
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  to={`/blog/${rPost.id}`}
                  className="group bg-white border border-line rounded-card overflow-hidden flex flex-col hover:border-[#9fd6ee] transition-colors duration-300"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-sky">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={rPost.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm text-muted mb-2">
                      <span className="text-primary font-medium">{rPost.category}</span>
                      <span aria-hidden="true" className="text-line">•</span>
                      <span>{rPost.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {rPost.title}
                    </h3>
                    {rPost.excerpt && (
                      <p className="mt-2 text-[15px] text-body leading-relaxed line-clamp-2">{rPost.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetails;
