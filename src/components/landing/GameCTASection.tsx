import { useScrollReveal } from '../../hooks/useScrollReveal';

interface Props {
  onStartGame: () => void;
}

export function GameCTASection({ onStartGame }: Props) {
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section className="section" id="game-cta">
      <div className="container container--narrow text-center" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <span className="label">Thử thách</span>
          <h2>
            Bạn đã sẵn sàng<br />
            <span className="text-gold">làm chủ sự thay đổi?</span>
          </h2>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
          <p className="body-large">
            Nhập vai CEO một công ty FPT. Mỗi quyết định của bạn sẽ phản ánh
            một quy luật triết học. Đưa ra lựa chọn sai — hội đồng quản trị sẽ
            sa thải bạn. Nhưng đừng lo, CEO mới sẽ kế thừa những bài học từ bạn.
          </p>
        </div>

        <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} mt-xl`}>
          <button className="btn btn--primary" onClick={onStartGame}>
            Nhập vai CEO
          </button>
        </div>
      </div>
    </section>
  );
}
