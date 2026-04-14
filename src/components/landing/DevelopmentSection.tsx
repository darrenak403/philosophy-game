import { useScrollReveal } from '../../hooks/useScrollReveal';

const TIMELINE = [
  { year: '1940s', label: 'Máy tính cơ học', desc: 'Turing Machine, ENIAC — nền tảng tính toán' },
  { year: '1990s', label: 'Internet', desc: 'World Wide Web kết nối toàn cầu' },
  { year: '2010s', label: 'Big Data', desc: 'Dữ liệu lớn định hình mọi ngành công nghiệp' },
  { year: '2020s', label: 'Generative AI', desc: 'ChatGPT, Gemini — AI sáng tạo nội dung' },
];

export function DevelopmentSection() {
  const { ref: headerRef, visible: headerVis } = useScrollReveal();
  const { ref: timelineRef, visible: timelineVis } = useScrollReveal(0.1);

  return (
    <section className="section" id="development">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVis ? 'visible' : ''}`}>
          <span className="label">Nguyên lý 01</span>
          <h2>Nguyên lý về sự phát triển</h2>
          <div className="divider" />
          <p className="body-large">
            Vạn vật luôn vận động, đi từ thấp đến cao, từ kém hoàn thiện
            đến hoàn thiện hơn. Hãy nhìn vào sự tiến hóa của Trí tuệ nhân tạo.
          </p>
        </div>

        <div
          ref={timelineRef}
          className={`dev-timeline ${timelineVis ? 'visible' : ''}`}
        >
          <div className="dev-timeline__line" />
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className={`dev-timeline__item reveal reveal-delay-${i + 1} ${timelineVis ? 'visible' : ''}`}
            >
              <span className="dev-timeline__year">{item.year}</span>
              <div className="dev-timeline__dot" />
              <div className="dev-timeline__content">
                <h3>{item.label}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={headerRef} className={`reveal reveal-delay-4 ${headerVis ? 'visible' : ''} mt-xl`}>
          <p className="body-large">
            AI không tự nhiên sinh ra. Nó là kết quả của sự phát triển liên tục
            qua hàng thập kỷ. Sự phát triển này buộc con người phải "phát triển"
            kỹ năng để làm chủ AI — không phải bị thay thế bởi AI.
          </p>
        </div>
      </div>
    </section>
  );
}
