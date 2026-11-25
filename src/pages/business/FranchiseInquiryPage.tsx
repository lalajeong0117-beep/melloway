import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Business] 창업 문의하기 페이지
 * - 이 파일은 Business 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const FranchiseInquiryPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Business</span>
        <h1 className="h1-title subpage-title">창업 문의하기</h1>
        <p className="subpage-desc">
          예비 파트너를 위한 1:1 맞춤 창업 상담 신청 페이지입니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.BUSINESS_INFO}>
            창업 안내 다시 보기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
