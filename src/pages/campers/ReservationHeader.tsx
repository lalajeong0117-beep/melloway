import React from 'react';

interface ReservationStepItem {
  step: number;
  label: string;
}

const RESERVATION_STEPS: ReservationStepItem[] = [
  { step: 1, label: '차량 선택' },
  { step: 2, label: '옵션 선택' },
  { step: 3, label: '정보 입력' },
  { step: 4, label: '예약 완료' },
];

interface ReservationHeaderProps {
  currentStep: 1 | 2 | 3 | 4;
}

/**
 * 캠핑카 예약 단계 공통 상단 헤더 (제목 + 1~4단계 표시)
 */
export const ReservationHeader: React.FC<ReservationHeaderProps> = ({
  currentStep,
}) => (
  <div className="camper-reservation-header">
    <h1 className="h1-title camper-reservation-title">캠핑카 예약</h1>

    <div className="camper-reservation-steps" aria-label="예약 단계">
      {RESERVATION_STEPS.map((item, idx) => {
        const isActive = item.step === currentStep;
        return (
          <React.Fragment key={item.step}>
            <div className={`camper-reservation-step${isActive ? ' is-active' : ''}`}>
              <span className="camper-reservation-step-badge">{item.step}</span>
              <span className="camper-reservation-step-label">{item.label}</span>
            </div>
            {idx < RESERVATION_STEPS.length - 1 && (
              <span className="camper-reservation-step-connector" aria-hidden="true">
                <span className="camper-reservation-step-line" />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);
