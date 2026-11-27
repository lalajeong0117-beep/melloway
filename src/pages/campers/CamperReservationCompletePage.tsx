import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ReservationHeader } from './ReservationHeader';
import './CamperReservationPage.css';
import './CamperReservationCompletePage.css';

/**
 * [담당 영역: Campers] 캠핑카 예약 4단계 - 예약 완료 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 */
export const CamperReservationCompletePage: React.FC = () => {
  return (
    <div className="camper-reservation-page camper-reservation-complete-page">
      <section className="camper-reservation-section" aria-label="예약 완료">
        <ReservationHeader currentStep={4} />
        <div
          className="camper-reservation-divider camper-reservation-complete-divider"
          aria-hidden="true"
        />

        <div className="camper-complete-content">
          <h1 className="h1-title camper-complete-title">
            예약이 성공적으로 완료되었습니다.
          </h1>
          <p className="camper-complete-desc">
            예약 확인 안내는 입력하신 이메일로 전송됩니다.
          </p>
          <Link to={ROUTES.HOME} className="camper-complete-home-btn">
            메인으로
          </Link>
        </div>
      </section>
    </div>
  );
};
