import { RefObject, useEffect } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import storeKvImage from '../../../assets/images/Store_kv.jpg';
import pajuStoreImg from '../../../assets/images/paju-store.jpg';
import suwonStoreImg from '../../../assets/images/suwon-store.jpg';
import chuncheonStoreImg from '../../../assets/images/chuncheon-store.jpg';
import gangneungStoreImg from '../../../assets/images/gangneung-store.jpg';
import yeongwolStoreImg from '../../../assets/images/yeongwol-store.jpg';
import taeanStoreImg from '../../../assets/images/taean-store.jpg';
import daejeonStoreImg from '../../../assets/images/daejeon-store.jpg';
import gwangjuStoreImg from '../../../assets/images/gwangju-store.jpg';
import daeguStoreImg from '../../../assets/images/daegu-store.jpg';
import busanStoreImg from '../../../assets/images/busan-store.jpg';
import jejuStoreImg from '../../../assets/images/jeju-store.jpg';

gsap.registerPlugin(ScrollTrigger);

export const BRANCHES_KV_DATA = {
  image: storeKvImage,
  alt: '멜로웨이 전국 지점 안내 메인 비주얼',
  title: '어디서든 시작되는 설레는 여정',
  subtitle: '전국 11개 멜로웨이 지점에서 여행을 시작하세요',
} as const;

export const BRANCHES_HEADER_DATA = {
  title: 'MELLOWAY LOCATIONS',
  subtitle: '길 위에서 만나는 또 하나의 집, 멜로웨이 전국 지점',
} as const;

export interface BranchItem {
  id: string;
  image?: string;
  alt?: string;
  name?: string;
  address?: string;
  phone?: string;
  hours?: string;
  isComingSoon?: boolean;
}

const DEFAULT_BRANCH_HOURS = '매일 09:00~18:00 / 차량 인수·반납 09:00~20:00';

export const BRANCH_LIST: BranchItem[] = [
  {
    id: 'paju',
    image: pajuStoreImg,
    alt: '멜로웨이 파주점',
    name: '파주점',
    address: '경기도 파주시 가람로 128, 1층',
    phone: '031-947-0181',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'suwon',
    image: suwonStoreImg,
    alt: '멜로웨이 수원점',
    name: '수원점',
    address: '경기도 수원시 영통구 광교중앙로 180, 1층',
    phone: '031-217-0182',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'chuncheon',
    image: chuncheonStoreImg,
    alt: '멜로웨이 춘천점',
    name: '춘천점',
    address: '강원특별자치도 춘천시 스포츠타운길 214',
    phone: '033-241-0183',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'gangneung',
    image: gangneungStoreImg,
    alt: '멜로웨이 강릉점',
    name: '강릉점',
    address: '강원특별자치도 강릉시 초당순두부길 58',
    phone: '033-642-0184',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'yeongwol',
    image: yeongwolStoreImg,
    alt: '멜로웨이 영월점',
    name: '영월점',
    address: '강원특별자치도 영월군 영월읍 동강로 126',
    phone: '033-375-0185',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'taean',
    image: taeanStoreImg,
    alt: '멜로웨이 태안점',
    name: '태안점',
    address: '충청남도 태안군 남면 몽산포길 82',
    phone: '041-672-0186',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'daejeon',
    image: daejeonStoreImg,
    alt: '멜로웨이 대전점',
    name: '대전점',
    address: '대전광역시 유성구 대덕대로 510, 1층',
    phone: '042-825-0187',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'gwangju',
    image: gwangjuStoreImg,
    alt: '멜로웨이 광주점',
    name: '광주점',
    address: '광주광역시 동구 문화전당로 34, 1층',
    phone: '062-225-0188',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'daegu',
    image: daeguStoreImg,
    alt: '멜로웨이 대구점',
    name: '대구점',
    address: '대구광역시 달서구 달구벌대로 1786, 1층',
    phone: '053-621-0189',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'busan',
    image: busanStoreImg,
    alt: '멜로웨이 부산점',
    name: '부산점',
    address: '부산광역시 동구 중앙대로 214, 1층',
    phone: '051-469-0190',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'jeju',
    image: jejuStoreImg,
    alt: '멜로웨이 제주점',
    name: '제주점',
    address: '제주특별자치도 제주시 애월읍 애월해안로 472',
    phone: '064-799-0191',
    hours: DEFAULT_BRANCH_HOURS,
  },
  {
    id: 'coming-soon',
    name: '신규 지점 오픈 예정',
    isComingSoon: true,
  },
];

/**
 * 전국 지점 안내 페이지 KV 텍스트 순차 등장 및 레이아웃 좌표 갱신 훅
 */
export const useBranchesPage = (scopeRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.about-branches-kv-title',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
      ).fromTo(
        '.about-branches-kv-subtitle',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.45'
      );
    },
    { scope: scopeRef }
  );

  useEffect(() => {
    const refreshAnimations = () => {
      ScrollTrigger.refresh();
      AOS.refresh();
    };

    const rafId = window.requestAnimationFrame(refreshAnimations);
    const timer = window.setTimeout(refreshAnimations, 160);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
    };
  }, []);
};
