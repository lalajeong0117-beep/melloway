import { ROUTES } from '@/constants/routes';
import bannerImage from '../../../../assets/images/Banner.jpg';
import northEastArrowIcon from '../../../../assets/images/North East Arrow.svg';

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
