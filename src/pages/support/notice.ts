import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import magnifierIcon from '../../../assets/images/icon/Magnifier.svg';
import leftArrowIcon from '../../../assets/images/icon/Left AB.svg';
import rightArrowIcon from '../../../assets/images/icon/Right AB.svg';

gsap.registerPlugin(ScrollTrigger);

export const NOTICE_MAGNIFIER_ICON = magnifierIcon;
export const NOTICE_LEFT_ICON = leftArrowIcon;
export const NOTICE_RIGHT_ICON = rightArrowIcon;

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  paragraphs?: string[][];
}

export const ITEMS_PER_PAGE = 5;

export const NOTICE_ITEMS: NoticeItem[] = [
  {
    id: 10,
    title: '차량 보험 적용 범위 및 사고 발생 시 대처 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '차량 이용 전 보험 적용 범위와 자기부담금, 보상 제외 사항을 확인해 주세요.',
        '보험 및 보상 조건은 차량과 계약 내용에 따라 다를 수 있습니다. 등록된 운전자 범위와 사고 발생 시 부담할 수 있는 비용 등 세부 사항은',
        '차량 인수 전 확인해 주시기 바랍니다.',
      ],
      [
        '사고가 발생하면 우선 탑승자와 주변의 안전을 확보하고, 필요한 경우 긴급 신고를 진행해 주세요.',
        '이후 이용 지점과 안내받은 보험 접수처에 연락해 사고 상황을 전달해 주시기 바랍니다.',
        '안전이 확보된 범위에서 현장과 차량 상태를 사진으로 기록하고, 수리·견인 진행 전에는 담당자와 처리 절차를 확인해 주세요.',
      ],
    ],
  },
  {
    id: 9,
    title: '안전한 캠핑 여행을 위한 차량 사용·안전 수칙 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '안전하고 편안한 여행을 위해 출발 전 차량과 내부 시설의 사용 방법을 충분히 확인해 주세요.',
        '캠핑카는 일반 승용차보다 차체가 크므로 차량 높이와 폭을 확인하고, 좁은 도로와 높이 제한 구간에서는 주의해 주세요.',
        '주행 중에는 모든 탑승자가 지정된 좌석에서 안전벨트를 착용하고, 물품이 떨어지지 않도록 수납공간을 고정해 주시기 바랍니다.',
      ],
      [
        '조리·전기·가스 설비는 차량별 사용 안내에 따라 이용해 주세요. 차량 내부에서 숯불이나 휴대용 화로를 사용하지 마시고,',
        '시설 사용 중 이상이 발생하면 사용을 중단한 뒤 이용 지점으로 연락해 주세요.',
      ],
    ],
  },
  {
    id: 8,
    title: '캠핑카 예약 변경 및 취소·환불 기준 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '여행 일정이 변경되었다면 예약하신 지점 또는 예약 접수 채널을 통해 변경·취소를 문의해 주세요.',
        '이용 날짜와 차종, 대여 기간의 변경은 차량 예약 상황에 따라 가능 여부가 달라질 수 있으며,',
        '변경 내용에 따라 요금 차액이 발생할 수 있습니다.',
      ],
      [
        '예약 취소 시에는 예약 당시 안내된 취소·환불 기준이 적용됩니다. 취소 접수 시점과 예약 조건에 따라 환불 금액이 달라질 수 있으므로,',
        '예약 전 해당 내용을 확인해 주세요. 환불 처리 일정은 결제 수단과 처리 상황에 따라 달라질 수 있습니다.',
      ],
    ],
  },
  {
    id: 7,
    title: '캠핑카 기본 제공 물품 및 추가 대여 옵션 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '가벼운 여행 준비를 위해 예약하신 차량의 기본 제공 물품과 추가 대여 옵션을 확인해 주세요.',
        '차량 내부 시설과 제공 물품은 차종 및 이용 지점에 따라 다를 수 있습니다. 침구류, 조리도구, 야외 테이블 등',
        '필요한 물품의 포함 여부를 출발 전에 확인해 주시기 바랍니다.',
      ],
      [
        '추가 대여 물품은 재고와 예약 상황에 따라 이용이 제한될 수 있으므로, 필요한 경우 예약 시 함께 문의해 주세요.',
        '추가 요금과 사용·반납 기준도 함께 확인해 주시기 바랍니다.',
      ],
    ],
  },
  {
    id: 6,
    title: '전국 가맹점 운영시간 및 차량 픽업 장소 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '원활한 차량 인수를 위해 방문하실 지점의 운영시간과 픽업 장소를 미리 확인해 주세요.',
        '운영시간과 휴무일, 차량 인수·반납 가능 시간은 지점마다 다를 수 있습니다. 매장 주소와 실제 차량 픽업 장소가 동일한지도',
        '예약 시 함께 확인해 주시기 바랍니다. 방문 일정이 변경되거나 도착이 늦어질 경우 해당 지점으로 사전에 연락해 주세요.',
        '운영시간 외 차량 인수·반납 가능 여부는 이용 지점에 문의해 주시기 바랍니다.',
      ],
    ],
  },
  {
    id: 5,
    title: '반려동물 동반 탑승 규정 및 전용 케어 서비스 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '반려동물과 함께하는 안전한 여행을 위해 사전 동반 옵션 선택이 필수입니다.',
        "예약 시 '펫 프렌들리 패키지' 또는 '반려동물 클리닝 케어' 옵션을 선택해 주셔야 탑승이 가능하며,",
        '미선택 후 현장 동반 시 이용이 제한될 수 있습니다.',
      ],
      [
        '쾌적한 실내 환경 유지를 위해 차량 내 배변 패드 및 전용 방수 커버 사용을 권장합니다.',
        '반납 시 과도한 오염이나 파손이 확인될 경우 별도의 특수 클리닝 및 수리 비용이 청구될 수 있으니 유의해 주시기 바랍니다.',
      ],
    ],
  },
  {
    id: 4,
    title: '운전면허 자격 요건 및 추가 운전자 등록 기준 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '모든 캠핑카는 도로교통법상 유효한 운전면허 소지자에 한해 대여가 가능합니다.',
        '차량 모델에 따라 2종 보통(오토) 또는 1종 보통 이상의 면허가 필요하며,',
        '대여자 본인은 만 26세 이상 및 운전 경력 1년 이상 조건을 충족해야 합니다.',
        '계약 시 등록된 운전자 외 제3자의 운전은 보험 적용이 불가하오니 반드시 사전에 등록해 주세요.',
        '추가 운전자는 최대 1인까지 무료 등록 가능하며, 차량 픽업 시 모든 운전자의 실물 운전면허증 지참이 필수입니다.',
      ],
    ],
  },
  {
    id: 3,
    title: '동절기 캠핑카 동파 예방 및 무시동 히터 사용 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '기온이 영하로 떨어지는 동절기에는 차량 내 배관 및 청수·오수 탱크 동파 예방에 각별한 주의가 필요합니다.',
        '장시간 차량을 비우실 때는 무시동 히터를 약하게 가동해 실내 온도를 유지해 주시고,',
        '영하권 날씨에는 청수 탱크 배수 안내를 반드시 따라 주시기 바랍니다. 무시동 히터 작동 시 배기구 주변에 눈이나 낙엽 등 이물질이',
        '쌓이지 않도록 수시로 확인해 주세요. 안전한 난방 사용을 위해 차량 내 일산화탄소 경보기 작동 여부를 항상 체크하고 주기적으로 환기해 주시기 바랍니다.',
      ],
    ],
  },
  {
    id: 2,
    title: '캠핑카 대여·반납 절차 및 이용 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '원활한 차량 인수를 위해 예약하신 픽업 시간 15분 전까지 해당 지점에 도착해 주시기 바랍니다.',
        '현장에서 운전면허증 확인 및 계약서 작성 후, 담당 매니저와 함께 차량 외관 상태와 내부 장비 작동법을 꼼꼼히 점검하게 됩니다.',
      ],
      [
        '차량 반납은 예약된 지점 및 지정 시간 내에 완료해 주셔야 하며, 지연 시 추가 요금이 발생할 수 있습니다.',
        '반납 시 담당자와 함께 차량 파손 여부 및 대여 용품 반납 상태를 최종 확인한 후 모든 이용 절차가 마무리됩니다.',
      ],
    ],
  },
  {
    id: 1,
    title: '차량 반납 시 연료 충전 및 실내 정리 기준 안내',
    date: '2026.11.25',
    paragraphs: [
      [
        '모든 차량은 연료가 가득 채워진 상태로 출고되며, 반납 시에도 동일한 양(Full)으로 충전해 주셔야 합니다.',
        '연료가 부족한 상태로 반납하실 경우 주유 대행 수수료가 포함된 실비 정산 금액이 별도로 청구되오니 반납 전 인근 주유소를 이용해 주세요.',
      ],
      [
        '다음 이용 고객을 위해 실내에 발생한 일반·재활용 쓰레기는 지정된 장소에 분리배출해 주시기 바랍니다.',
        '기본 제공 식기류 및 조리 도구는 간단한 세척 후 제자리에 정리해 주시고, 개인 소지품이 남지 않았는지 다시 한번 확인해 주세요.',
      ],
    ],
  },
];

