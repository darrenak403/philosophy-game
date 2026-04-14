import type { CEOHistory } from '../../types/game';
import { CEOS } from '../../data/ceos';

interface Props {
  history: CEOHistory[];
}

export function CEOHistorySidebar({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <aside className="ceo-sidebar">
      <div className="ceo-sidebar__label">Đã thay thế</div>
      <div className="ceo-sidebar__list">
        {history.map((entry, i) => {
          const ceo = CEOS[(entry.generation - 1) % CEOS.length];
          return (
            <div
              key={i}
              className="ceo-sidebar__bubble"
              style={{ animationDelay: `${i * 0.2}s` }}
              title={`${entry.ceoName} — Đời ${entry.generation} • ${entry.roundsHandled} vòng`}
            >
              <img
                src={ceo.images.idle}
                alt={entry.ceoName}
                className="ceo-sidebar__img"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
      <div className="ceo-sidebar__count">{history.length}</div>
    </aside>
  );
}
