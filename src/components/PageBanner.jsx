import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * Dark breadcrumb banner used at the top of inner pages.
 * `crumbs` is an array of { name, path? }; the last crumb is the current page.
 */
const PageBanner = ({ title, crumbs, image }) => (
  <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img src={image} alt="" className="w-full h-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10 text-left">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">{title}</h1>
      <nav className="text-xs md:text-sm font-medium flex flex-wrap items-center gap-2 text-slate-300">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.name}>
            <span>/</span>
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-white transition-colors">{crumb.name}</Link>
            ) : (
              <span className="text-white">{crumb.name}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  </section>
);

export default PageBanner;
