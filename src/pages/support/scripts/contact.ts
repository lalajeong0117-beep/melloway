import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import downChevronIcon from '../../../../assets/images/icon/Down chevron.svg';
import radioButtonIcon from '../../../../assets/images/icon/Radio button.svg';

export const CONTACT_DOWN_CHEVRON_ICON = downChevronIcon;
export const CONTACT_RADIO_ICON = radioButtonIcon;

export const PHONE_PREFIX_OPTIONS = ['010', '011', '016', '017', '018', '019'] as const;

export const INQUIRY_TYPE_OPTIONS = [
  '캠핑카 예약·대여 문의',
  '차량·옵션 및 이용 수칙 문의',
  '예약 변경·취소·환불 문의',
  '지점 이용 및 픽업 문의',
  '기타 고객 문의',
] as const;

export interface ContactFormState {
  name: string;
  phonePrefix: string;
  phoneMiddle: string;
  phoneLast: string;
  inquiryType: string;
  content: string;
  agreed: boolean;
}

const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  phonePrefix: '010',
  phoneMiddle: '',
  phoneLast: '',
  inquiryType: '',
  content: '',
  agreed: false,
};

/**
 * 1:1 문의하기 페이지 폼 상태, 드롭다운, 유효성 검사 제어 훅
 */
export const useContactForm = () => {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [openDropdown, setOpenDropdown] = useState<'phone' | 'type' | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(target) &&
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const updateField = useCallback(
    <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setStatusMessage(null);
    },
    []
  );

  const handlePhoneDigitsChange = useCallback(
    (field: 'phoneMiddle' | 'phoneLast', rawValue: string) => {
      const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 4);
      updateField(field, digitsOnly);
    },
    [updateField]
  );

  const toggleDropdown = useCallback((target: 'phone' | 'type') => {
    setOpenDropdown((prev) => (prev === target ? null : target));
  }, []);

  const selectPhonePrefix = useCallback(
    (prefix: string) => {
      updateField('phonePrefix', prefix);
      setOpenDropdown(null);
    },
    [updateField]
  );

  const selectInquiryType = useCallback(
    (type: string) => {
      updateField('inquiryType', type);
      setOpenDropdown(null);
    },
    [updateField]
  );

  const toggleAgreement = useCallback(() => {
    setForm((prev) => ({ ...prev, agreed: !prev.agreed }));
    setStatusMessage(null);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!form.name.trim()) {
        setStatusMessage({ type: 'error', text: '이름을 입력해주세요.' });
        return;
      }
      if (form.phoneMiddle.length < 3 || form.phoneLast.length < 4) {
        setStatusMessage({
          type: 'error',
          text: '연락처를 정확히 입력해주세요.',
        });
        return;
      }
      if (!form.inquiryType) {
        setStatusMessage({
          type: 'error',
          text: '문의 유형을 선택해주세요.',
        });
        return;
      }
      if (!form.content.trim()) {
        setStatusMessage({
          type: 'error',
          text: '문의 내용을 입력해주세요.',
        });
        return;
      }
      if (!form.agreed) {
        setStatusMessage({
          type: 'error',
          text: '개인정보취급방침에 동의해주세요.',
        });
        return;
      }

      setStatusMessage({
        type: 'success',
        text: '1:1 문의가 정상적으로 접수되었습니다. 확인 후 빠르게 답변드리겠습니다.',
      });
      setForm(INITIAL_FORM_STATE);
    },
    [form]
  );

  return {
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
  };
};
