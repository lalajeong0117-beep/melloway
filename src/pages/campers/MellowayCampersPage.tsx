import React, { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './MellowayCampersPage.css';

interface CamperDetailItem {
  id: string;
  name: string;
  capacity: string;
  image: string;
  descriptionLines: [string, string];
}

const CAMPER_DETAILS: CamperDetailItem[] = [
  {
    id: 'urban-escape',
    name: 'URBAN ESCAPE',
    capacity: '2인승',
    image: '/assets/images/Urbanescape-side.png',
    descriptionLines: [
      '도심과 자연을 가볍게 오갈 수 있는 소형 캠핑카 입니다.',
      '팝업루프와 어닝으로 야외 활동공간을 넓혀 커플 여행에 알맞습니다.',
    ],
  },
  {
    id: 'adventure-van',
    name: 'ADVENTURE VAN',
    capacity: '4인승',
    image: '/assets/images/Adventure-van-side.png',
    descriptionLines: [
      '기동성과 실내 거주성을 균형 있게 갖춘 멀티 밴 타입 캠핑카입니다.',
      '무시동 냉난방과 4인 취침 구조로 가족과 반려견 동반 여행에 적합합니다.',
    ],
  },
  {
    id: 'retro-home',
    name: 'RETRO HOME',
    capacity: '4인승',
    image: '/assets/images/Retro-home-side.png',
    descriptionLines: [
      '따뜻한 우드 감성과 아늑한 실내 구성을 담은 모터홈 캠핑카입니다.',
      '넓은 다이닝 공간과 쾌적한 침실로 여유로운 가족 여행을 선사합니다.',
    ],
  },
  {
    id: 'grand-cruiser',
    name: 'GRAND CRUISER',
    capacity: '6인승',
    image: '/assets/images/Grand-cruiser-side.png',
    descriptionLines: [
      '최대 6인이 함께 탑승하고 취침할 수 있는 멜로웨이 플래그십 모델입니다.',
      '여유로운 수납과 독립적인 생활 공간으로 장거리 대가족 여행에 최적화되어 있습니다.',
    ],
  },
];

/**
 * [담당 영역: Campers] 캠핑카 상세 정보 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 * - `?car=<id>` 쿼리 파라미터 또는 탭 클릭으로 4종 차량 상세 뷰를 전환합니다.
 */
export const MellowayCampersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageRef = useRef<HTMLDivElement>(null);

  const selectedCamper = useMemo(() => {
    const carId = searchParams.get('car');
    return CAMPER_DETAILS.find((item) => item.id === carId) ?? CAMPER_DETAILS[0];
  }, [searchParams]);

  useGSAP(
    () => {
      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.camper-detail-image-wrap',
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.camper-detail-info',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.08 }
      );
    },
    { scope: pageRef, dependencies: [selectedCamper.id] }
  );

  const handleSelectCamper = (camperId: string) => {
    setSearchParams({ car: camperId });
  };

  return (
    <div ref={pageRef} className="camper-detail-page">
      <section className="camper-detail-section" aria-label="캠핑카 상세 정보">
        <div
          className="camper-detail-tabs"
          role="tablist"
          aria-label="캠핑카 모델 선택"
        >
          {CAMPER_DETAILS.map((camper) => {
            const isSelected = camper.id === selectedCamper.id;
            return (
              <button
                key={camper.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`camper-detail-tab${isSelected ? ' is-active' : ''}`}
                onClick={() => handleSelectCamper(camper.id)}
              >
                {camper.name}
              </button>
            );
          })}
        </div>

        <div className="camper-detail-overview" role="tabpanel">
          <div className="camper-detail-image-wrap">
            <img
              src={selectedCamper.image}
              alt={selectedCamper.name}
              className="camper-detail-image"
              width={707}
              height={353}
            />
          </div>

          <div className="camper-detail-info">
            <p className="camper-detail-capacity">{selectedCamper.capacity}</p>
            <h1 className="camper-detail-name">{selectedCamper.name}</h1>
            <p className="camper-detail-desc">
              {selectedCamper.descriptionLines[0]}
              <br />
              {selectedCamper.descriptionLines[1]}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
