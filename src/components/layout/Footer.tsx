import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FOOTER_MENU } from '@/data/navigation';
import { Logo } from '@/components/common';

gsap.registerPlugin(ScrollTrigger);

/**
 * MELLOWAY 전역 푸터 컴포넌트 (1920*435)
 */
export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.footer-left',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }
      ).fromTo(
        '.footer-menu-col',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out' },
        '-=0.5'
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-container">
        {/* 푸터 좌측 정보 영역 */}
        <div className="footer-left" data-aos="fade-up" data-aos-duration="800">
          <Logo variant="footer" />

          {/* information 오토레이아웃 */}
          <div className="footer-information">
            <div className="info-item">
              <img
                src="/assets/images/message-icon.svg"
                alt="이메일"
                className="info-icon"
                width={15}
                height={12}
              />
              <a href="mailto:mellowayyy@melloway.com" className="info-text-link">
                mellowayyy@melloway.com
              </a>
            </div>
            <div className="info-item">
              <img
                src="/assets/images/positon.svg"
                alt="위치"
                className="info-icon"
                width={12}
                height={15}
              />
              <span className="info-item-text">Seoul, South Korea</span>
            </div>
            <div className="info-item">
              <img
                src="/assets/images/tell-icon.svg"
                alt="전화번호"
                className="info-icon"
                width={15}
                height={14}
              />
              <a href="tel:+82021234567" className="info-text-link">
                +82 02-123-4567
              </a>
            </div>
          </div>

          {/* info-text-content 오토레이아웃 */}
          <div className="info-text-content">
            <div className="info-text">
              <p className="company-info-text">주식회사 멜로웨이 | 대표이사 OOO</p>
              <p className="company-info-text">인천광역시 남동구 이젠아카데미</p>
              <p className="company-info-text">사업자 등록 번호 : 123-456-7890</p>
            </div>
            <p className="copyright-text">© 2026 Mellow Way. All Rights Reserved.</p>
          </div>
        </div>

        {/* 푸터 우측 4열 메뉴 영역 */}
        <nav className="footer-nav" aria-label="푸터 내비게이션">
          {FOOTER_MENU.map((group, idx) => (
            <div
              key={group.id}
              className="footer-menu-col"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              data-aos-duration="800"
            >
              <h4 className="footer-menu-title">{group.label}</h4>
              <ul className="footer-sub-menu">
                {group.subItems.map((sub) => (
                  <li key={`${group.id}-${sub.label}`}>
                    <Link to={sub.path} className="footer-sub-link">
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
};
