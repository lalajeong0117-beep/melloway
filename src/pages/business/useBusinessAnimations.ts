import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Business(파트너스 안내) 페이지 전용 GSAP 인터랙션 모듈
 */
export const useBusinessAnimations = (pageRef: RefObject<HTMLDivElement | null>) => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.business-kv-img',
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: 'power2.out' }
      )
        .fromTo(
          '.business-kv-main-title',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=1.0'
        )
        .fromTo(
          '.business-kv-sub-title',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.65'
        );
    },
    { scope: pageRef }
  );
};
