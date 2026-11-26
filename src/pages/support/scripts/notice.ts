import { useCallback, useEffect, useMemo, useState } from 'react';

export type NoticeCategory = '전체' | '공지' | '안내' | '업데이트' | '점검';

export interface NoticeItem {
  id: number;
  category: Exclude<NoticeCategory, '전체'>;
  title: string;
  date: string;
  views: number;
  isPinned?: boolean;
  isNew?: boolean;
  content: string[];
}

export const NOTICE_CATEGORIES: NoticeCategory[] = [
  '전체',
  '공지',
  '안내',
  '업데이트',
  '점검',
];

export const ITEMS_PER_PAGE = 5;

export const NOTICE_ITEMS: NoticeItem[] = [
  {
    id: 9,
    category: '공지',
    title: '[공지] 2026년 12월 성수기 캠핑카 사전 예약 오픈 및 이용 수칙 안내',
    date: '2026.11.24',
    views: 428,
    isPinned: true,
    isNew: true,
    content: [
      '안녕하세요, MELLOWAY입니다.',
      '다가오는 2026년 연말 및 겨울 성수기(12월 1일 ~ 1월 31일) 캠핑카 사전 예약이 오픈되었습니다.',
      '전 차량 무시동 히터 및 동계 단열 패키지 점검이 완료되어 한겨울에도 따뜻하고 쾌적한 캠핑을 즐기실 수 있습니다.',
      '성수기 기간에는 예약 변경 및 취소 수수료 규정이 평수기와 상이하오니 예약 확정 전 대여 약관을 반드시 확인해 주시기 바랍니다.',
    ],
  },
  {
    id: 8,
    category: '안내',
    title: '멜로웨이 전국 신규 직영·가맹 지점 4곳 오픈 안내 (강릉·여수·제주·춘천)',
    date: '2026.11.19',
    views: 315,
    isPinned: true,
    isNew: true,
    content: [
      '더 가까운 곳에서 MELLOWAY를 만나보실 수 있도록 강릉점, 여수점, 제주 애월점, 춘천점이 새롭게 문을 열었습니다.',
      '신규 오픈 지점에서는 RAVY, ADVENTURE VAN, RETRO HOME 등 주요 라인업을 모두 대여하실 수 있으며, 지점별 오픈 기념 웰컴 키트 증정 이벤트도 함께 진행됩니다.',
      '가까운 지점 위치와 운영 시간은 About Us > 전국 지점 안내 페이지에서 확인하실 수 있습니다.',
    ],
  },
  {
    id: 7,
    category: '업데이트',
    title: '전 차종 통합 예약 시스템 리뉴얼 및 실시간 차량 잔여 확인 기능 추가',
    date: '2026.11.12',
    views: 289,
    content: [
      '고객 여러분의 더욱 편리한 예약을 위해 멜로웨이 통합 예약 시스템이 업데이트되었습니다.',
      '이제 지점별·차종별 실시간 대여 가능 일정을 한눈에 비교하고, 원하는 옵션(반려견 동반, 차박 매트, 루프탑 어닝 등)을 예약 단계에서 바로 선택할 수 있습니다.',
      '앞으로도 더 직관적이고 안정적인 서비스 환경을 제공하겠습니다.',
    ],
  },
  {
    id: 6,
    category: '점검',
    title: '[시스템 점검] 11월 30일(월) 02:00 ~ 04:00 예약 서버 정기 점검 안내',
    date: '2026.11.08',
    views: 194,
    content: [
      '안정적인 서비스 제공을 위한 서버 정기 점검이 진행될 예정입니다.',
      '점검 일시: 2026년 11월 30일(월) 새벽 02:00 ~ 04:00 (약 2시간)',
      '점검 시간 동안 신규 예약 신청 및 결제 서비스 이용이 일시 제한될 수 있으며, 기존 예약 조회 및 긴급 고객센터는 정상 운영됩니다.',
    ],
  },
  {
    id: 5,
    category: '안내',
    title: '예비 창업자를 위한 12월 MELLOWAY 소자본 창업 사업설명회 참가 신청 안내',
    date: '2026.11.02',
    views: 362,
    content: [
      '캠핑카 렌탈 프랜차이즈 창업을 준비하시는 예비 파트너분들을 위해 12월 정기 사업설명회를 개최합니다.',
      '본사 통합 마케팅 및 예약 배정 구조, 차량 유지보수 지원, 초기 투자 비용 및 수익 모델 사례를 상세히 공유드립니다.',
      '참가 신청은 Business > 가맹·제휴 문의 페이지에서 접수하실 수 있습니다.',
    ],
  },
  {
    id: 4,
    category: '공지',
    title: '반려견 동반 캠핑카 이용 가이드 및 도그데이 전용 케어 키트 안내',
    date: '2026.10.25',
    views: 511,
    content: [
      '반려견과 함께 떠나는 고객님들을 위해 전 지점에서 반려견 전용 방수 시트 커버 및 안전벨트 하네스를 기본 제공하고 있습니다.',
      '차량 반납 후에는 전문 살균·탈취 클리닝을 의무화하여 다음 이용 고객분들도 쾌적하게 이용하실 수 있습니다.',
      '매주 수요일 도그데이 할인 혜택과 함께 즐거운 반려견 동반 여행을 경험해 보세요.',
    ],
  },
  {
    id: 3,
    category: '업데이트',
    title: 'GRAND CRUISER 6인승 패밀리 라인업 안전 사양 업그레이드 안내',
    date: '2026.10.18',
    views: 274,
    content: [
      '가족 단위 여행객에게 가장 인기가 높은 GRAND CRUISER 모델의 전 차량에 360도 어라운드 뷰와 후방 충돌 방지 보조 시스템이 추가 적용되었습니다.',
      '대형 캠핑카 운전이 처음인 고객님도 더욱 안심하고 주행 및 주차하실 수 있습니다.',
    ],
  },
  {
    id: 2,
    category: '안내',
    title: '캠핑카 대여 시 면허 조건(2종 보통 이상) 및 보험 보장 범위 안내',
    date: '2026.10.10',
    views: 643,
    content: [
      'MELLOWAY에서 운영하는 모든 캠핑카(RAVY, ADVENTURE VAN, RETRO HOME, GRAND CRUISER)는 만 26세 이상, 운전 경력 1년 이상, 2종 보통 이상 면허 보유 시 대여 가능합니다.',
      '기본 대여료에 종합보험(대인·대물·자손)이 포함되어 있으며, 고객 부담금을 낮추는 자차 완전 면책 옵션도 선택하실 수 있습니다.',
    ],
  },
  {
    id: 1,
    category: '공지',
    title: 'MELLOWAY 공식 홈페이지 및 고객 지원 센터 오픈 안내',
    date: '2026.10.01',
    views: 812,
    content: [
      'MELLOWAY 공식 웹 플랫폼이 새롭게 오픈했습니다.',
      '차량 라인업 소개부터 전국 지점 안내, 가맹 문의 및 고객 지원 서비스까지 한곳에서 편리하게 이용해 보시기 바랍니다.',
    ],
  },
];

