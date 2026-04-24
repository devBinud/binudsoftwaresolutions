import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiX } from 'react-icons/hi';

// Set your target deadline here — 72 hours from a fixed date
// Change this to any future date you want the timer to count down to
const DEADLINE = new Date(Date.now() + 24 * 60 * 60 * 1000);

const pad = (n) => String(n).padStart(2, '0');

const AnnouncementBar = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ hrs: '00', min: '00', sec: '00' });

  useEffect(() => {
    const tick = () => {
      const diff = DEADLINE - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hrs: '00', min: '00', sec: '00' });
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      const hrs = Math.floor(totalSec / 3600);
      const min = Math.floor((totalSec % 3600) / 60);
      const sec = totalSec % 60;
      setTimeLeft({ hrs: pad(hrs), min: pad(min), sec: pad(sec) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#005d9e] text-white px-4 py-2.5 flex items-center justify-center gap-4 relative">
      {/* Message */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>🎯</span>
        <span>Free consultation for new clients!</span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-1 text-sm font-semibold">
        <div className="flex flex-col items-center leading-none">
          <span className="text-base font-bold tabular-nums">{timeLeft.hrs}</span>
          <span className="text-[9px] text-blue-200 font-normal uppercase tracking-wider">HRS</span>
        </div>
        <span className="text-blue-200 font-bold pb-2">:</span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-base font-bold tabular-nums">{timeLeft.min}</span>
          <span className="text-[9px] text-blue-200 font-normal uppercase tracking-wider">MIN</span>
        </div>
        <span className="text-blue-200 font-bold pb-2">:</span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-base font-bold tabular-nums">{timeLeft.sec}</span>
          <span className="text-[9px] text-blue-200 font-normal uppercase tracking-wider">SEC</span>
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/contact"
        className="bg-white text-[#005d9e] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
      >
        Grab Now →
      </Link>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
        aria-label="Close"
      >
        <HiX size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
