import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReservationHeader } from './ReservationHeader';
import './CamperReservationPage.css';
import './CamperReservationOptionsPage.css';

interface OptionItem {
  id: string;
  name: string;
  description: string;
  priceText: string;
  min: number;
  max: number;
}

const PACKAGE_OPTIONS: OptionItem[] = [
  {
    id: 'couple-romantic',
    name: '커플 로맨틱 패키지',
    description: '우드 테이블 · 빔프로젝터 · 바베큐 그릴 세트',
    priceText: '+ 39,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'family-all-in-one',
    name: '패밀리 올인원 패키지',
    description: '대형 테이블 · 어닝 타프 · 불멍 화로대 세트',
    priceText: '+ 55,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'pet-friendly',
    name: '펫 프렌들리 패키지',
    description: '방수 침구 · 슬라이드 계단 · 펫 텐트 · 전용 웰컴 간식 박스',
    priceText: '+ 70,000 KRW',
    min: 0,
    max: 1,
  },
];

const EXTRA_OPTIONS: OptionItem[] = [
  {
    id: 'bbq-grill-set',
    name: '바베큐 숯 그릴 세트',
    description: '그릴 + 숯 + 토치 + 집게 풀세트 / 1회 기준',
    priceText: '+ 25,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'fire-pit-set',
    name: '불멍 화로대 세트',
    description: '화로대 + 장작 10kg + 오로라 가루 증정',
    priceText: '+ 15,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'beam-projector',
    name: '감성 빔프로젝터',
    description: '미니 빔 + 삼각대 + 전용 스크린 포함',
    priceText: '+ 15,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'camping-chair',
    name: '추가 캠핑 체어',
    description: '릴렉스 체어 1개 기준 / 성인·어린이 공용',
    priceText: '+ 5,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'bedding-set',
    name: '침구류 세트 추가',
    description: '1인 기준 / 이불 + 베개 + 패드',
    priceText: '+ 10,000 KRW',
    min: 0,
    max: 2,
  },
];

interface OptionsSectionBlockProps {
  title: string;
  items: OptionItem[];
  counts: Record<string, number>;
  showDetailButton?: boolean;
  onUpdateCount: (item: OptionItem, delta: number) => void;
}

/**
 * 패키지·추가 옵션 공용 선택 블록 (제목 행 + 옵션 목록 + 하단 830*1 구분선)
 */
