import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ROUTES } from '@/constants/routes';
import { CtaCard } from '@/components/common';

gsap.registerPlugin(ScrollTrigger);

/**
 * 6. 설레는 여정의 시작 섹션 (Journey CTA Section)
 * - AOS: 메인/서브 타이틀 Fade Up
 * - GSAP: 좌/우 대형 CTA 카드 양끝에서 강렬한 슬라이드 인 + 화살표 연속 펄스
 */
export const JourneyCtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.cta-store-btn',
        { x: -45, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          '.cta-franchise-btn',
          { x: 45, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        )
        .to(
          '.cta-arrow-icon',
          {
            x: 5,
            duration: 0.35,
            yoyo: true,
            repeat: 3,
            ease: 'power1.inOut',
          },
          '-=0.1'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="journey-cta-section">
      <div className="journey-title-wrap">
        <h2
          className="h1-title journey-main-title"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          설레는 여정의 시작부터 새로운 도약의 순간까지
        </h2>
        <p
          className="journey-sub-title"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="900"
        >
          여행자를 위한 간편한 예약과 예비 파트너를 위한 맞춤 상담을 한곳에서 시작하세요.
        </p>
      </div>

      <div className="journey-cta-wrap">
        <CtaCard
          to={ROUTES.ABOUT_BRANCHES}
          variant="store"
          iconSrc="/assets/images/melloway-store-icon.png"
          iconAlt="Find a store"
          iconClassName="cta-store-icon"
          iconWidth={66}
          iconHeight={56}
          title="Find a store"
          subtitle="멜로웨이 전국 지점 안내 바로가기"
        />
        <CtaCard
          to={ROUTES.BUSINESS_INFO}
          variant="franchise"
          iconSrc="/assets/images/melloway-doc-icon.png"
          iconAlt="Franchise"
          iconClassName="cta-doc-icon"
          iconWidth={61}
          iconHeight={61}
          title="Franchise"
          subtitle="멜로웨이 창업 안내 바로가기"
        />
      </div>
    </section>
  );
};
