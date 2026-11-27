import { ROUTES } from '@/constants/routes';
import bannerImage from '../../../assets/images/Banner.jpg';
import northEastArrowIcon from '../../../assets/images/icon/North East Arrow.svg';

export const SUPPORT_BANNER_IMAGE = bannerImage;
export const SUPPORT_BANNER_ARROW_ICON = northEastArrowIcon;

export const SUPPORT_BANNER_CONTENT = {
  eyebrow: 'MELLOWAY SUPPORT',
  title: '여행의 시작도, 새로운 도전도 함께.',
  subtitle: '캠핑카 이용부터 가맹점 창업까지 멜로웨이가 함께합니다.',
  primaryButton: {
    label: '1:1 문의하기',
    to: ROUTES.SUPPORT_CONTACT,
  },
  secondaryButton: {
    label: '창업 문의하기',
    to: ROUTES.BUSINESS_INQUIRY,
  },
} as const;

/**
 * 창업 문의하기 페이지(/business/inquiry) 이동 후
 * 대상 섹션(.inquiry-form-section)이 존재할 때 해당 위치로 부드럽게 스크롤합니다.
 * - MainLayout의 라우트 변경 시 window.scrollTo(0, 0) 이후에 실행되도록 지연 처리합니다.
 */
export const scrollToBusinessInquiryForm = () => {
  window.setTimeout(() => {
    const targetSection = document.querySelector(
      '.inquiry-form-section[aria-label="가맹·제휴 문의 입력 폼"], .inquiry-form-section'
    );
    if (targetSection instanceof HTMLElement) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 150);
};
