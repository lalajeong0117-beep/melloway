import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ReservationHeader } from './ReservationHeader';
import './CamperReservationPage.css';

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

const VEHICLE_COUNT_OPTIONS: readonly string[] = ['1대', '2대', '3대', '4대'];
const PASSENGER_COUNT_OPTIONS: readonly string[] = ['1명', '2명', '3명', '4명', '5명', '6명'];

interface ReservationCamperItem {
  id: string;
  name: string;
  spec: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  price: string;
  priceUnit: string;
}

const RESERVATION_CAMPERS: ReservationCamperItem[] = [
  {
    id: 'urban-escape',
    name: 'URBAN ESCAPE',
    spec: '4인승 · 취침 2인',
    image: '/assets/images/Urbanescape-side.png',
    imageWidth: 586,
    imageHeight: 293,
    price: 'KRW 120,000~',
    priceUnit: '1박 기준',
  },
  {
    id: 'adventure-van',
    name: 'ADVENTURE VAN',
    spec: '6인승 · 취침 3인 · 무시동 냉난방',
    image: '/assets/images/Adventure-van-side.png',
    imageWidth: 586,
    imageHeight: 274,
    price: 'KRW 220,000~',
    priceUnit: '1박 기준',
  },
  {
    id: 'retro-home',
    name: 'RETRO HOME',
    spec: '4인승 · 취침 4인 · 무시동 냉난방',
    image: '/assets/images/Retro-home-side.png',
    imageWidth: 586,
    imageHeight: 268,
    price: 'KRW 340,000~',
    priceUnit: '1박 기준',
  },
  {
    id: 'grand-cruiser',
    name: 'GRAND CRUISER',
    spec: '6인승 · 취침 6인 · 무시동 냉난방',
    image: '/assets/images/Grand-cruiser-side.png',
    imageWidth: 586,
    imageHeight: 273,
    price: 'KRW 460,000~',
    priceUnit: '1박 기준',
  },
];

const WEEKDAYS: readonly string[] = ['일', '월', '화', '수', '목', '금', '토'];

type ReservationPopover = 'branch' | 'date' | 'count' | 'passengers' | null;

interface ReservationDropdownProps {
  label: string;
  listLabel: string;
  options: readonly string[];
  value: string;
  isOpen: boolean;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  wrapClassName?: string;
  onToggle: () => void;
  onSelect: (option: string) => void;
}

/**
 * 대여지점·차량 수 공용 드롭다운 선택 필드
 */
