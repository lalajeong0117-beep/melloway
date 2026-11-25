import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: About Us] MELLOWAY란? 페이지
 * - 이 파일은 About Us 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const AboutBrandPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">About Us</span>
        <h1 className="h1-title subpage-title">MELLOWAY란?</h1>
        <p className="subpage-desc">
          누구나 꿈꾸는 자유로운 캠핑카 라이프, 멜로웨이의 브랜드 스토리와 비전을 소개하는 페이지입니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.ABOUT_BRANCHES}>
            전국 지점 안내 보기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
