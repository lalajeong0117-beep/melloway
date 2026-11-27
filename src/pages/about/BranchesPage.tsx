import React, { useRef } from 'react';
import {
  BRANCH_LIST,
  BRANCHES_HEADER_DATA,
  BRANCHES_KV_DATA,
  useBranchesPage,
} from './branches';
import './branches.css';

/**
 * [담당 영역: About Us] 전국 지점 안내 페이지
 * - CSS(./branches.css)와 로직/데이터(./branches.ts)를 분리하여 관리합니다.
 */
export const BranchesPage: React.FC = () => {
  const kvRef = useRef<HTMLElement>(null);

  useBranchesPage(kvRef);

  return (
    <div className="about-branches-page">
      <section
        ref={kvRef}
        className="about-branches-kv"
        aria-label="전국 지점 안내 메인 비주얼"
      >
        <img
          src={BRANCHES_KV_DATA.image}
          alt={BRANCHES_KV_DATA.alt}
          className="about-branches-kv-img"
          width={1920}
          height={850}
        />
        <div className="about-branches-kv-overlay" aria-hidden="true" />
        <div className="about-branches-kv-content-wrap">
          <div className="about-branches-kv-content">
            <h1 className="about-branches-kv-title">
              {BRANCHES_KV_DATA.title}
            </h1>
            <p className="about-branches-kv-subtitle">
              {BRANCHES_KV_DATA.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="about-branches-content" aria-label="전국 지점 소개">
        <div className="about-branches-header">
          <h2 className="about-branches-title">{BRANCHES_HEADER_DATA.title}</h2>
          <p className="about-branches-subtitle">
            {BRANCHES_HEADER_DATA.subtitle}
          </p>
        </div>

        <div className="about-branches-grid">
          {BRANCH_LIST.map((branch) =>
            branch.isComingSoon ? (
              <article key={branch.id} className="about-branches-card">
                <div className="about-branches-coming-soon">
                  <p className="about-branches-coming-soon-text">Coming Soon</p>
                </div>
              </article>
            ) : (
              <article key={branch.id} className="about-branches-card">
                <div className="about-branches-card-media">
                  <img
                    src={branch.image}
                    alt={branch.alt}
                    className="about-branches-card-img"
                    width={464}
                    height={464}
                  />
                </div>
              </article>
            )
          )}
        </div>
      </section>
    </div>
  );
};
