import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';
import { SupportBanner } from './components/SupportBanner';
import './styles/support-common.css';
import './styles/support-banner.css';

/**
 * [담당 영역: Support] 3단계 - 이벤트 · 혜택 페이지
 * - 하단 문의하기 배너(푸터 상단 고정 배치) 구조를 포함합니다.
 */
export const EventsPage: React.FC = () => {
  return (
    <section
      className="support-page support-page--with-banner"
      aria-label="이벤트 · 혜택"
    >
      <div className="subpage-container">
        <div className="subpage-inner">
          <span className="subpage-badge">Support</span>
          <h1 className="h1-title subpage-title">이벤트 · 혜택</h1>
          <p className="subpage-desc">
            멜로웨이에서 진행 중인 시즌별 할인 이벤트와 다양한 고객 혜택을 확인하세요.
          </p>
          <div className="subpage-actions">
            <Button variant="primary" to={ROUTES.SUPPORT_NOTICE}>
              공지 사항 보기
            </Button>
            <Button variant="outline" to={ROUTES.HOME}>
              메인으로 돌아가기
            </Button>
          </div>
        </div>
      </div>

      <SupportBanner />
    </section>
  );
};
