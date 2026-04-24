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
    <div className="bg-[#005d9e] border-y border-[#004a7f] overflow-hidden py-3 select-none">
      <div className="ticker-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-sm font-medium text-white whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
