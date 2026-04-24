import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email Us',
    value: 'binudsoftwaresolutions@gmail.com',
    href: 'mailto:binudsoftwaresolutions@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'Call Us',
    value: '+91 97063 93924',
    href: 'tel:+919706393924',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Hengrabari, Guwahati, Assam, India',
    href: null,
  },
  {
    icon: HiClock,
    label: 'Working Hours',
    value: 'Mon–Sat, 9AM – 6PM IST',
    href: null,
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

      {/* Hero */}
      <section className="pt-40 pb-16 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 pt-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge mb-4">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-5">
              Let's <span className="text-[#005d9e]">Talk</span>
            </h1>
            <p className="text-[#64748b] text-lg leading-relaxed max-w-xl mx-auto">
              Have a project in mind or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info — 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Contact Information</h2>
            <p className="text-[#64748b] text-sm leading-relaxed mb-8">
              Reach out through any channel below, or fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f2fb] flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-[#005d9e]" />
                  </div>
                  <div>
                    <div className="text-[#94a3b8] text-xs font-medium">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[#0f172a] font-semibold text-sm hover:text-[#005d9e] transition-colors break-all">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#0f172a] font-semibold text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map — Hengrabari, Guwahati */}
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm h-44">
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

          {/* Form — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-[#0f172a] mb-1">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#475569] text-sm font-medium mb-1.5 block">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-[#475569] text-sm font-medium mb-1.5 block">Email *</label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Phone</label>
                <input {...register('phone')} className="form-input" placeholder="+91 97063 93924" />
              </div>

              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Service Interested In</label>
                <select {...register('service')} className="form-input">
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
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-60"
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
