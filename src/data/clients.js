import ashokaLogo from '../assets/clients/ashoka_ias_logo.png';
import cureoLogo from '../assets/clients/cureo_logo.jpg';
import dimaNiwasLogo from '../assets/clients/dima_niwas_logo.webp';
import kangkanLogo from '../assets/clients/kangkan_logo.webp';
import osmossionLogo from '../assets/clients/osmossion_logo.webp';

/**
 * Client logos for the "Trusted By" grid on the Home page.
 *
 * To add a client:
 *   1. Put the logo in src/assets/clients/ (transparent PNG/WebP or SVG works best)
 *   2. Import it at the top of this file
 *   3. Add an entry below: { name: 'Client Name', logo: clientLogo }
 *
 * Fields:
 *   name      – required; used as the image alt text, and shown as text when there is no logo yet
 *   logo      – optional imported image
 *   shape     – optional; 'wide' (default, for wordmarks) or 'square' (for badge/emblem logos)
 *   whiteBg   – optional; set when the logo file has a solid white background so it blends into the section
 *   showName  – optional; also print the name next to the logo (useful for icon-only logos)
 *   url       – optional; makes the logo a link to the client's site
 *
 * The grid shows 5 per row on desktop, 3 on tablets and 2 on phones.
 */
export const CLIENTS = [
  { name: 'Ashoka IAS Academy', logo: ashokaLogo, whiteBg: true, url: 'https://www.ashokaiasacademy.com/' },
  { name: 'Kangkan', logo: kangkanLogo, shape: 'square', whiteBg: true },
  { name: 'Cureo Homeopathy', logo: cureoLogo, whiteBg: true, url: 'https://cureohomeopathy.in/' },
  { name: 'Dima Niwas Campsite', logo: dimaNiwasLogo, shape: 'square', url: 'https://www.dimaniwascampsite.in/' },
  { name: 'Osmossion', logo: osmossionLogo, showName: true },
];
