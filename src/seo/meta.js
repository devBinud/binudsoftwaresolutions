import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  absoluteUrl,
  normalizePath,
} from './routes.js';

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';

/**
 * Resolves the final head values for a page from its SEO config.
 * Shared by <SEOHead> (browser) and the build-time page generator so both always agree.
 */
export const resolveMeta = (seo = {}, path = '/') => {
  const title = seo.title
    ? seo.title.includes(SITE_NAME) ? seo.title : `${seo.title} | ${SITE_NAME}`
    : `${SITE_NAME} | Software, App & AI Development`;
  const usesDefaultImage = !seo.ogImage;

  return {
    title,
    description: seo.description || DEFAULT_DESCRIPTION,
    canonical: seo.noCanonical ? null : absoluteUrl(seo.canonicalPath || normalizePath(path)),
    robots: seo.noIndex ? ROBOTS_NOINDEX : ROBOTS_INDEX,
    ogType: seo.ogType || 'website',
    ogImage: absoluteUrl(seo.ogImage || DEFAULT_OG_IMAGE),
    ogImageAlt: usesDefaultImage ? DEFAULT_OG_IMAGE_ALT : title,
    // Dimensions are only known for the default share image
    ogImageWidth: usesDefaultImage ? '1200' : undefined,
    ogImageHeight: usesDefaultImage ? '630' : undefined,
  };
};

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Static <head> markup for a page — used by the build step. */
export const renderMetaTags = (meta) => {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    meta.canonical && `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    meta.canonical && `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    meta.ogImageWidth && `<meta property="og:image:width" content="${meta.ogImageWidth}" />`,
    meta.ogImageHeight && `<meta property="og:image:height" content="${meta.ogImageHeight}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
  ];
  return tags.filter(Boolean).map((t) => `  ${t}`).join('\n');
};
