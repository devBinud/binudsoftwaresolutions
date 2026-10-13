import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Blog post card: a tall rounded photo with a white info box overlapping its bottom edge
 * (title, author, date and a round arrow button). The whole card links to the post.
 */
const BlogCard = ({ post }) => (
  <Link to={`/blog/${post.id}`} className="group block h-full text-left">
    <div className="h-[320px] sm:h-[380px] rounded-[24px] overflow-hidden bg-slate-200">
      <img
        src={post.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
      />
    </div>

    <div className="relative -mt-28 mx-4 sm:mx-5 bg-white rounded-[20px] p-5 sm:p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <h3 className="text-[#092c4c] text-lg sm:text-xl font-bold leading-snug line-clamp-2 min-h-[2lh]">
        {post.title}
      </h3>

      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="block text-[#e53935] text-sm font-bold truncate">{post.author.name}</span>
          <span className="block mt-0.5 text-slate-500 text-sm">{post.date}</span>
        </div>
        <span
          aria-hidden="true"
          className="w-11 h-11 shrink-0 rounded-full bg-[#005eb8] text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-[#00488e]"
        >
          <FiArrowUpRight size={20} className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </div>
  </Link>
);

export default BlogCard;
