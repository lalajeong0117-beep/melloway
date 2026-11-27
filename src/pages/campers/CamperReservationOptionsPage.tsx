import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ReservationHeader } from './ReservationHeader';
import {
  CAR_INFO_MAP,
  ReceiptSelectedOption,
  ReservationReceipt,
} from './ReservationReceipt';
import './CamperReservationPage.css';
import './CamperReservationOptionsPage.css';

interface OptionItem {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  priceText: string;
  min: number;
  max: number;
}

const PACKAGE_OPTIONS: OptionItem[] = [
  {
    id: 'couple-romantic',
    name: '커플 로맨틱 패키지',
    description: '우드 테이블 · 빔프로젝터 · 바베큐 그릴 세트',
    unitPrice: 39000,
    priceText: '+ 39,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'family-all-in-one',
    name: '패밀리 올인원 패키지',
    description: '대형 테이블 · 어닝 타프 · 불멍 화로대 세트',
    unitPrice: 55000,
    priceText: '+ 55,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'pet-friendly',
    name: '펫 프렌들리 패키지',
    description: '방수 침구 · 슬라이드 계단 · 펫 텐트 · 전용 웰컴 간식 박스',
    unitPrice: 70000,
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
    unitPrice: 25000,
    priceText: '+ 25,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'fire-pit-set',
    name: '불멍 화로대 세트',
    description: '화로대 + 장작 10kg + 오로라 가루 증정',
    unitPrice: 15000,
    priceText: '+ 15,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'beam-projector',
    name: '감성 빔프로젝터',
    description: '미니 빔 + 삼각대 + 전용 스크린 포함',
    unitPrice: 15000,
    priceText: '+ 15,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'camping-chair',
    name: '추가 캠핑 체어',
    description: '릴렉스 체어 1개 기준 / 성인·어린이 공용',
    unitPrice: 5000,
    priceText: '+ 5,000 KRW',
    min: 0,
    max: 1,
  },
  {
    id: 'bedding-set',
    name: '침구류 세트 추가',
    description: '1인 기준 / 이불 + 베개 + 패드',
    unitPrice: 10000,
    priceText: '+ 10,000 KRW',
    min: 0,
    max: 2,
  },
];

interface PackageModalSpecItem {
  label: string;
  value: string;
}

interface PackageModalCardItem {
  id: string;
  enTitle: string;
  koTitle: string;
  recommendedCar: string;
  specs: PackageModalSpecItem[];
}

const PACKAGE_MODAL_CARDS: PackageModalCardItem[] = [
  {
    id: 'couple',
    enTitle: 'Couple',
    koTitle: '커플 로맨틱 패키지',
    recommendedCar: 'URBAN ESCAPE (2인승)',
    specs: [
      { label: '기본 구성', value: '2인 침구 세트 + 감성 릴렉스 체어 2개' },
      { label: '다이닝 키트', value: '우드 롤테이블 + 트윈 버너·코펠 세트' },
      { label: '무드 옵션', value: 'LED 스트링 전구 + 빔프로젝터·스크린' },
      { label: '추가 혜택', value: '바비큐 숯·그릴 1회 제공' },
    ],
  },
  {
    id: 'family',
    enTitle: 'Family',
    koTitle: '패밀리 올인원 패키지',
    recommendedCar: 'RETRO HOME (4~6인승)',
    specs: [
      { label: '기본 구성', value: '패밀리 침구 + 접이식 체어 4개' },
      { label: '다이닝 키트', value: 'L 테이블 + 화로대 풀세트' },
      { label: '무드 옵션', value: '확장형 어닝 + 야외 대형 매트' },
      { label: '추가 혜택', value: '불멍 장작 세트 + 안전 랜턴' },
    ],
  },
  {
    id: 'with-pet',
    enTitle: 'With Pet',
    koTitle: '펫 프렌들리 패키지',
    recommendedCar: 'ADVENTURE VAN(펫 프렌들리)',
    specs: [
      { label: '기본 구성', value: '방수·방오 전용 침구 + 논슬립 계단' },
      { label: '다이닝 키트', value: '접이식 펫 텐트 + 식기·배변패드' },
      { label: '무드 옵션', value: '반려견 전용 캠핑 체어 + 롱리드줄·펙' },
      { label: '추가 혜택', value: '펫 전용 웰컴 간식 박스 + 탈취 케어' },
    ],
  },
];

