import { useCallback, useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import magnifierIcon from '../../../../assets/images/icon/Magnifier.svg';
import downChevronIcon from '../../../../assets/images/icon/Down chevron.svg';
import leftArrowIcon from '../../../../assets/images/icon/Left AB.svg';
import rightArrowIcon from '../../../../assets/images/icon/Right AB.svg';
import { useSupportLayoutRefresh } from './supportNav';

gsap.registerPlugin(ScrollTrigger);

export const FAQ_MAGNIFIER_ICON = magnifierIcon;
export const FAQ_CHEVRON_ICON = downChevronIcon;
export const FAQ_LEFT_ICON = leftArrowIcon;
export const FAQ_RIGHT_ICON = rightArrowIcon;

export type FaqCategory =
  | '전체'
  | '예약·변경'
  | '운전자·자격'
  | '보험·보상'
  | '고장·사고'
  | '이용·반납'
  | '부가상품';

export type FaqItemCategory = Exclude<FaqCategory, '전체'>;

export interface FaqItem {
  id: number;
  category: FaqItemCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  '전체',
  '예약·변경',
  '운전자·자격',
  '보험·보상',
  '고장·사고',
  '이용·반납',
  '부가상품',
];

export const FAQ_ITEMS_PER_PAGE = 6;

/**
 * 18개 FAQ 데이터 (전체 탭 1·2·3페이지 각 6문항씩 6개 카테고리 순차 배치)
 */
export const FAQ_ITEMS: FaqItem[] = [
  // 1페이지 (각 카테고리 1번째 문항)
  {
    id: 1,
    category: '예약·변경',
    question: '캠핑카는 어떻게 예약하나요?',
    answer:
      '홈페이지에서 이용 지역, 희망 날짜 및 차량을 선택한 후 예약을 진행하실 수 있습니다.',
  },
  {
    id: 2,
    category: '운전자·자격',
    question: '캠핑카를 운전하려면 어떤 면허가 필요한가요?',
    answer:
      '차량의 종류와 규격에 따라 필요한 운전면허가 다르므로 예약 전 차량별 운전 자격을 확인해 주세요.',
  },
  {
    id: 3,
    category: '보험·보상',
    question: '캠핑카 대여 비용에 보험료가 포함되어 있나요?',
    answer:
      '보험료 포함 여부는 차량 및 대여 상품에 따라 다르며, 예약 시 보험 가입 조건을 확인하실 수 있습니다.',
  },
  {
    id: 4,
    category: '고장·사고',
    question: '여행 중 캠핑카가 고장 나면 어떻게 하나요?',
    answer:
      '안전한 장소에 차량을 정차하신 후 대여한 가맹점 또는 긴급출동 서비스에 연락해 주세요.',
  },
  {
    id: 5,
    category: '이용·반납',
    question: '캠핑카 인수 및 반납은 어디에서 하나요?',
    answer:
      '예약 시 지정한 가맹점에서 차량을 인수하고 반납하시면 됩니다. 자세한 장소와 시간은 예약 정보를 확인해 주세요.',
  },
  {
    id: 6,
    category: '부가상품',
    question: '캠핑카에 기본적으로 어떤 캠핑용품이 제공되나요?',
    answer:
      '차량에 따라 침구류, 취사도구, 테이블, 캠핑 의자 등이 제공될 수 있으며, 자세한 구성은 차량 상세 페이지에서 확인해 주세요.',
  },

  // 2페이지 (각 카테고리 2번째 문항)
  {
    id: 7,
    category: '예약·변경',
    question: '예약한 날짜나 차량을 변경할 수 있나요?',
    answer:
      '예약한 가맹점의 차량 및 일정에 따라 변경이 가능하며, 해당 가맹점 또는 고객센터를 통해 문의해 주세요.',
  },
  {
    id: 8,
    category: '운전자·자격',
    question: '캠핑카 대여 시 나이와 운전 경력 제한이 있나요?',
    answer:
      '차량 및 보험 가입 조건에 따라 연령과 운전 경력에 제한이 있을 수 있으며, 차량별 대여 조건에서 확인하실 수 있습니다.',
  },
  {
    id: 9,
    category: '보험·보상',
    question: '차량 사고 발생 시 자기부담금은 얼마인가요?',
    answer:
      '자기부담금은 가입한 보험 상품과 보장 범위, 사고 유형에 따라 달라질 수 있습니다.',
  },
  {
    id: 10,
    category: '고장·사고',
    question: '캠핑카 이용 중 교통사고가 발생하면 어떻게 하나요?',
    answer:
      '탑승자의 안전을 우선 확보하고, 필요한 경우 119 또는 112에 신고한 후 보험사와 해당 가맹점에 연락해 주세요.',
  },
  {
    id: 11,
    category: '이용·반납',
    question: '캠핑카 이용 시간을 연장할 수 있나요?',
    answer:
      '이후 예약 일정에 따라 이용 연장이 가능할 수 있으며, 추가 비용이 발생할 수 있으므로 해당 가맹점에 미리 문의해 주세요.',
  },
  {
    id: 12,
    category: '부가상품',
    question: '캠핑용품을 추가로 대여할 수 있나요?',
    answer:
      '가맹점별로 제공하는 추가 대여 용품이 다르며, 예약 시 이용 가능한 부가상품과 비용을 확인하실 수 있습니다.',
  },

  // 3페이지 (각 카테고리 3번째 문항)
  {
    id: 13,
    category: '예약·변경',
    question: '예약 취소 및 환불은 어떻게 진행되나요?',
    answer:
      '예약 취소 및 환불은 예약 시 안내된 취소 규정에 따라 진행되며, 취소 시점에 따라 수수료가 발생할 수 있습니다.',
  },
  {
    id: 14,
    category: '운전자·자격',
    question: '예약자 외에 다른 사람도 운전할 수 있나요?',
    answer:
      '운전 자격을 충족하는 경우 추가 운전자 등록이 가능할 수 있으며, 차량 인수 전 해당 가맹점에 문의해 주세요.',
  },
  {
    id: 15,
    category: '보험·보상',
    question: '캠핑카 내부 시설이나 용품이 파손되면 어떻게 하나요?',
    answer:
      '파손된 시설 및 용품의 상태와 보험 보장 여부에 따라 수리비 또는 교체 비용이 청구될 수 있습니다.',
  },
  {
    id: 16,
    category: '고장·사고',
    question: '차량 내부의 전기나 수도 시설이 작동하지 않으면 어떻게 하나요?',
    answer:
      '차량 이용 매뉴얼을 확인해 주시고, 문제가 해결되지 않는 경우 해당 가맹점에 연락해 주세요.',
  },
  {
    id: 17,
    category: '이용·반납',
    question: '차량 반납 시 주의해야 할 사항이 있나요?',
    answer:
      '개인 소지품과 차량 내부 정리 상태를 확인해 주시고, 연료 및 오수 처리 등은 가맹점에서 안내한 반납 기준을 준수해 주세요.',
  },
  {
    id: 18,
    category: '부가상품',
    question: '반려동물과 함께 캠핑카를 이용할 수 있나요?',
    answer:
      '반려동물 동반이 가능한 차량에 한해 이용하실 수 있으며, 예약 전 동반 가능 여부와 추가 비용을 확인해 주세요.',
  },
];

/**
 * 자주 묻는 질문 검색, 카테고리 탭, 아코디언, 페이지네이션 상태 제어 훅
 */
export const useFaqBoard = () => {
  useSupportLayoutRefresh();

  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === '전체' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;
      return (
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFaqs.length / FAQ_ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      AOS.refresh();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [selectedCategory, currentPage, expandedId, searchQuery]);

  const paginatedFaqs = useMemo(() => {
    const startIndex = (currentPage - 1) * FAQ_ITEMS_PER_PAGE;
    return filteredFaqs.slice(startIndex, startIndex + FAQ_ITEMS_PER_PAGE);
  }, [filteredFaqs, currentPage]);

  const handleCategoryChange = useCallback((category: FaqCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setExpandedId(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    setExpandedId(null);
  }, []);

  const toggleAccordion = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const next = Math.max(1, prev - 1);
      if (next !== prev) setExpandedId(null);
      return next;
    });
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const next = Math.min(totalPages, prev + 1);
      if (next !== prev) setExpandedId(null);
      return next;
    });
  }, [totalPages]);

  return {
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    expandedId,
    paginatedFaqs,
    handleCategoryChange,
    handleSearchChange,
    toggleAccordion,
    handlePageChange,
    goToPrevPage,
    goToNextPage,
  };
};
