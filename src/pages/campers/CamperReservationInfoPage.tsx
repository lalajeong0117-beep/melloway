import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ReservationHeader } from './ReservationHeader';
import {
  CAR_INFO_MAP,
  ReservationReceipt,
  ReservationReceiptState,
} from './ReservationReceipt';
import './CamperReservationPage.css';
import './CamperReservationOptionsPage.css';
import './CamperReservationInfoPage.css';

const INFO_NOTICES: readonly string[] = [
  '예약 확인 및 안내를 위해 정확한 정보를 입력해주시기 바랍니다.',
  '입력하신 정보는 체크인 시 본인 확인에 사용됩니다.',
];

const PAYMENT_NOTICES: readonly string[] = [
  '결제는 안전한 결제 시스템을 통해 처리됩니다.',
  '예약 확정 시 결제 금액이 승인되며, 조건에 따라 일부 또는 전액 선결제가 진행될 수 있습니다.',
];

const FINAL_INFO_NOTICES: readonly string[] = [
  '차량 픽업 시 운전면허증(만 26세 이상, 운전 경력 1년 이상) 확인이 필요합니다.',
  '전 차량 금연이며, 실내 흡연 및 화기 사용 시 특수 클리닝 비용이 부과됩니다.',
  '반려동물 동반 시 전용 패키지 또는 펫 옵션 선택이 필수이며, 미선택 시 탑승이 제한됩니다.',
  '차량별 최대 탑승 정원 초과 시 안전상의 이유로 대여가 제한될 수 있습니다.',
  '추가 요청 사항 및 옵션 변경은 픽업 전 사전 문의 시에만 반영 가능합니다.',
];

const CANCELLATION_NOTICES: readonly string[] = [
  '픽업 48시간 전까지 100% 무료 취소 및 전액 환불이 가능합니다.',
  '픽업 24시간~48시간 전 취소 시 총 결제 금액의 30% 수수료가 부과됩니다.',
  '성수기 및 프로모션 특가 상품은 별도의 취소 규정이 적용됩니다.',
  '픽업 24시간 이내 취소 및 노쇼(No-show) 발생 시 환불이 불가합니다.',
];

interface NoticeListProps {
  items: readonly string[];
  ariaLabel: string;
  className?: string;
}

