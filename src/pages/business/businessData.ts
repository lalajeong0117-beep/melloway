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

export type PlanTabId = 'A' | 'B' | 'C';

export interface PlanCostRow {
  amount: string;
  note: string;
}

export interface FranchisePlanData {
  id: PlanTabId;
  buttonLabel: string;
  title: string;
  subtitle: string;
  rows: [PlanCostRow, PlanCostRow, PlanCostRow, PlanCostRow, PlanCostRow];
  totalAmount: string;
}

export interface CompetitorPlanData {
  title: string;
  subtitle: string;
  rows: [PlanCostRow, PlanCostRow, PlanCostRow, PlanCostRow, PlanCostRow];
  totalAmount: string;
}

/**
 * Business(파트너스 안내) - 맞춤형 창업 플랜 비교 항목 라벨 (중앙 열)
 */
export const PLAN_ROW_LABELS: [string, string, string, string, string] = [
  '가맹비',
  '기본 교육비',
  '시설 구축',
  '장비 및 비품',
  '초기 운영자금',
];

/**
 * Business(파트너스 안내) - Melloway A안 / B안 / C안 창업 플랜 데이터
 */
export const MELLOWAY_PLANS: Record<PlanTabId, FranchisePlanData> = {
  A: {
    id: 'A',
    buttonLabel: 'A안',
    title: 'Melloway A안',
    subtitle: '기존 부지 활용형',
    rows: [
      { amount: '3,000만원', note: '(지분 가치 보유 / 소멸성 비용 없음)' },
      { amount: '500만원', note: '(운영·차량 정비·CS 실무 올인원 교육)' },
      { amount: '500~1,000만원', note: '(기존 보유 주차 부지 활용 최소 시공)' },
      { amount: '700~1,000만원', note: '(본사 공동구매 공급가로 거품 제거)' },
      { amount: '800~1,500만원', note: '(본사 플랫폼 통합 모객으로 홍보비 절감)' },
    ],
    totalAmount: '5,500~7,000만원',
  },
  B: {
    id: 'B',
    buttonLabel: 'B안',
    title: 'Melloway B안',
    subtitle: '신규 임대 및 표준 구축형',
    rows: [
      { amount: '3,000만원', note: '(지분 가치 보유 / 소멸성 비용 없음)' },
      { amount: '500만원', note: '(운영·차량 정비·CS 실무 올인원 교육)' },
      { amount: '1,000~2,000만원', note: '(표준 거점 오피스 및 필수 설비 구축)' },
      { amount: '700~1,000만원', note: '(본사 공동구매 공급가로 거품 제거)' },
      { amount: '1,800~3,000만원', note: '(본사 플랫폼 통합 모객으로 홍보비 절감)' },
    ],
    totalAmount: '8,000만~1억2,000만원',
  },
  C: {
    id: 'C',
    buttonLabel: 'C안',
    title: 'Melloway C안',
    subtitle: '대규모 부지 및 확장 운영형',
    rows: [
      { amount: '3,000만원', note: '(지분 가치 보유 / 소멸성 비용 없음)' },
      { amount: '500만원', note: '(운영·차량 정비·CS 실무 올인원 교육)' },
      { amount: '2,000~4,000만원', note: '(대규모 복합 차고지 및 라운지 조성)' },
      { amount: '900~1,400만원', note: '(본사 공동구매 공급가로 거품 제거)' },
      { amount: '3,600~5,100만원', note: '(본사 플랫폼 통합 모객으로 홍보비 절감)' },
    ],
    totalAmount: '5,500~7,000만원',
  },
};

/**
 * Business(파트너스 안내) - G사 비교안 기준 데이터
 */
export const COMPETITOR_PLAN: CompetitorPlanData = {
  title: 'G사 비교안',
  subtitle: '타사 단일 패키지 기준',
  rows: [
    { amount: '4,000만~5,000만원', note: '(소멸성 가맹비 / 매월 로열티 별도)' },
    { amount: '800만~1,000만원', note: '(단순 이론 교육 / 현장 정비 교육 제외)' },
    { amount: '3,000만~5,000만원', note: '(본사 지정 인테리어 및 사인물 의무 시공)' },
    { amount: '1,500만~2,000만원', note: '(캠핑 용품 및 운영 비품 개별 시중가 매입)' },
    { amount: '3,000만~4,000만원', note: '(초기 고객 유치를 위한 개별 마케팅비 과다)' },
  ],
  totalAmount: '1억 2,300만 ~ 1억 7,000만원',
};

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

export interface CollabBrandLogo {
  id: number;
  name: string;
  image: string;
  width: number;
  height: number;
}

/**
 * Business(가맹·제휴 문의) - POTENTIAL COLLABORATION BRANDS 로고 목록
 */
export const COLLAB_BRAND_LOGOS: CollabBrandLogo[] = [
  {
    id: 1,
    name: 'CAMPFUL',
    image: '/assets/images/col-logo-1.png',
    width: 326,
    height: 56,
  },
  {
    id: 2,
    name: '협력 브랜드 2',
    image: '/assets/images/col-logo-2.png',
    width: 245,
    height: 42,
  },
  {
    id: 3,
    name: 'RIVACUP',
    image: '/assets/images/col-logo-3.png',
    width: 187,
    height: 93,
  },
  {
    id: 4,
    name: '협력 브랜드 4',
    image: '/assets/images/col-logo-4.png',
    width: 461,
    height: 56,
  },
];

export interface HowItWorksStep {
  id: number;
  image: string;
  title: string;
  lines: [string, string];
}

/**
 * Business(가맹·제휴 문의) - HOW IT WORKS 4단계 진행 절차 데이터
 */
export const INQUIRY_HOW_STEPS: HowItWorksStep[] = [
  {
    id: 1,
    image: '/assets/images/franchise-work-1.jpg',
    title: '문의 접수',
    lines: [
      '멜로웨이 창업에 관심 있다면 희망하는',
      '지역과 창업 계획을 편하게 남겨주세요.',
    ],
  },
  {
    id: 2,
    image: '/assets/images/franchise-work-2.jpg',
    title: '내용 검토',
    lines: [
      '희망 지역과 창업 조건을 꼼꼼하게 살펴보고',
      '적합한 방향을 제안합니다',
    ],
  },
  {
    id: 3,
    image: '/assets/images/franchise-work-3.jpg',
    title: '담당자 상담',
    lines: [
      '창업부터 운영까지 필요한 정보를 안내하고',
      '든든한 시작을 돕습니다',
    ],
  },
  {
    id: 4,
    image: '/assets/images/franchise-work-4.jpg',
    title: '후속 안내',
    lines: [
      '상담 이후의 준비 과정도 함께 고민하며',
      '성공적인 출발을 지원합니다.',
    ],
  },
];

/**
 * Business(가맹·제휴 문의) - 문의 유형 선택 아코디언 옵션
 */
export const INQUIRY_TYPE_OPTIONS: string[] = [
  '가맹 창업 문의',
  '제휴 · 협업 문의',
  '입점 · 부지 제안',
  '기타 문의',
];

export const PHONE_PREFIX_OPTIONS: string[] = ['010', '011', '016', '017', '018', '019'];

export const CALENDAR_WEEKDAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];
