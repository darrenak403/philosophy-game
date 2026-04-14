import { useScrollReveal } from '../../hooks/useScrollReveal';

export function ContradictionSection() {
  const { ref, visible } = useScrollReveal(0.15);
  const { ref: synthRef, visible: synthVis } = useScrollReveal(0.3);

  return (
    <section className="section" id="contradiction">
      <div className="container">
        <div className={`reveal ${visible ? 'visible' : ''}`} ref={ref}>
          <span className="label">Quy luật 02</span>
          <h2>Mâu thuẫn</h2>
          <div className="divider" />
          <p className="body-large">
            Mâu thuẫn — sự thống nhất và đấu tranh giữa các mặt đối lập —
            là động lực của sự phát triển.
          </p>
        </div>

        <div className={`contra-columns ${visible ? 'visible' : ''}`}>
          <div className={`contra-col reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
            <h3>Hustle Culture</h3>
            <ul>
              <li>Làm việc 12-16 tiếng/ngày</li>
              <li>"Nghỉ ngơi là lười biếng"</li>
              <li>Hy sinh sức khỏe vì sự nghiệp</li>
              <li>Thành công = Tiền + Địa vị</li>
            </ul>
          </div>

          <div className="contra-divider">
            <div className="contra-divider__line" />
            <span className="contra-divider__label">VS</span>
            <div className="contra-divider__line" />
          </div>

          <div className={`contra-col reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
            <h3>Healing / Balance</h3>
            <ul>
              <li>Work-life balance là quyền</li>
              <li>Sức khỏe tinh thần là ưu tiên</li>
              <li>Tận hưởng cuộc sống, không chỉ làm việc</li>
              <li>Thành công = Hạnh phúc + Ý nghĩa</li>
            </ul>
          </div>
        </div>

        <div
          ref={synthRef}
          className={`contra-synthesis reveal ${synthVis ? 'visible' : ''}`}
        >
          <div className="contra-synthesis__arrow">↓</div>
          <h3 className="text-gold">Mô hình Hybrid — Synthesis</h3>
          <p className="text-muted mt-md">
            Chính mâu thuẫn giữa "cống hiến hết mình" và "chăm sóc bản thân"
            đang thúc đẩy doanh nghiệp thay đổi: mô hình Hybrid, làm việc
            4 ngày/tuần, wellness programs. Mâu thuẫn không phá hủy — nó
            thúc đẩy tiến bộ.
          </p>
        </div>
      </div>
    </section>
  );
}
