import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/**
 * 캠핑카 상세 정보 페이지(MellowayCampersPage) 전용 GSAP 애니메이션 훅
 * - 4종 모델 상세 페이지 모두 동일한 리듬과 경쾌한 바운스 모션으로 동작합니다.
 */
export const useMellowayCampersAnimations = (
  scopeRef: RefObject<HTMLDivElement | null>,
  selectedCamperId: string
): void => {

  // 1. 페이지 최초 진입 시 상단 4종 모델 탭 순차 팝인
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        '.camper-detail-tab',
        { y: -14, scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'back.out(1.8)',
          clearProps: 'transform',
        }
      );
    },
    { scope: scopeRef }
  );

  // 2. 모델 선택 및 스크롤 진입 시 상세 정보·옵션·갤러리 애니메이션 (4종 공통)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // 상단 차량 이미지 + 텍스트 + 키워드/버튼 경쾌한 시퀀스
      const overviewTl = gsap.timeline();

      overviewTl
        .fromTo(
          '.camper-detail-image',
          { x: -60, scale: 0.94, opacity: 0 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.72,
            ease: 'back.out(1.3)',
            clearProps: 'transform',
          }
        )
        .fromTo(
          '.camper-detail-capacity',
          { y: 16, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(1.8)',
            clearProps: 'transform',
          },
          '-=0.56'
        )
        .fromTo(
          '.camper-detail-name',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.52,
            ease: 'power3.out',
          },
          '-=0.34'
        )
        .fromTo(
          '.camper-detail-desc',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.48,
            ease: 'power2.out',
          },
          '-=0.34'
        )
        .fromTo(
          '.camper-detail-keyword',
          { y: 18, scale: 0.74, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.52,
            stagger: 0.08,
            ease: 'back.out(2.2)',
            clearProps: 'transform',
          },
          '-=0.3'
        )
        .fromTo(
          '.camper-detail-reserve-btn',
          { y: 18, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.52,
            ease: 'back.out(1.8)',
            clearProps: 'transform',
          },
          '-=0.3'
        );

      // 하단 #22252A 8개 상세 옵션: 초기 숨김 후 스크롤 다운 시 8개가 함께 위로 떠오르는 모션
      gsap.fromTo(
        '.camper-detail-feature-item',
        { y: 52, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.78,
          ease: 'back.out(1.55)',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.camper-detail-showcase',
            start: () => `top ${Math.min(window.innerHeight * 0.65, 620)}px`,
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: scopeRef, dependencies: [selectedCamperId], revertOnUpdate: true }
  );
};
