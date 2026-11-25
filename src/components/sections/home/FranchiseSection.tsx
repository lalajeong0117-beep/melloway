import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ROUTES } from '@/constants/routes';
import { Button, RoadBadge } from '@/components/common';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3. 소자본 창업 안내 배너 섹션 (Franchise Section)
 * - 도로는 정지 상태 유지
 * - 도로 양옆 배지: 스크롤 시 오른쪽 배지 먼저 Fade Up -> 이후 왼쪽 배지 순차 Fade Up
 * - 가맹 절차 버튼: 정지 상태 유지 (호버 시 #2B8CE6 / #FFF 색상 전환)
 * - 캠핑카 아이콘: 원래 위치에서 시작해 도로 곡선을 따라 아주 천천히 주행
 */
export const FranchiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1) 도로 양옆 배지 순차 Fade Up (오른쪽 먼저 -> 왼쪽 다음)
      const badgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      badgeTl
        .fromTo(
          '.road-badge.badge-right',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }
        )
        .fromTo(
          '.road-badge.badge-left',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' },
          '>-0.15'
        );

      // 2) 도로 위 캠핑카: 원래 위치에서 도로 커브를 따라 아주 천천히 주행
      gsap.to('.campingcar-icon', {
        keyframes: [
          { x: 0, y: 0, rotation: -15.69, duration: 0 },
          { x: 32, y: 10, rotation: 8, duration: 2.5, ease: 'sine.inOut' },
          { x: 60, y: 42, rotation: 44, duration: 2.5, ease: 'sine.inOut' },
          { x: 52, y: 82, rotation: 84, duration: 2.5, ease: 'sine.inOut' },
        ],
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="franchise-section">
      <div className="franchise-content">
        <div className="franchise-title-wrap">
          <h2 className="h1-title franchise-title">
            가볍게 시작하는 소자본 창업,
            <br />
            수익의 길은 더 넓어집니다
          </h2>
          <p className="franchise-desc">
            적은 초기 비용으로 기대 이상의 수익을 만드세요. <br />
            우리와 함께라면, 당신의 첫 창업도 든든합니다.
          </p>
        </div>
        <Button variant="franchise" to={ROUTES.BUSINESS_INFO}>
          가맹 절차 한눈에 보기 &rarr;
        </Button>
      </div>

      <div className="franchise-image-wrap">
        <img
          src="/assets/images/road-3d-icon.png"
          className="road-icon"
          alt="로드 3D 그래픽"
          width={499}
          height={485}
        />
        <img
          src="/assets/images/campingcar-3d-icon.png"
          className="campingcar-icon"
          alt="캠핑카 3D 아이콘"
          width={163}
          height={136}
        />

        <RoadBadge position="right" text="본사 통합 마케팅·예약 지원" aosAnimation="" />
        <RoadBadge position="left" text="저비용 고효율 수익 구조" aosAnimation="" />
      </div>
    </section>
  );
};
