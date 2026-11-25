import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BENEFIT_LIST } from '@/data/benefits';
import { EventCard } from '@/components/common';

gsap.registerPlugin(ScrollTrigger);

/**
 * 5. 여행에 특별한 혜택을 더하다 섹션 (Benefit Section)
 * - AOS: 타이틀 Zoom In Up
 * - GSAP: 4개 이벤트 카드 3D 탄성 드롭(back.out(1.7)) + 캐릭터 점프 루프
 */
export const BenefitSection: React.FC = () => {
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
        '.event-card',
        { y: 95, scale: 0.82, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: 'back.out(1.7)',
        }
      ).fromTo(
        '.event-card-character',
        { y: 25, scale: 0.7, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to('.event-card-character', {
              y: -14,
              rotation: 6,
              scale: 1.06,
              duration: 1.1,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              stagger: { each: 0.2, from: 'start' },
            });
          },
        },
        '-=0.45'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="benefit-section">
      <h2
        className="h1-title benefit-main-title"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        여행에 특별한 혜택을 더하다!
      </h2>

      <div className="event-cards-wrap">
        {BENEFIT_LIST.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
