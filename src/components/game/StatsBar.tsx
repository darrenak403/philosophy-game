import type { Stats } from '../../types/game';

interface Props {
  stats: Stats;
}

const STAT_CONFIG = [
  { key: 'revenue' as const, label: 'Doanh thu', modifier: '--revenue' },
  { key: 'morale' as const, label: 'Tinh thần', modifier: '--morale' },
  { key: 'innovation' as const, label: 'Đổi mới', modifier: '--innovation' },
  { key: 'reputation' as const, label: 'Uy tín', modifier: '--reputation' },
];

export function StatsBar({ stats }: Props) {
  return (
    <div className="stats-panel">
      {STAT_CONFIG.map(({ key, label, modifier }) => {
        const value = stats[key];
        const isDanger = value <= 20;
        return (
          <div className="stat-bar" key={key}>
            <span className="stat-bar__label">{label}</span>
            <div className="stat-bar__track">
              <div
                className={`stat-bar__fill stat-bar__fill${modifier}`}
                style={{
                  width: `${value}%`,
                  opacity: isDanger ? 0.6 : 1,
                }}
              />
            </div>
            <span
              className="stat-bar__value"
              style={{ color: isDanger ? 'var(--color-danger)' : 'var(--text-primary)' }}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
