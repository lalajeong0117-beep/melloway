# MELLOWAY (React + TypeScript)

캠핑카 렌탈 및 소자본 프랜차이즈 플랫폼 **MELLOWAY** 웹 애플리케이션입니다.  
실무 협업을 위해 **React.js + TypeScript (Vite)** 기반으로 아키텍처를 전환했으며, **공통 컴포넌트 분리** 및 **페이지별 담당 영역 격리**를 통해 GitHub 협업 시 Merge Conflict(병합 충돌)를 최소화하도록 설계되었습니다.

---

## 1. 기술 스택 및 주요 라이브러리

- **Core**: React 19, TypeScript 5, Vite 6
- **Routing**: `react-router-dom` (v7)
- **Animation**: `gsap` + `@gsap/react` (`ScrollTrigger`, `useGSAP`)
- **Styling**: Pure CSS (`src/styles/commons.css`, `src/styles/style.css`) — HTML 인라인 `<style>` 태그 미사용

---

## 2. 시작하기 (설치 및 실행)

> **요구 환경**: Node.js v20 이상 (현재 검증 버전: `v24.22.0` / `npm 11.19.1`)

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (http://localhost:5173)
npm run dev

# 3. TypeScript 타입 검사
npm run typecheck

# 4. 프로덕션 빌드 (타입 검사 + Vite 번들링)
npm run build
```

---

## 3. 프로젝트 폴더 구조 및 담당 영역 (충돌 방지 설계)

협업 시 **서로 다른 사람의 작업 파일이 겹치지 않도록** 도메인/페이지 단위로 디렉토리를 분리했습니다.

```text
melloway/
├── public/
│   └── assets/images/            # 정적 이미지 및 SVG 에셋 (/assets/images/... 경로 유지)
├── src/
│   ├── components/
│   │   ├── common/               # [공통 UI] Button, Menu, Logo, EventCard, CtaCard, RoadBadge
│   │   ├── layout/               # [공통 레이아웃] Header, Footer, MainLayout
│   │   └── sections/home/        # [메인 페이지 섹션] Hero, Camper, Franchise, Why, Benefit, Journey, Earth
│   ├── constants/
│   │   └── routes.ts             # 전체 URL 경로 상수 (중앙 관리)
│   ├── data/                     # 정적 데이터 (navigation.ts, campers.ts, benefits.ts)
│   ├── pages/                    # ★ 팀원별 독립 작업 영역 (페이지별 폴더 분리)
│   │   ├── HomePage.tsx          # 메인 랜딩 페이지
│   │   ├── about/                # [담당: About Us] AboutBrandPage.tsx, BranchesPage.tsx
│   │   ├── business/             # [담당: Business] FranchiseInfoPage.tsx, FranchiseInquiryPage.tsx
│   │   ├── campers/              # [담당: Campers]  CamperListPage.tsx, MellowayCampersPage.tsx
│   │   └── support/              # [담당: Support]  NoticeEventPage.tsx, FaqPage.tsx, ContactPage.tsx
│   ├── routes/
│   │   └── AppRouter.tsx         # 전체 라우팅 정의
│   ├── styles/
│   │   ├── reset.css
│   │   ├── normalize.css
│   │   ├── commons.css           # 공통 변수(--main-font-color: #22252A), 공통 버튼/카드/서브페이지 스타일
│   │   └── style.css             # 메인 및 섹션별 상세 스타일
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. GitHub 협업 및 Merge Conflict 방지 규칙

팀원 모두가 아래 규칙을 준수하면 **동시에 여러 페이지를 개발해도 충돌 없이 병합**할 수 있습니다.

### ① 작업 영역 격리 원칙 (가장 중요)
1. **본인 담당 페이지 폴더 내에서만 작업합니다.**
   - 예: Support 담당자는 `src/pages/support/*` 파일만 수정합니다.
   - 페이지 전용 컴포넌트가 필요하면 해당 페이지 폴더 하위(예: `src/pages/support/components/`)에 생성하세요.
2. **공통 파일은 임의로 수정하지 않습니다.**
   - 대상: `src/components/common/*`, `src/components/layout/*`, `src/constants/routes.ts`, `src/routes/AppRouter.tsx`, `src/styles/commons.css`, `package.json`
   - 수정이 필요한 경우 팀 채널에 공유 후 **단독 PR**로 먼저 머지한 뒤, 다른 팀원들이 `git pull` 받아 작업합니다.
3. **CSS 충돌 방지**
   - 서브페이지 전용 스타일을 작성할 때는 반드시 페이지별 고유 접두사 클래스(예: `.about-brand-...`, `.faq-...`)를 사용하거나 페이지 폴더 내 별도 CSS 파일을 import하여 전역 클래스 충돌을 피하세요.
   - 공통 컬러 변수 `var(--main-font-color)` (`#22252A`) 및 공통 컴포넌트(`<Button />`, `<EventCard />`, `<CtaCard />` 등)를 적극 재사용합니다.

### ② 브랜치 전략 (Branch Strategy)
- `main`: 배포 가능한 안정 버전 (직접 Push 금지)
- `develop`: 기능 통합 브랜치
- `feature/<영역>-<기능>`: 개인 작업 브랜치 (반드시 `develop`에서 분기)
  - 예시: `feature/about-branches-map`, `feature/support-faq-accordion`, `feature/campers-detail-filter`

```bash
# 새 작업 시작 전 항상 최신 develop 반영
git checkout develop
git pull origin develop
git checkout -b feature/support-faq-list
```

### ③ 커밋 메시지 컨벤션 (Commit Convention)
- `feat:` 새로운 기능 또는 페이지 구현 (예: `feat: FAQ 아코디언 목록 구현`)
- `fix:` 버그 수정 (예: `fix: 캠핑카 캐러셀 리사이즈 정렬 오류 수정`)
- `style:` CSS/디자인 수정 (예: `style: 창업 문의 폼 반응형 여백 조정`)
- `refactor:` 코드 구조 개선
- `docs:` README 및 문서 수정

### ④ PR(Pull Request) 올리기 전 체크리스트
PR 생성 전 로컬에서 반드시 아래 두 명령어가 에러 없이 통과하는지 확인하세요.
```bash
npm run typecheck   # TypeScript 타입 오류 0건 확인
npm run build       # 프로덕션 빌드 성공 확인
```
