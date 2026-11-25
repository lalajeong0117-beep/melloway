import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: About Us] 전국 지점 안내 페이지
 * - 이 파일은 About Us 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const BranchesPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">About Us</span>
        <h1 className="h1-title subpage-title">전국 지점 안내</h1>
        <p className="subpage-desc">
          가까운 MELLOWAY 지점 위치와 운영 시간, 보유 캠핑카 현황을 확인할 수 있는 페이지입니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.CAMPERS_LIST}>
            캠핑카 둘러보기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
