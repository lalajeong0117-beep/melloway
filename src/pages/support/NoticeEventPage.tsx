import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Support] 공지 및 이벤트 페이지
 * - 이 파일은 Support 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const NoticeEventPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Support</span>
        <h1 className="h1-title subpage-title">공지 및 이벤트</h1>
        <p className="subpage-desc">
          멜로웨이의 최신 소식과 시즌별 할인 이벤트 혜택을 확인할 수 있는 페이지입니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.SUPPORT_FAQ}>
            자주 묻는 질문(FAQ)
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
