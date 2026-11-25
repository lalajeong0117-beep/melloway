import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  HeroSection,
  CamperSection,
  FranchiseSection,
  WhyMellowaySection,
  BenefitSection,
  JourneyCtaSection,
  EarthSection,
} from '@/components/sections/home';

gsap.registerPlugin(ScrollTrigger);

/**
 * MELLOWAY 메인 랜딩 페이지
 * - 각 섹션은 `src/components/sections/home/`에서 독립 관리됩니다.
 */
export const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroSection = document.querySelector('.hero-section') as HTMLElement | null;
      const camperWrap = document.querySelector('.camper-panel-wrap') as HTMLElement | null;
      if (!heroSection || !camperWrap) return;

      ScrollTrigger.create({
        trigger: camperWrap,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
          heroSection.style.visibility = 'hidden';
        },
        onLeaveBack: () => {
          heroSection.style.visibility = 'visible';
        },
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="home-page">
      <HeroSection />
      <CamperSection />
      <FranchiseSection />
      <WhyMellowaySection />
      <BenefitSection />
      <JourneyCtaSection />
      <EarthSection />
    </div>
  );
};
