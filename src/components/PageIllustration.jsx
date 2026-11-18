/**
 * Abstract brand illustration for the right side of the page header.
 * Every variant shares the same backdrop (glow, dot grids, orbit ring) so the pages feel
 * like one family, while the central motif changes to suit the page.
 *
 * variant: 'about' | 'vision' | 'founder' | 'services' | 'ai' | 'caseStudies'
 *          | 'guides' | 'contact' | 'gallery' | 'blog' | 'legal'
 * Purely decorative.
 */

const DEEP = 'url(#pi-deep)';
const ACCENT = 'url(#pi-accent)';
const GLASS = 'url(#pi-glass)';
const SOFT = '#9fd3ee';

const glassProps = { fill: GLASS, stroke: '#ffffff', strokeOpacity: 0.85, strokeWidth: 1.5 };

/* ── Motifs (drawn around the centre point 250,200 of a 480×400 canvas) ── */

const Default = () => (
  <>
    <g filter="url(#pi-shadow)">
      <rect x="165" y="115" width="170" height="170" rx="40" transform="rotate(45 250 200)" fill={DEEP} />
    </g>
    <rect x="230" y="152" width="132" height="132" rx="32" transform="rotate(45 296 218)" fill={ACCENT} fillOpacity="0.9" />
    <rect x="138" y="166" width="120" height="120" rx="30" transform="rotate(45 198 226)" {...glassProps} />
    <circle cx="250" cy="200" r="25" fill="#fff" />
    <circle cx="250" cy="200" r="10" fill="#0077b6" />
  </>
);

const About = () => (
  <>
    <g filter="url(#pi-shadow)">
      <circle cx="205" cy="168" r="80" fill={DEEP} />
    </g>
    <circle cx="298" cy="168" r="80" fill={ACCENT} fillOpacity="0.88" />
    <circle cx="252" cy="250" r="80" {...glassProps} />
    <circle cx="252" cy="196" r="14" fill="#fff" />
    <circle cx="252" cy="196" r="6" fill="#0077b6" />
  </>
);

const Vision = () => (
  <>
    <circle cx="238" cy="212" r="122" {...glassProps} />
    <g filter="url(#pi-shadow)">
      <circle cx="238" cy="212" r="92" fill={DEEP} />
    </g>
    <circle cx="238" cy="212" r="62" fill="#fff" />
    <circle cx="238" cy="212" r="36" fill={ACCENT} />
    <circle cx="238" cy="212" r="12" fill="#fff" />
    {/* Arrow */}
    <line x1="246" y1="204" x2="356" y2="94" stroke="#0a4f75" strokeWidth="9" strokeLinecap="round" />
    <g fill="none" stroke="#0095d8" strokeWidth="7" strokeLinecap="round">
      <path d="M338 84 V112 H366" />
      <path d="M354 68 V96 H382" />
    </g>
  </>
);

const Founder = () => (
  <>
    <g filter="url(#pi-shadow)">
      <path d="M172 318 V176 a78 78 0 0 1 156 0 V318 a14 14 0 0 1 -14 14 H186 a14 14 0 0 1 -14 -14 Z" fill={DEEP} />
    </g>
    <circle cx="250" cy="180" r="38" {...glassProps} />
    <path d="M190 332 V318 a60 56 0 0 1 120 0 V332 Z" fill={ACCENT} fillOpacity="0.92" />
    {/* Quote badge */}
    <circle cx="334" cy="110" r="30" fill="#fff" />
    <rect x="318" y="98" width="12" height="20" rx="5" fill="#0077b6" />
    <rect x="336" y="98" width="12" height="20" rx="5" fill="#0077b6" />
    {/* Signature */}
    <path d="M140 362 q20 -26 40 0 t40 0 t40 0" fill="none" stroke="#0095d8" strokeWidth="4" strokeLinecap="round" />
  </>
);

const Services = () => {
  const layer = (cy) => `M250 ${cy - 52} L352 ${cy} L250 ${cy + 52} L148 ${cy} Z`;
  return (
    <>
      <path d={layer(266)} fill={SOFT} stroke={SOFT} strokeWidth="14" strokeLinejoin="round" />
      <path d={layer(212)} fill={ACCENT} stroke="#2aa9e3" strokeWidth="14" strokeLinejoin="round" />
      <g filter="url(#pi-shadow)">
        <path d={layer(158)} fill={DEEP} stroke="#0a5f8c" strokeWidth="14" strokeLinejoin="round" />
      </g>
      <circle cx="250" cy="158" r="12" fill="#fff" />
      <circle cx="214" cy="158" r="5" fill="#fff" fillOpacity="0.7" />
      <circle cx="286" cy="158" r="5" fill="#fff" fillOpacity="0.7" />
    </>
  );
};