const ReservationDropdown: React.FC<ReservationDropdownProps> = ({
  label,
  listLabel,
  options,
  value,
  isOpen,
  wrapRef,
  wrapClassName = '',
  onToggle,
  onSelect,
}) => (
  <div className="camper-reservation-field">
    <span className="camper-reservation-field-label">{label}</span>
    <div
      ref={wrapRef}
      className={`camper-reservation-select-wrap${wrapClassName ? ` ${wrapClassName}` : ''}${
        isOpen ? ' is-open' : ''
        }`}
    >
      <button
        type="button"
        className="camper-reservation-select-btn"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${label} 선택: ${value}`}
        onClick={onToggle}
      >
        <span className="camper-reservation-select-value">{value}</span>
        <img
          src="/assets/images/icon/drop-down.svg"
          alt=""
          className="camper-reservation-select-icon"
          width={12}
          height={7}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className="camper-reservation-dropdown"
          role="listbox"
          aria-label={listLabel}
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`camper-reservation-dropdown-item${isSelected ? ' is-selected' : ''
                    }`}
                  onClick={() => onSelect(option)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </div>
);

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
  const today = normalizeDate(new Date());

  const [openPopover, setOpenPopover] = useState<ReservationPopover>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>(BRANCH_OPTIONS[0]);
  const [selectedCount, setSelectedCount] = useState<string>(VEHICLE_COUNT_OPTIONS[0]);
  const [selectedPassengers, setSelectedPassengers] = useState<string>(
    PASSENGER_COUNT_OPTIONS[0]
  );

  const branchWrapRef = useRef<HTMLDivElement>(null);
  const dateWrapRef = useRef<HTMLDivElement>(null);
  const countWrapRef = useRef<HTMLDivElement>(null);
  const passengersWrapRef = useRef<HTMLDivElement>(null);

  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!openPopover) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const activeRef =
        openPopover === 'branch'
          ? branchWrapRef
          : openPopover === 'date'
            ? dateWrapRef
            : openPopover === 'count'
              ? countWrapRef
              : passengersWrapRef;

      if (activeRef.current && !activeRef.current.contains(target)) {
        setOpenPopover(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPopover(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openPopover]);

  const togglePopover = (target: Exclude<ReservationPopover, null>) => {
    setOpenPopover((prev) => (prev === target ? null : target));
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
    setOpenPopover(null);
  };

  const isDateOpen = openPopover === 'date';

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
        <ReservationHeader currentStep={1} />

        <div className="camper-reservation-box">
          <ReservationDropdown
            label="대여지점"
            listLabel="대여지점 목록"
            options={BRANCH_OPTIONS}
            value={selectedBranch}
            isOpen={openPopover === 'branch'}
            wrapRef={branchWrapRef}
            onToggle={() => togglePopover('branch')}
            onSelect={(branch) => {
              setSelectedBranch(branch);
              setOpenPopover(null);
            }}
          />

          <div className="camper-reservation-field">
            <span className="camper-reservation-field-label">일정 선택</span>
            <div
              ref={dateWrapRef}
              className={`camper-reservation-select-wrap camper-reservation-select-wrap--date${isDateOpen ? ' is-open' : ''
                }`}
            >
              <button
                type="button"
                className="camper-reservation-select-btn"
                aria-haspopup="dialog"
                aria-expanded={isDateOpen}
                aria-label={`일정 선택: ${dateDisplayText}`}
                onClick={() => togglePopover('date')}
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

          <ReservationDropdown
            label="차량 수"
            listLabel="차량 수 목록"
            options={VEHICLE_COUNT_OPTIONS}
            value={selectedCount}
            isOpen={openPopover === 'count'}
            wrapRef={countWrapRef}
            wrapClassName="camper-reservation-select-wrap--count"
            onToggle={() => togglePopover('count')}
            onSelect={(count) => {
              setSelectedCount(count);
              setOpenPopover(null);
            }}
          />

          <ReservationDropdown
            label="탑승 인원"
            listLabel="탑승 인원 목록"
            options={PASSENGER_COUNT_OPTIONS}
            value={selectedPassengers}
            isOpen={openPopover === 'passengers'}
            wrapRef={passengersWrapRef}
            wrapClassName="camper-reservation-select-wrap--count"
            onToggle={() => togglePopover('passengers')}
            onSelect={(passengers) => {
              setSelectedPassengers(passengers);
              setOpenPopover(null);
            }}
          />

          <button type="button" className="camper-reservation-search-btn">
            차량 검색
          </button>
        </div>

        <div className="camper-reservation-list" aria-label="예약 가능 차량 목록">
          <div className="camper-reservation-divider" aria-hidden="true" />

          {RESERVATION_CAMPERS.map((camper) => (
            <React.Fragment key={camper.id}>
              <article className="camper-reservation-item">
                <div className="camper-reservation-item-image-wrap">
                  <img
                    src={camper.image}
                    alt={camper.name}
                    className="camper-reservation-item-image"
                    width={camper.imageWidth}
                    height={camper.imageHeight}
                  />
                </div>

                <div className="camper-reservation-item-info">
                  <h2 className="camper-reservation-item-name">{camper.name}</h2>
                  <p className="camper-reservation-item-spec">{camper.spec}</p>
                  <Link
                    to={`${ROUTES.CAMPERS_MELLOWAY}?car=${camper.id}`}
                    className="camper-reservation-item-detail-link"
                  >
                    자세히 보기 →
                  </Link>

                  <div className="camper-reservation-item-bottom">
                    <div className="camper-reservation-item-price-group">
                      <p className="camper-reservation-item-price">{camper.price}</p>
                      <span className="camper-reservation-item-unit">
                        {camper.priceUnit}
                      </span>
                    </div>

                    <Link
                      to={`${ROUTES.CAMPERS_RESERVATION_OPTIONS}?car=${camper.id}`}
                      className="camper-reservation-item-reserve-btn"
                    >
                      예약하기
                    </Link>
                  </div>
                </div>
              </article>

              <div className="camper-reservation-divider" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
