import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

type ValueCardId = 'freedom' | 'together' | 'possibility' | null;

interface HeritageItem {
  title: string;
  lines: [string, string];
}

const HERITAGE_ITEMS: HeritageItem[] = [
  {
    title: 'MELLOWAY 탄생',
    lines: [
      '누구나 부담 없이 떠날 수 있는',
      '자유로운 여행을 꿈꾸며 시작되었습니다.',
    ],
  },
  {
    title: '서비스 시작',
    lines: [
      '캠핑카 렌탈 서비스를 선보이며',
      '새로운 여행의 시작을 함께했습니다.',
    ],
  },
  {
    title: '네트워크 확장',
    lines: [
      '전국으로 가맹 네트워크를 넓히며',
      '더 많은 여행의 기회를 연결했습니다.',
    ],
  },
  {
    title: '새로운 도약',
    lines: [
      '지역과 사람을 연결하며 더 자유로운',
      '여행 문화를 만들어가고자 합니다.',
    ],
  },
];

/**
 * [담당 영역: About Us] 브랜드 소개 페이지
 * - 상단 메인 KV 섹션 (공통 Header는 MainLayout에서 KV 상단에 표시됩니다.)
 * - MELLOWAY’s HERITAGE 섹션
 */
export const AboutBrandPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<ValueCardId>(null);

  const gridHoverClass = hoveredCard ? ` is-hovered-${hoveredCard}` : '';

  return (
    <div className="brand-intro-page">
      <section className="brand-intro-kv" aria-label="브랜드 소개 메인 비주얼">
        <img
          src="/assets/images/brand-intro-kv.jpg"
          alt="멜로웨이 브랜드 소개 메인 비주얼"
          className="brand-intro-kv-img"
          width={1920}
          height={850}
        />
        <div className="brand-intro-kv-overlay" aria-hidden="true" />
        <div className="brand-intro-kv-content-wrap">
          <div className="brand-intro-kv-content">
            <h1 className="h1-title brand-intro-kv-title">
              새로운 길 위에서, 함께 성장하다
            </h1>
            <p className="h2-title brand-intro-kv-subtitle">
              멜로웨이는 더 자유로운 여행과 새로운 가능성을 향해 함께 나아갑니다.
            </p>
          </div>
        </div>
      </section>

      <section className="brand-heritage-section" aria-label="MELLOWAY’s HERITAGE">
        <h2 className="h1-title brand-heritage-title">MELLOWAY’s HERITAGE</h2>
        <div className="brand-heritage-visual">
          <img
            src="/assets/images/brand-intro-road-icon.png"
            alt="멜로웨이 헤리티지 로드 그래픽"
            className="brand-heritage-road"
          />
          <img
            src="/assets/images/brand-intro-car-icon.png"
            alt="멜로웨이 캠핑카 아이콘"
            className="brand-heritage-car"
            width={230}
            height={120}
          />
          <img
            src="/assets/images/brand-intro-flag-icon.png"
            alt="멜로웨이 목표 지점 깃발 아이콘"
            className="brand-heritage-flag"
            width={93}
            height={96}
          />
        </div>
        <div className="brand-heritage-list">
          {HERITAGE_ITEMS.map((item) => (
            <div key={item.title} className="brand-heritage-item">
              <h3 className="brand-heritage-item-title">{item.title}</h3>
              <p className="brand-heritage-item-desc">
                {item.lines[0]}
                <br />
                {item.lines[1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-values-section" aria-label="WHAT DRIVE US">
        <div className="brand-values-header">
          <h2 className="h1-title brand-values-title">WHAT DRIVE US</h2>
          <p className="h2-title brand-values-subtitle">
            멜로웨이를 움직이는 3가지 가치
          </p>
        </div>

        <div
          className={`brand-values-grid${gridHoverClass}`}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="brand-values-top-row">
            <article
              className={`brand-value-card brand-value-card--freedom${
                hoveredCard === 'freedom' ? ' is-active' : ''
              }`}
              onMouseEnter={() => setHoveredCard('freedom')}
              onFocus={() => setHoveredCard('freedom')}
              onBlur={() => setHoveredCard(null)}
              tabIndex={0}
            >
              <div className="brand-value-head">
                <h3 className="brand-value-title">FREEDOM</h3>
                <p className="brand-value-subtitle">자유로운 여행</p>
              </div>
              <img
                src="/assets/images/brand-intro-freedom-icon.png"
                alt="자유로운 여행 3D 아이콘"
                className="brand-value-icon brand-value-icon--freedom"
                width={295}
                height={213}
              />
              <p className="brand-value-desc brand-value-desc--freedom">
                <strong>정해진 일정과 장소에 얽매이지 않고</strong>
                <br />
                원하는 순간 어디든 떠날 수 있도록
                <br />
                가장 가볍고 자유로운 여정을 만듭니다.
              </p>
            </article>

            <article
              className={`brand-value-card brand-value-card--together${
                hoveredCard === 'together' ? ' is-active' : ''
              }`}
              onMouseEnter={() => setHoveredCard('together')}
              onFocus={() => setHoveredCard('together')}
              onBlur={() => setHoveredCard(null)}
              tabIndex={0}
            >
              <div className="brand-value-head">
                <h3 className="brand-value-title">TOGETHER</h3>
                <p className="brand-value-subtitle">함께하는 성장</p>
              </div>
              <img
                src="/assets/images/brand-intro-together-icon.png"
                alt="함께하는 성장 3D 아이콘"
                className="brand-value-icon brand-value-icon--together"
                width={186}
                height={131}
              />
              <p className="brand-value-desc brand-value-desc--together">
                고객의 소중한 추억은 물론 <strong>파트너와</strong>
                <br />
                <strong>지역 사회가 함께 상생</strong>할 수 있도록
                <br />
                건강한 캠핑 생태계를 만들어 갑니다.
              </p>
            </article>
          </div>

          <article
            className={`brand-value-card brand-value-card--possibility${
              hoveredCard === 'possibility' ? ' is-active' : ''
            }`}
            onMouseEnter={() => setHoveredCard('possibility')}
            onFocus={() => setHoveredCard('possibility')}
            onBlur={() => setHoveredCard(null)}
            tabIndex={0}
          >
            <div className="brand-value-head">
              <h3 className="brand-value-title">POSSIBILITY</h3>
              <p className="brand-value-subtitle">새로운 가능성</p>
            </div>
            <p className="brand-value-desc brand-value-desc--possibility">
              차박을 넘어 <strong>일과 휴식이 공존</strong>하는
              <br />
              모빌리티 라이프스타일의 확장으로
              <br />
              캠핑 여행의 새로운 기준을 제시합니다
            </p>
            <img
              src="/assets/images/brand-intro-possibility-icon.png"
              alt="새로운 가능성 3D 아이콘"
              className="brand-value-icon brand-value-icon--possibility"
              width={94}
              height={112}
            />
          </article>
        </div>
      </section>

      <section className="brand-ask-section" aria-label="창업 전, MELLOWAY에게 물어보세요!">
        <div className="brand-ask-header">
          <h2 className="h1-title brand-ask-title">
            창업 전, MELLOWAY에게 물어보세요!
          </h2>
          <p className="brand-ask-subtitle">
            멜로웨이의 창업 과정과 운영 지원 시스템을 살펴보고,
            <br />
            당신만의 새로운 가능성을 발견해 보세요 !
          </p>
        </div>

        <div className="brand-ask-content">
          <div className="brand-ask-profile-outer">
            <div className="brand-ask-profile-inner">
              <div className="brand-ask-profile-topbar" aria-hidden="true" />
              <div className="brand-ask-profile-body">
                <img
                  src="/assets/images/brand-intro-man-icon.png"
                  alt="멜로웨이 본사 상담 매니저 아이콘"
                  className="brand-ask-profile-icon"
                  width={116}
                  height={155}
                />
                <p className="brand-ask-profile-text">
                  24시간 본사
                  <br />
                  상담 가능
                </p>
              </div>
            </div>
          </div>

          <svg
            className="brand-ask-connector"
            width="531"
            height="375"
            viewBox="0 0 531 375"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 374H265.5V1H531"
              stroke="#9BB7DB"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="brand-ask-chat-outer">
            <div className="brand-ask-chat-inner">
              <div className="brand-ask-chat-topbar">
                <span className="brand-ask-chat-back" aria-hidden="true">
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path
                      d="M8.5 1.5L2 8L8.5 14.5"
                      stroke="#22252A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="brand-ask-chat-title">MELLOWAY</span>
              </div>

              <div className="brand-ask-chat-messages">
                <div className="brand-ask-chat-pair">
                  <div className="brand-ask-bubble brand-ask-bubble--question">
                    내 지역에서도 창업이 가능할까?
                  </div>
                  <div className="brand-ask-bubble brand-ask-bubble--answer">
                    상권 보호를 위해 지역별 지점 수를 체계적으로 제한하여
                    운영하고 있어요! 희망하시는 지역의 입점 가능 여부와 예상
                    수익성 분석을 무료로 도와드릴게요.
                  </div>
                </div>

                <div className="brand-ask-chat-pair">
                  <div className="brand-ask-bubble brand-ask-bubble--question">
                    캠핑카 관리가 처음인데 괜찮을까요?
                  </div>
                  <div className="brand-ask-bubble brand-ask-bubble--answer">
                    초보 점주님도 걱정 없도록 본사에서 차량 정비와 정기 점검을
                    전담 지원해요! 체계적인 운영 매뉴얼과 전담 매니저의 밀착
                    케어로 안정적인 운영을 돕겠습니다.
                  </div>
                </div>
              </div>

              <div className="brand-ask-chat-footer">
                <div className="brand-ask-chat-mic" aria-hidden="true">
                  <img
                    src="/assets/images/brand-intro-speaker-icon.svg"
                    alt=""
                    width={16}
                    height={19}
                  />
                </div>
                <div className="brand-ask-chat-input-wrap">
                  <input
                    type="text"
                    className="brand-ask-chat-input"
                    aria-label="메시지 입력"
                  />
                  <button
                    type="button"
                    className="brand-ask-chat-send"
                    aria-label="메시지 전송"
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path
                        d="M6 12.5V1.5M6 1.5L1.5 6M6 1.5L10.5 6"
                        stroke="#22252A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="brand-cta-section"
        aria-label="MELLOWAY와 함께 하는 새로운 여정의 시작"
      >
        <div className="brand-cta-inner">
          <div className="brand-cta-text-wrap">
            <h2 className="h1-title brand-cta-title">
              MELLOWAY와 함께 하는 새로운 여정의 시작
            </h2>
            <p className="brand-cta-subtitle">
              멜로웨이의 창업 과정과 운영 지원 시스템을 살펴보고,
              <br />
              당신만의 새로운 가능성을 발견해 보세요
            </p>
          </div>

          <Link to={ROUTES.BUSINESS_INFO} className="brand-cta-btn">
            <span className="brand-cta-btn-label">창업 알아보기</span>
            <img
              src="/assets/images/right-arrow.icon.svg"
              alt=""
              className="brand-cta-btn-arrow"
              width={33}
              height={27}
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};
