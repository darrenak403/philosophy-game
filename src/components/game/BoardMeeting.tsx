import type { Stats } from '../../types/game';

interface Props {
  stats: Stats;
  ceoName: string;
  onFire: () => void;
}

export function BoardMeeting({ stats, ceoName, onFire }: Props) {
  const failedStats: string[] = [];
  if (stats.revenue <= 0) failedStats.push('Doanh thu');
  if (stats.morale <= 0) failedStats.push('Tinh thần nhân viên');
  if (stats.innovation <= 0) failedStats.push('Đổi mới');
  if (stats.reputation <= 0) failedStats.push('Uy tín');

  return (
    <div className="board-meeting card text-center">
      <span className="label" style={{ color: 'var(--color-danger)' }}>
        Họp hội đồng quản trị
      </span>
      <h3 className="mt-lg">Kết quả biểu quyết</h3>

      <div className="board-meeting__verdict mt-xl">
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Hội đồng quản trị nhận thấy các chỉ số sau đã sụp đổ:
        </p>
        <ul className="board-meeting__failed mt-md">
          {failedStats.map((stat) => (
            <li key={stat}>{stat} = 0</li>
          ))}
        </ul>
        <p className="mt-lg" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Với số phiếu đa số, hội đồng quyết định sa thải{' '}
          <strong>{ceoName}</strong> khỏi vị trí CEO.
        </p>
      </div>

      <button className="btn btn--danger mt-xl" onClick={onFire}>
        Chấp nhận quyết định
      </button>
    </div>
  );
}
