import type { CEOHistory } from '../../types/game';
import { CEOS } from '../../data/ceos';

interface Props {
  history: CEOHistory[];
  currentGen: number;
  onContinue: () => void;
}

export function CEOBubbles({ history, currentGen, onContinue }: Props) {
  return (
    <div className="ceo-bubbles" onClick={onContinue}>
      <p className="ceo-bubbles__tagline">
        Dù có bạn hay không…<br />
        <strong>vẫn luôn có người khác thay thế.</strong>
      </p>

      <div className="ceo-bubbles__cloud">
        {history.map((entry, i) => {
          const ceo = CEOS[(entry.generation - 1) % CEOS.length];
          const delay = i * 0.15;
          return (
            <div
              key={i}
              className="ceo-bubble"
              style={{ animationDelay: `${delay}s` }}
            >
              <img
                src={ceo.images.idle}
                alt={entry.ceoName}
                className="ceo-bubble__img"
                draggable={false}
              />
              <span className="ceo-bubble__name">{entry.ceoName}</span>
              <span className="ceo-bubble__info">
                Đời {entry.generation} • {entry.roundsHandled} vòng
              </span>
            </div>
          );
        })}

        {/* Current empty slot — "?" bubble */}
        <div className="ceo-bubble ceo-bubble--next" style={{ animationDelay: `${history.length * 0.15}s` }}>
          <div className="ceo-bubble__question">?</div>
          <span className="ceo-bubble__name">CEO thứ {currentGen + 1}</span>
          <span className="ceo-bubble__info">Sắp nhậm chức</span>
        </div>
      </div>

      <p className="ceo-bubbles__counter">
        {history.length} CEO đã đến và đi. Vòng xoáy tiếp tục…
      </p>

      <span className="ceo-bubbles__hint">Nhấn để tiếp tục →</span>
    </div>
  );
}
