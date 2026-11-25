import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * 1. 히어로 섹션 (Hero Section)
 * - Sticky 배경 레이어 (Layered Panel Reveal)
 * - 초기 인트로 타이틀 GSAP 애니메이션 포함
 */
export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.navi',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1 }
      )
        .fromTo(
          '.hero-kv-main-title .main-title',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          '-=0.5'
        )
        .fromTo(
          '.hero-kv-main-title .sub-title',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.6'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="container d-flex" />
      <div className="hero-kv-main-title">
        <h1 className="main-title">
          길 위에서 시작되는 <br />
          새로운 비즈니스
        </h1>
        <p className="sub-title">
          누구나 꿈꾸는 자유로운 캠핑카 라이프, 멜로웨이의
          <br />
          검증된 프렌차이즈 시스템으로 당신의 성공적인 비즈니스가 됩니다.
        </p>
      </div>
    </section>
  );
};
