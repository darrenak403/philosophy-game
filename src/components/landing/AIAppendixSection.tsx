import { useScrollReveal } from '../../hooks/useScrollReveal';

type AIAppendixSectionProps = {
  onOpenResponsibleAI: () => void;
};

export function AIAppendixSection({ onOpenResponsibleAI }: AIAppendixSectionProps) {
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section className="section ai-appendix-section" id="ai-appendix">
      <div className="container container--narrow" ref={ref}>
        <div className={`card reveal ${visible ? 'visible' : ''}`}>
          <span className="label">Phụ lục</span>
          <h2>Phụ lục A.I</h2>
          <p className="body-large mt-md">
            Tổng hợp minh bạch các hạng mục AI đã được nhóm sử dụng trong đề tài,
            cách kiểm chứng và phân bổ nhiệm vụ học thuật.
          </p>
          <button
            type="button"
            className="btn btn--secondary mt-lg"
            onClick={onOpenResponsibleAI}
          >
            Xem phụ lục A.I
          </button>
        </div>
      </div>
    </section>
  );
}
