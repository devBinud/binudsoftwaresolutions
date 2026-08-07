const items = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'React & Next.js',
  'Node.js & Express',
  'Flutter & React Native',
  'MongoDB & MySQL',
  'Cloud & AWS',
  'DevOps & CI/CD',
  'API Development',
  'AI & Automation',
  'IT Consulting',
  'E-Commerce Solutions',
  'Firebase & Supabase',
  'TypeScript',
  'Cybersecurity',
];

// Triplicate so the loop is seamless at any screen width
const track = [...items, ...items, ...items];

const MarqueeBar = () => {
  return (
    <div className="bg-[#005eb8] border-y border-[#005eb8]/20 overflow-hidden shadow-sm">
      <div className="ticker-track flex items-center" style={{ animationDuration: '55s' }}>
        {track.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold text-white/95 hover:text-white transition-colors duration-200 whitespace-nowrap border-r border-dashed border-white/40 h-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
