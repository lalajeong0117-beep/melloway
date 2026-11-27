import { useEffect } from 'react';
import AOS from 'aos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import supportKvImg from '../../../assets/images/Support_KV.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * 공지 사항 / 자주 묻는 질문 페이지 공용 KV 이미지
 */
export const SUPPORT_KV_IMAGE = supportKvImg;

/**
 * 라우트 이동 후 페이지 높이가 달라졌을 때 Footer 등의 ScrollTrigger / AOS 좌표를 재계산합니다.
 */
export const useSupportLayoutRefresh = () => {
  useEffect(() => {
    const refreshAnimations = () => {
      ScrollTrigger.refresh();
      AOS.refresh();
    };

    const rafId = window.requestAnimationFrame(refreshAnimations);
    const timer = window.setTimeout(refreshAnimations, 160);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
    };
  }, []);
};
