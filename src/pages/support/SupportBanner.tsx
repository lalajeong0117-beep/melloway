import React from 'react';
import { Link } from 'react-router-dom';
import {
  scrollToBusinessInquiryForm,
  SUPPORT_BANNER_ARROW_ICON,
  SUPPORT_BANNER_CONTENT,
  SUPPORT_BANNER_IMAGE,
} from './supportBannerData';

/**
 * [Support 공통] 하단 문의 배너 섹션
 */
export const SupportBanner: React.FC = () => {
  return (
    <section className="support-banner" aria-label="멜로웨이 고객 및 창업 문의 배너">
      <img
        src={SUPPORT_BANNER_IMAGE}
        alt="해안 도로를 달리는 멜로웨이 캠핑카"
        className="support-banner-img"
        width={1920}
        height={442}
      />
      <div className="support-banner-gradient" aria-hidden="true" />
      <div className="support-banner-overlay" aria-hidden="true" />

      <div className="support-banner-inner">
        <div className="support-banner-texts">
          <p className="support-banner-eyebrow">
            {SUPPORT_BANNER_CONTENT.eyebrow}
          </p>
          <p className="support-banner-title">
            {SUPPORT_BANNER_CONTENT.title}
          </p>
          <p className="support-banner-subtitle">
            {SUPPORT_BANNER_CONTENT.subtitle}
          </p>
        </div>

        <div className="support-banner-actions">
          <Link
            to={SUPPORT_BANNER_CONTENT.primaryButton.to}
            className="support-banner-btn support-banner-btn--primary"
          >
            <span>{SUPPORT_BANNER_CONTENT.primaryButton.label}</span>
            <img
              src={SUPPORT_BANNER_ARROW_ICON}
              alt=""
              aria-hidden="true"
              className="support-banner-btn-icon"
              width={14}
              height={14}
            />
          </Link>

          <Link
            to={SUPPORT_BANNER_CONTENT.secondaryButton.to}
            className="support-banner-btn support-banner-btn--outline"
            onClick={scrollToBusinessInquiryForm}
          >
            <span>{SUPPORT_BANNER_CONTENT.secondaryButton.label}</span>
            <img
              src={SUPPORT_BANNER_ARROW_ICON}
              alt=""
              aria-hidden="true"
              className="support-banner-btn-icon"
              width={14}
              height={14}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