const Ai = () => {
  const nodes = [[110, 140], [390, 140], [120, 280], [380, 280], [250, 62], [250, 338]];
  return (
    <>
      {nodes.map(([x, y]) => (
        <line key={`l${x}${y}`} x1="250" y1="200" x2={x} y2={y} stroke={SOFT} strokeWidth="2" strokeDasharray="5 6" />
      ))}
      {/* Pins */}
      {[176, 200, 224].map((p) => (
        <g key={p} fill="#0077b6">
          <rect x={p - 5} y="132" width="10" height="20" rx="4" />
          <rect x={p - 5} y="248" width="10" height="20" rx="4" />
          <rect x="182" y={p - 5} width="20" height="10" rx="4" />
          <rect x="298" y={p - 5} width="20" height="10" rx="4" />
        </g>
      ))}
      <g filter="url(#pi-shadow)">
        <rect x="196" y="146" width="108" height="108" rx="24" fill={DEEP} />
      </g>
      <rect x="222" y="172" width="56" height="56" rx="14" fill={ACCENT} />
      <circle cx="250" cy="200" r="11" fill="#fff" />
      {nodes.map(([x, y]) => (
        <circle key={`n${x}${y}`} cx={x} cy={y} r="9" fill="#fff" stroke="#0095d8" strokeWidth="3.5" />
      ))}
    </>
  );
};

const CaseStudies = () => (
  <>
    <rect x="138" y="242" width="44" height="76" rx="12" {...glassProps} />
    <rect x="196" y="206" width="44" height="112" rx="12" fill={SOFT} />
    <rect x="254" y="166" width="44" height="152" rx="12" fill={ACCENT} />
    <g filter="url(#pi-shadow)">
      <rect x="312" y="118" width="44" height="200" rx="12" fill={DEEP} />
    </g>
    <path d="M130 214 C190 200 220 150 270 132 S340 86 372 70" fill="none" stroke="#0a4f75" strokeWidth="5" strokeLinecap="round" />
    <circle cx="372" cy="70" r="11" fill="#fff" stroke="#0a4f75" strokeWidth="5" />
    <line x1="120" y1="330" x2="372" y2="330" stroke={SOFT} strokeWidth="3" strokeLinecap="round" />
  </>
);

const Guides = () => (
  <>
    <g filter="url(#pi-shadow)">
      <rect x="118" y="92" width="264" height="216" rx="28" fill="#fff" />
    </g>
    <circle cx="146" cy="120" r="6" fill={SOFT} />
    <circle cx="166" cy="120" r="6" fill={SOFT} />
    <circle cx="186" cy="120" r="6" fill={SOFT} />
    <path d="M208 158 L162 212 L208 266" fill="none" stroke="#0a4f75" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M292 158 L338 212 L292 266" fill="none" stroke="#0095d8" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="266" y1="150" x2="234" y2="274" stroke={SOFT} strokeWidth="16" strokeLinecap="round" />
  </>
);

const Contact = () => (
  <>
    <g filter="url(#pi-shadow)">
      <path d="M170 104 H302 a30 30 0 0 1 30 30 V200 a30 30 0 0 1 -30 30 H200 L162 262 L168 230 a30 30 0 0 1 -28 -30 V134 a30 30 0 0 1 30 -30 Z" fill={DEEP} />
    </g>
    <circle cx="196" cy="167" r="9" fill="#fff" />
    <circle cx="236" cy="167" r="9" fill="#fff" fillOpacity="0.85" />
    <circle cx="276" cy="167" r="9" fill="#fff" fillOpacity="0.7" />
    <path d="M244 192 H360 a28 28 0 0 1 28 28 V270 a28 28 0 0 1 -28 28 L370 326 L330 298 H244 a28 28 0 0 1 -28 -28 V220 a28 28 0 0 1 28 -28 Z" fill={ACCENT} fillOpacity="0.93" />
    <rect x="244" y="228" width="104" height="10" rx="5" fill="#fff" fillOpacity="0.9" />
    <rect x="244" y="252" width="70" height="10" rx="5" fill="#fff" fillOpacity="0.65" />
  </>
);

