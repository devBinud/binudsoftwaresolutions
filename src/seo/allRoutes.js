/**
 * Every public page, for the build-time HTML generator and sitemap (see vite.config.js).
 * Static pages come from routes.js; blog posts are added automatically from blogData.js,
 * so a new post gets its own SEO page and sitemap entry on the next build.
 */
import { ROUTE_SEO, blogPostSeo, toIsoDate } from './routes.js';
import { blogPosts } from '../data/blogData.js';

export const getAllPages = () => [
  ...Object.entries(ROUTE_SEO).map(([path, seo]) => ({ path, seo })),
  ...blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    seo: blogPostSeo(post),
    lastmod: toIsoDate(post.date),
  })),
];
