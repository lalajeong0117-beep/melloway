import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Support] FAQ 페이지
 * - 이 파일은 Support 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const FaqPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Support</span>
        <h1 className="h1-title subpage-title">자주 묻는 질문 (FAQ)</h1>
        <p className="subpage-desc">
          캠핑카 예약, 대여 조건, 보험 및 창업 관련 자주 묻는 질문들을 모았습니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.SUPPORT_CONTACT}>
            1:1 문의하기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
