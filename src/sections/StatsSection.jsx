import { motion } from 'framer-motion';

const StatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-gradient-to-b from-[#fdfbfe] to-[#faf7fc] py-6 md:py-10 overflow-hidden select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto flex flex-col gap-1 md:gap-2"
      >
        {/* Row 1: Projects Completed */}
        <motion.div
          variants={rowVariants}
          className="py-4 md:py-5 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative group"
        >
          {/* Stat Block (Left) */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-4 md:gap-8 z-10">
            <div className="flex items-baseline">
              <span className="text-5xl md:text-[56px] font-black text-slate-800 tracking-tight leading-none">
                50+
              </span>
              <span className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest ml-2.5">
                Projects
              </span>
            </div>
          </div>

          {/* Watermark Block (Right) */}
          <div className="md:col-span-6 flex justify-start md:justify-end select-none pointer-events-none md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 overflow-hidden w-full md:w-auto h-fit">
            <span className="text-[#274e85]/[0.05] font-black text-[11vw] md:text-[5rem] xl:text-[5.8rem] uppercase tracking-[0.08em] whitespace-nowrap leading-none transition-transform duration-700 group-hover:scale-[1.03] group-hover:text-[#274e85]/[0.09] font-sans">
              Globally completed
            </span>
          </div>
        </motion.div>

        {/* Row 2: Years of Experience */}
        <motion.div
          variants={rowVariants}
          className="py-4 md:py-5 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative group"
        >
          {/* Watermark Block (Left) */}
          <div className="md:col-span-6 flex justify-start select-none pointer-events-none md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2 overflow-hidden w-full md:w-auto h-fit order-last md:order-first">
            <span className="text-[#274e85]/[0.05] font-black text-[11vw] md:text-[5rem] xl:text-[5.8rem] uppercase tracking-[0.08em] whitespace-nowrap leading-none transition-transform duration-700 group-hover:scale-[1.03] group-hover:text-[#274e85]/[0.09] font-sans">
              INDUSTRY EXPERIENCE
            </span>
          </div>

          {/* Stat Block (Right) */}
          <div className="md:col-span-6 md:col-start-7 flex flex-wrap items-center gap-4 md:gap-8 z-10 justify-start">
            <div className="flex items-baseline">
              <span className="text-5xl md:text-[56px] font-black text-slate-800 tracking-tight leading-none">
                5+
              </span>
              <span className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest ml-2.5">
                Years
              </span>
            </div>
          </div>
        </motion.div>

        {/* Row 3: Happy Clients */}
        <motion.div
          variants={rowVariants}
          className="py-4 md:py-5 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative group"
        >
          {/* Stat Block (Left) */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-4 md:gap-8 z-10">
            <div className="flex items-baseline">
              <span className="text-5xl md:text-[56px] font-black text-slate-800 tracking-tight leading-none">
                30+
              </span>
              <span className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest ml-2.5">
                Clients
              </span>
            </div>
          </div>

          {/* Watermark Block (Right) */}
          <div className="md:col-span-6 flex justify-start md:justify-end select-none pointer-events-none md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 overflow-hidden w-full md:w-auto h-fit">
            <span className="text-[#274e85]/[0.05] font-black text-[11vw] md:text-[5rem] xl:text-[5.8rem] uppercase tracking-[0.08em] whitespace-nowrap leading-none transition-transform duration-700 group-hover:scale-[1.03] group-hover:text-[#274e85]/[0.09] font-sans">
              HAPPY CLIENTS
            </span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default StatsSection;
