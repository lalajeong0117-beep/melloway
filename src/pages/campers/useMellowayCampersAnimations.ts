import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * 캠핑카 상세 페이지(MellowayCampersPage) 전용 GSAP 애니메이션 훅
 * - 선택 차량 변경 시 이미지와 상세 정보 영역을 부드럽게 전환합니다.
 */
export const useMellowayCampersAnimations = (
  scopeRef: RefObject<HTMLDivElement | null>,
  selectedCamperId: string
): void => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.camper-detail-image-wrap',
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.camper-detail-info',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'transform',
        }
      );
    },
    { scope: scopeRef, dependencies: [selectedCamperId] }
  );
};
