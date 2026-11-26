import React from 'react';
import { Button } from '@/components/common';
import { SupportPageHeader } from './components/SupportPageHeader';
import {
  getNoticeCategoryClass,
  NOTICE_CATEGORIES,
  useNoticeBoard,
} from './scripts/notice';
import './styles/support-common.css';
import './styles/notice.css';

/**
 * [담당 영역: Support] 1단계 - 공지 사항 페이지
 * - CSS(./styles/support-common.css, ./styles/notice.css)와
 *   로직(./scripts/notice.ts)을 분리하여 관리합니다.
 */
export const NoticeEventPage: React.FC = () => {
  const {
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    totalCount,
    paginatedNotices,
    activeNotice,
    prevNotice,
    nextNotice,
    setCurrentPage,
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
    openNotice,
    closeNotice,
  } = useNoticeBoard();

  return (
          <section className="support-page" aria-label="공지 사항">
            <SupportPageHeader
              title="공지 사항"
              description="멜로웨이의 새로운 소식, 지점 오픈 정보 및 서비스 이용 안내를 확인하실 수 있습니다."
            />

            <div className="support-content">
              {/* 카테고리 필터 및 검색 바 */}
              <div className="support-notice-toolbar">
                <div
                  className="support-notice-tabs"
                  role="tablist"
                  aria-label="공지 사항 카테고리"
                >
                  {NOTICE_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={selectedCategory === category}
                      className={`support-notice-tab${selectedCategory === category ? ' is-active' : ''
                        }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="support-notice-search">
                  <input
                    type="search"
                    className="support-notice-search-input"
                    placeholder="제목 또는 내용 검색"
                    aria-label="공지 사항 검색"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="support-notice-search-clear"
                      aria-label="검색어 초기화"
                      onClick={() => handleSearchChange('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 전체 건수 표시 */}
              <div className="support-notice-meta-bar">
                <span className="support-notice-count">
                  총 <strong>{totalCount}</strong>건의 공지 사항이 있습니다.
                </span>
              </div>

              {/* 공지 목록 보드 */}
              <div className="support-notice-board">
                <div className="support-notice-head" aria-hidden="true">
                  <span>번호</span>
                  <span>분류</span>
                  <span className="support-notice-head-title">제목</span>
                  <span>등록일</span>
                  <span>조회수</span>
                </div>

                {paginatedNotices.length > 0 ? (
                  <ul className="support-notice-list">
                    {paginatedNotices.map((item) => (
                      <li
                        key={item.id}
                        className={`support-notice-row${item.isPinned ? ' is-pinned' : ''}`}
                      >
                        <button
                          type="button"
                          className="support-notice-row-btn"
                          onClick={() => openNotice(item.id)}
                        >
                          <span className="support-notice-num">
                            {item.isPinned ? (
                              <span className="support-notice-pin-badge">중요</span>
                            ) : (
                              item.id
                            )}
                          </span>

                          <span
                            className={`support-notice-cat ${getNoticeCategoryClass(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>

                          <span className="support-notice-title-cell">
                            <span className="support-notice-title-text">
                              {item.title}
                            </span>
                            {item.isNew && (
                              <span className="support-notice-new">NEW</span>
                            )}
                          </span>

                          <span className="support-notice-date">{item.date}</span>
                          <span className="support-notice-views">{item.views}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="support-notice-empty">
                    <p className="support-notice-empty-title">
                      일치하는 공지 사항이 없습니다.
                    </p>
                    <p className="support-notice-empty-desc">
                      검색어나 카테고리를 변경해 다시 확인해 주세요.
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      전체 목록 보기
                    </Button>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <nav
                  className="support-notice-pagination"
                  aria-label="공지 사항 페이지 이동"
                >
                  <button
                    type="button"
                    className="support-notice-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    이전
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                        className={`support-notice-page-btn${currentPage === pageNum ? ' is-active' : ''
                          }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    className="support-notice-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    다음
                  </button>
                </nav>
              )}
            </div>

            {/* 공지 상세 모달 */}
            {activeNotice && (
              <div
                className="support-notice-modal-backdrop"
                role="dialog"
                aria-modal="true"
                aria-labelledby="support-notice-modal-title"
                onClick={closeNotice}
              >
                <div
                  className="support-notice-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="support-notice-modal-header">
                    <div className="support-notice-modal-top">
                      <div className="support-notice-modal-badges">
                        {activeNotice.isPinned && (
                          <span className="support-notice-pin-badge">중요</span>
                        )}
                        <span
                          className={`support-notice-cat ${getNoticeCategoryClass(
                            activeNotice.category
                          )}`}
                        >
                          {activeNotice.category}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="support-notice-modal-close"
                        aria-label="상세 내용 닫기"
                        onClick={closeNotice}
                      >
                        ✕
                      </button>
                    </div>

                    <h2
                      id="support-notice-modal-title"
                      className="support-notice-modal-title"
                    >
                      {activeNotice.title}
                    </h2>

                    <div className="support-notice-modal-meta">
                      <span>등록일 {activeNotice.date}</span>
                      <span>조회수 {activeNotice.views}</span>
                    </div>
                  </div>

                  <div className="support-notice-modal-body">
                    {activeNotice.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="support-notice-modal-footer">
                    <div className="support-notice-modal-nav">
                      <Button
                        variant="outline"
                        disabled={!prevNotice}
                        onClick={() => prevNotice && openNotice(prevNotice.id)}
                      >
                        이전 글
                      </Button>
                      <Button
                        variant="outline"
                        disabled={!nextNotice}
                        onClick={() => nextNotice && openNotice(nextNotice.id)}
                      >
                        다음 글
                      </Button>
                    </div>
                    <Button variant="primary" onClick={closeNotice}>
                      목록으로
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>
          );
};
