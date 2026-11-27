import React, { useEffect, useRef, useState } from 'react';
import './CamperReservationPage.css';

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

const BRANCH_OPTIONS: readonly string[] = [
  '강남점',
  '수원점',
  '춘천점',
  '강릉점',
  '영월점',
  '태안점',
  '대전점',
  '광주점',
  '대구점',
  '부산점',
  '제주점',
];

const WEEKDAYS: readonly string[] = ['일', '월', '화', '수', '목', '금', '토'];

const normalizeDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDay = (a: Date | null, b: Date | null): boolean =>
  Boolean(
    a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  );

const pad2 = (num: number): string => String(num).padStart(2, '0');

const formatFullDate = (date: Date): string =>
  `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;

/**
 * [담당 영역: Campers] 캠핑카 예약 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 */
export const CamperReservationPage: React.FC = () => {
  const currentStep = 1;
  const today = normalizeDate(new Date());

  const [selectedBranch, setSelectedBranch] = useState<string>(BRANCH_OPTIONS[0]);
  const [isBranchOpen, setIsBranchOpen] = useState<boolean>(false);
  const branchWrapRef = useRef<HTMLDivElement>(null);

  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dateWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBranchOpen && !isDateOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (isBranchOpen && branchWrapRef.current && !branchWrapRef.current.contains(target)) {
        setIsBranchOpen(false);
      }
      if (isDateOpen && dateWrapRef.current && !dateWrapRef.current.contains(target)) {
        setIsDateOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBranchOpen(false);
        setIsDateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBranchOpen, isDateOpen]);

  const handleToggleBranch = () => {
    setIsDateOpen(false);
    setIsBranchOpen((prev) => !prev);
  };

  const handleToggleDate = () => {
    setIsBranchOpen(false);
    setIsDateOpen((prev) => !prev);
  };

  const handleSelectBranch = (branch: string) => {
    setSelectedBranch(branch);
    setIsBranchOpen(false);
  };

  const handleSelectDate = (clicked: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
      return;
    }

    if (clicked < startDate) {
      setStartDate(clicked);
      return;
    }

    setEndDate(clicked);
    setIsDateOpen(false);
  };

  const dateDisplayText = (() => {
    if (!startDate) return 'YYYY.MM.DD';
    if (!endDate || isSameDay(startDate, endDate)) return formatFullDate(startDate);
    return `${formatFullDate(startDate)} - ${formatFullDate(endDate)}`;
  })();

  const viewYear = viewMonth.getFullYear();
  const viewMonthIndex = viewMonth.getMonth();
  const firstWeekday = new Date(viewYear, viewMonthIndex, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonthIndex + 1, 0).getDate();
  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonthIndex === today.getMonth();

  return (
    <div className="camper-reservation-page">
      <section className="camper-reservation-section" aria-label="캠핑카 예약">
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

        <div className="camper-reservation-box">
          <div className="camper-reservation-field">
            <span className="camper-reservation-field-label">대여지점</span>
            <div
              ref={branchWrapRef}
              className={`camper-reservation-select-wrap${isBranchOpen ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="camper-reservation-select-btn"
                aria-haspopup="listbox"
                aria-expanded={isBranchOpen}
                aria-label={`대여지점 선택: ${selectedBranch}`}
                onClick={handleToggleBranch}
              >
                <span className="camper-reservation-select-value">{selectedBranch}</span>
                <img
                  src="/assets/images/icon/drop-down.svg"
                  alt=""
                  className="camper-reservation-select-icon"
                  width={12}
                  height={7}
                  aria-hidden="true"
                />
              </button>

              {isBranchOpen && (
                <ul
                  className="camper-reservation-dropdown"
                  role="listbox"
                  aria-label="대여지점 목록"
                >
                  {BRANCH_OPTIONS.map((branch) => {
                    const isSelected = branch === selectedBranch;
                    return (
                      <li key={branch} role="presentation">
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`camper-reservation-dropdown-item${
                            isSelected ? ' is-selected' : ''
                          }`}
                          onClick={() => handleSelectBranch(branch)}
                        >
                          {branch}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="camper-reservation-field">
            <span className="camper-reservation-field-label">일정 선택</span>
            <div
              ref={dateWrapRef}
              className={`camper-reservation-select-wrap camper-reservation-select-wrap--date${
                isDateOpen ? ' is-open' : ''
              }`}
            >
              <button
                type="button"
                className="camper-reservation-select-btn"
                aria-haspopup="dialog"
                aria-expanded={isDateOpen}
                aria-label={`일정 선택: ${dateDisplayText}`}
                onClick={handleToggleDate}
              >
                <span className="camper-reservation-select-value">{dateDisplayText}</span>
                <img
                  src="/assets/images/icon/calender-icon.svg"
                  alt=""
                  className="camper-reservation-calendar-icon"
                  width={24}
                  height={26}
                  aria-hidden="true"
                />
              </button>

              {isDateOpen && (
                <div
                  className="camper-reservation-datepicker"
                  role="dialog"
                  aria-label="날짜 선택 달력"
                >
                  <div className="camper-datepicker-header">
                    <button
                      type="button"
                      className="camper-datepicker-nav-btn"
                      aria-label="이전 달"
                      disabled={isCurrentMonth}
                      onClick={() =>
                        setViewMonth(new Date(viewYear, viewMonthIndex - 1, 1))
                      }
                    >
                      ‹
                    </button>
                    <span className="camper-datepicker-month">
                      {viewYear}년 {viewMonthIndex + 1}월
                    </span>
                    <button
                      type="button"
                      className="camper-datepicker-nav-btn"
                      aria-label="다음 달"
                      onClick={() =>
                        setViewMonth(new Date(viewYear, viewMonthIndex + 1, 1))
                      }
                    >
                      ›
                    </button>
                  </div>

                  <div className="camper-datepicker-weekdays" aria-hidden="true">
                    {WEEKDAYS.map((day) => (
                      <span key={day} className="camper-datepicker-weekday">
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="camper-datepicker-days">
                    {Array.from({ length: firstWeekday }).map((_, idx) => (
                      <span key={`empty-${idx}`} className="camper-datepicker-empty" />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, idx) => {
                      const dayNum = idx + 1;
                      const cellDate = new Date(viewYear, viewMonthIndex, dayNum);
                      const isPast = cellDate < today;
                      const isStart = isSameDay(cellDate, startDate);
                      const isEnd = isSameDay(cellDate, endDate);
                      const isInRange = Boolean(
                        startDate && endDate && cellDate > startDate && cellDate < endDate
                      );
                      const isToday = isSameDay(cellDate, today);

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          className={[
                            'camper-datepicker-day',
                            isToday ? 'is-today' : '',
                            isStart ? 'is-start' : '',
                            isEnd ? 'is-end' : '',
                            isInRange ? 'is-in-range' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          aria-label={formatFullDate(cellDate)}
                          aria-pressed={isStart || isEnd}
                          onClick={() => handleSelectDate(cellDate)}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
