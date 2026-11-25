import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GNB_MENU, NavGroup } from '@/data/navigation';

export interface MenuProps {
  items?: NavGroup[];
  onItemClick?: () => void;
}

/**
 * MELLOWAY 공통 GNB 메뉴 & 드롭다운 컴포넌트
 * - `src/data/navigation.ts`의 GNB_MENU 데이터를 기반으로 상단 메뉴 및 하위 드롭다운을 렌더링합니다.
 * - 각 상위 메뉴(`About Us`, `Business`, `Campers`, `Support`)의 X좌표에 맞춰 하위 메뉴 컬럼을 정확히 정렬합니다.
 */
export const Menu: React.FC<MenuProps> = ({ items = GNB_MENU, onItemClick }) => {
  const menuLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownInnerRef = useRef<HTMLDivElement>(null);
  const [submenuLefts, setSubmenuLefts] = useState<number[]>([]);

  const alignSubmenus = useCallback(() => {
    const innerEl = dropdownInnerRef.current;
    if (!innerEl) return;

    const innerRect = innerEl.getBoundingClientRect();
    const nextLefts = items.map((_, idx) => {
      const linkEl = menuLinkRefs.current[idx];
      if (!linkEl) return 0;
      return linkEl.getBoundingClientRect().left - innerRect.left;
    });

    setSubmenuLefts(nextLefts);
  }, [items]);

  useEffect(() => {
    alignSubmenus();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(alignSubmenus);
    }

    window.addEventListener('resize', alignSubmenus);
    return () => {
      window.removeEventListener('resize', alignSubmenus);
    };
  }, [alignSubmenus]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
    onItemClick?.();
  };

  return (
    <>
      <div className="gnb d-flex" onMouseEnter={alignSubmenus}>
        <ul className="menu d-flex">
          {items.map((group, idx) => (
            <li key={group.id}>
              <Link
                ref={(el) => {
                  menuLinkRefs.current[idx] = el;
                }}
                to={group.defaultPath}
                onClick={handleLinkClick}
              >
                {group.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* GNB 전체 공통 드롭다운 영역 */}
      <div className="gnb-dropdown">
        <div ref={dropdownInnerRef} className="gnb-dropdown-inner">
          {items.map((group, idx) => (
            <ul
              key={group.id}
              className="gnb-submenu"
              style={
                submenuLefts[idx] !== undefined
                  ? { left: `${submenuLefts[idx]}px` }
                  : undefined
              }
            >
              {group.subItems.map((sub) => (
                <li key={sub.path}>
                  <Link
                    to={sub.path}
                    className="gnb-submenu-link"
                    onClick={handleLinkClick}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
