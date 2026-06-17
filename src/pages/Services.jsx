import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectSection from '../sections/ConnectSection';
import bannerBgImage from '../assets/bg2.jpg';

const services = [
  {
    title: 'Web Development',
    desc: 'Custom web apps built with modern frameworks. Fast, highly scalable, and SEO-optimized from landing pages to complex enterprise portals.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Popular',
    features: ['Custom Web Apps', 'E-Commerce Platforms', 'CMS Development', 'API Development', 'Progressive Web Apps'],
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android using Flutter and React Native. Smooth, performant apps that users love.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15%',
    features: ['iOS & Android Apps', 'Cross-Platform (Flutter)', 'App Store Deployment', 'Push Notifications', 'Offline Support'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with premium user experience in mind. Wireframes, interactive prototypes, and pixel-perfect design systems.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'New',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, GCP, and Azure with full DevOps support. Deployment, containerization, and cost optimization.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '15% OFF',
    features: ['Cloud Migration', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Architecture', 'Cost Optimization'],
  },
  {
    title: 'AI & Automation',
    desc: 'Intelligent automation and AI-powered features to supercharge your business. Chatbots, predictive analysis, and intelligent workflows.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80',
    badge: '20%',
    features: ['Chatbots & Assistants', 'Machine Learning', 'Data Analytics', 'Process Automation', 'NLP Solutions'],
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic technology consulting to help you make the right technical decisions. Tech stack assessment, project rescue, and architecture reviews.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80',
    badge: 'Free Audit',
    features: ['Tech Stack Assessment', 'Digital Transformation', 'Architecture Review', 'Team Augmentation', 'Project Rescue'],
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── Breadcrumb Banner ── */}
      <section className="relative bg-slate-900 text-white pt-28 pb-14 select-none overflow-hidden border-b border-slate-800">
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
            Our Services
          </h1>
          <nav className="text-xs md:text-sm font-medium flex items-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </nav>
        </div>
      </section>

      {/* Hero Header Section */}
      <section className="relative pt-16 pb-16 bg-white overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-left"
          >
            <h1 className="text-3xl sm:text-[42px] lg:text-[48px] font-black text-[#191919] leading-[1.15] tracking-tight mb-4 max-w-4xl">
              Top-Notch Web, Mobile & AI Solutions
            </h1>
            <p className="text-slate-400 text-3xl sm:text-[42px] lg:text-[48px] font-black leading-[1.15] tracking-tight mt-0 mb-6 max-w-4xl">
              for Startups &amp; Enterprises!
            </p>
            <div className="w-16 h-[3px] bg-[#274e85] mb-8 rounded-full" />
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              We architect high-performance digital platforms, helping global businesses execute seamless digital transformation from design to deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="rounded-2xl p-[1px] bg-gradient-to-br from-[#274e85]/20 to-[#3E4265]/20 hover:from-[#274e85] hover:to-[#3E4265] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(39,78,133,0.08)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer group relative overflow-hidden"
              >
                <div className="w-full h-full rounded-2xl bg-white p-8 flex flex-col justify-between min-h-[290px] select-none text-left relative overflow-hidden">

                  <div>
                    {/* Diagonal Corner Ribbon */}
                    {service.badge && (
                      <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none z-20">
                        <div className="absolute top-3 right-[-30px] rotate-45 bg-[#695dd3] text-white text-[8px] font-black uppercase tracking-widest text-center py-1 w-28 shadow-[0_2px_10px_rgba(105,93,211,0.35)]">
                          {service.badge}
                        </div>
                      </div>
                    )}

                    {/* Low-opacity background image watermark */}
                    <div
                      className="absolute right-0 bottom-0 w-44 h-44 opacity-[0.08] pointer-events-none select-none rounded-br-2xl overflow-hidden"
                      style={{
                        maskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
                        WebkitMaskImage: 'radial-gradient(circle at 100% 100%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
                      }}
                    >
                      <img
                        src={service.image}
                        alt=""
                        className="w-full h-full object-cover object-center filter grayscale mix-blend-multiply group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 pr-4">
                      <h3 className="text-[#191919] text-xl font-black tracking-tight mb-3 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-[14.5px] leading-relaxed font-medium mb-6">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="grid grid-cols-1 gap-2.5 pt-4 border-t border-slate-100 relative z-10">
                    {service.features.map((f) => (
                      <li key={f} className="text-xs text-slate-600 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#274e85] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <ConnectSection onlySocials={true} />

      <Footer />
    </div>
  );
};

export default Services;
