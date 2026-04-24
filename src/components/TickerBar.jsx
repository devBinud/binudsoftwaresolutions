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
    <div className="bg-[#005d9e] overflow-hidden py-2.5 select-none">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 px-5 text-white text-xs font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
