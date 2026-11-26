export interface WhyChooseCardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

/**
 * Business(파트너스 안내) - WHY CHOOSE US 5종 카드 데이터 (왼쪽 -> 오른쪽 순)
 */
export const WHY_CHOOSE_CARDS: WhyChooseCardItem[] = [
  {
    id: 1,
    title: '부담을 낮춘 창업 구조',
    description: '본사 투자형 운영 모델로 차량 구매 부담을 고려한 창업 방식',
    image: '/assets/images/MELLOWAY-BUSINESS-01-startup-structure-1.jpg',
    icon: '/assets/images/icon/partner-card-icon-1.svg',
  },
  {
    id: 2,
    title: '통합 운영 시스템',
    description: '예약부터 차량 관리까지 본사 중심의 체계적인 운영 지원',
    image: '/assets/images/MELLOWAY-BUSINESS-02-startup-structure-2.jpg',
    icon: '/assets/images/icon/partner-card-icon-2.svg',
  },
  {
    id: 3,
    title: '다양한 수익 모델',
    description: '캠핑카 렌트부터 캠핑용품 대여, 여행 케어 서비스까지',
    image: '/assets/images/MELLOWAY-BUSINESS-03-startup-structure-3.jpg',
    icon: '/assets/images/icon/partner-card-icon-3.svg',
  },
  {
    id: 4,
    title: '체계적인 창업 지원',
    description: '운영 교육과 홍보, 고객 관리 등 창업주를 위한 지원 체계',
    image: '/assets/images/MELLOWAY-BUSINESS-04-startup-structure-4.jpg',
    icon: '/assets/images/icon/partner-card-icon-4.svg',
  },
  {
    id: 5,
    title: '지역과 함께하는 성장',
    description: '지역 거점을 기반으로 지점 간 서비스 연계를 확대하는 비전',
    image: '/assets/images/MELLOWAY-BUSINESS-05-startup-structure-5.jpg',
    icon: '/assets/images/icon/partner-card-icon-5.svg',
  },
];
