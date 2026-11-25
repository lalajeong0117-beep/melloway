import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button, Logo, Menu } from '@/components/common';

/**
 * MELLOWAY 전역 상단 헤더 컴포넌트
 * - Logo, Menu(GNB + 드롭다운), 창업 문의 Button 조합
 */
export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="navi d-flex">
        <Logo variant="header" />
        <Menu />
        <div className="btn d-flex">
          <Button variant="nav-cta" to={ROUTES.BUSINESS_INQUIRY}>
            창업 문의
          </Button>
        </div>
      </div>
    </header>
  );
};