const CATEGORY_CLASS_MAP: Record<NoticeItem['category'], string> = {
  공지: 'support-notice-cat--notice',
  안내: 'support-notice-cat--guide',
  업데이트: 'support-notice-cat--update',
  점검: 'support-notice-cat--check',
};

export const getNoticeCategoryClass = (category: NoticeItem['category']): string =>
  CATEGORY_CLASS_MAP[category];

/**
 * 공지 사항 게시판 상태 및 필터/검색/페이지네이션/상세보기 제어 훅
 */
export const useNoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);

  const filteredNotices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return NOTICE_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === '전체' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;
      const inTitle = item.title.toLowerCase().includes(normalizedQuery);
      const inContent = item.content.some((line) =>
        line.toLowerCase().includes(normalizedQuery)
      );
      return inTitle || inContent;
    }).sort((a, b) => {
      if (Boolean(a.isPinned) !== Boolean(b.isPinned)) {
        return a.isPinned ? -1 : 1;
      }
      return b.id - a.id;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

  const activeNoticeIndex = useMemo(() => {
    if (selectedNoticeId === null) return -1;
    return filteredNotices.findIndex((item) => item.id === selectedNoticeId);
  }, [filteredNotices, selectedNoticeId]);

  const activeNotice =
    activeNoticeIndex >= 0 ? filteredNotices[activeNoticeIndex] : null;

  const prevNotice =
    activeNoticeIndex > 0 ? filteredNotices[activeNoticeIndex - 1] : null;

  const nextNotice =
    activeNoticeIndex >= 0 && activeNoticeIndex < filteredNotices.length - 1
      ? filteredNotices[activeNoticeIndex + 1]
      : null;

  const handleCategoryChange = useCallback((category: NoticeCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory('전체');
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const openNotice = useCallback((id: number) => {
    setSelectedNoticeId(id);
  }, []);

  const closeNotice = useCallback(() => {
    setSelectedNoticeId(null);
  }, []);

  useEffect(() => {
    if (selectedNoticeId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNoticeId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNoticeId]);

  return {
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    totalCount: filteredNotices.length,
    paginatedNotices,
    activeNotice,
    prevNotice,
    nextNotice,
    setCurrentPage,
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
    openNotice,
    closeNotice,
  };
};
