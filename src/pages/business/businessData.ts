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

export interface NumberMetricItem {
  id: number;
  value: string;
  label: string;
  image: string;
  circleBgColor: string;
}

/**
 * Business(파트너스 안내) - 숫자로 보는 MELLOWAY 6종 지표 데이터
 */
export const MELLOWAY_NUMBERS: NumberMetricItem[] = [
  {
    id: 1,
    value: '4종',
    label: '캠퍼 라인업',
    image: '/assets/images/partner-3d-camper-icon.png',
    circleBgColor: '#E6F4FB',
  },
  {
    id: 2,
    value: '11곳',
    label: '전국 운영 지점',
    image: '/assets/images/partner-3d-store-icon.png',
    circleBgColor: '#F2F4F5',
  },
  {
    id: 3,
    value: '120+',
    label: '운영 캠퍼 수',
    image: '/assets/images/partner-3d-icon-campingcar.png',
    circleBgColor: '#E6F4FB',
  },
  {
    id: 4,
    value: '50+',
    label: '연계 여행 · 액티비티',
    image: '/assets/images/partner-3d-icon-activity.png',
    circleBgColor: '#F2F4F5',
  },
  {
    id: 5,
    value: '98%',
    label: '고객 만족도',
    image: '/assets/images/partner03d-icon-customer.png',
    circleBgColor: '#E6F4FB',
  },
  {
    id: 6,
    value: '150K+',
    label: '누적 예약 건수',
    image: '/assets/images/partner-3d-icon-booking.png',
    circleBgColor: '#F2F4F5',
  },
];

export interface BeginsStepItem {
  id: number;
  number: string;
  title: string;
  lines: [string, string];
}

/**
 * Business(파트너스 안내) - How MELLOWAY Begins 6단계 창업 절차 데이터
 */
export const BEGINS_STEPS: BeginsStepItem[] = [
  {
    id: 1,
    number: '01',
    title: '창업 문의',
    lines: ['창업 희망 지역과 관심 내용을', '전달하고 상담을 신청합니다.'],
  },
  {
    id: 2,
    number: '02',
    title: '브랜드 상담',
    lines: ['MELLOWAY 브랜드와 캠퍼 렌탈', '사업 구조를 안내합니다.'],
  },
  {
    id: 3,
    number: '03',
    title: '지역 검토',
    lines: ['지역 수요와 입지 여건을', '함께 살펴봅니다.'],
  },
  {
    id: 4,
    number: '04',
    title: '가맹 협의',
    lines: ['운영 방향과 주요 조건을 확인하고', '가맹 계약을 진행합니다.'],
  },
  {
    id: 5,
    number: '05',
    title: '오픈 준비',
    lines: ['캠퍼 구성과 예약·운영 환경 등', '지점 오픈을 준비합니다.'],
  },
  {
    id: 6,
    number: '06',
    title: '지점 오픈',
    lines: ['최종 점검을 마치고 새로운', '여행 거점을 시작합니다.'],
  },
];