const Gallery = () => (
  <>
    <rect x="146" y="102" width="190" height="150" rx="20" transform="rotate(-10 241 177)" {...glassProps} />
    <rect x="160" y="118" width="190" height="150" rx="20" transform="rotate(6 255 193)" fill={SOFT} />
    <g filter="url(#pi-shadow)">
      <rect x="156" y="140" width="206" height="170" rx="20" fill="#fff" />
    </g>
    <rect x="170" y="154" width="178" height="118" rx="12" fill={DEEP} />
    <path d="M170 248 L222 202 L262 238 L296 210 L348 252 V260 a12 12 0 0 1 -12 12 H182 a12 12 0 0 1 -12 -12 Z" fill={ACCENT} />
    <circle cx="312" cy="184" r="14" fill="#fff" />
    <rect x="170" y="286" width="90" height="9" rx="4.5" fill={SOFT} />
  </>
);

const Blog = () => (
  <>
    <rect x="160" y="96" width="160" height="212" rx="18" transform="rotate(-8 240 202)" {...glassProps} />
    <g filter="url(#pi-shadow)">
      <rect x="182" y="106" width="160" height="212" rx="18" fill="#fff" />
    </g>
    <rect x="202" y="130" width="120" height="58" rx="10" fill={ACCENT} />
    <rect x="202" y="204" width="96" height="12" rx="6" fill="#0a4f75" />
    <rect x="202" y="228" width="120" height="8" rx="4" fill={SOFT} />
    <rect x="202" y="246" width="120" height="8" rx="4" fill={SOFT} />
    <rect x="202" y="264" width="80" height="8" rx="4" fill={SOFT} />
    {/* Pen */}
    <g transform="rotate(35 352 214)">
      <rect x="340" y="118" width="24" height="150" rx="12" fill={DEEP} />
      <rect x="340" y="140" width="24" height="10" fill="#0095d8" />
      <path d="M340 262 H364 L352 292 Z" fill="#0095d8" />
    </g>
  </>
);

const Legal = () => (
  <>
    <g filter="url(#pi-shadow)">
      <path d="M250 82 L344 118 V196 C344 258 304 300 250 322 C196 300 156 258 156 196 V118 Z" fill={DEEP} strokeLinejoin="round" />
    </g>
    <path d="M250 112 L318 138 V196 C318 242 290 274 250 292 C210 274 182 242 182 196 V138 Z" fill={ACCENT} fillOpacity="0.92" />
    <path d="M218 200 L242 224 L286 178" fill="none" stroke="#fff" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

const MOTIFS = {
  about: About,
  vision: Vision,
  founder: Founder,
  services: Services,
  ai: Ai,
  caseStudies: CaseStudies,
  guides: Guides,
  contact: Contact,
  gallery: Gallery,
  blog: Blog,
  legal: Legal,
};

const PageIllustration = ({ variant }) => {
  const Motif = MOTIFS[variant] || Default;

  return (
    <div className="relative w-full max-w-[360px] select-none" aria-hidden="true">
      <svg viewBox="0 0 480 400" className="w-full h-auto overflow-visible">
        <defs>
          <radialGradient id="pi-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d6ecf8" />
            <stop offset="100%" stopColor="#d6ecf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pi-deep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a4f75" />
            <stop offset="100%" stopColor="#0077b6" />
          </linearGradient>
          <linearGradient id="pi-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0095d8" />
            <stop offset="100%" stopColor="#5cc3ef" />
          </linearGradient>
          <linearGradient id="pi-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
          <pattern id="pi-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.8" fill="#0077b6" fillOpacity="0.28" />
          </pattern>
          <filter id="pi-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0a4f75" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Shared backdrop */}
        <circle cx="250" cy="200" r="190" fill="url(#pi-glow)" />
        <rect x="370" y="282" width="98" height="98" fill="url(#pi-dots)" />
        <rect x="24" y="28" width="84" height="70" fill="url(#pi-dots)" />
        <circle cx="250" cy="200" r="176" fill="none" stroke="#bcdcee" strokeWidth="1.5" strokeDasharray="3 9" strokeLinecap="round" />
        <circle cx="402" cy="112" r="7" fill="#0095d8" stroke="#fff" strokeWidth="3" />
        <circle cx="86" cy="260" r="6" fill="#0077b6" stroke="#fff" strokeWidth="3" />
        <circle cx="436" cy="44" r="13" fill="none" stroke="#0095d8" strokeOpacity="0.45" strokeWidth="5" />
        <circle cx="458" cy="84" r="4" fill="#0077b6" fillOpacity="0.4" />
        <g fill="#0077b6" fillOpacity="0.35">
          <rect x="40" y="336" width="22" height="5" rx="2.5" />
          <rect x="48.5" y="327.5" width="5" height="22" rx="2.5" />
        </g>

        <Motif />
      </svg>
    </div>
  );
};

export default PageIllustration;
