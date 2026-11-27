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
  isComingSoon?: boolean;
}

export const BRANCH_LIST: BranchItem[] = [
  { id: 'paju', image: pajuStoreImg, alt: '멜로웨이 파주점' },
  { id: 'suwon', image: suwonStoreImg, alt: '멜로웨이 수원점' },
  { id: 'chuncheon', image: chuncheonStoreImg, alt: '멜로웨이 춘천점' },
  { id: 'gangneung', image: gangneungStoreImg, alt: '멜로웨이 강릉점' },
  { id: 'yeongwol', image: yeongwolStoreImg, alt: '멜로웨이 영월점' },
  { id: 'taean', image: taeanStoreImg, alt: '멜로웨이 태안점' },
  { id: 'daejeon', image: daejeonStoreImg, alt: '멜로웨이 대전점' },
  { id: 'gwangju', image: gwangjuStoreImg, alt: '멜로웨이 광주점' },
  { id: 'daegu', image: daeguStoreImg, alt: '멜로웨이 대구점' },
  { id: 'busan', image: busanStoreImg, alt: '멜로웨이 부산점' },
  { id: 'jeju', image: jejuStoreImg, alt: '멜로웨이 제주점' },
  { id: 'coming-soon', isComingSoon: true },
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
