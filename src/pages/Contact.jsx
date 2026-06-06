import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import bssGmb from '../assets/bss_gmb.png';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Contact Form Section */}
      <div className="pt-20">
        <ConnectSection hideVision={true} />
      </div>

      {/* Google My Business QR Section */}
      <section className="py-20 md:py-24 bg-slate-50/60 relative overflow-hidden border-t border-slate-100 select-none">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#274e85]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            
            {/* Left side: Heading and details */}
            <div className="lg:col-span-7 text-left">
              <span className="badge mb-3">Google My Business</span>
              <h2 className="text-[#191919] text-3xl sm:text-[40px] font-black leading-tight tracking-tight font-sans mb-6">
                Scan to Connect &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#274e85] to-[#695dd3]">Verify Our Location</span>
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
                    <div className="w-6 h-6 rounded-full bg-[#274e85]/8 border border-[#274e85]/15 flex items-center justify-center text-[#274e85] shrink-0 mt-0.5">
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

            {/* Right side: Interactive QR card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl p-[1px] bg-gradient-to-br from-[#274e85]/20 to-[#695dd3]/20 hover:from-[#274e85] hover:to-[#695dd3] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_40px_rgba(39,78,133,0.08)] w-full max-w-[380px] group cursor-pointer"
              >
                <div className="bg-white rounded-[23px] p-8 sm:p-10 flex flex-col items-center text-center relative overflow-hidden">
                  
                  {/* Decorative glowing scan effect */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#274e85] to-transparent animate-[bounce_3s_infinite] opacity-60" />

                  {/* QR Image wrapper */}
                  <div className="w-64 h-64 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img 
                      src={bssGmb} 
                      alt="Google My Business QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h4 className="text-[#191919] font-black text-lg mb-1.5 font-sans tracking-tight">
                    Binud Software Solutions
                  </h4>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">
                    Guwahati, Assam
                  </p>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[240px]">
                    Open your camera app to scan and connect directly on Google.
                  </p>
                </div>
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
