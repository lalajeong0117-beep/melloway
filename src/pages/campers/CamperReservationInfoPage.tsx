import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReservationHeader } from './ReservationHeader';
import {
  CAR_INFO_MAP,
  ReservationReceipt,
  ReservationReceiptState,
} from './ReservationReceipt';
import './CamperReservationPage.css';
import './CamperReservationOptionsPage.css';
import './CamperReservationInfoPage.css';

/**
 * [담당 영역: Campers] 캠핑카 예약 3단계 - 정보 입력 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 */
export const CamperReservationInfoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const receiptState = (location.state as ReservationReceiptState | null) ?? null;

  const carId = receiptState?.carId ?? searchParams.get('car') ?? 'urban-escape';
  const fallbackCar = CAR_INFO_MAP[carId] ?? CAR_INFO_MAP['urban-escape'];

  const startDateText = receiptState?.startDate ?? searchParams.get('start') ?? '2026.11.25';
  const endDateText =
    receiptState?.endDate ??
    searchParams.get('end') ??
    searchParams.get('start') ??
    '2026.12.26';
  const carName = receiptState?.carName ?? fallbackCar.name;
  const basePrice = receiptState?.basePrice ?? fallbackCar.basePrice;
  const passengers = receiptState?.passengers ?? searchParams.get('passengers') ?? '2';
  const branch = receiptState?.branch ?? searchParams.get('branch') ?? '강남점';
  const selectedOptions = receiptState?.selectedOptions ?? [];
  const optionsTotal =
    receiptState?.optionsTotal ??
    selectedOptions.reduce((sum, item) => sum + item.unitPrice * item.count, 0);
  const subtotalAmount = basePrice + optionsTotal;
  const taxAmount = receiptState?.taxAmount ?? Math.round(subtotalAmount * 0.1);
  const totalAmount = receiptState?.totalAmount ?? subtotalAmount + taxAmount;

  return (
    <div className="camper-reservation-page camper-reservation-info-page">
      <section className="camper-reservation-section" aria-label="정보 입력">
        <ReservationHeader currentStep={3} />
        <div
          className="camper-reservation-divider camper-reservation-info-divider"
          aria-hidden="true"
        />

        <div className="camper-options-layout">
          <div className="camper-options-main camper-info-main" />

          <ReservationReceipt
            startDateText={startDateText}
            endDateText={endDateText}
            carName={carName}
            passengers={passengers}
            branch={branch}
            basePrice={basePrice}
            selectedOptions={selectedOptions}
            taxAmount={taxAmount}
            totalAmount={totalAmount}
            actionButton={
              <button type="button" className="camper-receipt-reserve-btn">
                예약하기
              </button>
            }
          />
        </div>
      </section>
    </div>
  );
};
