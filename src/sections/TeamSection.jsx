import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';

const blobPath = 'M44,-58.5C56.6,-50.3,65.8,-36.2,69.2,-20.8C72.6,-5.4,70.2,11.3,63.1,25.4C56,39.5,44.2,51,30.3,57.8C16.4,64.6,0.4,66.7,-15.2,63.2C-30.8,59.7,-46,50.6,-56.3,37.5C-66.6,24.4,-72,7.3,-70.1,-9C-68.2,-25.3,-59,-40.8,-46.3,-49C-33.6,-57.2,-16.8,-58.1,0,-58.1C16.8,-58.1,31.4,-66.7,44,-58.5Z';

const highlights = [
  '5+ years building software products',
  'Delivered 50+ projects across industries',
  'Passionate about clean code & great UX',
  'Based in Guwahati, serving clients globally',
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="badge mb-3">Our Team</span>
          <h2 className="section-title mb-3">Meet the Founder</h2>
          <p className="section-sub mx-auto">
            The person behind Binud Software Solutions — building with purpose.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — Story only */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-[#005d9e] uppercase tracking-widest mb-3">
              Founder & CEO
            </p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-5 leading-snug">
              Hi, I'm Binud Panging
            </h3>

            <p className="text-[#475569] text-sm leading-7 mb-4">
              I started Binud Software Solutions with a simple belief — that great software can
              transform any business, no matter the size. Growing up in Guwahati, I was always
              fascinated by how technology could solve real problems for real people.
            </p>
            <p className="text-[#475569] text-sm leading-7 mb-7">
              Over the past 5+ years, I've had the privilege of working with startups, local
              businesses, and enterprises — helping them build products that actually work and
              grow. Every project I take on is personal to me, because I know what it means to
              build something from scratch.
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#334155]">
                  <HiCheckCircle className="text-[#005d9e] shrink-0" size={17} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Photo + signature below */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Photo with blob */}
            <div className="relative flex items-end justify-center w-96 h-[480px]">
              {/* Blob */}
              <svg
                viewBox="-80 -80 160 160"
                className="absolute w-80 h-80 left-1/2 -translate-x-1/2"
                style={{ bottom: '60px' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={blobPath} fill="#dbeafe" />
              </svg>

              {/* Photo */}
              <img
                src="/src/assets/team/binud.png"
                alt="Binud Panging"
                className="relative z-10 w-full h-full object-contain object-bottom"
              />

              {/* Ground shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-[#005d9e]/10 rounded-full blur-md z-20" />
            </div>

            {/* Signature — directly below the image */}
            <div className="text-center border-t border-gray-200 pt-5 w-72 mt-1">
              <p
                style={{ fontFamily: "'Dancing Script', cursive" }}
                className="text-4xl text-[#0f172a] leading-none mb-2"
              >
                Binud Panging
              </p>
              <p className="text-xs text-[#94a3b8] font-medium tracking-wide">
                Founder & CEO, Binud Software Solutions
              </p>
              <div className="flex justify-center gap-2.5 mt-4">
                {[FaLinkedin, FaGithub, FaTwitter].map((Icon, j) => (
                  <a
                    key={j}
                    href="#"
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-[#94a3b8] hover:bg-[#005d9e] hover:text-white transition-all"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Cursive font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />
    </section>
  );
};

export default TeamSection;
