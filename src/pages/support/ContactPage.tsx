import React from 'react';
import { SupportPageHeader } from './components/SupportPageHeader';
import {
  CONTACT_DOWN_CHEVRON_ICON,
  CONTACT_RADIO_ICON,
  INQUIRY_TYPE_OPTIONS,
  PHONE_PREFIX_OPTIONS,
  useContactForm,
} from './scripts/contact';
import { SUPPORT_KV_IMAGE } from './scripts/supportNav';
import './styles/support-common.css';
import './styles/contact.css';

/**
 * [담당 영역: Support] 1:1 문의하기 페이지
 * - CSS(./styles/support-common.css, ./styles/contact.css)와
 *   로직(./scripts/contact.ts)을 분리하여 관리합니다.
 */
export const ContactPage: React.FC = () => {
  const {
    form,
    openDropdown,
    statusMessage,
    phoneDropdownRef,
    typeDropdownRef,
    updateField,
    handlePhoneDigitsChange,
    toggleDropdown,
    selectPhonePrefix,
    selectInquiryType,
    toggleAgreement,
    handleSubmit,
  } = useContactForm();

  return (
    <section className="support-page" aria-label="1:1 문의하기">
      <SupportPageHeader
        title="Contact Us"
        subtitle="궁금한 점이나 도움이 필요하시면 언제든 멜로웨이에 문의해 주세요."
        kvImage={SUPPORT_KV_IMAGE}
        kvAlt="멜로웨이 1:1 문의하기 메인 비주얼"
        ariaLabel="1:1 문의하기 메인 비주얼"
      />

      <div className="support-contact">
        <h1 className="support-contact-title">MELLOWAY에게 물어보세요</h1>

        <h2 className="support-contact-section-title">상담자 정보</h2>

        <form className="support-contact-form" onSubmit={handleSubmit} noValidate>
          <div className="support-contact-rows">
            {/* 이름 */}
            <div className="support-contact-row">
              <label
                htmlFor="support-contact-name"
                className="support-contact-label support-contact-label--name"
              >
                이름
              </label>
              <div className="support-contact-field">
                <input
                  id="support-contact-name"
                  type="text"
                  className="support-contact-input"
                  placeholder="이름을 입력해주세요."
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
            </div>

            {/* 연락처 */}
            <div className="support-contact-row">
              <span className="support-contact-label support-contact-label--phone">
                연락처
              </span>
              <div className="support-contact-field">
                <div className="support-contact-phone-group">
                  <div
                    ref={phoneDropdownRef}
                    className={`support-contact-select-wrap support-contact-select-wrap--prefix${
                      openDropdown === 'phone' ? ' is-open' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="support-contact-select-btn"
                      aria-haspopup="listbox"
                      aria-expanded={openDropdown === 'phone'}
                      aria-label="휴대폰 앞자리 선택"
                      onClick={() => toggleDropdown('phone')}
                    >
                      <span>{form.phonePrefix}</span>
                      <img
                        src={CONTACT_DOWN_CHEVRON_ICON}
                        alt=""
                        aria-hidden="true"
                        className="support-contact-select-chevron"
                        width={9}
                        height={5}
                      />
                    </button>

                    {openDropdown === 'phone' && (
                      <ul
                        className="support-contact-select-menu"
                        role="listbox"
                        aria-label="휴대폰 앞자리 목록"
                      >
                        {PHONE_PREFIX_OPTIONS.map((prefix) => (
                          <li key={prefix}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={form.phonePrefix === prefix}
                              className={`support-contact-select-option${
                                form.phonePrefix === prefix ? ' is-selected' : ''
                              }`}
                              onClick={() => selectPhonePrefix(prefix)}
                            >
                              {prefix}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <span className="support-contact-hyphen" aria-hidden="true">
                    -
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    className="support-contact-phone-input"
                    placeholder="0000"
                    aria-label="연락처 가운데 4자리"
                    value={form.phoneMiddle}
                    onChange={(e) =>
                      handlePhoneDigitsChange('phoneMiddle', e.target.value)
                    }
                  />

                  <span className="support-contact-hyphen" aria-hidden="true">
                    -
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    className="support-contact-phone-input"
                    placeholder="0000"
                    aria-label="연락처 마지막 4자리"
                    value={form.phoneLast}
                    onChange={(e) =>
                      handlePhoneDigitsChange('phoneLast', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* 문의 유형 */}
            <div className="support-contact-row">
              <span className="support-contact-label support-contact-label--type">
                문의 유형
              </span>
              <div className="support-contact-field">
                <div
                  ref={typeDropdownRef}
                  className={`support-contact-select-wrap support-contact-select-wrap--full${
                    openDropdown === 'type' ? ' is-open' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="support-contact-select-btn"
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === 'type'}
                    onClick={() => toggleDropdown('type')}
                  >
                    <span>
                      {form.inquiryType || '문의 유형을 선택해주세요.'}
                    </span>
                    <img
                      src={CONTACT_DOWN_CHEVRON_ICON}
                      alt=""
                      aria-hidden="true"
                      className="support-contact-select-chevron"
                      width={9}
                      height={5}
                    />
                  </button>

                  {openDropdown === 'type' && (
                    <ul
                      className="support-contact-select-menu"
                      role="listbox"
                      aria-label="문의 유형 목록"
                    >
                      {INQUIRY_TYPE_OPTIONS.map((typeOption) => (
                        <li key={typeOption}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={form.inquiryType === typeOption}
                            className={`support-contact-select-option${
                              form.inquiryType === typeOption
                                ? ' is-selected'
                                : ''
                            }`}
                            onClick={() => selectInquiryType(typeOption)}
                          >
                            {typeOption}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* 문의내용 */}
            <div className="support-contact-row support-contact-row--top">
              <label
                htmlFor="support-contact-content"
                className="support-contact-label support-contact-label--content"
              >
                문의내용
              </label>
              <div className="support-contact-field">
                <textarea
                  id="support-contact-content"
                  className="support-contact-textarea"
                  placeholder="문의 내용을 자유롭게 입력해주세요 :)"
                  value={form.content}
                  onChange={(e) => updateField('content', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 개인정보 동의 */}
          <div className="support-contact-agree-wrap">
            <button
              type="button"
              role="checkbox"
              aria-checked={form.agreed}
              className="support-contact-agree-btn"
              onClick={toggleAgreement}
            >
              <span className="support-contact-radio-box" aria-hidden="true">
                <img
                  src={CONTACT_RADIO_ICON}
                  alt=""
                  className="support-contact-radio-icon"
                  width={16}
                  height={16}
                />
                {form.agreed && <span className="support-contact-radio-dot" />}
              </span>
              <span className="support-contact-agree-text">
                개인정보취급방침을 읽었으며 이에 동의합니다.
              </span>
            </button>
          </div>

          {statusMessage && (
            <p
              className={`support-contact-feedback support-contact-feedback--${statusMessage.type}`}
              role="status"
            >
              {statusMessage.text}
            </p>
          )}

          {/* 문의하기 버튼 */}
          <div className="support-contact-submit-wrap">
            <button type="submit" className="support-contact-submit-btn">
              문의하기
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
