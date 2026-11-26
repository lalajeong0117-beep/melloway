import React, { useRef } from 'react';
import './business.css';
import { useBusinessAnimations } from './useBusinessAnimations';

/**
 * [담당 영역: Business] 파트너스 안내 페이지
 * - 이 파일은 Business 담당자가 독립적으로 개발/수정하는 공간입니다.
 * - 페이지 전용 스타일(./business.css)과 전용 스크립트(./useBusinessAnimations.ts)로 분리되어 있습니다.
 */
export const FranchiseInfoPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useBusinessAnimations(pageRef);

  return (
    <div ref={pageRef} className="business-page">
      {/* 메인 KV 섹션 (1920 * 850) */}
      <section className="business-kv-section">
        <img
          src="/assets/images/partners-main-kv.jpg"
          alt="멜로웨이 파트너스 메인 비주얼"
          className="business-kv-img"
          width={1920}
          height={850}
        />
        <div className="business-kv-overlay" aria-hidden="true" />

        <div className="business-kv-content">
          <h1 className="h1-title business-kv-main-title">
            당신의 도전에, 든든한 동행이 되겠습니다
          </h1>
          <h2 className="h2-title business-kv-sub-title">
            본사와 창업주가 함께 만들어가는 지속 가능한 성장
          </h2>
        </div>
      </section>
    </div>
  );
};
