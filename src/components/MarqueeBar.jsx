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
    <div className="bg-[#0c051a] border-y border-white/5 overflow-hidden py-3.5 select-none shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
      <div className="ticker-track" style={{ animationDuration: '55s' }}>
        {track.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
