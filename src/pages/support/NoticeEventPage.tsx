import React from 'react';
import { SupportPageHeader } from './components/SupportPageHeader';
import { NOTICE_MAGNIFIER_ICON, useNoticeSearch } from './scripts/notice';
import { SUPPORT_KV_IMAGE } from './scripts/supportNav';
import './styles/support-common.css';
import './styles/notice.css';

/**
 * [담당 영역: Support] 1단계 - 공지 사항 페이지
 * - CSS(./styles/support-common.css, ./styles/notice.css)와
 *   로직(./scripts/notice.ts)을 분리하여 관리합니다.
 */
export const NoticeEventPage: React.FC = () => {
  const { searchQuery, handleSearchChange } = useNoticeSearch();

  return (
    <section className="support-page" aria-label="공지 사항">
      <SupportPageHeader
        title="Notice"
        subtitle="더 안전한 캠핑 여정을 위한 멜로웨이의 공식 안내를 확인하세요."
        kvImage={SUPPORT_KV_IMAGE}
        kvAlt="멜로웨이 공지 사항 메인 비주얼"
        ariaLabel="공지 사항 메인 비주얼"
      />

      <div className="support-content">
        <div className="support-notice-header">
          <h2 className="support-notice-heading">공지 사항</h2>

          <div className="support-notice-search">
            <input
              type="text"
              role="searchbox"
              className="support-notice-search-input"
              placeholder="필요한 공지사항을 찾아보세요"
              aria-label="공지 사항 검색"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <img
              src={NOTICE_MAGNIFIER_ICON}
              alt="검색"
              className="support-notice-search-icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
