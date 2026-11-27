import React, { useEffect, useMemo, useRef, useState } from 'react';
import './business.css';
import {
  CALENDAR_WEEKDAYS,
  COLLAB_BRAND_LOGOS,
  INQUIRY_HOW_STEPS,
  INQUIRY_TYPE_OPTIONS,
  PHONE_PREFIX_OPTIONS,
} from './businessData';
import { useBusinessAnimations } from './useBusinessAnimations';

/**
 * [담당 영역: Business] 가맹·제휴 문의 페이지
 * - 공통 Header는 MainLayout에서 KV 상단에 표시됩니다.
 * - 스타일(./business.css), 데이터(./businessData.ts), 애니메이션 로직(./useBusinessAnimations.ts)을 분리해 관리합니다.
 */
export const FranchiseInquiryPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const calendarWrapRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('010');
  const [phoneMid, setPhoneMid] = useState('');
  const [phoneLast, setPhoneLast] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [region, setRegion] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(0); // 0 = 2026년 1월
  const [notes, setNotes] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useBusinessAnimations(pageRef);

  // 2026년 선택 월 달력 셀 계산 (1월 = index 0 ~ 12월 = index 11)
  const calendarCells = useMemo(() => {
    const firstWeekday = new Date(2026, calendarMonth, 1).getDay();
    const totalDays = new Date(2026, calendarMonth + 1, 0).getDate();
    const cells: Array<number | null> = [];

    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= totalDays; day += 1) {
      cells.push(day);
    }
    return cells;
  }, [calendarMonth]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calendarWrapRef.current &&
        !calendarWrapRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
        setIsTypeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelectDate = (day: number) => {
    setTargetDate(`2026년 ${calendarMonth + 1}월 ${day}일`);
    setIsCalendarOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !name.trim() ||
      !phoneMid.trim() ||
      !phoneLast.trim() ||
      !email.trim() ||
      !inquiryType ||
      !region.trim() ||
      !targetDate
    ) {
      setSubmitMessage({
        type: 'error',
        text: '필수 입력 사항(*)을 모두 입력해 주세요.',
      });
      return;
    }

    if (!agreedPrivacy) {
      setSubmitMessage({
        type: 'error',
        text: '개인정보취급방침 동의에 체크해 주세요.',
      });
      return;
    }

    setSubmitMessage({
      type: 'success',
      text: `${name.trim()}님의 가맹·제휴 문의가 정상적으로 접수되었습니다. 담당자가 빠르게 연락드리겠습니다.`,
    });
  };

  return (
    <div ref={pageRef} className="business-page inquiry-page">
      {/* 메인 KV 섹션 (1920 * 850, Sticky 레이어) */}
      <section className="business-kv-section inquiry-kv-section" aria-label="가맹·제휴 문의 메인 비주얼">
        <img
          src="/assets/images/franchise-main-kv.jpg"
          alt="멜로웨이 가맹 및 제휴 문의 메인 비주얼"
          className="business-kv-img"
          width={1920}
          height={850}
        />
        <div className="business-kv-overlay" aria-hidden="true" />

        <div className="business-kv-content">
          <h1 className="h1-title business-kv-main-title">
            MELLOWAY와 함께 새로운 길을 열어보세요
          </h1>
          <h2 className="h2-title business-kv-sub-title">
            여행의 즐거움을 새로운 비즈니스의 기회로
          </h2>
        </div>
      </section>

      {/* 스크롤 시 메인 KV 위로 자연스럽게 이어지는 협업 브랜드 패널 (1920 * 239) */}
      <div className="inquiry-panels-wrap">
        <section
          className="inquiry-collab-section"
          aria-label="POTENTIAL COLLABORATION BRANDS"
        >
          <h3 className="h3-title inquiry-collab-title">
            POTENTIAL COLLABORATION BRANDS
          </h3>

          <div className="inquiry-collab-logos">
            {COLLAB_BRAND_LOGOS.map((logo) => (
              <div key={logo.id} className="inquiry-collab-logo-item">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="inquiry-collab-logo-img"
                  width={logo.width}
                  height={logo.height}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* HOW IT WORKS 섹션 (1920 * 956, 배경 #22252A) */}
      <section className="inquiry-how-section" aria-label="HOW IT WORKS">
        <div className="inquiry-how-header">
          <h2 className="h1-title inquiry-how-main-title">HOW IT WORKS</h2>
          <p className="h2-title inquiry-how-sub-title">
            창업문의는 이렇게 진행 됩니다
          </p>
        </div>

        <div className="inquiry-how-grid">
          {INQUIRY_HOW_STEPS.map((step) => (
            <article key={step.id} className="inquiry-how-card">
              <div className="inquiry-how-img-wrap">
                <img
                  src={step.image}
                  alt={step.title}
                  className="inquiry-how-img"
                  width={342}
                  height={390}
                  draggable={false}
                />
              </div>
              <div className="inquiry-how-texts">
                <h3 className="inquiry-how-card-title">{step.title}</h3>
                <p className="inquiry-how-card-desc">
                  {step.lines[0]}
                  <br />
                  {step.lines[1]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 문의하기 폼 섹션 (이전 섹션 아래 40px) */}
      <section className="inquiry-form-section" aria-label="가맹·제휴 문의 입력 폼">
        <h2 className="h1-title inquiry-form-title">
          지금 MELLOWAY 와 함께 시작하세요!
        </h2>

        <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
          <div className="inquiry-form-required-note">
            <span className="inquiry-required-dot" aria-hidden="true" />
            <span>표시는 필수 입력 사항입니다</span>
          </div>

          <div className="inquiry-form-grid">
            {/* Row 1: 이름 / 문의 유형 선택 */}
            <label htmlFor="inquiry-name" className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>이름</span>
            </label>
            <div className="inquiry-form-control">
              <input
                id="inquiry-name"
                type="text"
                className="inquiry-input"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inquiry-grid-spacer" aria-hidden="true" />

            <span className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>문의 유형 선택</span>
            </span>
            <div className="inquiry-form-control inquiry-accordion-wrap">
              <button
                type="button"
                className={`inquiry-select-trigger${isTypeOpen ? ' is-open' : ''}${
                  inquiryType ? ' has-value' : ''
                }`}
                aria-expanded={isTypeOpen}
                onClick={() => {
                  setIsTypeOpen((prev) => !prev);
                  setIsCalendarOpen(false);
                }}
              >
                <span>{inquiryType || '문의 종류 선택'}</span>
                <svg
                  className="inquiry-chevron"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`inquiry-accordion-panel${isTypeOpen ? ' is-open' : ''}`}
              >
                <div className="inquiry-accordion-inner">
                  <ul className="inquiry-accordion-list" role="listbox">
                    {INQUIRY_TYPE_OPTIONS.map((option) => (
                      <li key={option}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={inquiryType === option}
                          className={`inquiry-accordion-option${
                            inquiryType === option ? ' is-selected' : ''
                          }`}
                          onClick={() => {
                            setInquiryType(option);
                            setIsTypeOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Row 2: 연락처 / 희망 창업 지역 */}
            <label htmlFor="inquiry-phone-mid" className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>연락처</span>
            </label>
            <div className="inquiry-form-control inquiry-phone-group">
              <div className="inquiry-phone-prefix-wrap">
                <select
                  aria-label="연락처 앞자리"
                  className="inquiry-phone-select"
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                >
                  {PHONE_PREFIX_OPTIONS.map((prefix) => (
                    <option key={prefix} value={prefix}>
                      {prefix}
                    </option>
                  ))}
                </select>
                <svg
                  className="inquiry-phone-chevron"
                  width="10"
                  height="6"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                id="inquiry-phone-mid"
                type="tel"
                inputMode="numeric"
                maxLength={4}
                aria-label="연락처 가운데 자리"
                className="inquiry-input inquiry-phone-input"
                placeholder="0000"
                value={phoneMid}
                onChange={(e) => setPhoneMid(e.target.value.replace(/\D/g, ''))}
              />
              <input
                type="tel"
                inputMode="numeric"
                maxLength={4}
                aria-label="연락처 끝자리"
                className="inquiry-input inquiry-phone-input"
                placeholder="0000"
                value={phoneLast}
                onChange={(e) => setPhoneLast(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="inquiry-grid-spacer" aria-hidden="true" />

            <label htmlFor="inquiry-region" className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>희망 창업 지역</span>
            </label>
            <div className="inquiry-form-control">
              <input
                id="inquiry-region"
                type="text"
                className="inquiry-input"
                placeholder="지역명"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            {/* Row 3: 이메일 / 희망 창업 시기 */}
            <label htmlFor="inquiry-email" className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>이메일</span>
            </label>
            <div className="inquiry-form-control">
              <input
                id="inquiry-email"
                type="email"
                className="inquiry-input"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inquiry-grid-spacer" aria-hidden="true" />

            <span className="inquiry-form-label">
              <span className="inquiry-required-dot" aria-hidden="true" />
              <span>희망 창업 시기</span>
            </span>
            <div
              ref={calendarWrapRef}
              className="inquiry-form-control inquiry-calendar-wrap"
            >
              <button
                type="button"
                className={`inquiry-select-trigger${isCalendarOpen ? ' is-open' : ''}${
                  targetDate ? ' has-value' : ''
                }`}
                aria-expanded={isCalendarOpen}
                onClick={() => {
                  setIsCalendarOpen((prev) => !prev);
                  setIsTypeOpen(false);
                }}
              >
                <span>{targetDate || '희망 창업 시기'}</span>
                <svg
                  className="inquiry-chevron"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isCalendarOpen && (
                <div
                  className="inquiry-calendar-popover"
                  role="dialog"
                  aria-label="2026년 희망 창업 시기 달력"
                >
                  <div className="inquiry-calendar-header">
                    <button
                      type="button"
                      className="inquiry-calendar-nav"
                      disabled={calendarMonth === 0}
                      onClick={() => setCalendarMonth((m) => Math.max(0, m - 1))}
                      aria-label="이전 달"
                    >
                      ‹
                    </button>
                    <span className="inquiry-calendar-month-label">
                      2026년 {calendarMonth + 1}월
                    </span>
                    <button
                      type="button"
                      className="inquiry-calendar-nav"
                      disabled={calendarMonth === 11}
                      onClick={() => setCalendarMonth((m) => Math.min(11, m + 1))}
                      aria-label="다음 달"
                    >
                      ›
                    </button>
                  </div>

                  <div className="inquiry-calendar-weekdays">
                    {CALENDAR_WEEKDAYS.map((weekday) => (
                      <span key={weekday} className="inquiry-calendar-weekday">
                        {weekday}
                      </span>
                    ))}
                  </div>

                  <div className="inquiry-calendar-days">
                    {calendarCells.map((day, idx) =>
                      day === null ? (
                        <span key={`empty-${idx}`} className="inquiry-calendar-empty" />
                      ) : (
                        <button
                          key={day}
                          type="button"
                          className={`inquiry-calendar-day${
                            targetDate === `2026년 ${calendarMonth + 1}월 ${day}일`
                              ? ' is-selected'
                              : ''
                          }`}
                          onClick={() => handleSelectDate(day)}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Row 4: 추가 문의 사항(선택) - 위 입력창과 좌측 라인 일치 */}
            <label
              htmlFor="inquiry-notes"
              className="inquiry-form-label inquiry-form-label--notes"
            >
              <span>
                추가 문의 사항
                <br />
                (선택)
              </span>
            </label>
            <div className="inquiry-form-control inquiry-form-control--full">
              <textarea
                id="inquiry-notes"
                className="inquiry-textarea"
                placeholder="추가 문의 사항이 있으면 입력해주세요"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <label className="inquiry-privacy-row">
            <input
              type="checkbox"
              className="inquiry-privacy-checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
            />
            <span className="inquiry-privacy-text">
              개인정보취급방침을 읽었으며 이에 동의합니다.
            </span>
          </label>

          {submitMessage && (
            <p
              className={`inquiry-submit-feedback inquiry-submit-feedback--${submitMessage.type}`}
              role="status"
            >
              {submitMessage.text}
            </p>
          )}

          <div className="inquiry-form-submit-wrap">
            <button type="submit" className="inquiry-form-submit-btn">
              <span>문의하기</span>
              <img
                src="/assets/images/icon/right-side-icon.svg"
                alt=""
                className="inquiry-form-submit-icon"
                width={33}
                height={27}
                aria-hidden="true"
              />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
