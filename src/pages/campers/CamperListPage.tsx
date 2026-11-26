import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './CamperListPage.css';

interface LineupCardItem {
  id: string;
  name: string;
  spec: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  weekdayPrice: string;
  weekendPrice: string;
}

const LINEUP_ITEMS: LineupCardItem[] = [
  {
    id: 'urban-escape',
    name: 'URBAN ESCAPE',
    spec: '2인승 · 취침 2인',
    image: '/assets/images/Urbanescape-side.png',
    imageWidth: 586,
    imageHeight: 293,
    weekdayPrice: '120,000~',
    weekendPrice: '160,000~',
  },
  {
    id: 'adventure-van',
    name: 'ADVENTURE VAN',
    spec: '4인승 · 취침 4인 · 무시동 냉난방',
    image: '/assets/images/Adventure-van-side.png',
    imageWidth: 586,
    imageHeight: 274,
    weekdayPrice: '220,000~',
    weekendPrice: '290,000~',
  },
  {
    id: 'retro-home',
    name: 'RETRO HOME',
    spec: '4인승 · 취침 4인 · 무시동 냉난방',
    image: '/assets/images/Retro-home-side.png',
    imageWidth: 586,
    imageHeight: 268,
    weekdayPrice: '340,000~',
    weekendPrice: '440,000~',
  },
  {
    id: 'grand-cruiser',
    name: 'GRAND CRUISER',
    spec: '6인승 · 취침 6인 · 무시동 냉난방',
    image: '/assets/images/Grand-cruiser-side.png',
    imageWidth: 586,
    imageHeight: 273,
    weekdayPrice: '460,000~',
    weekendPrice: '590,000~',
  },
];

interface PackageSpecRow {
  label: string;
  value: string;
}

interface PackageCardItem {
  id: string;
  enTitle?: string;
  koTitle?: string;
  specs?: PackageSpecRow[];
  priceLabel?: string;
  priceAmount?: string;
  isPlaceholder?: boolean;
}

const PACKAGE_ITEMS: PackageCardItem[] = [
  {
    id: 'couple',
    enTitle: 'Couple',
    koTitle: '커플 로맨틱 패키지',
    specs: [
      { label: '추천 차량', value: 'URBAN ESCAPE' },
      { label: '기본 구성', value: '2인 침구 세트 + 감성 릴렉스 체어 2개' },
      { label: '다이닝 구성', value: '우드 롤테이블 + 트윈 버너·코펠 세트' },
      { label: '무드 옵션', value: 'LED 스트링 전구 + 빔프로젝터·스크린' },
      { label: '추가 혜택', value: '바비큐 숯·그릴 1회 제공' },
    ],
    priceLabel: '1박 기준(예상)',
    priceAmount: '159,000원~',
  },
  { id: 'package-2', isPlaceholder: true },
  { id: 'package-3', isPlaceholder: true },
];

/**
 * [담당 영역: Campers] 차량 라인업 소개 페이지
 * - 상단 공통 Header는 MainLayout에서 KV 상단에 오버레이 렌더링됩니다.
 * - 전용 스타일은 `./CamperListPage.css`에서 분리 관리합니다.
 */
