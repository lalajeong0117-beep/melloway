import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Business] 창업 알아보기 페이지
 * - 이 파일은 Business 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const FranchiseInfoPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Business</span>
        <h1 className="h1-title subpage-title">창업 알아보기</h1>
        <p className="subpage-desc">
          소자본으로 시작하는 멜로웨이 프랜차이즈 가맹 절차, 예상 수익 구조, 본사 통합 지원 시스템을 안내합니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.BUSINESS_INQUIRY}>
            창업 문의하기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
