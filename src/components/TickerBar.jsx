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

const TickerBar = () => {
  // Duplicate items so the scroll loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div className="bg-[#005eb8] border-y border-[#005eb8]/20 overflow-hidden shadow-sm">
      <div className="ticker-track flex items-center">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-6 sm:px-8 py-3 text-xs font-bold text-white/95 whitespace-nowrap border-r border-dashed border-white/40 h-full"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