export const CamperListPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activePackageId, setActivePackageId] = useState<string>('couple');

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.camper-list-kv-title',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
      ).fromTo(
        '.camper-list-kv-subtitle',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.55'
      );
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="camper-list-page">
      <section className="camper-list-kv" aria-label="차량 라인업 메인 비주얼">
        {/* 추후 KV 배경 이미지(<img className="camper-list-kv-img" />) 추가 영역 */}
        <div className="camper-list-kv-inner">
          <h1 className="h1-title camper-list-kv-title">
            MELLOWAY와 함께 새로운 길을 열어보세요
          </h1>
          <p className="h2-title camper-list-kv-subtitle">
            여행의 즐거움을 새로운 비즈니스의 기회로
          </p>
        </div>
      </section>

      <section className="camper-lineup-section" aria-label="캠핑카 둘러보기">
        <h2 className="h1-title camper-lineup-title">차량 라인업</h2>

        <div className="camper-lineup-grid">
          {LINEUP_ITEMS.map((item) => (
            <article
              key={item.id}
              className={`camper-lineup-card camper-lineup-card--${item.id}`}
            >
              <div className="camper-lineup-card-head">
                <h3 className="camper-lineup-card-name">{item.name}</h3>
                <p className="camper-lineup-card-spec">{item.spec}</p>
              </div>

              <div className="camper-lineup-card-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="camper-lineup-card-image"
                  width={item.imageWidth}
                  height={item.imageHeight}
                />
              </div>

              <button type="button" className="camper-lineup-detail-btn">
                자세히 보기 →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="camper-price-section" aria-label="차량별 이용 요금표">
        <div className="camper-price-table">
          <div className="camper-price-labels" aria-hidden="true">
            <span className="camper-price-badge">평일</span>
            <span className="camper-price-badge">주말</span>
          </div>

          <img
            src="/assets/images/icon/price-list-line.svg"
            alt=""
            className="camper-price-divider"
            width={1146}
            height={1}
            aria-hidden="true"
          />

          <div className="camper-price-columns">
            {LINEUP_ITEMS.map((item) => (
              <div key={`price-${item.id}`} className="camper-price-col">
                <h3 className="camper-price-vehicle-name">{item.name}</h3>
                <div className="camper-price-values">
                  <div className="camper-price-row">
                    <span className="camper-price-badge camper-price-badge--mobile">
                      평일
                    </span>
                    <span className="camper-price-value">{item.weekdayPrice}</span>
                  </div>
                  <div className="camper-price-row">
                    <span className="camper-price-badge camper-price-badge--mobile">
                      주말
                    </span>
                    <span className="camper-price-value">{item.weekendPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="camper-package-section" aria-label="맞춤 캠핑 패키지">
        <div className="camper-package-header">
          <p className="camper-package-subtitle">입맛대로 고르는</p>
          <h2 className="h1-title camper-package-title">맞춤 캠핑 패키지</h2>
        </div>

        <div className="camper-package-grid">
          {PACKAGE_ITEMS.map((pkg) => {
            const isActive = activePackageId === pkg.id;

            if (pkg.isPlaceholder) {
              return (
                <article
                  key={pkg.id}
                  className={`camper-package-card camper-package-card--placeholder${
                    isActive ? ' is-active' : ''
                  }`}
                  onMouseEnter={() => setActivePackageId(pkg.id)}
                  onFocus={() => setActivePackageId(pkg.id)}
                  tabIndex={0}
                  aria-label="패키지 준비 중"
                />
              );
            }

            return (
              <article
                key={pkg.id}
                className={`camper-package-card camper-package-card--${pkg.id}${
                  isActive ? ' is-active' : ''
                }`}
                onMouseEnter={() => setActivePackageId(pkg.id)}
                onFocus={() => setActivePackageId(pkg.id)}
                tabIndex={0}
              >
                <div className="camper-package-card-head">
                  <h3 className="camper-package-card-en">{pkg.enTitle}</h3>
                  <p className="camper-package-card-ko">{pkg.koTitle}</p>
                </div>

                <div className="camper-package-card-inner">
                  <div className="camper-package-spec-list">
                    {pkg.specs?.map((row, idx, arr) => (
                      <React.Fragment key={`${pkg.id}-${row.label}`}>
                        <div className="camper-package-spec-row">
                          <span className="camper-package-spec-label">
                            {row.label}
                          </span>
                          <span className="camper-package-spec-value">
                            {row.value}
                          </span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div
                            className="camper-package-spec-divider"
                            aria-hidden="true"
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {pkg.priceLabel && pkg.priceAmount && (
                    <div className="camper-package-price-box">
                      <span className="camper-package-price-label">
                        {pkg.priceLabel}
                      </span>
                      <span className="camper-package-price-amount">
                        {pkg.priceAmount}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
