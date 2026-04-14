import { useState, useEffect, useRef } from 'react';
import { WALK_FRAMES } from '../../data/ceos';

interface Props {
  onFinish: () => void;
}

export function WalkingCEO({ onFinish }: Props) {
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(-20); // Start off-screen left (%)
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const duration = 2000; // 2 seconds walk

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Position: -20% → 120% (walk across screen)
      setPosition(-20 + progress * 140);

      // Frame: cycle through 4 frames
      setFrame(Math.floor((elapsed / 150) % WALK_FRAMES.length));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [onFinish]);

  return (
    <div className="walking-ceo" style={{ left: `${position}%` }}>
      <img
        src={WALK_FRAMES[frame]}
        alt="CEO walking"
        className="walking-ceo__img"
        draggable={false}
      />
    </div>
  );
}
