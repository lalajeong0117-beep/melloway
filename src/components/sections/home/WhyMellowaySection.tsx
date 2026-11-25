import React, { useRef } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * 4. 왜 멜로웨이를 선택해야할까요 섹션 (Why Melloway Section)
 * - 섹션 상단 고정(pin) 상태에서 스크롤에 따라 하단 3개 텍스트가 순차적으로 1개씩 상승 등장
 * - 마지막(3번째) 텍스트가 완전히 올라오면 고정이 해제(unpin)되어 다음 섹션으로 자연스럽게 이동
 */
export const WhyMellowaySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1) 배너 이미지 커튼 리빌 (섹션 진입 시)
      gsap.fromTo(
        '.why-main-image-wrap',
        {
          clipPath: 'inset(14% 10% 14% 10% round 30px)',
          scale: 0.94,
          opacity: 0.4,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 30px)',
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2) 섹션 고정(Pin) + 스크롤 연동(Scrub) 3단 텍스트 순차 상승
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1400',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onRefresh: () => {
            AOS.refresh();
          },
        },
      });

      textTl
        .fromTo(
          '.text-content-left',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
        .fromTo(
          '.text-content-mid',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
        .fromTo(
          '.text-content-right',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
        // 마지막 텍스트가 올라온 후 잠깐 여유를 두고 핀 해제
        .to({}, { duration: 0.3 });

      // 핀 스페이서 반영을 위해 하위 트리거 좌표 재계산
      ScrollTrigger.refresh();
      AOS.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="why-melloway-section">
      <h2
        className="h1-title why-main-title"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        왜 멜로웨이를 선택해야할까요?
      </h2>

      <div className="why-main-image-wrap">
        <img
          src="/assets/images/hero-sec-04-main-img.jpg"
          alt="왜 멜로웨이를 선택해야할까요 메인 이미지"
          className="why-main-image"
          width={1440}
          height={400}
        />
      </div>

      <div className="text-content">
        <div className="text-content-left">
          <h4 className="sub-title">부담을 낮춘 합리적인 시작</h4>
          <p className="sub-desc">
            큰 초기 자본이나 캠핑카 운영 경험이 없어도 괜찮아요.
            <br />
            불필요한 거품을 뺀 합리적인 창업 비용으로 누구나 부담 없이
            <br />
            내 사업을 시작할 수 있습니다.
          </p>
        </div>

        <div className="text-content-mid">
          <h4 className="sub-title">준비부터 오픈까지 원스톱 지원</h4>
          <p className="sub-desc">
            차량 세팅부터 인허가 절차까지, 혼자 막막해하지 마세요.
            <br />
            처음이라 어려운 창업 준비 과정도 멜로웨이의 검증된 노하우와
            <br />
            함께라면 가볍게 시작할 수 있어요.
          </p>
        </div>

        <div className="text-content-right">
          <h4 className="sub-title">초보 점주도 손쉬운 체계적 운영</h4>
          <p className="sub-desc">
            복잡한 예약 관리부터 차량 유지·보수 가이드까지 멜로웨이만의
            <br />
            통합 관리 시스템으로 오픈 이후에도 안정적이고 편리하게
            <br />
            운영할 수 있어요.
          </p>
        </div>
      </div>
    </section>
  );
};
