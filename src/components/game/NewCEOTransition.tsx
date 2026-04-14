import type { CEO, Stats } from '../../types/game';

interface Props {
  ceo: CEO;
  generation: number;
  stats: Stats;
  previousCeo: {
    generation: number;
    ceoName: string;
    scenariosHandled: number;
    finalStats: Stats;
  } | null;
  onStart: () => void;
}

export function NewCEOTransition({
  ceo,
  generation,
  stats,
  previousCeo,
  onStart,
}: Props) {
  return (
    <div className="ceo-transition card">
      <span className="label">
        {generation === 1 ? 'Bổ nhiệm' : 'Kế nhiệm'}
      </span>

      <h3 className="mt-md">{ceo.name}</h3>
      <p className="text-muted" style={{ fontSize: '0.9rem' }}>
        {ceo.title}
      </p>

      {previousCeo && (
        <div className="ceo-transition__inherit mt-lg">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Kế thừa từ <strong>{previousCeo.ceoName}</strong> (Đời {previousCeo.generation}):
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '0.5rem' }}>
            Doanh thu: {stats.revenue} | Tinh thần: {stats.morale} | Đổi mới:{' '}
            {stats.innovation} | Uy tín: {stats.reputation}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            ({previousCeo.scenariosHandled} quyết định đã xử lý trước đó)
          </p>
        </div>
      )}

      {generation === 1 && (
        <p className="mt-lg" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Chào mừng bạn đến với vị trí CEO! Hãy chuẩn bị đối mặt với những
          thách thức của thời đại — mỗi quyết định phản ánh một quy luật
          triết học Mác-Lênin.
        </p>
      )}

      <button className="btn btn--primary mt-xl" onClick={onStart}>
        {generation === 1 ? 'Nhậm chức' : 'Tiếp quản công ty'}
      </button>
    </div>
  );
}
