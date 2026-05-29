import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email Us',
    value: 'binudsoftwaresolutions@gmail.com',
    href: 'mailto:binudsoftwaresolutions@gmail.com',
    isPurple: true
  },
  {
    icon: HiPhone,
    label: 'Call Us',
    value: '+91 97063 93924',
    href: 'tel:+919706393924',
    isPurple: false
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Hengrabari, Guwahati, Assam, India',
    href: null,
    isPurple: true
  },
  {
    icon: HiClock,
    label: 'Working Hours',
    value: 'Mon–Sat, 9AM – 6PM IST',
    href: null,
    isPurple: false
  },
];

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp(),
        read: false,
      });
      toast.success('Message sent! We\'ll get back to you soon.');
      reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── IMAGE HERO BANNER (Hyperlink InfoSystem Style) ── */}
      <section 
        className="relative pt-44 pb-24 bg-cover bg-center select-none overflow-hidden"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')` 
        }}
      >
        {/* Dark Translucent Mask Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 z-0" />
        
        {/* Symmetrical Left-Aligned Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            {/* Modern Spaced-out Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-6 select-none">
              <Link to="/" className="hover:text-[#9b51e0] transition-colors">Home</Link>
              <span className="text-slate-400">/</span>
              <span className="text-white">Contact</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight max-w-4xl">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#3081ec]">Talk</span>
            </h1>

            {/* Underline Divider */}
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#9b51e0] to-[#3081ec] mb-6 rounded-full" />

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info Block — 2 columns */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-black text-[#191919] mb-3 leading-tight">Contact Information</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
              Reach out through any channel below, or fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-5 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  {/* Coordinated mixed gradient backgrounds and text tones */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-[#9b51e0]/8 to-[#3081ec]/8 shrink-0 border flex items-center justify-center ${
                    item.isPurple ? 'text-[#9b51e0] border-[#9b51e0]/15' : 'text-[#3081ec] border-[#3081ec]/15'
                  }`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className={`font-extrabold text-sm transition-colors break-all ${
                        item.isPurple ? 'text-[#191919] hover:text-[#9b51e0]' : 'text-[#191919] hover:text-[#3081ec]'
                      }`}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#191919] font-extrabold text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map — Hengrabari, Guwahati */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-48 hover:shadow-md transition-shadow duration-300">
              <iframe
                title="Binud Software Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.876!2d91.7898!3d26.1433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5912a5b8b8b7%3A0x1!2sHengrabari%2C+Guwahati%2C+Assam!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form Block — 3 columns */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-5 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-black text-[#191919] mb-1">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 text-sm font-semibold mb-1.5 block">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-slate-700 text-sm font-semibold mb-1.5 block">Email *</label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-sm font-semibold mb-1.5 block">Phone</label>
                <input {...register('phone')} className="form-input" placeholder="+91 97063 93924" />
              </div>

              <div>
                <label className="text-slate-700 text-sm font-semibold mb-1.5 block">Service Interested In</label>
                <select {...register('service')} className="form-input bg-white cursor-pointer select-none">
                  <option value="">Select a service</option>
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>UI/UX Design</option>
                  <option>Cloud Solutions</option>
                  <option>AI & Automation</option>
                  <option>IT Consulting</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 text-sm font-semibold mb-1.5 block">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message.message}</p>}
              </div>

              {/* High-end Purple to Blue Gradient button matching Hero GET STARTED */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center disabled:opacity-60 bg-gradient-to-r from-[#9b51e0] to-[#3081ec] hover:shadow-[0_4px_22px_rgba(155,81,224,0.35)] shadow-md text-white font-extrabold text-[12px] uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
