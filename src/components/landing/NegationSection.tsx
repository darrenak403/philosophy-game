import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FrameAnimation } from './FrameAnimation';

const STAGES = [
  {
    era: 'Thế kỷ 19',
    name: 'Thư tay',
    desc: 'Gửi đi mất hàng tuần, nhưng chứa đựng cảm xúc chân thật',
    inherited: '',
  },
  {
    era: '1876',
    name: 'Điện thoại bàn',
    desc: 'Phủ định thư tay — giao tiếp tức thời, nhưng cố định một chỗ',
    inherited: 'Kế thừa: truyền tải thông tin giữa hai người',
  },
  {
    era: '1990s',
    name: 'Nokia (Phím cứng)',
    desc: 'Phủ định điện thoại bàn — di động, mang theo mọi nơi',
    inherited: 'Kế thừa: nghe-gọi + thêm SMS',
  },
  {
    era: '2007→',
    name: 'Smartphone (iPhone)',
    desc: 'Phủ định phím cứng — màn hình cảm ứng, thiết bị đa năng',
    inherited: 'Kế thừa: nghe-gọi-SMS + Internet + Camera + AI',
  },
];

const NEG_FRAMES = [
  '/assets/illustrations/frames/neg-frame-1.webp',
  '/assets/illustrations/frames/neg-frame-2.webp',
  '/assets/illustrations/frames/neg-frame-3.webp',
  '/assets/illustrations/frames/neg-frame-4.webp',
];

export function NegationSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section className="section" id="negation">
      <div className="container">
        {/* Header + Illustration: 2-column */}
        <div className="section-with-illus">
          <div className="section-with-illus__text">
            <div className={`reveal ${visible ? 'visible' : ''}`} ref={ref}>
              <span className="label">Quy luật 03</span>
              <h2>Phủ định của Phủ định</h2>
              <div className="divider" />
              <p className="body-large">
                Sự vật mới ra đời thay thế sự vật cũ, nhưng kế thừa những yếu tố
                tích cực. Quá trình này diễn ra theo đường xoáy ốc đi lên.
              </p>
            </div>
          </div>

          <div className="section-with-illus__visual">
            <FrameAnimation
              frames={NEG_FRAMES}
              active={visible}
              interval={1200}
              alt="Phủ định của phủ định"
            />
          </div>
        </div>

        {/* Cards: full-width below */}
        <div className="neg-cards">
          {STAGES.map((stage, i) => (
            <div
              key={stage.name}
              className={`neg-card reveal reveal-delay-${i + 1} ${visible ? 'visible' : ''}`}
            >
              <span className="neg-card__era">{stage.era}</span>
              <h3 className="neg-card__name">{stage.name}</h3>
              <p className="neg-card__desc">{stage.desc}</p>
              {stage.inherited && (
                <p className="neg-card__inherited">{stage.inherited}</p>
              )}
              {i < STAGES.length - 1 && (
                <div className="neg-card__arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-4 ${visible ? 'visible' : ''} mt-xl text-center`}>
          <p className="body-large">
            Mỗi thế hệ "phủ định" thế hệ trước nhưng không xóa sổ hoàn toàn —
            nó kế thừa và nâng cấp. Đó là quy luật vận động xoáy ốc đi lên
            của lịch sử.
          </p>
        </div>
      </div>
    </section>
  );
}
