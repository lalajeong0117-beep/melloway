import React from 'react';

export interface RoadBadgeProps {
  text: string;
  position: 'left' | 'right';
  aosAnimation?: string;
  aosDelay?: number;
}

/**
 * 3D 도로 위 체크 배지 공통 컴포넌트
 */
export const RoadBadge: React.FC<RoadBadgeProps> = ({
  text,
  position,
  aosAnimation = 'fade-down',
  aosDelay = 0,
}) => {
  const posClass = position === 'right' ? 'badge-right' : 'badge-left';

  return (
    <div
      className={`road-badge ${posClass}`}
      data-aos={aosAnimation}
      data-aos-delay={aosDelay}
      data-aos-duration="800"
    >
      <img
        src="/assets/images/check-icon.svg"
        className="check-icon"
        alt="체크 아이콘"
        width={15}
        height={11}
      />
      <span className="badge-text">{text}</span>
    </div>
  );
};
