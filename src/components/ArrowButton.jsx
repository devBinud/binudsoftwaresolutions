import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Site-wide pill button with a circular arrow badge on the right.
 * Renders a router <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 *
 * variant: 'outline' (default, white pill with blue border) | 'solid' (filled blue, for primary CTAs)
 *          | 'ghost' (transparent with white border, for secondary actions on dark backgrounds)
 * size:    'sm' | 'md' (default) | 'lg'
 * icon:    optional react-icon to show instead of the arrow (e.g. a download icon)
 */
const variants = {
  outline: {
    base: 'bg-white border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white',
    icon: 'bg-[#005eb8] text-white group-hover/ab:bg-white group-hover/ab:text-[#005eb8]',
  },
  solid: {
    base: 'bg-[#005eb8] border-[#005eb8] text-white hover:bg-[#00488e] hover:border-[#00488e]',
    icon: 'bg-white text-[#005eb8]',
  },
  ghost: {
    base: 'bg-transparent border-white/60 text-white hover:bg-white hover:border-white hover:text-[#092c4c]',
    icon: 'bg-white text-[#092c4c] group-hover/ab:bg-[#092c4c] group-hover/ab:text-white',
  },
};

const sizes = {
  sm: { base: 'h-10 pl-5 pr-1 gap-3 text-sm', icon: 'w-8 h-8', arrow: 15 },
  md: { base: 'h-12 pl-6 pr-1.5 gap-3 text-[15px]', icon: 'w-9 h-9', arrow: 17 },
  lg: { base: 'h-14 pl-7 pr-2 gap-4 text-base', icon: 'w-10 h-10', arrow: 19 },
};

const ArrowButton = ({
  to,
  href,
  children,
  variant = 'outline',
  size = 'md',
  className = '',
  type = 'button',
  icon: Icon,
  ...rest
}) => {
  const v = variants[variant];
  const s = sizes[size];
  const classes = `group/ab inline-flex items-center rounded-full border-[1.5px] font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${s.base} ${v.base} ${className}`;
  const style = { fontFamily: "'Open Sans', sans-serif" };

  const content = (
    <>
      <span>{children}</span>
      <span className={`shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${s.icon} ${v.icon}`}>
        {Icon ? (
          <Icon size={s.arrow - 2} />
        ) : (
          <FiArrowUpRight size={s.arrow} className="transition-transform duration-300 group-hover/ab:rotate-45" />
        )}
      </span>
    </>
  );

  if (to) {
    return <Link to={to} className={classes} style={style} {...rest}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={classes} style={style} {...rest}>{content}</a>;
  }
  return <button type={type} className={classes} style={style} {...rest}>{content}</button>;
};

export default ArrowButton;
