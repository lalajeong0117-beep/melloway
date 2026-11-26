import { useCallback, useState } from 'react';
import magnifierIcon from '../../../../assets/images/Magnifier.svg';

export const NOTICE_MAGNIFIER_ICON = magnifierIcon;

/**
 * 공지 사항 검색 입력 상태 제어 훅
 */
export const useNoticeSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return {
    searchQuery,
    handleSearchChange,
  };
};
