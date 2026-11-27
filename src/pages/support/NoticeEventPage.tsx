import React from 'react';
import { NoticeDetail } from './components/NoticeDetail';
import { SupportBanner } from './components/SupportBanner';
import { SupportPageHeader } from './components/SupportPageHeader';
import {
  NOTICE_LEFT_ICON,
  NOTICE_MAGNIFIER_ICON,
  NOTICE_RIGHT_ICON,
  useNoticeBoard,
} from './scripts/notice';
import { SUPPORT_KV_IMAGE } from './scripts/supportNav';
import './styles/support-common.css';
import './styles/support-banner.css';
import './styles/notice.css';
import './styles/notice-detail.css';

/**
 * [담당 영역: Support] 1단계 - 공지 사항 페이지
 * - CSS(./styles/*.css)와 로직(./scripts/notice.ts)을 분리하여 관리합니다.
 */
export const NoticeEventPage: React.FC = () => {
  const {
    searchQuery,
    currentPage,
    totalPages,
    totalCount,
    paginatedNotices,
    activeNotice,
    prevNotice,
    nextNotice,
    setCurrentPage,
    goToPrevPage,
    goToNextPage,
    handleSearchChange,
    openNotice,
    closeNotice,
  } = useNoticeBoard();

  if (activeNotice) {
    return (
      <section
        className="support-page support-page--with-banner"
        aria-label="공지 사항 상세"
      >
        <NoticeDetail
          notice={activeNotice}
          prevNotice={prevNotice}
          nextNotice={nextNotice}
          onSelectNotice={openNotice}
          onBackToList={closeNotice}
        />
        <SupportBanner />
      </section>
    );
  }

  return (
    <section
      className="support-page support-page--with-banner"
      aria-label="공지 사항"
    >
      <SupportPageHeader
        title="Notice"
        subtitle="더 안전한 캠핑 여정을 위한 멜로웨이의 공식 안내를 확인하세요."
        kvImage={SUPPORT_KV_IMAGE}
        kvAlt="멜로웨이 공지 사항 메인 비주얼"
        ariaLabel="공지 사항 메인 비주얼"
      />

      <div className="support-content">
        <div className="support-notice-header">
          <h2 className="support-notice-heading">공지사항</h2>

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

        <div className="support-notice-body">
          <p className="support-notice-count">
            총 <span className="support-notice-count-num">{totalCount}</span>건
          </p>

          {paginatedNotices.length > 0 ? (
            <>
              <ul className="support-notice-list">
                {paginatedNotices.map((item) => (
                  <li key={item.id} className="support-notice-item">
                    <span className="support-notice-num">{item.id}</span>
                    <div className="support-notice-title">
                      <button
                        type="button"
                        className="support-notice-title-btn"
                        onClick={() => openNotice(item.id)}
                      >
                        {item.title}
                      </button>
                    </div>
                    <span className="support-notice-date">{item.date}</span>
                  </li>
                ))}
              </ul>

              <nav
                className="support-notice-pagination"
                aria-label="공지 사항 페이지 이동"
              >
                <button
                  type="button"
                  className="support-notice-page-arrow"
                  aria-label="이전 페이지"
                  disabled={currentPage === 1}
                  onClick={goToPrevPage}
                >
                  <img src={NOTICE_LEFT_ICON} alt="이전" width={8} height={9} />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      aria-label={`${pageNum}페이지`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                      className={`support-notice-page-btn${
                        currentPage === pageNum ? ' is-active' : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="support-notice-page-arrow"
                  aria-label="다음 페이지"
                  disabled={currentPage === totalPages}
                  onClick={goToNextPage}
                >
                  <img src={NOTICE_RIGHT_ICON} alt="다음" width={8} height={9} />
                </button>
              </nav>
            </>
          ) : (
            <p className="support-notice-empty">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>

      <SupportBanner />
    </section>
  );
};
