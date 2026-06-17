import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import { blogPosts } from '../data/blogData';
import { HiArrowLeft, HiOutlineCalendar, HiOutlineClock, HiOutlineUser, HiOutlineShare, HiOutlineChevronRight } from 'react-icons/hi';
import bannerBgImage from '../assets/bg4.jpg';

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
    .slice(0, 2);

  // Share handler (using browser native share or copy url)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
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
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <HiOutlineChevronRight className="text-slate-500 text-[10px]" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <HiOutlineChevronRight className="text-slate-500 text-[10px]" />
            <span className="text-white">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Blog Details View */}
      <section className="py-16 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Back button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#274e85] transition-colors mb-8 group select-none"
          >
            <HiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </Link>

          {/* Heading Section */}
          <header className="mb-10 text-left">
            <div className="flex items-center gap-2.5 mb-5 select-none">
              <span className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#274e85]/10 text-[#274e85]">
                {post.category}
              </span>
              <span className="text-xs font-bold text-slate-400 inline-flex items-center gap-1">
                <HiOutlineClock />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-[#191919] leading-[1.15] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Author Profile + Publish Date */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-11 h-11 rounded-full object-cover border border-slate-100" 
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 leading-tight mb-0.5">{post.author.name}</span>
                  <span className="text-xs font-semibold text-slate-400 leading-none">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 select-none">
                <div className="flex flex-col text-right sm:text-left">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">Published</span>
                  <span className="text-xs font-bold text-slate-600 inline-flex items-center gap-1">
                    <HiOutlineCalendar />
                    {post.date}
                  </span>
                </div>

                <button 
                  onClick={handleShare}
                  className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-[#274e85] hover:bg-[#274e85]/5 hover:border-[#274e85]/20 transition-all duration-300"
                  title="Share Article"
                >
                  <HiOutlineShare size={16} />
                </button>
              </div>
            </div>
          </header>

          {/* Main Visual Image Banner */}
          <div className="relative w-full h-[250px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] mb-12 border border-slate-100 bg-slate-50">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

            {/* Article Contents */}
            <article className="prose prose-slate max-w-none text-left mb-16">
              {post.content.map((block, i) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={i} className="text-slate-600 text-[15px] sm:text-base leading-relaxed mb-6 font-medium">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h3 key={i} className="text-lg sm:text-xl md:text-2xl font-black text-[#191919] tracking-tight mt-10 mb-4">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={i} className="space-y-3 pl-6 my-6 list-disc text-slate-600 text-[15px] sm:text-base font-medium">
                      {block.items.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </article>

            {/* Author Signature Bio Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-20">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-sm" 
              />
              <div>
                <h4 className="font-black text-[#191919] text-base mb-1">Written by {post.author.name}</h4>
                <p className="text-xs font-bold text-[#274e85] uppercase tracking-wider mb-2">{post.author.role}</p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  Passionate about web architecture, mobile optimization, and building secure systems. Working with businesses to design responsive infrastructure that scales.
                </p>
              </div>
            </div>

          {/* Related Articles Divider */}
          <div className="border-t border-slate-100 pt-16">
            <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight mb-8">
              You Might Also Like
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <Link 
                  key={rPost.id}
                  to={`/blog/${rPost.id}`}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={rPost.image} 
                      alt={rPost.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider bg-white/95 text-[#274e85]">
                        {rPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow text-left">
                    <span className="text-[10px] font-bold text-slate-400 mb-2">{rPost.date}</span>
                    <h4 className="font-black text-slate-800 group-hover:text-[#274e85] text-sm leading-snug line-clamp-2 transition-colors duration-200">
                      {rPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <ConnectSection onlySocials={true} />

      <Footer />
    </div>
  );
};

export default BlogDetails;
