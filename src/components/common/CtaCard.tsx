import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/constants/routes';

export interface CtaCardProps {
  to: RoutePath;
  variant: 'store' | 'franchise';
  iconSrc: string;
  iconAlt: string;
  iconClassName: string;
  iconWidth: number;
  iconHeight: number;
  title: string;
  subtitle: string;
}

/**
 * MELLOWAY 대형 CTA 카드 공통 컴포넌트 (Find a store / Franchise 등)
 */
export const CtaCard: React.FC<CtaCardProps> = ({
  to,
  variant,
  iconSrc,
  iconAlt,
  iconClassName,
  iconWidth,
  iconHeight,
  title,
  subtitle,
}) => {
  const cardClass = variant === 'store' ? 'cta-store-btn' : 'cta-franchise-btn';

  return (
    <Link to={to} className={cardClass}>
      <div className="cta-left-content">
        <img
          src={iconSrc}
          alt={iconAlt}
          className={iconClassName}
          width={iconWidth}
          height={iconHeight}
        />
        <div className="cta-text-group">
          <h3 className="cta-main-title">{title}</h3>
          <p className="cta-sub-title">{subtitle}</p>
        </div>
      </div>
      <img
        src="/assets/images/right-icon.svg"
        alt="바로가기"
        className="cta-arrow-icon"
        width={29}
        height={50}
      />
    </Link>
  );
};
