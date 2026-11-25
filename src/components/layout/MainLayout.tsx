import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * 페이지 공통 레이아웃 래퍼
 * - 라우트 변경 시 스크롤을 최상단으로 초기화하고 AOS를 새로고침합니다.
 */
export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