interface OptionsSectionBlockProps {
  title: string;
  items: OptionItem[];
  counts: Record<string, number>;
  showDetailButton?: boolean;
  onDetailClick?: () => void;
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
  onDetailClick,
  onUpdateCount,
}) => (
  <div className="camper-options-group">
    <div className="camper-options-section-head">
      <h2 className="h2-title camper-options-section-title">{title}</h2>
      {showDetailButton && (
        <button
          type="button"
          className="camper-options-detail-btn"
          onClick={onDetailClick}
        >
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
  const selectedCar = CAR_INFO_MAP[carId] ?? CAR_INFO_MAP['urban-escape'];
  const selectedPassengers = searchParams.get('passengers') ?? '2';
  const selectedBranch = searchParams.get('branch') ?? '강남점';

  const [optionCounts, setOptionCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(ALL_OPTIONS.map((item) => [item.id, item.min]))
  );
  const [isPackageModalOpen, setIsPackageModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isPackageModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPackageModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPackageModalOpen]);

  const selectedOptions: ReceiptSelectedOption[] = ALL_OPTIONS.filter(
    (item) => (optionCounts[item.id] ?? 0) > 0
  ).map((item) => ({
    id: item.id,
    name: item.name,
    count: optionCounts[item.id] ?? 0,
    unitPrice: item.unitPrice,
  }));
  const optionsTotal = selectedOptions.reduce(
    (sum, item) => sum + item.unitPrice * item.count,
    0
  );
  const subtotalAmount = selectedCar.basePrice + optionsTotal;
  const taxAmount = Math.round(subtotalAmount * 0.1);
  const totalAmount = subtotalAmount + taxAmount;

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
              onDetailClick={() => setIsPackageModalOpen(true)}
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

          <ReservationReceipt
            startDateText={startDateText}
            endDateText={endDateText}
            carName={selectedCar.name}
            passengers={selectedPassengers}
            branch={selectedBranch}
            basePrice={selectedCar.basePrice}
            selectedOptions={selectedOptions}
            taxAmount={taxAmount}
            totalAmount={totalAmount}
            actionButton={
              <Link
                to={`${ROUTES.CAMPERS_RESERVATION_INFO}?${searchParams.toString()}`}
                state={{
                  carId,
                  carName: selectedCar.name,
                  basePrice: selectedCar.basePrice,
                  startDate: startDateText,
                  endDate: endDateText,
                  passengers: selectedPassengers,
                  branch: selectedBranch,
                  selectedOptions,
                  optionsTotal,
                  taxAmount,
                  totalAmount,
                }}
                className="camper-receipt-reserve-btn"
              >
                예약하기
              </Link>
            }
          />
        </div>
      </section>

      {isPackageModalOpen && (
        <>
          <div
            className="camper-package-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="패키지 상세 안내"
            onClick={() => setIsPackageModalOpen(false)}
          >
            <div
              className="camper-package-modal-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="camper-package-modal-grid">
                {PACKAGE_MODAL_CARDS.map((pkg) => (
                  <article key={pkg.id} className="camper-package-modal-card">
                    <h2 className="h2-title camper-package-modal-en">{pkg.enTitle}</h2>
                    <p className="camper-package-modal-ko">{pkg.koTitle}</p>
                    <div className="camper-package-modal-body">
                      <div className="camper-package-modal-spec-list">
                        <div className="camper-package-modal-spec-row">
                          <span className="camper-package-modal-spec-label">추천 차량</span>
                          <span className="camper-package-modal-spec-value">
                            {pkg.recommendedCar}
                          </span>
                        </div>

                        {pkg.specs.map((spec) => (
                          <React.Fragment key={spec.label}>
                            <div className="camper-package-modal-divider" aria-hidden="true" />
                            <div className="camper-package-modal-spec-row">
                              <span className="camper-package-modal-spec-label">
                                {spec.label}
                              </span>
                              <span className="camper-package-modal-spec-value">
                                {spec.value}
                              </span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="camper-package-modal-close-btn"
            aria-label="패키지 상세 팝업 닫기"
            onClick={() => setIsPackageModalOpen(false)}
          >
            <img
              src="/assets/images/icon/close-btn.svg"
              alt=""
              className="camper-package-modal-close-icon"
              width={24}
              height={24}
              aria-hidden="true"
            />
          </button>
        </>
      )}
    </div>
  );
};
