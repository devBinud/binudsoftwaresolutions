import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import PageBanner from '../components/PageBanner';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import bssGmb from '../assets/bss_gmb.png';

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://binudsoftwaresolutions.in/contact#contactpage',
      'url': 'https://binudsoftwaresolutions.in/contact',
      'name': 'Contact Binud Software Solutions',
      'description': 'Schedule a direct 20-minute technical consultation with our software architects in Guwahati, Assam to discuss your project scope, timeline, and strategy.',
      'mainEntity': {
        '@type': 'ProfessionalService',
        '@id': 'https://binudsoftwaresolutions.in/#organization',
        'name': 'Binud Software Solutions',
        'image': 'https://binudsoftwaresolutions.in/og-image.png',
        'telephone': '+91-97063-93924',
        'email': 'binudsoftwaresolutions@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Guwahati',
          'addressRegion': 'Assam',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 26.1445,
          'longitude': 91.7362
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ],
          'opens': '09:00',
          'closes': '18:00'
        }
      }
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
          'name': 'Contact Us',
          'item': 'https://binudsoftwaresolutions.in/contact'
        }
      ]
    }
  ]
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        canonicalPath="/contact"
        jsonLd={contactJsonLd}
      />
      <Navbar />

      <PageBanner
        title="Contact Us"
        crumbs={[{ name: 'Contact Us' }]}
        variant="contact"
        description={[
          'Have a project in mind or a question about our services? Tell us a little about what you are building.',
          'Whether you need a website, a mobile app, custom software or AI automation, our team will review your request and get back to you with clear next steps.',
        ]}
      />
      
      {/* Contact Form Section */}
      <ConnectSection />

      {/* Google My Business QR Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            
            {/* Left side: Heading and details */}
            <div className="lg:col-span-7 text-left">
              <h2 className="text-ink text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight font-sans mb-6">
                Scan to Connect &amp; <br />
                <span className="text-[#0077b6]">Verify Our Location</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Scan the QR code on the right with your smartphone to view our official location on Google Maps, read client reviews, or leave feedback about your experience with us.
              </p>
              
              {/* Highlight bullet points */}
              <div className="space-y-4">
                {[
                  { title: "Direct Navigation", desc: "Instantly find our headquarters in Guwahati, Assam." },
                  { title: "Verified Reviews", desc: "Read honest feedback from our clients worldwide." },
                  { title: "Share Your Feedback", desc: "Rate our services and help us improve." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-md bg-[#0077b6]/10 border border-[#0077b6]/20 flex items-center justify-center text-[#0077b6] shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold text-sm leading-tight mb-0.5">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-semibold leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Static Modern QR card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-slate-200/90 rounded-card p-8 sm:p-10 flex flex-col items-center text-center w-full max-w-[380px]"
              >
                {/* Static QR Image wrapper without hover scale or pointer */}
                <div className="w-64 h-64 bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-center mb-6">
                  <img loading="lazy" decoding="async" 
                    src={bssGmb} 
                    alt="Google My Business QR Code" 
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>

                <h4 className="text-ink font-semibold text-lg mb-1 font-sans tracking-tight">
                  Binud Software Solutions
                </h4>
                <p className="text-[#0077b6] font-bold text-[10px] uppercase tracking-wider mb-2">
                  Guwahati, Assam
                </p>
                <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[240px]">
                  Open your camera app to scan and connect directly on Google.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
