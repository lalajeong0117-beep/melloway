import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const EARTH_PHRASES = [
  '일상을 잠시 멈추고, 새로운 내일을 향해 달려요',
  '여행의 길이 넓어질수록, 가능성도 커지니까',
  '길 위에서 시작되는 가장 자유로운 나의 시간',
  '일상을 잠시 멈추고, 새로운 내일을 향해 달려요',
  '여행의 길이 넓어질수록, 가능성도 커지니까',
  '길 위에서 시작되는 가장 자유로운 나의 시간',
];

/**
 * 7. 지구본 원형 텍스트 무한 루프 애니메이션 섹션 (Earth Section)
 * - 6개 독립 SVG textPath 트랙의 겹침 없는 등속 무한 회전
 * - 지구본 이미지 솟아오름 + SVG 텍스트 페이드인
 */
export const EarthSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const pathRefs = useRef<(SVGTextPathElement | null)[]>([]);
  const earthTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.earth-image',
        { y: 160, scale: 0.9, opacity: 0.4 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        '.earth-text-svg',
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const initEarthAnimation = () => {
      if (cancelled) return;
      if (earthTweenRef.current) {
        earthTweenRef.current.kill();
        earthTweenRef.current = null;
      }

      const textEls = textRefs.current;
      const pathEls = pathRefs.current;
      if (textEls.some((el) => !el) || pathEls.some((el) => !el)) return;

      const trackLengths: number[] = [];
      for (let i = 0; i < 6; i++) {
        const len = textEls[i]?.getComputedTextLength() || 820;
        trackLengths.push(len);
      }

      const GAP = 160;
      const cumDist = [0];
      for (let j = 1; j < 6; j++) {
        cumDist.push(cumDist[j - 1] + trackLengths[j - 1] + GAP);
      }
      const cycleLen = cumDist[5] + trackLengths[0] + GAP;

      const P_START = 200;
      const P_EXIT = 3800;
      const initialOffset = 2418;

      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const updatePositions = (p: number) => {
        for (let i = 0; i < 6; i++) {
          let pos = (p + initialOffset - cumDist[i]) % cycleLen;
          if (pos < 0) pos += cycleLen;

          const pathEl = pathEls[i];
          const textEl = textEls[i];
          if (!pathEl || !textEl) continue;

          if (pos >= P_START && pos <= P_EXIT) {
            pathEl.setAttribute('startOffset', pos.toFixed(1));
            textEl.style.visibility = 'visible';
          } else {
            textEl.style.visibility = 'hidden';
          }
        }
      };

      if (prefersReducedMotion) {
        updatePositions(0);
        return;
      }

      const speed = 70;
      const duration = cycleLen / speed;
      const animState = { progress: 0 };

      updatePositions(0);

      earthTweenRef.current = gsap.to(animState, {
        progress: cycleLen,
        duration,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          updatePositions(animState.progress);
        },
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initEarthAnimation);
    } else {
      initEarthAnimation();
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initEarthAnimation, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      cancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      if (earthTweenRef.current) earthTweenRef.current.kill();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="earth-section" aria-label="MELLOWAY 비전">
      <div className="earth-container">
        <div className="earth-image-wrap">
          <img
            src="/assets/images/hero-images-earth.png"
            alt="지구본 배경"
            className="earth-image"
            width={1499}
            height={582}
          />
        </div>

        <svg
          className="earth-text-svg"
          viewBox="0 0 1920 700"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <path
              id="earthArcPath"
              d="M 818.48,1680.62 A 815,815 0 1,1 1101.52,1680.62"
              fill="none"
            />
            <linearGradient id="earthMaskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="12%" stopColor="#ffffff" />
              <stop offset="88%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <mask
              id="earthTextMask"
              maskContentUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1920"
              height="700"
            >
              <rect x="0" y="0" width="1920" height="700" fill="url(#earthMaskGradient)" />
            </mask>
          </defs>
          <g mask="url(#earthTextMask)">
            {EARTH_PHRASES.map((phrase, idx) => (
              <text
                key={idx}
                ref={(el) => {
                  textRefs.current[idx] = el;
                }}
                className="earth-circle-text earth-track-text"
                xmlSpace="preserve"
              >
                <textPath
                  ref={(el) => {
                    pathRefs.current[idx] = el;
                  }}
                  className="earth-track-path"
                  href="#earthArcPath"
                  startOffset="0"
                >
                  {phrase}
                </textPath>
              </text>
            ))}
          </g>
        </svg>

        <div className="sr-only">
          <p>일상을 잠시 멈추고, 새로운 내일을 향해 달려요</p>
          <p>여행의 길이 넓어질수록, 가능성도 커지니까</p>
          <p>길 위에서 시작되는 가장 자유로운 나의 시간</p>
        </div>
      </div>
    </section>
  );
};
