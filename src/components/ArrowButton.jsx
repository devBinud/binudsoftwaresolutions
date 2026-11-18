import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

/**
 * Site-wide button: flat fill, small corner radius, no shadow, no arrow (only the 'link'
 * variant keeps a trailing arrow, as its affordance).
 * Renders a router <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 * as="span" renders a plain <span> instead, for use inside a card that is already a link.
 *
 * variant: 'outline' (default, blue 2px border) | 'solid' (filled blue, for primary CTAs)
 *          | 'ghost' (transparent with white border, for dark backgrounds)
 *          | 'white' (filled white, for primary CTAs on dark/blue backgrounds)
 *          | 'link' (text-only with arrow, for low-emphasis actions inside cards)
 * size:    'sm' | 'md' (default) | 'lg'
 * icon:    optional trailing react-icon (e.g. a download icon)
 * loading: shows a spinner and disables the button
 */
const variants = {
  outline:
    'bg-transparent border-accent text-accent hover:bg-accent hover:text-white active:bg-primary active:border-primary',
  solid:
    'bg-accent border-accent text-white hover:bg-primary hover:border-primary active:bg-primary-dark active:border-primary-dark',
  ghost:
    'bg-transparent border-white/70 text-white hover:bg-white hover:border-white hover:text-navy',
  white:
    'bg-white border-white text-primary hover:bg-sky hover:border-sky active:bg-[#dff2fb]',
  link:
    'bg-transparent border-transparent text-primary hover:text-primary-dark !px-0 !h-auto',
};

const sizes = {
  sm: { base: 'h-10 px-4 gap-2 text-[15px]', arrow: 15 },
  md: { base: 'h-11 px-4 gap-2 text-[17px]', arrow: 17 },
  lg: { base: 'h-12 px-5 gap-2.5 text-lg', arrow: 18 },
};

const Spinner = ({ size }) => (
  <span
    aria-hidden="true"
    className="inline-block rounded-full border-2 border-current border-r-transparent animate-spin"
    style={{ width: size - 2, height: size - 2 }}
  />
);

const ArrowButton = ({
  to,
  href,
  children,
  variant = 'outline',
  size = 'md',
  className = '',
  type = 'button',
  icon: Icon,
  loading = false,
  disabled,
  as,
  ...rest
}) => {
  const v = variants[variant] || variants.outline;
  const s = sizes[size] || sizes.md;
  const classes = `group/ab inline-flex items-center justify-center rounded-[var(--radius-btn)] border-2 font-medium whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-in-out cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed aria-disabled:opacity-55 aria-disabled:pointer-events-none ${s.base} ${v} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {loading ? (
        <Spinner size={s.arrow} />
      ) : Icon ? (
        <Icon size={s.arrow} aria-hidden="true" className="shrink-0" />
      ) : variant === 'link' ? (
        <FiArrowRight size={s.arrow} aria-hidden="true" className="shrink-0" />
      ) : null}
    </>
  );

  if (to) {
    return <Link to={to} className={classes} {...rest}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={classes} {...rest}>{content}</a>;
  }
  if (as === 'span') {
    return <span className={classes} {...rest}>{content}</span>;
  }
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
};

export default ArrowButton;
