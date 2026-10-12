import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '../seo/routes';
import { resolveMeta } from '../seo/meta';

/* Update or create a <meta> tag. Passing `null` removes it. */
const setMetaTag = (attrName, attrValue, content) => {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (content == null) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLinkTag = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const SCRIPT_ID = 'dynamic-page-jsonld';

/**
 * Page-level SEO. Titles, descriptions and robots settings come from src/seo/routes.js
 * (matched by canonicalPath or the current URL); any prop passed here overrides that config.
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType,
  noIndex,
  jsonLd,
  author = 'Binud Panging, Binud Software Solutions',
  publishedTime,
  modifiedTime,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const routeSeo = getRouteSeo(canonicalPath || pathname) || {};
    const meta = resolveMeta(
      {
        ...routeSeo,
        ...(title && { title }),
        ...(description && { description }),
        ...(ogImage && { ogImage }),
        ...(ogType && { ogType }),
        ...(noIndex !== undefined && { noIndex }),
        canonicalPath,
      },
      pathname
    );

    document.title = meta.title;
    setLinkTag('canonical', meta.canonical);
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'robots', meta.robots);
    setMetaTag('name', 'author', author);
    setMetaTag('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords || null);

    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:url', meta.canonical);
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:image', meta.ogImage);
    setMetaTag('property', 'og:image:alt', meta.ogImageAlt);
    setMetaTag('property', 'og:image:width', meta.ogImageWidth ?? null);
    setMetaTag('property', 'og:image:height', meta.ogImageHeight ?? null);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage);
    setMetaTag('name', 'twitter:image:alt', meta.ogImageAlt);

    setMetaTag('property', 'article:published_time', publishedTime || null);
    setMetaTag('property', 'article:modified_time', modifiedTime || null);

    // Page-specific JSON-LD structured data
    let scriptTag = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, noIndex, jsonLd, author, publishedTime, modifiedTime, pathname]);

  return null;
};

export default SEOHead;
