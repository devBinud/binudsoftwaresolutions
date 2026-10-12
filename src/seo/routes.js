/**
 * Single source of truth for page-level SEO.
 *
 * Used in two places:
 *  - <SEOHead> in the browser (fallback for title, description, robots …)
 *  - the build-time `seoPages` plugin in vite.config.js, which writes a static HTML file per page
 *    with these tags baked in (for search engines and link previews on WhatsApp, LinkedIn, etc.)
 *
 * Keep this file free of imports so it can be loaded by Node at build time.
 * Titles: ideally ≤ 60 characters. Descriptions: ideally 120–160 characters.
 */

export const SITE_URL = 'https://binudsoftwaresolutions.in';
export const SITE_NAME = 'Binud Software Solutions';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_IMAGE_ALT = 'Binud Software Solutions – Custom Software, Mobile Apps & AI Development';
export const DEFAULT_DESCRIPTION =
  'Custom software, website and mobile app development, and AI automation by Binud Software Solutions, Guwahati. Scalable digital products for growing businesses.';

export const BUSINESS = {
  email: 'binudsoftwaresolutions@gmail.com',
  telephone: '+91-97063-93924',
  locality: 'Guwahati',
  region: 'Assam',
  country: 'IN',
  latitude: 26.1445,
  longitude: 91.7362,
};

export const ROUTE_SEO = {
  '/': {
    title: 'Binud Software Solutions | Software, App & AI Development',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: 'About Us | Binud Software Solutions',
    description:
      'Founded in 2021 by Binud Panging, Binud Software Solutions is a Guwahati-based software company building websites, mobile apps and AI solutions for businesses.',
  },
  '/about/vision-mission': {
    title: 'Vision & Mission | Binud Software Solutions',
    description:
      'Discover the vision, mission and core values that guide Binud Software Solutions in building smart, scalable and dependable software for businesses.',
  },
  '/about/founders-desk': {
    title: "From Founder's Desk | Binud Software Solutions",
    description:
      'A personal message from Binud Panging, Founder & CEO of Binud Software Solutions, on why we build software the way we do and how we partner with clients.',
  },
  '/services': {
    title: 'Software Development Services | Binud Software Solutions',
    description:
      'Website development, mobile app development (React Native & Flutter), UI/UX design, cloud DevOps, AI automation and IT consulting from one experienced team.',
  },
  '/services/ai-automation': {
    title: 'AI & Automation Services | Binud Software Solutions',
    description:
      'Custom AI chatbots, GPT-powered workflows, WhatsApp automation and process automation that remove repetitive manual work and help your business scale.',
  },
  '/case-studies': {
    title: 'Case Studies & Portfolio | Binud Software Solutions',
    description:
      'Real projects we have designed, built and shipped, including the Kangkan e-commerce app and the GiveTheNeedy social impact platform for Android and iOS.',
  },
  '/case-studies/case-study/kangkan': {
    title: 'Kangkan E-commerce App Case Study | Binud Software Solutions',
    description:
      'How we built Kangkan, a scalable mobile-first e-commerce app for Android and iOS using React Native, Laravel, MySQL and Razorpay payments.',
    ogType: 'article',
  },
  '/case-studies/case-study/givetheneedy': {
    title: 'GiveTheNeedy App Case Study | Binud Software Solutions',
    description:
      'How we built GiveTheNeedy, a social impact app for Android and iOS that connects donors with verified people in need, using React Native, Node.js and MongoDB.',
    ogType: 'article',
  },
  '/blog': {
    title: 'Blog | Binud Software Solutions',
    description:
      'Practical articles on mobile app engineering, Laravel and headless architecture, UI/UX design and AI automation from the Binud Software Solutions team.',
  },
  '/contact': {
    title: 'Contact Us | Binud Software Solutions',
    description:
      'Talk to Binud Software Solutions in Guwahati, Assam. Book a consultation for website development, mobile app or AI automation projects of any size.',
  },
  '/gallery': {
    title: 'Gallery | Binud Software Solutions',
    description:
      'Moments from our team journey, professional milestones and the memories behind Binud Software Solutions, a software company from Guwahati, Assam.',
  },
  '/coding-guides': {
    title: 'Coding Guides | Binud Software Solutions',
    description: 'Internal developer references and coding guides used by the Binud Software Solutions team.',
    noIndex: true,
  },
  '/privacy': {
    title: 'Privacy Policy | Binud Software Solutions',
    description:
      'How Binud Software Solutions collects, uses, stores and protects the personal information you share through our website and contact forms.',
  },
  '/terms': {
    title: 'Terms of Use | Binud Software Solutions',
    description:
      'The Terms of Use for the Binud Software Solutions website, covering acceptable use, intellectual property, disclaimers and governing law.',
  },
};

/* SEO for a blog post — shared by the BlogDetails page and the build step. */
export const blogPostSeo = (post) => ({
  title: `${post.title} | ${SITE_NAME}`,
  description: post.excerpt,
  ogImage: post.image,
  ogType: 'article',
});

/* "June 12, 2026" → "2026-06-12" (ISO date for structured data and sitemaps). */
export const toIsoDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
};

export const absoluteUrl = (pathOrUrl) =>
  !pathOrUrl ? SITE_URL : pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;

/* Canonical form of a path: no trailing slash (except the home page). */
export const normalizePath = (path = '/') => (path.length > 1 ? path.replace(/\/+$/, '') : '/');

export const getRouteSeo = (path) => ROUTE_SEO[normalizePath(path)];
