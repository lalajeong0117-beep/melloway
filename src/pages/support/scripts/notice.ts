import { useCallback, useEffect, useMemo, useState } from 'react';
import magnifierIcon from '../../../../assets/images/Magnifier.svg';

export const NOTICE_MAGNIFIER_ICON = magnifierIcon;

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
}

export const ITEMS_PER_PAGE = 5;

export const NOTICE_ITEMS: NoticeItem[] = [
  {
    id: 10,
    title: '차량 보험 적용 범위 및 사고 발생 시 대처 안내',
    date: '2026.11.25',
  },
  {
    id: 9,
    title: '안전한 캠핑 여행을 위한 차량 사용·안전 수칙 안내',
    date: '2026.11.25',
  },
  {
    id: 8,
    title: '캠핑카 예약 변경 및 취소·환불 기준 안내',
    date: '2026.11.25',
  },
  {
    id: 7,
    title: '캠핑카 기본 제공 물품 및 추가 대여 옵션 안내',
    date: '2026.11.25',
  },
  {
    id: 6,
    title: '전국 가맹점 운영시간 및 차량 픽업 장소 안내',
    date: '2026.11.25',
  },
  {
    id: 5,
    title: '반려동물 동반 탑승 규정 및 전용 케어 서비스 안내',
    date: '2026.11.25',
  },
  {
    id: 4,
    title: '운전면허 자격 요건 및 추가 운전자 등록 기준 안내',
    date: '2026.11.25',
  },
  {
    id: 3,
    title: '동절기 캠핑카 동파 예방 및 무시동 히터 사용 안내',
    date: '2026.11.25',
  },
  {
    id: 2,
    title: '캠핑카 대여·반납 절차 및 이용 안내',
    date: '2026.11.25',
  },
  {
    id: 1,
    title: '차량 반납 시 연료 충전 및 실내 정리 기준 안내',
    date: '2026.11.25',
  },
];

/**
 * 공지 사항 검색 및 페이지네이션 상태 제어 훅
 */
export const useNoticeBoard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredNotices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return NOTICE_ITEMS;

    return NOTICE_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotices.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  return {
    searchQuery,
    currentPage,
    totalPages,
    totalCount: filteredNotices.length,
    paginatedNotices,
    setCurrentPage,
    handleSearchChange,
  };
};
