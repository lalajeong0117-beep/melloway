import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import './business.css';
import {
  BEGINS_STEPS,
  COMPETITOR_PLAN,
  MELLOWAY_NUMBERS,
  MELLOWAY_PLANS,
  PLAN_ROW_LABELS,
  PlanTabId,
  WHY_CHOOSE_CARDS,
} from './businessData';
import { useBusinessAnimations } from './useBusinessAnimations';

const PLAN_TABS: PlanTabId[] = ['A', 'B', 'C'];

/**
 * [담당 영역: Business] 파트너스 안내 페이지
 * - 이 파일은 Business 담당자가 독립적으로 개발/수정하는 공간입니다.
 * - 페이지 전용 스타일(./business.css), 전용 데이터(./businessData.ts), 전용 스크립트(./useBusinessAnimations.ts)로 분리되어 있습니다.
 */
export const FranchiseInfoPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanTabId>('A');
  const [hasSwitchedPlan, setHasSwitchedPlan] = useState(false);
  const activePlan = MELLOWAY_PLANS[selectedPlan];

  const handleSelectPlan = (plan: PlanTabId) => {
    if (plan === selectedPlan) return;
    setHasSwitchedPlan(true);
    setSelectedPlan(plan);
  };

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

      {/* WHY CHOOSE US ? 섹션 (ScrollTrigger 고정 + 스크롤 시 카드 1개씩 전환) */}
      <section className="business-why-section">
        <h2 className="h1-title business-why-title">WHY CHOOSE US ?</h2>

        <div className="business-why-marquee-viewport">
          <div className="business-why-marquee-track">
            <div className="business-why-marquee-group">
              {WHY_CHOOSE_CARDS.map((card) => (
                <article key={card.id} className="business-why-card">
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
          </div>
        </div>
      </section>

      {/* 숫자로 보는 MELLOWAY 섹션 */}
      <section className="business-numbers-section">
        <h2 className="h1-title business-numbers-title">숫자로 보는 MELLOWAY</h2>

        <div className="business-numbers-grid">
          {MELLOWAY_NUMBERS.map((item) => (
            <div key={item.id} className="business-number-item">
              <div
                className="business-number-circle"
                style={{ backgroundColor: item.circleBgColor }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="business-number-img"
                />
              </div>

              <div className="business-number-texts">
                <h3 className="h2-title business-number-value">{item.value}</h3>
                <p className="business-number-label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How MELLOWAY Begins 섹션 (1920 * 568, 양옆 여백 240px) */}
      <section className="business-begins-section">
        <div className="business-begins-title-wrap">
          <h2 className="h1-title business-begins-main-title">How MELLOWAY Begins</h2>
          <p className="business-begins-sub-title">
            멜로웨이와 함께 새로운 여행의 거점을 만들어가는 과정
          </p>
        </div>

        <div className="business-begins-steps-grid">
          {BEGINS_STEPS.map((step) => (
            <div key={step.id} className="business-begins-step">
              <span className="business-begins-step-num">{step.number}</span>
              <div className="business-begins-step-texts">
                <h3 className="business-begins-step-title">{step.title}</h3>
                <p className="business-begins-step-desc">
                  {step.lines[0]}
                  <br />
                  {step.lines[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 맞춤형 창업 플랜 섹션 (1920 * 1239, 이전 섹션에서 120px 아래) */}
      <section className="business-plans-section">
        <div className="business-plans-header">
          <h2 className="h1-title business-plans-main-title">
            내 예산과 부지에 맞춘 가장 합리적인 시작
          </h2>
          <p className="h3-title business-plans-sub-title">
            불필요한 고정 비용 없이 최적의 규모로 시작하는 MELLOWAY만의 맞춤형 창업 플랜을 확인하세요.
          </p>
        </div>

        <div className="business-plans-tabs" role="tablist" aria-label="맞춤형 창업 플랜 선택">
          {PLAN_TABS.map((plan) => (
            <button
              key={plan}
              type="button"
              role="tab"
              aria-selected={selectedPlan === plan}
              className={`business-plan-tab-btn${
                selectedPlan === plan ? ' is-active' : ''
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              {MELLOWAY_PLANS[plan].buttonLabel}
            </button>
          ))}
        </div>

        <div className="business-plans-compare-wrap" role="tabpanel">
          <div className="business-plans-compare-grid">
            {/* 왼쪽: 선택된 Melloway 플랜 카드 (586 * 700) */}
            <div
              key={`card-${selectedPlan}`}
              className={`business-plan-card business-plan-card--melloway${
                hasSwitchedPlan ? ' is-switching' : ''
              }`}
            >
              <div className="business-plan-card-head">
                <h3 className="h2-title business-plan-card-title">
                  {activePlan.title}
                </h3>
                <p className="h3-title business-plan-card-subtitle">
                  {activePlan.subtitle}
                </p>
              </div>

              <div className="business-plan-rows-box business-plan-rows-box--melloway">
                {activePlan.rows.map((row, idx) => (
                  <div key={PLAN_ROW_LABELS[idx]} className="business-plan-row">
                    <span className="business-plan-row-amount">{row.amount}</span>
                    <span className="business-plan-row-note">{row.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 중앙: VS 및 비교 항목 라벨 */}
            <div className="business-plan-vs-col">
              <div className="business-plan-vs-head">VS</div>
              <div className="business-plan-vs-rows">
                {PLAN_ROW_LABELS.map((label) => (
                  <div key={label} className="business-plan-vs-row">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽: G사 비교안 카드 (586 * 700) */}
            <div className="business-plan-card business-plan-card--competitor">
              <div className="business-plan-card-head">
                <h3 className="h2-title business-plan-card-title">
                  {COMPETITOR_PLAN.title}
                </h3>
                <p className="h3-title business-plan-card-subtitle">
                  {COMPETITOR_PLAN.subtitle}
                </p>
              </div>

              <div className="business-plan-rows-box business-plan-rows-box--competitor">
                {COMPETITOR_PLAN.rows.map((row, idx) => (
                  <div key={PLAN_ROW_LABELS[idx]} className="business-plan-row">
                    <span className="business-plan-row-amount">{row.amount}</span>
                    <span className="business-plan-row-note">{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 총 투자비(예상) 행 */}
          <div className="business-plans-total-row">
            <div
              key={`total-${selectedPlan}`}
              className={`business-plan-total-pill business-plan-total-pill--melloway${
                hasSwitchedPlan ? ' is-switching' : ''
              }`}
            >
              {activePlan.totalAmount}
            </div>
            <div className="business-plan-total-label">총 투자비(예상)</div>
            <div className="business-plan-total-pill business-plan-total-pill--competitor">
              {COMPETITOR_PLAN.totalAmount}
            </div>
          </div>

          {/* 하단 창업 문의하기 CTA 버튼 */}
          <div className="business-plans-cta-wrap">
            <Link to={ROUTES.BUSINESS_INQUIRY} className="business-plans-cta-btn">
              <span>창업 문의하기</span>
              <svg
                width="24"
                height="20"
                viewBox="0 0 33 27"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.5 13.5H31.5M19.5 25.5L31.5 13.5L19.5 1.5"
                  stroke="#F7F8FC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
