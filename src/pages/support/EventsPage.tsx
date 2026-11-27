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
  const { activeTab, setActiveTab, visibleEvents } = useEventTabs('all');

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
              className={`events-tab-btn${
                activeTab === tab.key ? ' is-active' : ''
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
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
};
