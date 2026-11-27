import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Support 상단 KV 텍스트 한 줄씩 순차 등장 애니메이션 훅
 * - 페이지 진입 시 1줄 제목(.support-kv-title) -> 2줄 부제목(.support-kv-subtitle) 순으로 등장합니다.
 */
export const useSupportKvAnimation = (
  scopeRef: RefObject<HTMLElement | null>,
  keyDep?: string
) => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.support-kv-img',
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: 'power2.out' }
      )
        .fromTo(
          '.support-kv-title',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=1.0'
        )
        .fromTo(
          '.support-kv-subtitle',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.65'
        );
    },
    { scope: scopeRef, dependencies: [keyDep], revertOnUpdate: true }
  );
};
