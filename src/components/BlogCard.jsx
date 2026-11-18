import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';

/**
 * Blog post card: photo with a category tag, date / read time, title, excerpt and author.
 * The whole card links to the post.
 *
 * Hover is intentionally calm: nothing moves or resizes. Only colours change (0.3s):
 * the border tints blue, the title turns blue and the "Read Article" link darkens.
 * Title and excerpt reserve two lines each, so cards in a row always line up.
 */
const BlogCard = ({ post }) => (
  <Link
    to={`/blog/${post.id}`}
    className="group h-full flex flex-col text-left bg-white rounded-[var(--radius-card)] border border-line overflow-hidden transition-[border-color,box-shadow] duration-300 ease-in-out hover:border-[#9fd6ee]"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-sky">
      <img
        src={post.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      {post.category && (
        <span className="absolute top-4 left-4 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
      )}
    </div>

    <div className="flex flex-col flex-grow p-6">
      <div className="flex items-center gap-4 text-[13px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <HiOutlineCalendar size={15} aria-hidden="true" />
          {post.date}
        </span>
        {post.readTime && (
          <span className="inline-flex items-center gap-1.5">
            <HiOutlineClock size={15} aria-hidden="true" />
            {post.readTime}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-ink text-lg font-semibold leading-snug line-clamp-2 min-h-[2lh] transition-colors duration-300 ease-in-out group-hover:text-primary">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="mt-2.5 !text-[15px] !leading-relaxed text-muted line-clamp-2 min-h-[2lh]">{post.excerpt}</p>
      )}

      <div className="mt-auto pt-5">
        <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 min-w-0">
            {post.author?.avatar && (
              <img src={post.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover bg-sky shrink-0" />
            )}
            <span className="text-sm font-medium text-ink truncate">{post.author?.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary shrink-0 transition-colors duration-300 ease-in-out group-hover:text-primary-dark">
            Read Article
            <FiArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default BlogCard;
