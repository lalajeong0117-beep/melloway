import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant =
  | 'nav-cta'
  | 'more'
  | 'franchise'
  | 'slide-nav'
  | 'primary'
  | 'outline';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const VARIANT_CLASS_MAP: Record<ButtonVariant, string> = {
  'nav-cta': 'melloway-nav-cta-btn',
  more: 'more-btn',
  franchise: 'franchise-cta-btn',
  'slide-nav': 'slide-nav-btn',
  primary: 'melloway-btn melloway-btn--primary',
  outline: 'melloway-btn melloway-btn--outline',
};

/**
 * MELLOWAY 공통 버튼 컴포넌트
 * - `to`가 전달되면 react-router-dom의 `<Link>`로, 없으면 `<button>`으로 렌더링됩니다.
 * - 기존 섹션 디자인 클래스(`more-btn`, `franchise-cta-btn` 등)와 서브페이지용 공통 스타일을 모두 지원합니다.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  to,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  disabled = false,
}) => {
  const variantClass = VARIANT_CLASS_MAP[variant];
  const combinedClass = [variantClass, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link
        to={to}
        className={combinedClass}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
