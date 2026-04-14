interface Props {
  stage: number; // 1-5
}

export function CompanyBuilding({ stage }: Props) {
  const clampedStage = Math.min(5, Math.max(1, stage));

  return (
    <div className="company-building">
      <div className="company-building__frame">
        <img
          src={`/assets/building/building-stage-${clampedStage}.webp`}
          alt={`Công ty - Giai đoạn ${clampedStage}`}
          className="company-building__img"
          draggable={false}
        />
      </div>
    </div>
  );
}
