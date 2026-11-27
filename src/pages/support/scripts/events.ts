import { useMemo, useState } from 'react';

/**
 * Events & Benefits (이벤트 · 혜택) 페이지 전용 데이터 및 스크립트
 */
export const EVENTS_KV_IMAGE = '/assets/images/event-kv.jpg';
export const EVENTS_KV_TITLE = 'Events & Benefits';
export const EVENTS_KV_SUBTITLE =
  '멜로웨이가 준비한 특별한 시즌 혜택과 프로모션을 만나보세요.';

export type EventTabKey = 'all' | 'ongoing';

export interface EventTabItem {
  key: EventTabKey;
  label: string;
}

export interface EventCardItem {
  id: string;
  image?: string;
  title?: string;
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
    status: 'ongoing',
  },
  {
    id: 'group-event',
    image: '/assets/images/group-event.jpg',
    title: '4인 이상 할인 15% OFF',
    status: 'ongoing',
  },
  {
    id: 'dogday-event',
    image: '/assets/images/dogday-event.jpg',
    title: '도그데이 할인 7% OFF',
    status: 'ongoing',
  },
  {
    id: 'customer-event',
    image: '/assets/images/customer-event.jpg',
    title: '신규 고객 5% OFF',
    status: 'ongoing',
  },
  {
    id: 'dog-camping-event',
    image: '/assets/images/dog-camping-event.jpg',
    title: '댕댕이와 함께 차박 캠핑',
    status: 'ongoing',
  },
  {
    id: 'month-camping-event',
    image: '/assets/images/month-camping-event.jpg',
    title: '이달의 차박 루트 가이드',
    status: 'ongoing',
  },
  {
    id: 'event-coming-soon',
    status: 'upcoming',
  },
];

export const useEventTabs = (initialTab: EventTabKey = 'all') => {
  const [activeTab, setActiveTab] = useState<EventTabKey>(initialTab);

  const visibleEvents = useMemo(() => {
    if (activeTab === 'ongoing') {
      return EVENT_ITEMS.filter((item) => item.status === 'ongoing');
    }
    return EVENT_ITEMS;
  }, [activeTab]);

  return { activeTab, setActiveTab, visibleEvents };
};
