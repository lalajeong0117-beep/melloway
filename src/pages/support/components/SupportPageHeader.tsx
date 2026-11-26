import React from 'react';
import { NavLink } from 'react-router-dom';
import { SUPPORT_TABS } from '../scripts/supportNav';

export interface SupportPageHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
  kvImage?: string;
  kvAlt?: string;
}

/**
 * [Support 공통] 상단 KV 배너 및 하위 메뉴 탭 네비게이션
 */
export const SupportPageHeader: React.FC<SupportPageHeaderProps> = ({
  title,
  description,
  eyebrow = 'Support Center',
  kvImage,
  kvAlt = '멜로웨이 고객 지원 키비주얼',
}) => {
  const hasKv = Boolean(kvImage);

  return (
    <header className={`support-hero${hasKv ? ' support-hero--with-kv' : ''}`}>
      {hasKv && (
        <>
          <img
            src={kvImage}
            alt={kvAlt}
            className="support-hero-bg"
            width={1920}
            height={850}
          />
          <div className="support-hero-overlay" aria-hidden="true" />
        </>
      )}

      <div className="support-hero-inner">
        <span className="support-eyebrow">{eyebrow}</span>
        <h1 className="h1-title support-hero-title">{title}</h1>
        <p className="support-hero-desc">{description}</p>

        <nav className="support-subnav" aria-label="고객 지원 하위 메뉴">
          {SUPPORT_TABS.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `support-subnav-link${isActive ? ' is-active' : ''}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
