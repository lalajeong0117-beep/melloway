import React, { useRef } from 'react';
import './business.css';
import { WHY_CHOOSE_CARDS } from './businessData';
import { useBusinessAnimations } from './useBusinessAnimations';

/**
 * [담당 영역: Business] 파트너스 안내 페이지
 * - 이 파일은 Business 담당자가 독립적으로 개발/수정하는 공간입니다.
 * - 페이지 전용 스타일(./business.css), 전용 데이터(./businessData.ts), 전용 스크립트(./useBusinessAnimations.ts)로 분리되어 있습니다.
 */
export const FranchiseInfoPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useBusinessAnimations(pageRef);

  const renderCardGroup = (groupKey: string) => (
    <div className="business-why-marquee-group" key={groupKey}>
      {WHY_CHOOSE_CARDS.map((card) => (
        <article key={`${groupKey}-${card.id}`} className="business-why-card">
          <div className="business-why-card-img-wrap">
            <img
              src={card.image}
              alt={card.title}
              className="business-why-card-img"
              width={342}
              height={222}
              draggable={false}
            />
          </div>

          <div className="business-why-card-body">
            <div className="business-why-card-texts">
              <h3 className="business-why-card-title">{card.title}</h3>
              <p className="business-why-card-desc">{card.description}</p>
            </div>

            <img
              src={card.icon}
              alt=""
              aria-hidden="true"
              className="business-why-card-icon"
              width={50}
              height={25}
            />
          </div>
        </article>
      ))}
    </div>
  );

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

      {/* WHY CHOOSE US ? 섹션 */}
      <section className="business-why-section">
        <h2 className="h1-title business-why-title">WHY CHOOSE US ?</h2>

        <div className="business-why-marquee-viewport">
          <div className="business-why-marquee-track">
            {renderCardGroup('set-a')}
            {renderCardGroup('set-b')}
          </div>
        </div>
      </section>
    </div>
  );
};
