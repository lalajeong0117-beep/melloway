import { useCallback, useEffect, useMemo, useState } from 'react';
import leftArrowIcon from '../../../../assets/images/icon/Left AB.svg';
import rightArrowIcon from '../../../../assets/images/icon/Right AB.svg';

/**
 * Events & Benefits (이벤트 · 혜택) 페이지 전용 데이터 및 스크립트
 */
export const EVENTS_KV_IMAGE = '/assets/images/event-kv.jpg';
export const EVENTS_KV_TITLE = 'Events & Benefits';
export const EVENTS_KV_SUBTITLE =
  '멜로웨이가 준비한 특별한 시즌 혜택과 프로모션을 만나보세요.';
export const EVENT_LEFT_ICON = leftArrowIcon;
export const EVENT_RIGHT_ICON = rightArrowIcon;
export const EVENTS_PER_PAGE = 8;

export type EventTabKey = 'all' | 'ongoing';

export interface EventTabItem {
  key: EventTabKey;
  label: string;
}

export interface EventCardItem {
  id: string;
  image?: string;
  title?: string;
  modalTitle?: string;
  modalLines?: string[];
  status: 'ongoing' | 'upcoming';
}

export const EVENT_TABS: EventTabItem[] = [
  { key: 'all', label: '전체' },
  { key: 'ongoing', label: '진행중' },
];

export const EVENT_ITEMS: EventCardItem[] = [
  {
    id: 'birth-event',
    image: '/assets/images/birth-event.jpg',
    title: '생일자 할인 10% OFF',
    modalLines: [
      '상시 진행 · 생일 당월 예약 시 적용',
      '생일 달 전 차량 10% 즉시 할인',
      '2026.01.01 - 2999.12.31 (상시 운영)',
    ],
    status: 'ongoing',
  },
  {
    id: 'group-event',
    image: '/assets/images/group-event.jpg',
    title: '4인 이상 할인 15% OFF',
    modalTitle: '4인 이상 그룹 할인 15% OFF',
    modalLines: [
      '상시 진행 · 4인 이상 동반 예약 시 적용',
      '대형·가족형 차종 포함 15% 즉시 할인',
      '2026.01.01 - 2026.12.31 (상시 운영)',
    ],
    status: 'ongoing',
  },
  {
    id: 'dogday-event',
    image: '/assets/images/dogday-event.jpg',
    title: '도그데이 할인 7% OFF',
    modalLines: [
      '상시 진행 · 반려견 동반 차량 예약 시 적용',
      '펫 전용 차박 모델 대여료 7% 즉시 할인',
      '2026.01.01 - 2026.12.31 (상시 운영)',
    ],
    status: 'ongoing',
  },
  {
    id: 'customer-event',
    image: '/assets/images/customer-event.jpg',
    title: '신규 고객 5% OFF',
    modalLines: [
      '회원가입 후 두 번째 대여 예약 시 적용',
      '총 결제 금액의 5% 즉시 할인 (최대 한도 없음)',
      '2026.01.01 - 2026.12.31 (상시 운영)',
    ],
    status: 'ongoing',
  },
  {
    id: 'dog-camping-event',
    image: '/assets/images/dog-camping-event.jpg',
    title: '댕댕이와 함께 차박 캠핑',
    modalLines: [
      '펫 전용 차량 예약 시 어메니티 무상 제공',
      '카시트·식기 세트 & 제휴 캠핑장 입장권 증정',
      '2026.01.01 - 2026.12.31 (상시 운영)',
    ],
    status: 'ongoing',
  },
  {
    id: 'month-camping-event',
    image: '/assets/images/month-camping-event.jpg',
    title: '이달의 차박 루트 가이드',
    modalLines: [
      '에디터 엄선 계절별 추천 차박 명소 큐레이션',
      '지역 로컬 맛집·카페 제휴 할인 지도 제공',
      '2026.01.01 - 2026.12.31 (매월 업데이트)',
    ],
    status: 'ongoing',
  },
  {
    id: 'event-coming-soon-1',
    status: 'upcoming',
  },
  {
    id: 'event-coming-soon-2',
    status: 'upcoming',
  },
];

export const useEventTabs = (initialTab: EventTabKey = 'all') => {
  const [activeTab, setActiveTab] = useState<EventTabKey>(initialTab);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEvent, setSelectedEvent] = useState<EventCardItem | null>(null);

  const filteredEvents = useMemo(() => {
    if (activeTab === 'ongoing') {
      return EVENT_ITEMS.filter((item) => item.status === 'ongoing');
    }
    return EVENT_ITEMS;
  }, [activeTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)
  );

  const visibleEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleTabChange = useCallback((tab: EventTabKey) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  useEffect(() => {
    if (!selectedEvent) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent]);

  return {
    activeTab,
    setActiveTab: handleTabChange,
    visibleEvents,
    currentPage,
    totalPages,
    setCurrentPage,
    goToPrevPage,
    goToNextPage,
    selectedEvent,
    openEventModal: (item: EventCardItem) => setSelectedEvent(item),
    closeEventModal: () => setSelectedEvent(null),
  };
};
