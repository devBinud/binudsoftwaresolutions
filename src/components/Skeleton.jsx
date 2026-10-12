/* Shimmering placeholder block shown while data loads. Size it with className (e.g. "h-4 w-32"). */
const Skeleton = ({ className = '' }) => (
  <div aria-hidden="true" className={`animate-pulse rounded-md bg-slate-200/80 ${className}`} />
);

export default Skeleton;
