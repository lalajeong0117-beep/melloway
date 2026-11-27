import React from 'react';

export interface ReceiptSelectedOption {
  id: string;
  name: string;
  count: number;
  unitPrice: number;
}

export interface ReservationReceiptState {
  carId?: string;
  carName?: string;
  basePrice?: number;
  startDate?: string;
  endDate?: string;
  passengers?: string;
  branch?: string;
  selectedOptions?: ReceiptSelectedOption[];
  optionsTotal?: number;
  taxAmount?: number;
  totalAmount?: number;
}

export const CAR_INFO_MAP: Record<string, { name: string; basePrice: number }> = {
  'urban-escape': { name: 'URBAN ESCAPE', basePrice: 120000 },
  'adventure-van': { name: 'ADVENTURE VAN', basePrice: 220000 },
  'retro-home': { name: 'RETRO HOME', basePrice: 340000 },
  'grand-cruiser': { name: 'GRAND CRUISER', basePrice: 460000 },
};

export const formatKrw = (amount: number): string =>
  `${amount.toLocaleString('ko-KR')} KRW`;

interface ReservationReceiptProps {
  startDateText: string;
  endDateText: string;
  carName: string;
  passengers: string;
  branch: string;
  basePrice: number;
  selectedOptions: ReceiptSelectedOption[];
  taxAmount: number;
  totalAmount: number;
  actionButton: React.ReactNode;
}

/**
 * 캠핑카 예약 2·3단계 공용 최종 가격 영수증 카드
 */
export const ReservationReceipt: React.FC<ReservationReceiptProps> = ({
  startDateText,
  endDateText,
  carName,
  passengers,
  branch,
  basePrice,
  selectedOptions,
  taxAmount,
  totalAmount,
  actionButton,
}) => (
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
      <h2 className="h2-title camper-receipt-car-name">{carName}</h2>
      <div className="camper-receipt-meta">
        <span className="camper-receipt-meta-item">탑승 인원: {passengers}</span>
        <span className="camper-receipt-meta-item">대여지점: {branch}</span>
      </div>

      <div className="camper-receipt-base-row">
        <span className="camper-receipt-base-label">기본금</span>
        <span className="camper-receipt-base-price">{formatKrw(basePrice)}</span>
      </div>

      <div className="camper-receipt-dashed-line" aria-hidden="true" />

      <span className="camper-receipt-option-heading">Option</span>
      <div className="camper-receipt-option-list">
        {selectedOptions.length > 0 ? (
          selectedOptions.map((item) => (
            <div key={item.id} className="camper-receipt-option-row">
              <span className="camper-receipt-option-name">
                {item.name} x{item.count}
              </span>
              <span className="camper-receipt-option-price">
                {formatKrw(item.unitPrice * item.count)}
              </span>
            </div>
          ))
        ) : (
          <p className="camper-receipt-option-empty">선택된 옵션이 없습니다.</p>
        )}
      </div>

      <div className="camper-receipt-dashed-line" aria-hidden="true" />

      <div className="camper-receipt-tax-row">
        <span className="camper-receipt-tax-label">세금(10%)</span>
        <span className="camper-receipt-tax-price">{formatKrw(taxAmount)}</span>
      </div>

      <div className="camper-receipt-total-row">
        <span className="camper-receipt-total-label">Total</span>
        <span className="camper-receipt-total-price">{formatKrw(totalAmount)}</span>
      </div>

      {actionButton}
    </div>
  </aside>
);