/**
 * 공지 사항 목록(검색/페이지네이션) 및 상세 페이지 이동 상태 제어 훅
 */
export const useNoticeBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const selectedNoticeId = useMemo(() => {
    const idParam = searchParams.get('id');
    if (!idParam) return null;
    const parsed = Number(idParam);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  }, [searchParams]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      AOS.refresh();
    }, 60);
    return () => clearTimeout(timer);
  }, [selectedNoticeId, currentPage, searchQuery]);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNotices, currentPage]);

  const activeNoticeIndex = useMemo(() => {
    if (selectedNoticeId === null) return -1;
    return NOTICE_ITEMS.findIndex((item) => item.id === selectedNoticeId);
  }, [selectedNoticeId]);

  const activeNotice =
    activeNoticeIndex >= 0 ? NOTICE_ITEMS[activeNoticeIndex] : null;

  const prevNotice =
    activeNoticeIndex > 0 ? NOTICE_ITEMS[activeNoticeIndex - 1] : null;

  const nextNotice =
    activeNoticeIndex >= 0 && activeNoticeIndex < NOTICE_ITEMS.length - 1
      ? NOTICE_ITEMS[activeNoticeIndex + 1]
      : null;

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const openNotice = useCallback(
    (id: number) => {
      setSearchParams({ id: String(id) });
      window.scrollTo(0, 0);
    },
    [setSearchParams]
  );

  const closeNotice = useCallback(() => {
    setSearchParams({});
    window.scrollTo(0, 0);
  }, [setSearchParams]);

  return {
    searchQuery,
    currentPage,
    totalPages,
    totalCount: filteredNotices.length,
    paginatedNotices,
    activeNotice,
    prevNotice,
    nextNotice,
    setCurrentPage,
    goToPrevPage,
    goToNextPage,
    handleSearchChange,
    openNotice,
    closeNotice,
  };
};
