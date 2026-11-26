import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * 차량 라인업 페이지(CamperListPage) 전용 GSAP 애니메이션 훅
 * - 1) 상단 KV 타이틀 인트로 등장
 * - 2) 스크롤 진입 시 차량 라인업 타이틀 & 4종 카드 순차 리빌
 */
export const useCamperListAnimations = (
  scopeRef: RefObject<HTMLDivElement | null>
): void => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. KV 인트로 등장 애니메이션
      const kvTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      kvTl.fromTo(
        '.camper-list-kv-title',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.1 }
      ).fromTo(
        '.camper-list-kv-subtitle',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.55'
      );

      // 2. 차량 라인업 섹션 타이틀 등장
      gsap.fromTo(
        '.camper-lineup-title',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.camper-lineup-section',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. 차량 라인업 4종 카드 스크롤 순차 등장
      const isSingleColumn = window.innerWidth <= 768;
      const cards = gsap.utils.toArray<HTMLElement>('.camper-lineup-card');

      cards.forEach((card, idx) => {
        const head = card.querySelector('.camper-lineup-card-head');
        const imageWrap = card.querySelector('.camper-lineup-card-image-wrap');
        const actions = card.querySelector('.camper-lineup-card-actions');
        const colDelay = isSingleColumn ? 0 : (idx % 2) * 0.22;

        const cardTl = gsap.timeline({
          delay: colDelay,
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });

        cardTl.fromTo(
          card,
          { y: 44, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'power3.out' }
        );

        if (head) {
          cardTl.fromTo(
            head,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
            '-=0.65'
          );
        }

        if (imageWrap) {
          cardTl.fromTo(
            imageWrap,
            { x: -32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
            '-=0.55'
          );
        }

        if (actions) {
          cardTl.fromTo(
            actions,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power2.out',
              clearProps: 'transform',
            },
            '-=0.45'
          );
        }
      });

      // 4. 차량 가격표 섹션 등장 애니메이션
      const priceTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.camper-price-table',
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });

      if (!isSingleColumn) {
        priceTl
          .fromTo(
            '.camper-price-labels .camper-price-badge',
            { x: -24, scale: 0.92, opacity: 0 },
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 0.75,
              stagger: 0.16,
              ease: 'power3.out',
            }
          )
          .fromTo(
            '.camper-price-divider',
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              duration: 0.95,
              ease: 'power2.inOut',
            },
            '-=0.55'
          );
      }

      priceTl.fromTo(
        '.camper-price-col',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        },
        isSingleColumn ? 0 : '-=0.65'
      );

      ScrollTrigger.refresh();
    },
    { scope: scopeRef }
  );
};
