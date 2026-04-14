import { useScrollReveal } from '../../hooks/useScrollReveal';
import './landing.css';

export function HeroSection() {
  const { ref: titleRef, visible: titleVis } = useScrollReveal(0.1);
  const { ref: quoteRef, visible: quoteVis } = useScrollReveal(0.1);

  return (
    <section className="hero section" id="hero">
      <div className="hero__bg" />
      <div className="container hero__content">
        {/* Left Column: Text */}
        <div className="hero__text-col">
          <div
            ref={titleRef}
            className={`reveal ${titleVis ? 'visible' : ''}`}
          >
            <span className="label">Triết học Mác — Lênin</span>
            <h1 className="hero__title">
              Hằng Số<br />
              <span className="text-gold">Của Sự Biến Đổi</span>
            </h1>
          </div>

          <div
            ref={quoteRef}
            className={`reveal reveal-delay-2 ${quoteVis ? 'visible' : ''}`}
          >
            <blockquote>
              "Change is the only constant in life"
              <cite>— Heraclitus</cite>
            </blockquote>
            <p className="body-large mt-lg">
              Thế giới đang xoay chuyển mỗi giây. Bạn đang đứng yên hay đang
              trôi theo dòng chảy phát triển? Khám phá lăng kính Triết học
              để làm chủ sự thay đổi.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Statue */}
        <div className="hero__visual-col reveal reveal-delay-3 visible">
          <div className="hero__philosopher-wrap">
            <img
              src="/assets/heraclitus.webp"
              alt="Statue of Heraclitus"
              className="hero__philosopher"
            />
          </div>
        </div>

        <div className="hero__scroll-indicator">
          <div className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
