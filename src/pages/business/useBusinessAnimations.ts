import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Business(파트너스 안내) 페이지 전용 GSAP 인터랙션 모듈
 * - 메인 KV 인트로 애니메이션
 * - WHY CHOOSE US 5종 카드: 오른쪽->왼쪽 천천히 무한 회전 + 마우스 호버 정지 + 클릭 드래그(관성 가속) 지원
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

      // 2) WHY CHOOSE US 무한 루프 + 호버 정지 + 클릭 드래그 관성 스크롤
      const viewport = pageRef.current?.querySelector(
        '.business-why-marquee-viewport'
      ) as HTMLElement | null;
      const track = pageRef.current?.querySelector(
        '.business-why-marquee-track'
      ) as HTMLElement | null;
      const firstGroup = pageRef.current?.querySelector(
        '.business-why-marquee-group'
      ) as HTMLElement | null;

      if (!viewport || !track || !firstGroup) return;

      let groupWidth = firstGroup.offsetWidth || 1830;
      let currentX = 0;
      let isHovered = false;
      let isDragging = false;
      let lastPointerX = 0;
      let dragVelocity = 0; // px per frame during drag
      let inertiaVelocity = 0;

      const BASE_SPEED = -45; // px/sec (오른쪽 -> 왼쪽 천천히 자동 이동)
      let currentAutoSpeed = BASE_SPEED;

      const wrapX = (val: number) => gsap.utils.wrap(-groupWidth, 0, val);

      const updateDimensions = () => {
        groupWidth = firstGroup.offsetWidth || 1830;
        currentX = wrapX(currentX);
        gsap.set(track, { x: currentX });
      };

      const onTick = (_time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime, 50) / 1000;

        if (!isDragging) {
          // 관성 감속 적용
          if (Math.abs(inertiaVelocity) > 0.2) {
            currentX = wrapX(currentX + inertiaVelocity);
            inertiaVelocity *= 0.93;
          } else {
            inertiaVelocity = 0;
            // 호버 중이면 부드럽게 정지, 아니면 천천히 자동 흐름 복귀
            const targetSpeed = isHovered ? 0 : BASE_SPEED;
            currentAutoSpeed += (targetSpeed - currentAutoSpeed) * 0.08;
            currentX = wrapX(currentX + currentAutoSpeed * dt);
          }

          gsap.set(track, { x: currentX });
        }
      };

      gsap.ticker.add(onTick);

      const onMouseEnter = () => {
        isHovered = true;
      };

      const onMouseLeave = () => {
        isHovered = false;
      };

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        isHovered = true;
        lastPointerX = e.clientX;
        dragVelocity = 0;
        inertiaVelocity = 0;
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture?.(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastPointerX;
        lastPointerX = e.clientX;
        dragVelocity = dx;
        currentX = wrapX(currentX + dx);
        gsap.set(track, { x: currentX });
      };

      const onPointerUp = (e: PointerEvent) => {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove('is-dragging');
        if (viewport.hasPointerCapture?.(e.pointerId)) {
          viewport.releasePointerCapture(e.pointerId);
        }
        // 드래그 방향으로 빠른 관성 이동
        inertiaVelocity = dragVelocity * 1.15;
      };

      viewport.addEventListener('mouseenter', onMouseEnter);
      viewport.addEventListener('mouseleave', onMouseLeave);
      viewport.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('resize', updateDimensions);

      return () => {
        gsap.ticker.remove(onTick);
        viewport.removeEventListener('mouseenter', onMouseEnter);
        viewport.removeEventListener('mouseleave', onMouseLeave);
        viewport.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        window.removeEventListener('resize', updateDimensions);
      };
    },
    { scope: pageRef }
  );
};
