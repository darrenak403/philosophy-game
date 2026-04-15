import { useState, useEffect } from 'react';

interface Props {
  /** Array of image paths for each frame */
  frames: string[];
  /** Milliseconds between frames */
  interval?: number;
  /** Whether to start animating */
  active: boolean;
  /** Alt text */
  alt?: string;
}

/**
 * Cycles through frame images when `active` becomes true.
 * Uses mix-blend-mode: screen to seamlessly drop the black background.
 */
export function FrameAnimation({ frames, interval = 1200, active, alt = '' }: Props) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!active) return;

    setCurrentFrame(0);

    const timer = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [active, frames.length, interval]);

  return (
    <div className="frame-animation">
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`frame-animation__img ${i === currentFrame ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
      <div className="frame-animation__glow" />
    </div>
  );
}
