import { ROUTES, RoutePath } from '@/constants/routes';

export interface NavSubItem {
  label: string;
  path: RoutePath;
}

export interface NavGroup {
  id: string;
  label: string;
  defaultPath: RoutePath;
  subItems: NavSubItem[];
}

/**
 * 상단 GNB 네비게이션 및 드롭다운 메뉴 데이터
 */
export const GNB_MENU: NavGroup[] = [
  {
    id: 'about',
    label: 'About Us',
    defaultPath: ROUTES.ABOUT_BRAND,
    subItems: [
      { label: '브랜드 소개', path: ROUTES.ABOUT_BRAND },
      { label: '전국 지점 찾기', path: ROUTES.ABOUT_BRANCHES },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    defaultPath: ROUTES.BUSINESS_INFO,
    subItems: [
      { label: '파트너스 안내', path: ROUTES.BUSINESS_INFO },
      { label: '가맹·제휴 문의', path: ROUTES.BUSINESS_INQUIRY },
    ],
  },
  {
    id: 'campers',
    label: 'Campers',
    defaultPath: ROUTES.CAMPERS_LIST,
    subItems: [
      { label: '차량 라인업', path: ROUTES.CAMPERS_LIST },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    defaultPath: ROUTES.SUPPORT_NOTICE,
    subItems: [
      { label: '공지 사항', path: ROUTES.SUPPORT_NOTICE },
      { label: '자주 묻는 질문', path: ROUTES.SUPPORT_FAQ },
      { label: '이벤트 · 혜택', path: ROUTES.SUPPORT_EVENTS },
    ],
  },
];

/**
 * 하단 푸터 4열 메뉴 데이터
 */
export const FOOTER_MENU: NavGroup[] = [
  {
    id: 'about',
    label: 'About us',
    defaultPath: ROUTES.ABOUT_BRAND,
    subItems: [
      { label: '브랜드 소개', path: ROUTES.ABOUT_BRAND },
      { label: '전국 지점 찾기', path: ROUTES.ABOUT_BRANCHES },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    defaultPath: ROUTES.BUSINESS_INFO,
    subItems: [
      { label: '파트너스 안내', path: ROUTES.BUSINESS_INFO },
      { label: '가맹·제휴 문의', path: ROUTES.BUSINESS_INQUIRY },
    ],
  },
  {
    id: 'campers',
    label: 'Campers',
    defaultPath: ROUTES.CAMPERS_LIST,
    subItems: [
      { label: '차량 라인업', path: ROUTES.CAMPERS_LIST },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    defaultPath: ROUTES.SUPPORT_NOTICE,
    subItems: [
      { label: '공지 사항', path: ROUTES.SUPPORT_NOTICE },
      { label: '자주 묻는 질문', path: ROUTES.SUPPORT_FAQ },
      { label: '이벤트 · 혜택', path: ROUTES.SUPPORT_EVENTS },
      { label: '1:1 문의', path: ROUTES.SUPPORT_CONTACT },
    ],
  },
];
