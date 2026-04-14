interface Props {
  chapter: number;
  title: string;
  intro: string;
  onStart: () => void;
}

export function ChapterIntro({ chapter, title, intro, onStart }: Props) {
  return (
    <div className="chapter-intro">
      <div className="chapter-intro__badge">
        Chương {chapter} / 4
      </div>
      <h2 className="chapter-intro__title">{title}</h2>
      <div className="chapter-intro__divider" />
      <p className="chapter-intro__text">{intro}</p>
      <button className="btn btn--primary mt-xl" onClick={onStart}>
        Bắt đầu chương {chapter}
      </button>
    </div>
  );
}
