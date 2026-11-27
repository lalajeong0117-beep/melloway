import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { GNB_MENU } from '@/data/navigation';
import { Button, Logo, Menu } from '@/components/common';

/**
 * MELLOWAY 전역 상단 헤더 컴포넌트
 * - Logo, Menu(GNB + 드롭다운), 실시간 예약 / 창업 문의 Button 조합
 * - 태블릿/모바일(1024px 이하)에서는 햄버거 토글 및 드롭다운 패널로 반응형 동작
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className={`navi d-flex${isMobileMenuOpen ? ' is-mobile-open' : ''}`}>
        <Logo variant="header" />
        <Menu />
        <div className="btn d-flex">
          <Button variant="nav-cta" to={ROUTES.CAMPERS_RESERVATION}>
            실시간 예약
          </Button>
          <Button variant="nav-cta" to={ROUTES.BUSINESS_INQUIRY}>
            창업 문의
          </Button>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-gnb-panel"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
          <span className="mobile-menu-bar" />
        </button>

        <nav
          id="mobile-gnb-panel"
          className="mobile-nav-panel"
          aria-label="모바일 전체 메뉴"
        >
          <ul className="mobile-nav-list">
            {GNB_MENU.map((group) => (
              <li key={group.id} className="mobile-nav-group">
                <Link
                  to={group.defaultPath}
                  className="mobile-nav-group-title"
                  onClick={closeMobileMenu}
                >
                  {group.label}
                </Link>
                <ul className="mobile-nav-sublist">
                  {group.subItems.map((sub) => (
                    <li key={sub.path}>
                      <Link
                        to={sub.path}
                        className="mobile-nav-sublink"
                        onClick={closeMobileMenu}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-actions">
            <Button
              variant="nav-cta"
              to={ROUTES.CAMPERS_RESERVATION}
              onClick={closeMobileMenu}
            >
              실시간 예약
            </Button>
            <Button
              variant="nav-cta"
              to={ROUTES.BUSINESS_INQUIRY}
              onClick={closeMobileMenu}
            >
              창업 문의
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
