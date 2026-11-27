import React from 'react';
import { SupportPageHeader } from './components/SupportPageHeader';
import {
  EVENT_TABS,
  EVENTS_KV_IMAGE,
  EVENTS_KV_SUBTITLE,
  EVENTS_KV_TITLE,
  useEventTabs,
} from './scripts/events';
import './styles/support-common.css';
import './styles/events.css';

/**
 * [담당 영역: Support] 이벤트 · 혜택 페이지
 * - 공통 Header는 MainLayout에서 KV 상단에 표시됩니다.
 * - CSS(./styles/support-common.css, ./styles/events.css)와
 *   로직/데이터(./scripts/events.ts)를 분리하여 관리합니다.
 */
export const EventsPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    visibleEvents,
    currentPage,
    totalPages,
    setCurrentPage,
    goToPrevPage,
    goToNextPage,
    selectedEvent,
    openEventModal,
    closeEventModal,
  } = useEventTabs('all');

  return (
    <section className="support-page events-page" aria-label="이벤트 · 혜택">
      <SupportPageHeader
        title={EVENTS_KV_TITLE}
        subtitle={EVENTS_KV_SUBTITLE}
        kvImage={EVENTS_KV_IMAGE}
        kvAlt="멜로웨이 이벤트 및 프로모션 메인 비주얼"
        ariaLabel="이벤트 · 혜택 메인 비주얼"
      />

      <div className="support-content events-content">
        <div className="events-tabs" role="tablist" aria-label="이벤트 상태 필터">
          {EVENT_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`events-tab-btn${activeTab === tab.key ? ' is-active' : ''
                }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="events-grid" role="tabpanel">
          {visibleEvents.map((item) =>
            item.status === 'upcoming' ? (
              <article key={item.id} className="events-card events-card--upcoming">
                <div className="events-upcoming-box">
                  <p className="h1-title events-upcoming-text">
                    EVENT
                    <br />
                    준비중
                  </p>
                </div>
              </article>
            ) : (
              <article key={item.id} className="events-card">
                <button
                  type="button"
                  className="events-card-trigger"
                  onClick={() => openEventModal(item)}
                  aria-label={`${item.title} 상세 보기`}
                >
                  <div className="events-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="events-card-img"
                      width={342}
                      height={500}
                      draggable={false}
                    />
                  </div>
                  <h3 className="events-card-title">{item.title}</h3>
                </button>
              </article>
            )
          )}
        </div>

        <nav className="events-pagination" aria-label="이벤트 페이지 이동">
          <button
            type="button"
            className="events-page-arrow"
            aria-label="이전 페이지"
            disabled={currentPage === 1}
            onClick={goToPrevPage}
          >
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden="true">
              <path
                d="M0 4.5625V3.625L7.14062 0V1.45312L1.73438 4.04688V4.14062L7.14062 6.71875V8.17188L0 4.5625Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                type="button"
                aria-label={`${pageNum}페이지`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
                className={`events-page-btn${
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
            className="events-page-arrow"
            aria-label="다음 페이지"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
          >
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden="true">
              <path
                d="M7.14062 4.5625L0 8.17188V6.71875L5.40625 4.14062V4.04688L0 1.45312V0L7.14062 3.625V4.5625Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </nav>
      </div>

      {selectedEvent && (
        <div
          className="events-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={selectedEvent.title ?? '이벤트 상세 정보'}
          onClick={closeEventModal}
        >
          <div
            className="events-modal-shell"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="events-modal-close"
              onClick={closeEventModal}
              aria-label="이벤트 상세 모달 닫기"
            >
              <img
                src="/assets/images/icon/close-btn.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </button>

            <div className="events-modal-card">
              <div className="events-modal-img-wrap">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="events-modal-img"
                  width={424}
                  height={573}
                  draggable={false}
                />
              </div>

              <div className="events-modal-info">
                <h3 className="events-modal-title">
                  {selectedEvent.modalTitle ?? selectedEvent.title}
                </h3>
                {selectedEvent.modalLines && (
                  <p className="events-modal-desc">
                    {selectedEvent.modalLines.map((line, index) => (
                      <React.Fragment key={line}>
                        {index > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