const NoticeList: React.FC<NoticeListProps> = ({
  items,
  ariaLabel,
  className = '',
}) => (
  <ul
    className={`camper-options-notices${className ? ` ${className}` : ''}`}
    aria-label={ariaLabel}
  >
    {items.map((notice) => (
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
);

/**
 * [담당 영역: Campers] 캠핑카 예약 3단계 - 정보 입력 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 */
export const CamperReservationInfoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const receiptState = (location.state as ReservationReceiptState | null) ?? null;

  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [cardOwner, setCardOwner] = useState<string>('');
  const [cardNumbers, setCardNumbers] = useState<[string, string, string, string]>([
    '',
    '',
    '',
    '',
  ]);
  const [expiryMonth, setExpiryMonth] = useState<string>('');
  const [expiryYear, setExpiryYear] = useState<string>('');
  const [agreedPrivacy, setAgreedPrivacy] = useState<boolean>(false);
  const [agreedCancellation, setAgreedCancellation] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setAgreedPrivacy(false);
    setAgreedCancellation(false);
    setHasAttemptedSubmit(false);
  }, [location.key]);

  useEffect(() => {
    if (!isConfirmModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsConfirmModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConfirmModalOpen]);

  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cardOwnerRef = useRef<HTMLInputElement>(null);
  const cardInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const expiryMonthRef = useRef<HTMLInputElement>(null);
  const expiryYearRef = useRef<HTMLInputElement>(null);
  const consentGroupRef = useRef<HTMLDivElement>(null);
  const privacyConsentBtnRef = useRef<HTMLButtonElement>(null);
  const cancellationConsentBtnRef = useRef<HTMLButtonElement>(null);

  const isAllAgreed = agreedPrivacy && agreedCancellation;

  const isLastNameEmpty = !lastName.trim();
  const isFirstNameEmpty = !firstName.trim();
  const isEmailEmpty = !email.trim();
  const isPhoneEmpty = !phone.trim();
  const isCardOwnerEmpty = !cardOwner.trim();
  const firstIncompleteCardIdx = cardNumbers.findIndex((seg) => seg.length < 4);
  const isExpiryMonthInvalid = expiryMonth.length < 2;
  const isExpiryYearInvalid = expiryYear.length < 2;

  const hasCustomerError =
    hasAttemptedSubmit &&
    (isLastNameEmpty || isFirstNameEmpty || isEmailEmpty || isPhoneEmpty);
  const hasPaymentError =
    hasAttemptedSubmit &&
    (isCardOwnerEmpty ||
      firstIncompleteCardIdx !== -1 ||
      isExpiryMonthInvalid ||
      isExpiryYearInvalid);
  const hasConsentError = hasAttemptedSubmit && !isAllAgreed;

  const handleToggleAllAgree = () => {
    const next = !isAllAgreed;
    setAgreedPrivacy(next);
    setAgreedCancellation(next);
  };

  const focusWithScroll = (el: HTMLElement | null, scrollTarget?: HTMLElement | null) => {
    (scrollTarget ?? el)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    el?.focus({ preventScroll: true });
  };

  const handleConfirmReservation = () => {
    setHasAttemptedSubmit(true);

    if (isLastNameEmpty) {
      focusWithScroll(lastNameRef.current);
      return;
    }
    if (isFirstNameEmpty) {
      focusWithScroll(firstNameRef.current);
      return;
    }
    if (isEmailEmpty) {
      focusWithScroll(emailRef.current);
      return;
    }
    if (isPhoneEmpty) {
      focusWithScroll(phoneRef.current);
      return;
    }
    if (isCardOwnerEmpty) {
      focusWithScroll(cardOwnerRef.current);
      return;
    }
    if (firstIncompleteCardIdx !== -1) {
      focusWithScroll(cardInputRefs.current[firstIncompleteCardIdx] ?? null);
      return;
    }
    if (isExpiryMonthInvalid) {
      focusWithScroll(expiryMonthRef.current);
      return;
    }
    if (isExpiryYearInvalid) {
      focusWithScroll(expiryYearRef.current);
      return;
    }
    if (!isAllAgreed) {
      const targetBtn = !agreedPrivacy
        ? privacyConsentBtnRef.current
        : cancellationConsentBtnRef.current;
      focusWithScroll(targetBtn, consentGroupRef.current);
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleCardNumberChange = (index: number, rawValue: string) => {
    const digits = rawValue.replace(/[^0-9]/g, '').slice(0, 4);
    setCardNumbers((prev) => {
      const next: [string, string, string, string] = [...prev] as [
        string,
        string,
        string,
        string,
      ];
      next[index] = digits;
      return next;
    });
    if (digits.length === 4 && index < 3) {
      cardInputRefs.current[index + 1]?.focus();
    }
  };

  const handleExpiryMonthChange = (rawValue: string) => {
    const digits = rawValue.replace(/[^0-9]/g, '').slice(0, 2);
    setExpiryMonth(digits);
    if (digits.length === 2) {
      expiryYearRef.current?.focus();
    }
  };

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
          <div className="camper-options-main camper-info-main">
            <h2 className="h2-title camper-info-heading">고객 정보</h2>

            <div className="camper-info-fields">
              <div className="camper-info-field-row">
                <label htmlFor="reservation-last-name" className="camper-info-field-label">
                  *성함
                </label>
                <div className="camper-info-name-group">
                  <input
                    ref={lastNameRef}
                    id="reservation-last-name"
                    type="text"
                    className={`camper-info-input camper-info-input--half${
                      hasAttemptedSubmit && isLastNameEmpty ? ' is-error' : ''
                    }`}
                    placeholder="성"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                  <input
                    ref={firstNameRef}
                    id="reservation-first-name"
                    type="text"
                    className={`camper-info-input camper-info-input--half${
                      hasAttemptedSubmit && isFirstNameEmpty ? ' is-error' : ''
                    }`}
                    placeholder="이름"
                    aria-label="이름"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
              </div>

              <div className="camper-info-field-row">
                <label htmlFor="reservation-email" className="camper-info-field-label">
                  *이메일
                </label>
                <input
                  ref={emailRef}
                  id="reservation-email"
                  type="email"
                  className={`camper-info-input camper-info-input--full${
                    hasAttemptedSubmit && isEmailEmpty ? ' is-error' : ''
                  }`}
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="camper-info-field-row">
                <label htmlFor="reservation-phone" className="camper-info-field-label">
                  *전화번호
                </label>
                <input
                  ref={phoneRef}
                  id="reservation-phone"
                  type="tel"
                  inputMode="numeric"
                  className={`camper-info-input camper-info-input--full${
                    hasAttemptedSubmit && isPhoneEmpty ? ' is-error' : ''
                  }`}
                  placeholder="-를 빼고 입력해주세요."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  autoComplete="tel-national"
                  required
                />
              </div>
            </div>

            {hasCustomerError && (
              <p className="camper-info-field-error" role="alert">
                고객 정보의 모든 필수 항목을 입력해 주세요.
              </p>
            )}

            <NoticeList
              items={INFO_NOTICES}
              ariaLabel="입력 유의 사항"
              className="camper-info-notices"
            />

            <div className="camper-info-section-divider" aria-hidden="true" />

            <h2 className="h2-title camper-info-heading">결제 정보</h2>

            <div className="camper-info-fields">
              <div className="camper-info-field-row">
                <label htmlFor="reservation-card-owner" className="camper-info-field-label">
                  *소유자 명
                </label>
                <input
                  ref={cardOwnerRef}
                  id="reservation-card-owner"
                  type="text"
                  className={`camper-info-input camper-info-input--half${
                    hasAttemptedSubmit && isCardOwnerEmpty ? ' is-error' : ''
                  }`}
                  placeholder="이름"
                  value={cardOwner}
                  onChange={(e) => setCardOwner(e.target.value)}
                  autoComplete="cc-name"
                  required
                />
              </div>

              <div className="camper-info-field-row">
                <label htmlFor="reservation-card-0" className="camper-info-field-label">
                  *카드 번호
                </label>
                <div className="camper-info-card-group">
                  {cardNumbers.map((segment, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        cardInputRefs.current[index] = el;
                      }}
                      id={`reservation-card-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      className={`camper-info-input camper-info-input--card${
                        hasAttemptedSubmit && segment.length < 4 ? ' is-error' : ''
                      }`}
                      placeholder="0000"
                      aria-label={`카드 번호 ${index + 1}번째 4자리`}
                      value={segment}
                      onChange={(e) => handleCardNumberChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="camper-info-field-row">
                <label htmlFor="reservation-expiry-mm" className="camper-info-field-label">
                  *유효 기간
                </label>
                <div className="camper-info-expiry-group">
                  <input
                    ref={expiryMonthRef}
                    id="reservation-expiry-mm"
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    className={`camper-info-input camper-info-input--card${
                      hasAttemptedSubmit && isExpiryMonthInvalid ? ' is-error' : ''
                    }`}
                    placeholder="MM"
                    aria-label="유효 기간 월(MM)"
                    value={expiryMonth}
                    onChange={(e) => handleExpiryMonthChange(e.target.value)}
                    autoComplete="cc-exp-month"
                    required
                  />
                  <span className="camper-info-slash" aria-hidden="true">
                    /
                  </span>
                  <input
                    ref={expiryYearRef}
                    id="reservation-expiry-yy"
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    className={`camper-info-input camper-info-input--card${
                      hasAttemptedSubmit && isExpiryYearInvalid ? ' is-error' : ''
                    }`}
                    placeholder="YY"
                    aria-label="유효 기간 연도(YY)"
                    value={expiryYear}
                    onChange={(e) =>
                      setExpiryYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))
                    }
                    autoComplete="cc-exp-year"
                    required
                  />
                </div>
              </div>
            </div>

            {hasPaymentError && (
              <p className="camper-info-field-error" role="alert">
                결제 정보의 모든 필수 항목을 정확히 입력해 주세요.
              </p>
            )}

            <NoticeList
              items={PAYMENT_NOTICES}
              ariaLabel="결제 유의 사항"
              className="camper-info-notices"
            />

            <div className="camper-info-section-divider" aria-hidden="true" />

            <h2 className="h2-title camper-info-heading">유의사항</h2>

            <NoticeList
              items={FINAL_INFO_NOTICES}
              ariaLabel="대여 유의사항"
              className="camper-info-notices"
            />

            <div className="camper-info-section-divider" aria-hidden="true" />

            <h2 className="h2-title camper-info-heading">취소 안내</h2>

            <NoticeList
              items={CANCELLATION_NOTICES}
              ariaLabel="취소 안내"
              className="camper-info-notices"
            />

            <div className="camper-info-section-divider" aria-hidden="true" />

            <h2 className="h2-title camper-info-heading">개인정보 수집 및 활용 동의</h2>

            <div
              ref={consentGroupRef}
              className="camper-info-consents"
              role="group"
              aria-label="약관 동의"
            >
              {[
                {
                  id: 'agree-all',
                  label: '전체 동의',
                  checked: isAllAgreed,
                  isAll: true,
                  ref: undefined,
                  onToggle: handleToggleAllAgree,
                },
                {
                  id: 'agree-privacy',
                  label: '(필수) 개인정보 수집항목 및 이용 동의',
                  checked: agreedPrivacy,
                  isAll: false,
                  ref: privacyConsentBtnRef,
                  onToggle: () => setAgreedPrivacy((prev) => !prev),
                },
                {
                  id: 'agree-cancellation',
                  label: '(필수) 예약 변경 및 취소 규정 동의',
                  checked: agreedCancellation,
                  isAll: false,
                  ref: cancellationConsentBtnRef,
                  onToggle: () => setAgreedCancellation((prev) => !prev),
                },
              ].map((item) => {
                const showErrorBorder = hasConsentError && !item.isAll && !item.checked;
                return (
                  <button
                    key={item.id}
                    ref={item.ref}
                    type="button"
                    role="checkbox"
                    aria-checked={item.checked}
                    className={`camper-info-consent-btn${item.isAll ? ' is-all' : ''}`}
                    onClick={item.onToggle}
                  >
                    <span
                      className={`camper-info-checkbox${item.checked ? ' is-checked' : ''}${
                        showErrorBorder ? ' is-error' : ''
                      }`}
                      aria-hidden="true"
                    >
                      {item.checked && (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                          <path
                            d="M1 4.5L4.3 7.8L11 1"
                            stroke="#F7F8FC"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="camper-info-consent-text">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {hasConsentError && (
              <p className="camper-info-consent-error" role="alert">
                필수 개인정보 수집 및 활용 동의 항목을 모두 선택해 주세요.
              </p>
            )}
          </div>

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
              <button
                type="button"
                className="camper-receipt-reserve-btn"
                onClick={handleConfirmReservation}
              >
                예약 확정
              </button>
            }
          />
        </div>
      </section>

      {isConfirmModalOpen && (
        <div
          className="camper-confirm-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="예약 확정 재확인"
          onClick={() => setIsConfirmModalOpen(false)}
        >
          <div
            className="camper-confirm-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="camper-confirm-modal-title">예약을 확정하시겠습니까?</h2>
            <div className="camper-confirm-modal-actions">
              <button
                type="button"
                className="camper-confirm-modal-btn camper-confirm-modal-btn--cancel"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                취소
              </button>
              <button
                type="button"
                className="camper-confirm-modal-btn camper-confirm-modal-btn--confirm"
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  navigate(ROUTES.CAMPERS_RESERVATION_COMPLETE);
                }}
              >
                확정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