const OptionsSectionBlock: React.FC<OptionsSectionBlockProps> = ({
  title,
  items,
  counts,
  showDetailButton = true,
  onUpdateCount,
}) => (
  <div className="camper-options-group">
    <div className="camper-options-section-head">
      <h2 className="h2-title camper-options-section-title">{title}</h2>
      {showDetailButton && (
        <button type="button" className="camper-options-detail-btn">
          상세 보기 →
        </button>
      )}
    </div>

    <div className="camper-options-list">
      {items.map((item) => {
        const count = counts[item.id] ?? item.min;
        return (
          <div key={item.id} className="camper-options-item">
            <div className="camper-options-item-info">
              <p className="camper-options-item-name">{item.name}</p>
              <p className="camper-options-item-desc">{item.description}</p>
            </div>

            <div className="camper-options-item-controls">
              <span className="camper-options-item-price">{item.priceText}</span>

              <div
                className="camper-options-stepper"
                role="group"
                aria-label={`${item.name} 수량 선택`}
              >
                <button
                  type="button"
                  className="camper-options-stepper-btn"
                  aria-label={`${item.name} 수량 감소`}
                  disabled={count <= item.min}
                  onClick={() => onUpdateCount(item, -1)}
                >
                  -
                </button>
                <span className="camper-options-stepper-value" aria-live="polite">
                  {count}
                </span>
                <button
                  type="button"
                  className="camper-options-stepper-btn"
                  aria-label={`${item.name} 수량 증가`}
                  disabled={count >= item.max}
                  onClick={() => onUpdateCount(item, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="camper-options-divider" aria-hidden="true" />
  </div>
);

const ALL_OPTIONS = [...PACKAGE_OPTIONS, ...EXTRA_OPTIONS];

const CAR_NAME_MAP: Record<string, string> = {
  'urban-escape': 'URBAN ESCAPE',
  'adventure-van': 'ADVENTURE VAN',
  'retro-home': 'RETRO HOME',
  'grand-cruiser': 'GRAND CRUISER',
};

const OPTION_NOTICES: readonly string[] = [
  '모든 옵션 및 패키지는 사전 예약 및 결제 완료 후 이용 가능합니다.',
  '선택하신 차량 모델 및 대여 일정에 따라 선택 가능한 옵션이 상이할 수 있습니다.',
  '바베큐 및 불멍 용품은 화기 사용이 허용된 지정 캠핑장에서만 이용해 주시기 바랍니다.',
  '반려동물 동반 시 전용 패키지 또는 클리닝 케어 옵션 선택이 필수이며, 미선택 시 탑승이 제한될 수 있습니다.',
  '대여 용품의 파손 및 분실 시 별도의 수리비 또는 배상 비용이 청구될 수 있습니다.',
  '옵션 취소 및 변경은 픽업 24시간 전까지 가능하며, 이후에는 수수료가 발생할 수 있습니다.',
];

/**
 * [담당 영역: Campers] 캠핑카 예약 2단계 - 옵션 선택 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 */
export const CamperReservationOptionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDateText = searchParams.get('start') ?? '2026.11.25';
  const endDateText = searchParams.get('end') ?? searchParams.get('start') ?? '2026.12.26';
  const carId = searchParams.get('car') ?? 'urban-escape';
  const selectedCarName = CAR_NAME_MAP[carId] ?? 'URBAN ESCAPE';
  const selectedPassengers = searchParams.get('passengers') ?? '2';
  const selectedBranch = searchParams.get('branch') ?? '강남점';

  const [optionCounts, setOptionCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(ALL_OPTIONS.map((item) => [item.id, item.min]))
  );

  const updateOptionCount = (item: OptionItem, delta: number) => {
    setOptionCounts((prev) => {
      const current = prev[item.id] ?? item.min;
      const next = Math.min(item.max, Math.max(item.min, current + delta));
      return { ...prev, [item.id]: next };
    });
  };

  return (
    <div className="camper-reservation-page camper-reservation-options-page">
      <section className="camper-reservation-section" aria-label="옵션 선택">
        <ReservationHeader currentStep={2} />
        <div
          className="camper-reservation-divider camper-reservation-options-divider"
          aria-hidden="true"
        />

        <div className="camper-options-layout">
          <div className="camper-options-main">
            <OptionsSectionBlock
              title="패키지"
              items={PACKAGE_OPTIONS}
              counts={optionCounts}
              onUpdateCount={updateOptionCount}
            />
            <OptionsSectionBlock
              title="추가 옵션"
              items={EXTRA_OPTIONS}
              counts={optionCounts}
              showDetailButton={false}
              onUpdateCount={updateOptionCount}
            />

            <ul className="camper-options-notices" aria-label="유의 사항">
              {OPTION_NOTICES.map((notice) => (
                <li key={notice} className="camper-options-notice-item">
                  <img
                    src="/assets/images/icon/circle.svg"
                    alt=""
                    className="camper-options-notice-icon"
                    width={5}
                    height={5}
                    aria-hidden="true"
                  />
                  <span className="camper-options-notice-text">{notice}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="camper-options-receipt" aria-label="최종 가격 영수증">
            <div className="camper-receipt-top">
              <div className="camper-receipt-date-group">
                <span className="camper-receipt-date-text">{startDateText}</span>
                <span className="camper-receipt-date-text" aria-hidden="true">
                  -
                </span>
                <span className="camper-receipt-date-text">{endDateText}</span>
              </div>
            </div>

            <div className="camper-receipt-body">
              <span className="camper-receipt-car-label">Car</span>
              <h2 className="h2-title camper-receipt-car-name">{selectedCarName}</h2>
              <div className="camper-receipt-meta">
                <span className="camper-receipt-meta-item">
                  탑승 인원: {selectedPassengers}
                </span>
                <span className="camper-receipt-meta-item">
                  대여지점: {selectedBranch}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
