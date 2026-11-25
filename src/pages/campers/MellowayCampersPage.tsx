import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

/**
 * [담당 영역: Campers] 멜로웨이 캠핑카 페이지
 * - 이 파일은 Campers 담당자가 독립적으로 개발/수정하는 공간입니다.
 */
export const MellowayCampersPage: React.FC = () => {
  return (
    <section className="subpage-container">
      <div className="subpage-inner">
        <span className="subpage-badge">Campers</span>
        <h1 className="h1-title subpage-title">멜로웨이 캠핑카</h1>
        <p className="subpage-desc">
          안전성과 편의성을 모두 갖춘 멜로웨이 전용 캠핑카 제작 기술과 실내 인테리어를 소개합니다.
        </p>
        <div className="subpage-actions">
          <Button variant="primary" to={ROUTES.CAMPERS_LIST}>
            라인업 전체 보기
          </Button>
          <Button variant="outline" to={ROUTES.HOME}>
            메인으로 돌아가기
          </Button>
        </div>
      </div>
    </section>
  );
};
