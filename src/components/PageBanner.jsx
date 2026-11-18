import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageIllustration from './PageIllustration';

/**
 * Header used at the top of every inner page:
 *   1. a slim breadcrumb bar (Home → … → Current page)
 *   2. a light-blue intro band with the page title, intro text and an illustration
 *
 * Props:
 *   crumbs       – required; array of { name, path? }. The last crumb is the current page.
 *   title        – page heading (rendered as the page's <h1>). Leave it out on detail pages
 *                  that already have their own <h1>; only the breadcrumb bar is shown then.
 *   description  – a string, or an array of strings (one paragraph each)
 *   variant      – which illustration to show on the right (see PageIllustration.jsx)
 *   image        – optional image to show on the right instead of the default illustration
 *   children     – optional extra content under the description (e.g. buttons)
 */
export const Breadcrumbs = ({ crumbs, className = '' }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body text-left">
      <li>
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      </li>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={crumb.name}>
            <li aria-hidden="true" className="flex text-muted">
              <FiArrowRight size={14} />
            </li>
            <li className={isLast ? 'min-w-0' : ''}>
              {crumb.path && !isLast ? (
                <Link to={crumb.path} className="hover:text-primary transition-colors">{crumb.name}</Link>
              ) : (
                <span aria-current="page" className="block text-ink truncate max-w-[70vw] sm:max-w-md">
                  {crumb.name}
                </span>
              )}
            </li>
          </Fragment>
        );
      })}
    </ol>
  </nav>
);

const PageBanner = ({ title, crumbs, description, variant, image, children }) => {
  const paragraphs = description ? [].concat(description) : [];

  // Detail pages (no title): just the breadcrumb trail above the page's own heading
  if (!title) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 md:pt-5">
          <Breadcrumbs crumbs={crumbs} />
        </div>
      </div>
    );
  }

  return (
    <section className="bg-sky overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 md:pt-5 pb-10 md:pb-12">
        <Breadcrumbs crumbs={crumbs} className="mb-5 md:mb-4" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-left">
              <h1 className="text-deep text-[30px] md:text-[38px] font-semibold tracking-tight leading-tight mb-4">
                {title}
              </h1>
              {paragraphs.length > 0 && (
                <div className="space-y-4 max-w-2xl">
                  {paragraphs.map((text) => (
                    <p key={text} className="!text-[16px] md:!text-[17px] text-ink/85 leading-[1.8]">
                      {text}
                    </p>
                  ))}
                </div>
              )}
              {children && <div className="mt-8">{children}</div>}
            </div>

            <div className="hidden lg:flex lg:col-span-5 justify-end">
              {image ? (
                <img src={image} alt="" className="w-full max-w-[360px] h-auto object-contain" />
              ) : (
                <PageIllustration variant={variant} />
              )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
