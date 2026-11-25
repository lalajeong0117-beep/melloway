/**
 * MELLOWAY 전체 라우트 경로 상수
 * - 페이지 추가/변경 시 이 파일만 수정하면 Header, Footer, Router가 자동으로 동기화됩니다.
 */
export const ROUTES = {
  HOME: '/',

  // About Us
  ABOUT_BRAND: '/about/brand',
  ABOUT_BRANCHES: '/about/branches',

  // Business
  BUSINESS_INFO: '/business/franchise',
  BUSINESS_INQUIRY: '/business/inquiry',

  // Campers
  CAMPERS_LIST: '/campers/list',
  CAMPERS_MELLOWAY: '/campers/melloway',

  // Support
  SUPPORT_NOTICE: '/support/notice',
  SUPPORT_FAQ: '/support/faq',
  SUPPORT_EVENTS: '/support/events',
  SUPPORT_CONTACT: '/support/contact',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
