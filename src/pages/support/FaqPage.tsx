import React from 'react';
import { SupportBanner } from './SupportBanner';
import { SupportPageHeader } from './SupportPageHeader';
import {
  FAQ_CATEGORIES,
  FAQ_CHEVRON_ICON,
  FAQ_LEFT_ICON,
  FAQ_MAGNIFIER_ICON,
  FAQ_RIGHT_ICON,
  useFaqBoard,
} from './faq';
import { SUPPORT_KV_IMAGE } from './supportNav';
import './support-common.css';
import './support-banner.css';
import './faq.css';

/**
 * [담당 영역: Support] 2단계 - 자주 묻는 질문 (FAQ) 페이지
 * - CSS(./support-common.css, ./faq.css)와
 *   로직(./faq.ts)을 분리하여 관리합니다.
 */
export const FaqPage: React.FC = () => {
  const {
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    expandedId,
    paginatedFaqs,
    handleCategoryChange,
    handleSearchChange,
    toggleAccordion,
    handlePageChange,
    goToPrevPage,
    goToNextPage,
  } = useFaqBoard();

  return (
    <section
      className="support-page support-page--with-banner"
      aria-label="자주 묻는 질문"
    >
      <SupportPageHeader
        title="Your Questions, Our Answers."
        subtitle="당신의 궁금증에 멜로웨이가 답합니다."
        kvImage={SUPPORT_KV_IMAGE}
        kvAlt="멜로웨이 자주 묻는 질문 메인 비주얼"
        ariaLabel="자주 묻는 질문 메인 비주얼"
      />

      <div className="support-content">
        <div className="support-faq-header">
          <h2 className="support-faq-heading">자주 묻는 질문</h2>

          <div className="support-faq-search">
            <input
              type="text"
              role="searchbox"
              className="support-faq-search-input"
              placeholder="궁금한 점을 입력해 보세요"
              aria-label="자주 묻는 질문 검색"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <img
              src={FAQ_MAGNIFIER_ICON}
              alt="검색"
              className="support-faq-search-icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div
          className="support-faq-tabs"
          role="tablist"
          aria-label="자주 묻는 질문 카테고리"
        >
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`support-faq-tab${
                selectedCategory === category ? ' is-active' : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ 아코디언 목록 */}
        <div className="support-faq-list-box">
          {paginatedFaqs.length > 0 ? (
            <ul className="support-faq-list">
              {paginatedFaqs.map((item) => {
                const isOpen = expandedId === item.id;
                return (
                  <li
                    key={item.id}
                    className={`support-faq-item${isOpen ? ' is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="support-faq-item-btn"
                      aria-expanded={isOpen}
                      onClick={() => toggleAccordion(item.id)}
                    >
                      <div className="support-faq-item-texts">
                        <p className="support-faq-question">{item.question}</p>
                        <div className="support-faq-answer-wrap">
                          <div className="support-faq-answer-inner">
                            <p className="support-faq-answer">{item.answer}</p>
                          </div>
                        </div>
                      </div>

                      <img
                        src={FAQ_CHEVRON_ICON}
                        alt=""
                        aria-hidden="true"
                        className="support-faq-chevron"
                        width={11}
                        height={7}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="support-faq-empty">검색 결과가 없습니다.</p>
          )}
        </div>

        {/* 페이지 이동 버튼 */}
        {paginatedFaqs.length > 0 && (
          <nav
            className="support-faq-pagination"
            aria-label="자주 묻는 질문 페이지 이동"
          >
            <button
              type="button"
              className="support-faq-page-arrow"
              aria-label="이전 페이지"
              disabled={currentPage === 1}
              onClick={goToPrevPage}
            >
              <img src={FAQ_LEFT_ICON} alt="이전" width={8} height={9} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  aria-label={`${pageNum}페이지`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                  className={`support-faq-page-btn${
                    currentPage === pageNum ? ' is-active' : ''
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              type="button"
              className="support-faq-page-arrow"
              aria-label="다음 페이지"
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
            >
              <img src={FAQ_RIGHT_ICON} alt="다음" width={8} height={9} />
            </button>
          </nav>
        )}
      </div>

      <SupportBanner />
    </section>
  );
};
