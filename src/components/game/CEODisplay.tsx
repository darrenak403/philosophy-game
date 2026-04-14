import type { CEO, CEOState } from '../../types/game';

interface Props {
  ceo: CEO;
  state: CEOState;
}

export function CEODisplay({ ceo, state }: Props) {
  const imgSrc = ceo.images[state as keyof typeof ceo.images] || ceo.images.idle;

  return (
    <div className={`ceo-display ceo-display--${state}`}>
      <div className="ceo-display__frame">
        <img
          src={imgSrc}
          alt={`${ceo.name} - ${state}`}
          className="ceo-display__img"
          draggable={false}
        />
      </div>
      <span className="ceo-display__name">{ceo.name}</span>
    </div>
  );
}
