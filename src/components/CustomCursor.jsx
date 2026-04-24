import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Smooth spring for the trailing ring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp   = () => setClicked(false);

    // Detect hoverable elements
    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(true);
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.5 : hovered ? 0 : 1,
            opacity: hovered ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full bg-[#005d9e] -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Ring — lags behind with spring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            scale: clicked ? 0.7 : hovered ? 1.8 : 1,
            borderColor: hovered ? '#005d9e' : '#93c5fd',
            backgroundColor: hovered ? '#005d9e18' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full border-2 border-blue-300 -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
