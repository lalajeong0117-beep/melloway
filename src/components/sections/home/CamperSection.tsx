import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CAMPER_LIST, CamperItem } from '@/data/campers';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/common';

gsap.registerPlugin(ScrollTrigger);

interface SlideItem {
  key: string;
  carIndex: number;
  camper: CamperItem;
}

/**
 * 2. 캠핑카 쇼케이스 섹션 (Camper Section)
 * - 4종 캠핑카 센터형 무한 루프 캐러셀 (양옆 클론 포함 8슬라이드)
 * - 좌우 버튼 / 포인터 드래그 / 리사이즈 대응
 */
export const CamperSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const currentIndexRef = useRef<number>(2);
  const isAnimatingRef = useRef<boolean>(false);

  // 8개 슬라이드 구성: [clone(2), clone(3), real(0), real(1), real(2), real(3), clone(0), clone(1)]
  const slides: SlideItem[] = useMemo(() => {
    const order = [2, 3, 0, 1, 2, 3, 0, 1];
    return order.map((carIndex, idx) => ({
      key: `slide-${idx}-${CAMPER_LIST[carIndex].id}`,
      carIndex,
      camper: CAMPER_LIST[carIndex],
    }));
  }, []);

  const activeCar = useMemo(() => {
    const realIndex = ((currentIndex - 2) % 4 + 4) % 4;
    return CAMPER_LIST[realIndex];
  }, [currentIndex]);

  const getTargetX = useCallback((idx: number): number => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return 0;

    const slideEl = track.children[idx] as HTMLElement | undefined;
    if (!slideEl) return 0;

    const viewportCenter = viewport.offsetWidth / 2;
    const slideCenter = slideEl.offsetLeft + slideEl.offsetWidth / 2;
    return viewportCenter - slideCenter;
  }, []);

  const goToSlide = useCallback(
    (nextIndex: number, immediate = false) => {
      const track = trackRef.current;
      if (!track) return;

      if (isAnimatingRef.current && !immediate) return;

      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);

      const targetX = getTargetX(nextIndex);

      if (immediate) {
        gsap.set(track, { x: targetX });
        isAnimatingRef.current = false;
        return;
      }

      isAnimatingRef.current = true;
      gsap.to(track, {
        x: targetX,
        duration: 0.65,
        ease: 'power3.out',
        onComplete: () => {
          let snappedIndex = nextIndex;
          if (nextIndex >= 6) {
            snappedIndex = nextIndex - 4;
          } else if (nextIndex <= 1) {
            snappedIndex = nextIndex + 4;
          }

          if (snappedIndex !== nextIndex) {
            currentIndexRef.current = snappedIndex;
            setCurrentIndex(snappedIndex);
            gsap.set(track, { x: getTargetX(snappedIndex) });
          }
          isAnimatingRef.current = false;
        },
      });
    },
    [getTargetX]
  );

  // 초기 위치 잡기 및 리사이즈 대응
  useEffect(() => {
    const handleResize = () => {
      goToSlide(currentIndexRef.current, true);
    };

    // 이미지/폰트 레이아웃 확정 후 초기 중앙 정렬
    const timer = setTimeout(() => {
      goToSlide(currentIndexRef.current, true);
    }, 50);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [goToSlide]);

  // 드래그 / 스와이프 핸들링
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let startX = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      if (isAnimatingRef.current) return;
      isDragging = true;
      startX = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          goToSlide(currentIndexRef.current + 1);
        } else {
          goToSlide(currentIndexRef.current - 1);
        }
      }
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [goToSlide]);

  // ScrollTrigger 섹션 타이틀 및 정보 등장 애니메이션
  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.camper-section .section-title',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.main-sec02-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.main-sec02-content',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div className="camper-panel-wrap">
      <section ref={sectionRef} className="camper-section">
        <h2 className="h1-title section-title">어디로는 떠날 준비가 되었다면</h2>

        <div className="van-showcase">
          <Button
            variant="slide-nav"
            className="prev-btn"
            ariaLabel="이전 캠핑카"
            onClick={() => goToSlide(currentIndexRef.current + 1)}
          >
            <img
              src="/assets/images/left-icon.svg"
              alt="이전"
              width={29}
              height={50}
            />
          </Button>

          <div ref={viewportRef} className="van-carousel-viewport">
            <div ref={trackRef} className="van-carousel-track">
              {slides.map((slide, idx) => (
                <div
                  key={slide.key}
                  className={`camper-slide ${idx === currentIndex ? 'is-active' : ''}`}
                  data-car-index={slide.carIndex}
                >
                  <img
                    src={slide.camper.image}
                    alt={slide.camper.name}
                    className="camper-slide-img"
                    width={slide.camper.width}
                    height={slide.camper.height}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="slide-nav"
            className="next-btn"
            ariaLabel="다음 캠핑카"
            onClick={() => goToSlide(currentIndexRef.current - 1)}
          >
            <img
              src="/assets/images/right-icon.svg"
              alt="다음"
              width={29}
              height={50}
            />
          </Button>
        </div>

        {/* 메인 & 서브 콘텐츠 및 더보기 버튼 */}
        <div className="main-sec02-content">
          <div className="main-sec02-car-name">
            <h3 className="main-car-title">{activeCar.name}</h3>
            <p className="sub-car-info">{activeCar.info}</p>
          </div>
          <Button variant="more" to={ROUTES.CAMPERS_LIST}>
            더보기
          </Button>
        </div>
      </section>
    </div>
  );
};
