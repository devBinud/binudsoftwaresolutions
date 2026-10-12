import { Link } from 'react-router-dom';
import SEOHead from './SEOHead';
import Navbar from './Navbar';
import Footer from './Footer';
import bannerBgImage from '../assets/bg3.webp';

/**
 * Shared layout for legal pages (Privacy Policy, Terms of Use).
 * `sections` is an array of { id, heading, content } where content is JSX.
 */
const LegalPage = ({ title, canonicalPath, lastUpdated, intro, sections }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead canonicalPath={canonicalPath} />
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerBgImage}
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            {title}
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white rounded-card border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#005eb8] pb-3 mb-3 border-b border-slate-200">
              On this page
            </h2>
            <ul className="flex flex-col gap-1">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#005eb8] hover:bg-slate-50 transition-colors"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Document */}
          <article className="lg:col-span-9 bg-white rounded-card border border-slate-200 shadow-sm p-6 sm:p-10 md:p-12 text-left">
            <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-4">
              Last updated: {lastUpdated}
            </span>

            <div className="text-slate-600 pb-8 mb-8 border-b border-dashed border-slate-200 space-y-4">
              {intro}
            </div>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-[#191919] text-xl md:text-2xl font-black tracking-tight mb-4">
                    {i + 1}. {section.heading}
                  </h2>
                  <div className="text-slate-600 space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-[#005eb8] [&_a]:font-semibold [&_a:hover]:underline [&_strong]:text-slate-800">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalPage;
