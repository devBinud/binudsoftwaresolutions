import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const MARKER = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

/**
 * Build-time SEO for this single-page app.
 *
 * After `vite build`, for every public page listed in src/seo/allRoutes.js it writes
 * dist/<path>.html — a copy of index.html whose <head> already contains that page's
 * title, description, canonical URL, robots and Open Graph / Twitter tags. Crawlers and
 * link previews (WhatsApp, LinkedIn, Facebook, X) read these without running JavaScript.
 * Vercel serves them via `cleanUrls` (see vercel.json); the React app then boots as usual.
 *
 * It also writes dist/sitemap.xml and dist/404.html (served with a real 404 status).
 */
export default function seoPages() {
  let root;
  let outDir;

  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      // Load the SEO modules through Vite so their imports (e.g. images in blogData) resolve
      const server = await createServer({
        root,
        configFile: false,
        logLevel: 'error',
        appType: 'custom',
        server: { middlewareMode: true, hmr: false, ws: false },
        optimizeDeps: { noDiscovery: true, include: [] },
      });

      try {
        const { getAllPages } = await server.ssrLoadModule('/src/seo/allRoutes.js');
        const { resolveMeta, renderMetaTags } = await server.ssrLoadModule('/src/seo/meta.js');
        const { SITE_URL } = await server.ssrLoadModule('/src/seo/routes.js');

        const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');
        if (!MARKER.test(template)) {
          throw new Error('[seo-pages] index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers.');
        }
        const withMeta = (meta) => template.replace(MARKER, `<!-- seo:start -->\n${renderMetaTags(meta)}\n  <!-- seo:end -->`);

        const pages = getAllPages();
        for (const page of pages) {
          const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
          const target = path.join(outDir, file);
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, withMeta(resolveMeta(page.seo, page.path)));
        }

        // 404 page: real 404 status on Vercel, noindex, no canonical
        await fs.writeFile(
          path.join(outDir, '404.html'),
          withMeta(
            resolveMeta(
              {
                title: 'Page Not Found',
                description: 'The page you are looking for does not exist or has been moved.',
                noIndex: true,
                noCanonical: true,
              },
              '/404'
            )
          )
        );

        // sitemap.xml — indexable pages only
        const urls = pages
          .filter((page) => !page.seo.noIndex)
          .map((page) => {
            const loc = page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
            const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : '';
            return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
          });
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
        await fs.writeFile(path.join(outDir, 'sitemap.xml'), sitemap);

        this.info?.(`generated ${pages.length} SEO pages, 404.html and sitemap.xml (${urls.length} URLs)`);
      } finally {
        await server.close();
      }
    },
  };
}
