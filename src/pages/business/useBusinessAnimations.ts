import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Business(파트너스 안내) 페이지 전용 GSAP 인터랙션 모듈
 * - 메인 KV 인트로 애니메이션
 * - WHY CHOOSE US 섹션: 전체 ScrollTrigger 고정(pin) 후 스크롤에 따라 5개 카드가 하나씩 넘겨지며, 5번째 카드 노출 완료 시 핀 해제
 */
export const useBusinessAnimations = (pageRef: RefObject<HTMLDivElement | null>) => {
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1) 메인 KV 인트로 애니메이션
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

      // 0) 가맹·제휴 문의 페이지 협업 브랜드 박스: 스크롤 시 메인 KV 아래에서 서랍처럼 내려오는 리빌
      const inquiryKvSection = pageRef.current?.querySelector(
        '.inquiry-kv-section'
      ) as HTMLElement | null;
      const collabSection = pageRef.current?.querySelector(
        '.inquiry-collab-section'
      ) as HTMLElement | null;

      if (inquiryKvSection && collabSection) {
        gsap.fromTo(
          collabSection,
          { yPercent: -100 },
          {
            yPercent: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: inquiryKvSection,
              start: 'top top',
              end: '+=280',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 0-1) 가맹·제휴 문의 페이지 HOW IT WORKS 섹션: 타이틀 + 4개 카드 순차 등장
      const howSection = pageRef.current?.querySelector(
        '.inquiry-how-section'
      ) as HTMLElement | null;

      if (howSection) {
        gsap.fromTo(
          '.inquiry-how-header',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: howSection,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.inquiry-how-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.inquiry-how-grid',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.inquiry-how-img-wrap',
          { clipPath: 'inset(12% 0% 12% 0% round 15px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 15px)',
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.inquiry-how-grid',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.inquiry-how-img',
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: '.inquiry-how-grid',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 0-2) 가맹·제휴 문의 페이지 폼 섹션 등장
      const inquiryFormSection = pageRef.current?.querySelector(
        '.inquiry-form-section'
      ) as HTMLElement | null;

      if (inquiryFormSection) {
        gsap.fromTo(
          '.inquiry-form-title',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: inquiryFormSection,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2) WHY CHOOSE US 섹션: ScrollTrigger Pin + 카드 1개씩 순차 슬라이드
      const whySection = pageRef.current?.querySelector(
        '.business-why-section'
      ) as HTMLElement | null;
      const viewport = pageRef.current?.querySelector(
        '.business-why-marquee-viewport'
      ) as HTMLElement | null;
      const track = pageRef.current?.querySelector(
        '.business-why-marquee-track'
      ) as HTMLElement | null;
      const cards = pageRef.current?.querySelectorAll('.business-why-card');

      if (!whySection || !viewport || !track || !cards || cards.length === 0) return;

      const firstCard = cards[0] as HTMLElement;
      const lastCard = cards[cards.length - 1] as HTMLElement;

      const getStartX = () =>
        viewport.offsetWidth / 2 - (firstCard.offsetLeft + firstCard.offsetWidth / 2);

      const getEndX = () =>
        viewport.offsetWidth / 2 - (lastCard.offsetLeft + lastCard.offsetWidth / 2);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: whySection,
          start: 'top 110px',
          end: () => `+=${Math.max(1800, (cards.length - 1) * 480)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            ease: 'power2.out',
          },
        },
      });

      scrollTl.fromTo(
        track,
        { x: () => getStartX() },
        {
          x: () => getEndX(),
          ease: 'none',
          duration: 1,
        }
      );

      // 3) 숫자로 보는 MELLOWAY 섹션: 6개 지표 아이템 순차 등장
      const numbersSection = pageRef.current?.querySelector(
        '.business-numbers-section'
      ) as HTMLElement | null;

      if (numbersSection) {
        gsap.fromTo(
          '.business-number-item',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: numbersSection,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4) How MELLOWAY Begins 섹션: 타이틀 그룹 등장
      const beginsSection = pageRef.current?.querySelector(
        '.business-begins-section'
      ) as HTMLElement | null;

      if (beginsSection) {
        gsap.fromTo(
          '.business-begins-title-wrap',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: beginsSection,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.business-begins-step',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: beginsSection,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5) 맞춤형 창업 플랜 섹션: 타이틀 그룹 등장
      const plansSection = pageRef.current?.querySelector(
        '.business-plans-section'
      ) as HTMLElement | null;

      if (plansSection) {
        gsap.fromTo(
          '.business-plans-header',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: plansSection,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: pageRef }
  );
};
