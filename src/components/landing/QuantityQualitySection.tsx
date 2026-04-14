import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useEffect, useState } from 'react';

export function QuantityQualitySection() {
  const { ref, visible } = useScrollReveal(0.2);
  const [count, setCount] = useState(0);
  const target = 1800;

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [visible]);

  const progress = Math.min(100, (count / target) * 100);
  const isComplete = count >= target;

  return (
    <section className="section" id="quantity-quality">
      <div className="container container--narrow text-center" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <span className="label">Quy luật 01</span>
          <h2>Lượng — Chất</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
          <p className="body-large">
            Tích lũy đủ về lượng sẽ dẫn đến bước nhảy vọt về chất.
          </p>
        </div>

        <div className={`qq-demo reveal reveal-delay-2 ${visible ? 'visible' : ''}`}>
          <p className="qq-demo__formula">
            10 từ/ngày × 180 ngày ={' '}
            <span className="qq-demo__counter">
              {count.toLocaleString('vi-VN')}
            </span>{' '}
            từ vựng
          </p>

          <div className="progress-bar mt-lg" style={{ maxWidth: 480, margin: '1.5rem auto' }}>
            <div
              className="progress-bar__fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={`qq-demo__leap ${isComplete ? 'visible' : ''}`}>
            <span className="label" style={{ fontSize: '1rem', letterSpacing: '0.15em' }}>
              Bước nhảy
            </span>
            <p className="mt-md text-muted">
              Sau 6 tháng kiên trì, bạn đột nhiên giao tiếp trôi chảy
              với người bản xứ — đó là lúc LƯỢNG chuyển thành CHẤT.
            </p>
          </div>
        </div>

        <div className={`reveal reveal-delay-3 ${visible ? 'visible' : ''} mt-xl`}>
          <p className="body-large">
            Bạn không thể giỏi Tiếng Anh sau 1 đêm. Mỗi ngày tích lũy
            một chút — đến "điểm nút", bước nhảy vọt sẽ xảy ra.
          </p>
        </div>
      </div>
    </section>
  );
}
