import React, { useRef } from 'react';
import { useSupportKvAnimation } from './supportKv';

export interface SupportPageHeaderProps {
  title: string;
  subtitle: string;
  kvImage?: string;
  kvAlt?: string;
  ariaLabel?: string;
}

/**
 * [Support 공통] 상단 KV 섹션
 * - KV 이미지 + #22252A 40% 오버레이 + 정중앙 2줄 텍스트 순차 등장
 */
export const SupportPageHeader: React.FC<SupportPageHeaderProps> = ({
  title,
  subtitle,
  kvImage,
  kvAlt = '멜로웨이 고객 지원 비주얼',
  ariaLabel = '페이지 메인 비주얼',
}) => {
  const kvRef = useRef<HTMLElement>(null);

  useSupportKvAnimation(kvRef, `${title}-${subtitle}`);

  return (
    <section ref={kvRef} className="support-kv" aria-label={ariaLabel}>
      {kvImage && (
        <>
          <img
            src={kvImage}
            alt={kvAlt}
            className="support-kv-img"
            width={1920}
            height={850}
          />
          <div className="support-kv-overlay" aria-hidden="true" />
        </>
      )}
      <div className="support-kv-content-wrap">
        <div className="support-kv-content">
          <h1 className="support-kv-title">{title}</h1>
          <p className="support-kv-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
