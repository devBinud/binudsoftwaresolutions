/**
 * Standard section header: title, optional description and an optional action on the right.
 * align: 'left' (default) | 'center'
 * tone:  'light' (default, dark text) | 'dark' (white text, for navy/blue sections)
 */
const SectionHeading = ({
  id,
  title,
  description,
  action,
  align = 'left',
  tone = 'light',
  className = '',
}) => {
  const centered = align === 'center';
  const dark = tone === 'dark';

  return (
    <div
      className={`flex flex-col gap-6 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between text-left'
      } ${className}`}
    >
      <div className={centered ? 'max-w-3xl' : 'max-w-2xl'}>
        <h2
          id={id}
          className={`section-title ${dark ? '!text-white' : ''}`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-4 ${centered ? 'mx-auto' : ''} max-w-[640px] ${dark ? 'text-white/80' : 'text-muted'}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeading;
