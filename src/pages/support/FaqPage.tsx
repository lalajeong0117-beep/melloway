import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';
import { SupportPageHeader } from './components/SupportPageHeader';
import { SUPPORT_KV_IMAGE } from './scripts/supportNav';
import './styles/support-common.css';

/**
 * [담당 영역: Support] 2단계 - 자주 묻는 질문 (FAQ) 페이지
 * - 상단 KV는 공지 사항과 동일한 구조로 배치하며, 본문은 2단계 작업 시 확장합니다.
 */
export const FaqPage: React.FC = () => {
  return (
    <section className="support-page" aria-label="자주 묻는 질문">
      <SupportPageHeader
        title="Your Questions, Our Answers."
        subtitle="당신의 궁금증에 멜로웨이가 답합니다."
        kvImage={SUPPORT_KV_IMAGE}
        kvAlt="멜로웨이 자주 묻는 질문 메인 비주얼"
        ariaLabel="자주 묻는 질문 메인 비주얼"
      />

      <div className="support-content">
        <div className="subpage-inner">
          <h2 className="h2-title subpage-title">자주 묻는 질문 (FAQ)</h2>
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
      </div>
    </section>
  );
};
