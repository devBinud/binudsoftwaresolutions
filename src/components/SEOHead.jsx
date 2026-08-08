import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://binudsoftwaresolutions.in';
const DEFAULT_IMAGE = `${SITE_URL}/hero_3d_illustration.png`;
const DEFAULT_KEYWORDS = 'Binud Software Solutions, custom software development, mobile app development, React Native, Laravel, AI automation, GPT-4, WhatsApp automation, web development, cloud DevOps, IT consulting, Guwahati Assam, Binud Panging';

/**
 * Helper to update or create a meta tag
 */
const setMetaTag = (attrName, attrValue, content) => {
  if (!content && content !== '') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or create a link tag (e.g. canonical)
 */
const setLinkTag = (rel, href) => {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

/**
 * Reusable Dynamic SEO Component
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noIndex = false,
  jsonLd,
  author = 'Binud Panging, Binud Software Solutions',
  publishedTime,
  modifiedTime,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Page Title
    const fullTitle = title
      ? (title.includes('Binud Software Solutions') ? title : `${title} | Binud Software Solutions`)
      : 'Binud Software Solutions | Custom Software, Mobile Apps & AI Development';
    document.title = fullTitle;

    // 2. Canonical URL
    const canonical = canonicalPath
      ? (canonicalPath.startsWith('http') ? canonicalPath : `${SITE_URL}${canonicalPath}`)
      : `${SITE_URL}${location.pathname}`;
    setLinkTag('canonical', canonical);

    // 3. Description & Keywords
    const metaDesc = description || 'Binud Software Solutions is a premier custom software engineering, mobile application, web development, and AI automation company based in Guwahati, Assam.';
    setMetaTag('name', 'description', metaDesc);

    const metaKeywords = Array.isArray(keywords)
      ? keywords.join(', ')
      : (keywords || DEFAULT_KEYWORDS);
    setMetaTag('name', 'keywords', metaKeywords);

    // 4. Author & Robots
    setMetaTag('name', 'author', author);
    const robotsContent = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);

    // 5. Open Graph Tags
    const imageToUse = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`)
      : DEFAULT_IMAGE;

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', imageToUse);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Binud Software Solutions');
    setMetaTag('property', 'og:locale', 'en_US');

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', imageToUse);
    setMetaTag('name', 'twitter:url', canonical);

    // 7. Article published/modified timestamps if applicable
    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }

    // 8. JSON-LD Structured Data Injection
    const SCRIPT_ID = 'dynamic-page-jsonld';
    let scriptTag = document.getElementById(SCRIPT_ID);

    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // Cleanup on unmount or before next effect
    return () => {
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    canonicalPath,
    ogImage,
    ogType,
    noIndex,
    jsonLd,
    author,
    publishedTime,
    modifiedTime,
    location.pathname,
  ]);

  return null;
};

export default SEOHead;
