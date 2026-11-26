import { ROUTES, RoutePath } from '@/constants/routes';

export interface SupportTabItem {
  label: string;
  path: RoutePath;
}

/**
 * Support 하위 메뉴 탭 순서 (공지 사항 -> 자주 묻는 질문 -> 이벤트 · 혜택)
 */
export const SUPPORT_TABS: SupportTabItem[] = [
  { label: '공지 사항', path: ROUTES.SUPPORT_NOTICE },
  { label: '자주 묻는 질문', path: ROUTES.SUPPORT_FAQ },
  { label: '이벤트 · 혜택', path: ROUTES.SUPPORT_EVENTS },
];
