import React from 'react';
import { ROUTES } from '@/constants/routes';
import { CAMPER_LIST } from '@/data/campers';
import { Button } from '@/components/common';

/**
 * [담당 영역: Campers] 캠핑카 둘러보기 페이지
 * - 이 파일은 Campers 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const CamperListPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Campers</span>
        <h1 className="h1-title subpage-title">캠핑카 둘러보기</h1>
        <p className="subpage-desc">
          멜로웨이의 4종 캠핑카 라인업({CAMPER_LIST.map((c) => c.name).join(', ')})의 상세 제원과 옵션을 확인하세요.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.CAMPERS_MELLOWAY}>
            멜로웨이 캠핑카 특장점
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
