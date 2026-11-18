import SEOHead from './SEOHead';
import Navbar from './Navbar';
import Footer from './Footer';
import PageBanner from './PageBanner';

/**
 * Shared layout for legal pages (Privacy Policy, Terms of Use).
 * `sections` is an array of { id, heading, content } where content is JSX.
 */
const LegalPage = ({ title, canonicalPath, lastUpdated, intro, sections }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead canonicalPath={canonicalPath} />
      <Navbar />

      <PageBanner
        title={title}
        crumbs={[{ name: title }]}
        variant="legal"
        description={[
          `Please read our ${title.toLowerCase()} carefully to understand how it applies when you use the Binud Software Solutions website and services.`,
        ]}
      />

      {/* ── Content ── */}
      <section className="py-16 md:py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white rounded-card border border-slate-200 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#0077b6] pb-3 mb-3 border-b border-slate-200">
              On this page
            </h2>
            <ul className="flex flex-col gap-1">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0077b6] hover:bg-slate-50 transition-colors"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Document */}
          <article className="lg:col-span-9 bg-white rounded-card border border-slate-200 p-6 sm:p-10 md:p-12 text-left">
            <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-[#0077b6]/10 text-[#0077b6] mb-4">
              Last updated: {lastUpdated}
            </span>

            <div className="text-slate-600 pb-8 mb-8 border-b border-dashed border-slate-200 space-y-4">
              {intro}
            </div>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-ink text-xl md:text-2xl font-semibold tracking-tight mb-4">
                    {i + 1}. {section.heading}
                  </h2>
                  <div className="text-slate-600 space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-[#0077b6] [&_a]:font-semibold [&_a:hover]:underline [&_strong]:text-slate-800">
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
