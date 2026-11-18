import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';

const tutorialsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://binudsoftwaresolutions.in/coding-guides#webpage',
      'name': 'Coding Guides | Binud Software Solutions',
      'url': 'https://binudsoftwaresolutions.in/coding-guides',
      'description': 'Practical coding guides and tutorials from the Binud Software Solutions engineering team.',
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://binudsoftwaresolutions.in/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Coding Guides',
          'item': 'https://binudsoftwaresolutions.in/coding-guides'
        }
      ]
    }
  ]
};

const Tutorials = () => (
  <div className="min-h-screen bg-white font-sans">
    <SEOHead canonicalPath="/coding-guides" jsonLd={tutorialsJsonLd} />
    <Navbar />

    <PageBanner
      title="Coding Guides"
      crumbs={[{ name: 'Coding Guides' }]}
      variant="guides"
      description={[
        'Practical coding guides and tutorials from our engineering team, focused on the skills and tools that matter in today\'s market.',
      ]}
    />

    <section className="py-16 md:py-20 bg-white">
      <p className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center text-body !text-[17px]">
        This page is under construction.
      </p>
    </section>

    <Footer />
  </div>
);

export default Tutorials;
