import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import bssGmb from '../assets/bss_gmb.png';
import bannerBgImage from '../assets/bg3.jpg';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 overflow-hidden border-b border-slate-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={bannerBgImage} 
            alt="" 
            className="w-full h-full object-cover opacity-35" 
          />
          {/* Solid gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#133866]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Contact Us
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </nav>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <ConnectSection />

      {/* Google My Business QR Section */}
      <section className="py-20 md:py-24 bg-slate-50/60 relative overflow-hidden border-t border-slate-100">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#274e85]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            
            {/* Left side: Heading and details */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-block px-3 py-1.5 rounded-none text-[10px] font-extrabold uppercase tracking-wider bg-[#005eb8]/10 text-[#005eb8] mb-3">
                Google My Business
              </span>
              <h2 className="text-[#191919] text-3xl sm:text-[40px] font-black leading-tight tracking-tight font-sans mb-6">
                Scan to Connect &amp; <br />
                <span className="text-[#005eb8]">Verify Our Location</span>
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
                    <div className="w-6 h-6 rounded-none bg-[#005eb8]/10 border border-[#005eb8]/20 flex items-center justify-center text-[#005eb8] shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm leading-tight mb-0.5">{item.title}</h4>
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
                className="bg-white border border-slate-200/90 rounded-none p-8 sm:p-10 flex flex-col items-center text-center shadow-sm w-full max-w-[380px]"
              >
                {/* Static QR Image wrapper without hover scale or pointer */}
                <div className="w-64 h-64 bg-slate-50 p-4 rounded-none border border-slate-200 flex items-center justify-center mb-6">
                  <img 
                    src={bssGmb} 
                    alt="Google My Business QR Code" 
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>

                <h4 className="text-[#191919] font-black text-lg mb-1 font-sans tracking-tight">
                  Binud Software Solutions
                </h4>
                <p className="text-[#005eb8] font-bold text-[10px] uppercase tracking-wider mb-2">
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
