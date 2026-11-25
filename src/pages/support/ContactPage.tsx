import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Support] 문의하기 페이지
 * - 이 파일은 Support 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const ContactPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Support</span>
        <h1 className="h1-title subpage-title">문의하기</h1>
        <p className="subpage-desc">
          일반 고객 이용 문의 및 제휴·협업 문의를 접수할 수 있는 페이지입니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.SUPPORT_NOTICE}>
            공지 및 이벤트 보기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
