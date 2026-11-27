import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { MainLayout } from '@/components/layout';
import { HomePage } from '@/pages/HomePage';
import { AboutBrandPage } from '@/pages/about/AboutBrandPage';
import { BranchesPage } from '@/pages/about/BranchesPage';
import { FranchiseInfoPage } from '@/pages/business/FranchiseInfoPage';
import { FranchiseInquiryPage } from '@/pages/business/FranchiseInquiryPage';
import { CamperListPage } from '@/pages/campers/CamperListPage';
import { MellowayCampersPage } from '@/pages/campers/MellowayCampersPage';
import { CamperReservationPage } from '@/pages/campers/CamperReservationPage';
import { CamperReservationOptionsPage } from '@/pages/campers/CamperReservationOptionsPage';
import { NoticeEventPage } from '@/pages/support/NoticeEventPage';
import { FaqPage } from '@/pages/support/FaqPage';
import { EventsPage } from '@/pages/support/EventsPage';
import { ContactPage } from '@/pages/support/ContactPage';

/**
 * MELLOWAY 중앙 라우터 설정
 * - 모든 페이지는 `MainLayout`(공통 Header + Footer) 내부에서 렌더링됩니다.
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />

          {/* About Us */}
          <Route path={ROUTES.ABOUT_BRAND} element={<AboutBrandPage />} />
          <Route path={ROUTES.ABOUT_BRANCHES} element={<BranchesPage />} />

          {/* Business */}
          <Route path={ROUTES.BUSINESS_INFO} element={<FranchiseInfoPage />} />
          <Route path={ROUTES.BUSINESS_INQUIRY} element={<FranchiseInquiryPage />} />

          {/* Campers */}
          <Route path={ROUTES.CAMPERS_LIST} element={<CamperListPage />} />
          <Route path={ROUTES.CAMPERS_MELLOWAY} element={<MellowayCampersPage />} />
          <Route path={ROUTES.CAMPERS_RESERVATION} element={<CamperReservationPage />} />
          <Route
            path={ROUTES.CAMPERS_RESERVATION_OPTIONS}
            element={<CamperReservationOptionsPage />}
          />

          {/* Support */}
          <Route path={ROUTES.SUPPORT_NOTICE} element={<NoticeEventPage />} />
          <Route path={ROUTES.SUPPORT_FAQ} element={<FaqPage />} />
          <Route path={ROUTES.SUPPORT_EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.SUPPORT_CONTACT} element={<ContactPage />} />

          {/* 정의되지 않은 경로는 메인으로 리다이렉트 */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
