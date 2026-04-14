import { useState, useEffect } from 'react';

interface Props {
  text: string;
  speed?: number; // ms per character
}

export function SpeechBubble({ text, speed = 30 }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className={`speech-bubble ${done ? 'speech-bubble--done' : ''}`}>
      <p className="speech-bubble__text">{displayed}<span className="speech-bubble__cursor">|</span></p>
      <div className="speech-bubble__tail" />
    </div>
  );
}
