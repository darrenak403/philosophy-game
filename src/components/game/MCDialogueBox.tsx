import { useState, useEffect } from 'react';
import type { MCLine } from '../../types/game';

interface Props {
  line: MCLine;
  onNext: () => void;
  isLast: boolean;
  onFinish: () => void;
  finishLabel?: string;
}

export function MCDialogueBox({ line, onNext, isLast, onFinish, finishLabel = 'Tiếp tục' }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;
    if (line.audio) {
      audio = new Audio(encodeURI(line.audio));
      audio.volume = 1.0;
      audio.play().catch(console.error);
    }

    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 25);
    
    return () => {
      clearInterval(timer);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [line.text, line.audio]);

  const handleClick = () => {
    if (!done) {
      // Skip to end
      setDisplayed(line.text);
      setDone(true);
      return;
    }
    if (isLast) {
      onFinish();
    } else {
      onNext();
    }
  };

  return (
    <div className="mc-dialogue" onClick={handleClick}>
      <p className="mc-dialogue__text">
        {displayed}
        {!done && <span className="mc-dialogue__cursor">|</span>}
      </p>
      {done && (
        <span className="mc-dialogue__hint">
          {isLast ? finishLabel : 'Nhấn để tiếp tục →'}
        </span>
      )}
      {line.pause && done && <div className="mc-dialogue__pause-dot" />}
    </div>
  );
}
