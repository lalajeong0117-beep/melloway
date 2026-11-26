import { ROUTES, RoutePath } from '@/constants/routes';
import supportKvImg from '../../../../assets/images/Support_KV.jpg';

export interface SupportTabItem {
  label: string;
  path: RoutePath;
}

/**
 * 공지 사항 / 자주 묻는 질문 페이지 공용 KV 이미지
 */
export const SUPPORT_KV_IMAGE = supportKvImg;

/**
 * Support 하위 메뉴 탭 순서 (공지 사항 -> 자주 묻는 질문 -> 이벤트 · 혜택)
 */
export const SUPPORT_TABS: SupportTabItem[] = [
  { label: '공지 사항', path: ROUTES.SUPPORT_NOTICE },
  { label: '자주 묻는 질문', path: ROUTES.SUPPORT_FAQ },
  { label: '이벤트 · 혜택', path: ROUTES.SUPPORT_EVENTS },
];
