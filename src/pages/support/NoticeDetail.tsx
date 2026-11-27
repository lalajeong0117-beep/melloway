import React from 'react';
import {
  NOTICE_LEFT_ICON,
  NOTICE_RIGHT_ICON,
  NoticeItem,
} from './notice';

export interface NoticeDetailProps {
  notice: NoticeItem;
  prevNotice: NoticeItem | null;
  nextNotice: NoticeItem | null;
  onSelectNotice: (id: number) => void;
  onBackToList: () => void;
}

/**
 * [Support] 공지 사항 상세(본문) 페이지 뷰
 */
export const NoticeDetail: React.FC<NoticeDetailProps> = ({
  notice,
  prevNotice,
  nextNotice,
  onSelectNotice,
  onBackToList,
}) => {
  const paragraphs = notice.paragraphs ?? [['본문 내용이 준비 중입니다.']];

  return (
    <article className="support-notice-detail" aria-label={notice.title}>
      <p className="support-notice-detail-category">공지사항</p>
      <h1 className="support-notice-detail-title">{notice.title}</h1>
      <p className="support-notice-detail-date">{notice.date}</p>

      <div className="support-notice-detail-body">
        {paragraphs.map((lines, pIdx) => (
          <p key={pIdx} className="support-notice-detail-paragraph">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {line}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>

      <nav
        className="support-notice-detail-nav"
        aria-label="이전글 및 다음글 이동"
      >
        <button
          type="button"
          className="support-notice-detail-nav-btn"
          disabled={!prevNotice}
          onClick={() => prevNotice && onSelectNotice(prevNotice.id)}
        >
          <img src={NOTICE_LEFT_ICON} alt="" aria-hidden="true" width={8} height={9} />
          <span>이전글</span>
        </button>

        <button
          type="button"
          className="support-notice-detail-nav-btn"
          disabled={!nextNotice}
          onClick={() => nextNotice && onSelectNotice(nextNotice.id)}
        >
          <span>다음글</span>
          <img src={NOTICE_RIGHT_ICON} alt="" aria-hidden="true" width={8} height={9} />
        </button>
      </nav>

      <div className="support-notice-detail-actions">
        <button
          type="button"
          className="support-notice-detail-list-btn"
          onClick={onBackToList}
        >
          목록으로
        </button>
      </div>
    </article>
  );
};
