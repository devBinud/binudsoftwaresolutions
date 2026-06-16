import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { HiX, HiArrowRight } from 'react-icons/hi';

// Import images from assets/gallery
import photo1 from '../assets/gallery/1.jpeg';
import photo2 from '../assets/gallery/2.jpeg';
import photo3 from '../assets/gallery/3.jpeg';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD MORE PHOTOS IN THE FUTURE:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Place the new image in `src/assets/gallery/` (e.g., `4.jpeg` or `member_name.png`).
 * 2. Import the image at the top of this file:
 *    `import photo4 from '../assets/gallery/4.jpeg';`
 * 3. Append a new object to the `galleryPhotos` array below:
 *    {
 *      id: 4,
 *      image: photo4,
 *      name: 'Full Name',
 *      role: 'Professional Role',
 *      tagline: 'Short inspiring tagline',
 *      desc: 'Detailed professional description of skills, experience, and background.',
 *      specialties: ['Skill 1', 'Skill 2', 'Skill 3'],
 *      linkedin: 'https://linkedin.com/in/...',
 *      github: 'https://github.com/...',
 *      email: 'mailto:email@example.com'
 *    }
 * ─────────────────────────────────────────────────────────────────────────────
 */

const galleryPhotos = [
  {
    id: 1,
    image: photo1,
    name: 'Arindam Sharma',
    role: 'Principal Systems Architect',
    tagline: 'Architecting high-performance, resilient digital ecosystems.',
    desc: 'With over 6 years of expertise, Arindam specializes in designing and building scalable cloud architectures, microservices, and high-throughput databases. He leads our DevOps practices and ensures systems are engineered for maximum reliability and low latency.',
    specialties: ['Cloud Infrastructure', 'System Design', 'Kubernetes & Docker', 'Node.js & Go'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:arindam@binudsoftware.com',
  },
  {
    id: 2,
    image: photo2,
    name: 'Priyam Baruah',
    role: 'UI/UX & Creative Director',
    tagline: 'Bridging the gap between human intuition and interactive engineering.',
    desc: 'Priyam is a creative thinker who designs interfaces that tell a story. He focuses on seamless user experiences, interactive designs, and consistent design systems. He works closely with developers to make sure the final product looks and feels premium.',
    specialties: ['User Experience (UX)', 'Interface Design (UI)', 'Figma Prototyping', 'Interaction Animation'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:priyam@binudsoftware.com',
  },
  {
    id: 3,
    image: photo3,
    name: 'Jyotishmoy Das',
    role: 'Lead Full-Stack Developer',
    tagline: 'Writing clean, performant, and future-proof code.',
    desc: 'Jyotishmoy handles front-to-back engineering with a heavy focus on React, Next.js, and TypeScript. He is passionate about web performance optimization, modular architectures, and creating robust APIs that power modern web and mobile applications.',
    specialties: ['React & Next.js', 'TypeScript', 'RESTful & GraphQL APIs', 'Database Optimization'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mailto:jyotishmoy@binudsoftware.com',
  },
];

const TeamGallerySection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] overflow-hidden select-none border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#274e85] bg-[#e8eef7] rounded-full mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#274e85]" />
            Our Core Experts
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#191919] text-3xl sm:text-[40px] font-black leading-tight tracking-tight font-sans mb-6"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#274e85] to-[#695dd3]">Engineered Minds</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            A high-performing, collaborative team dedicated to building custom software solutions, scalable platforms, and premium digital experiences.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {galleryPhotos.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(39,78,133,0.12)] transition-all duration-500 border border-slate-100 flex flex-col"
            >
              {/* Image Box */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Floating Role Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/95 backdrop-blur-md text-[#274e85] text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm border border-slate-100">
                    {member.role.split(' ')[0]} {member.role.split(' ')[1] || ''}
                  </span>
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Overlay Text Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                  <p className="text-[11px] font-bold text-[#9fc3f9] uppercase tracking-widest mb-1.5">
                    {member.role}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-[#9fc3f9] transition-colors">
                    {member.name}
                  </h3>
                  
                  {/* Subtle reveal details */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    <p className="text-white/80 text-xs leading-relaxed font-medium mb-4 mt-1">
                      {member.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9fc3f9] group-hover:underline">
                      View Profile <HiArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal / Lightbox */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] md:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 md:bg-white/10 md:hover:bg-white/20 md:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <HiX size={18} />
              </button>

              {/* Modal Left - Image (Full Height) */}
              <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-slate-100 shrink-0">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/20" />
                <div className="absolute bottom-6 left-6 right-6 text-white block md:hidden">
                  <span className="text-[10px] font-bold text-[#9fc3f9] uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {selectedMember.role}
                  </span>
                </div>
              </div>

              {/* Modal Right - Details */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                <span className="hidden md:inline-block w-fit text-xs font-bold text-[#274e85] uppercase tracking-widest bg-[#e8eef7] px-3.5 py-1 rounded-full mb-3">
                  {selectedMember.role}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-black text-[#191919] tracking-tight">
                  {selectedMember.name}
                </h3>
                
                <p className="text-[#274e85] font-semibold text-sm italic mt-1 mb-5">
                  "{selectedMember.tagline}"
                </p>

                <div className="w-12 h-[2px] bg-[#274e85] mb-6" />

                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  {selectedMember.desc}
                </p>

                {/* Specialties / Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">
                    Core Specialties & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Connect */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Connect with {selectedMember.name.split(' ')[0]}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#274e85] hover:text-white hover:border-[#274e85] transition-all"
                    >
                      <FaLinkedin size={15} />
                    </a>
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all"
                    >
                      <FaGithub size={15} />
                    </a>
                    <a
                      href={selectedMember.email}
                      className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#695dd3] hover:text-white hover:border-[#695dd3] transition-all"
                    >
                      <FaEnvelope size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamGallerySection;
