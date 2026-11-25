import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer';
}

/**
 * MELLOWAY 브랜드 로고 공통 컴포넌트
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'header',
}) => {
  if (variant === 'footer') {
    return (
      <Link
        to={ROUTES.HOME}
        className={`footer-logo-link ${className}`.trim()}
        aria-label="MELLOWAY 홈"
      >
        <img
          src="/assets/images/MELLOWAY-logo.svg"
          alt="MELLOWAY"
          className="footer-logo"
          width={126}
          height={18}
        />
      </Link>
    );
  }

  return (
    <Link
      to={ROUTES.HOME}
      className={`header-logo-link ${className}`.trim()}
      aria-label="MELLOWAY 홈"
    >
      <img
        src="/assets/images/MELLOWAY-logo.svg"
        alt="MELLOWAY"
        width={126}
        height={18}
      />
    </Link>
  );
};
