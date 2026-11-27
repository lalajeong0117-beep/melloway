import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMellowayCampersAnimations } from './useMellowayCampersAnimations';
import './MellowayCampersPage.css';

interface CamperFeatureItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

interface CamperDetailItem {
  id: string;
  name: string;
  capacity: string;
  image: string;
  descriptionLines: string[];
  keywords: string[];
  features: CamperFeatureItem[];
  galleryImages: string[];
}

type FeatureMetaItem = Omit<CamperFeatureItem, 'value'>;

const FEATURE_META: readonly FeatureMetaItem[] = [
  {
    id: 'bathroom',
    label: '화장실',
    icon: '/assets/images/icon/bathroom-icon.svg',
    iconWidth: 18,
    iconHeight: 20,
  },
  {
    id: 'shower',
    label: '샤워실',
    icon: '/assets/images/icon/shower-icon.svg',
    iconWidth: 22,
    iconHeight: 22,
  },
  {
    id: 'kitchen',
    label: '주방',
    icon: '/assets/images/icon/kitchen-icon.svg',
    iconWidth: 20,
    iconHeight: 19,
  },
  {
    id: 'cook',
    label: '조리',
    icon: '/assets/images/icon/cook-icon.svg',
    iconWidth: 20,
    iconHeight: 20,
  },
  {
    id: 'water',
    label: '급수',
    icon: '/assets/images/icon/water-icon.svg',
    iconWidth: 15,
    iconHeight: 21,
  },
  {
    id: 'wastewater',
    label: '오수',
    icon: '/assets/images/icon/x-water-icon.svg',
    iconWidth: 21,
    iconHeight: 21,
  },
  {
    id: 'heater',
    label: '무시동 냉난방',
    icon: '/assets/images/icon/heater-icon.svg',
    iconWidth: 28,
    iconHeight: 28,
  },
  {
    id: 'camping',
    label: '야외 캠핑',
    icon: '/assets/images/icon/camping-icon.svg',
    iconWidth: 24,
    iconHeight: 25,
  },
];

type FeatureValues = [string, string, string, string, string, string, string, string];

/**
 * 8종 공통 아이콘·라벨 메타데이터에 차량별 상세 값만 매핑합니다.
 */
const buildFeatures = (values: FeatureValues): CamperFeatureItem[] =>
  FEATURE_META.map((meta, idx) => ({
    ...meta,
    value: values[idx],
  }));

const DEFAULT_FEATURES = buildFeatures([
  '실내 고정식 없음',
  '실내 고정식 없음',
  '주방 싱크 고정식 없음',
  '조리기구 사용 불가',
  '이동식 정수 20L',
  '이동식 오수 10L',
  '적용 불가',
  '팝업 루프 · 어닝 장착',
]);

const DEFAULT_GALLERY_IMAGES: string[] = [
  '/assets/images/urban-escape-img1.jpg',
  '/assets/images/urban-escape-img2.jpg',
  '/assets/images/urban-escape-img3.jpg',
];

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
    keywords: ['승차 2인', '취침 2인'],
    features: DEFAULT_FEATURES,
    galleryImages: DEFAULT_GALLERY_IMAGES,
  },
  {
    id: 'adventure-van',
    name: 'ADVENTURE VAN',
    capacity: '5인승',
    image: '/assets/images/Adventure-van-side.png',
    descriptionLines: [
      '넉넉한 실내 공간과 주행 안정성을 갖춘 중형 밴 캠핑카입니다.',
      '실내 빌트인 주방과 팝업루프로 4인 가족 및 친구 여행에 최적화되어 있습니다.',
    ],
    keywords: ['승차 5인', '취침 3인'],
    features: buildFeatures([
      '실내 고정식 없음',
      '후면 외부 온수 샤워기 지원',
      '후면 간이 수전 · 수납',
      '실내외 겸용 인덕션 · 30L 냉장고',
      '이동식 정수 40L',
      '이동식 오수 30L',
      '무시동 히터 · 루프 벤트 장착',
      '팝업루프 · 어닝 장착',
    ]),
    galleryImages: [
      '/assets/images/adventure-van-img1.jpg',
      '/assets/images/adventure-van-img2.jpg',
      '/assets/images/adventure-van-img3.jpg',
    ],
  },
  {
    id: 'retro-home',
    name: 'RETRO HOME',
    capacity: '4인승',
    image: '/assets/images/Retro-home-side.png',
    descriptionLines: [
      '아늑한 레트로 감성의 인테리어와 넉넉한 실내 주거 공간을 갖춘',
      '클래스 C 모터홈입니다. 반려동물과 함께 머물기 좋은',
      '방수·미끄럼 방지 설계로 온 가족의 편안한 여행을 지원합니다.',
    ],
    keywords: ['승차 4인', '취침 4인', '펫 프렌들리'],
    features: buildFeatures([
      '실내 독립형 고정식 화장실',
      '실내 독립 샤워부스 (온수 완비)',
      '실내 풀사이즈 싱크대 · 대면 테이블',
      '실내 3구 가스버너 · 90L 냉장고',
      '고정식 정수 100L',
      '고정식 오수 80L',
      '무시동 히터 · 루프형 에어컨 완비',
      '전동 사이드 어닝 · 펫 케어 키트',
    ]),
    galleryImages: [
      '/assets/images/retro-home-img1.jpg',
      '/assets/images/retro-home-img2.jpg',
      '/assets/images/retro-home-img3.jpg',
      '/assets/images/retro-home-img4.jpg',
    ],
  },
  {
    id: 'grand-cruiser',
    name: 'GRAND CRUISER',
    capacity: '6인승',
    image: '/assets/images/Grand-cruiser-side.png',
    descriptionLines: [
      '독립된 후면 침실과 호텔급 편의시설을 모두 갖춘 Melloway의',
      '플래그십 대형 모터홈입니다. 압도적인 실내 공간감과 풀옵션',
      '주방·욕실로 대가족 및 그룹 여행에 최적의 휴식을 선사합니다.',
    ],
    keywords: ['승차 6인', '취침 6인'],
    features: buildFeatures([
      '독립형 고정식 화장실 (비데·세면대)',
      '완전 분리형 독립 샤워부스 (온수)',
      '풀사이즈 L자형 주방 · 4인 다이넷',
      '3구 가스버너 · 오븐 · 150L 대형 냉장고',
      '고정식 정수 150L',
      '고정식 오수 120L',
      '바닥 난방 보일러 · 천장형 에어컨 완비',
      '대형 전동 어닝 · 외부 릴렉스 테이블 세트',
    ]),
    galleryImages: [
      '/assets/images/grand-cruiser-img1.jpg',
      '/assets/images/grand-cruiser-img2.jpg',
      '/assets/images/grand-cruiser-img3.jpg',
      '/assets/images/grand-cruiser-img4.jpg',
    ],
  },
];

/**
 * [담당 영역: Campers] 캠핑카 상세 정보 페이지
 * - 상단 공통 Header는 MainLayout에서 렌더링됩니다.
 * - `?car=<id>` 쿼리 파라미터 또는 탭 클릭으로 4종 차량 상세 뷰를 전환합니다.
 * - 전용 스타일은 `./MellowayCampersPage.css`, GSAP 애니메이션은 `./useMellowayCampersAnimations.ts`에서 분리 관리합니다.
 */
export const MellowayCampersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const selectedCamper = useMemo(() => {
    const carId = searchParams.get('car');
    return CAMPER_DETAILS.find((item) => item.id === carId) ?? CAMPER_DETAILS[0];
  }, [searchParams]);

  useEffect(() => {
    setActiveSlide(0);
  }, [selectedCamper.id]);

  useMellowayCampersAnimations(pageRef, selectedCamper.id);

  const handleSelectCamper = (camperId: string) => {
    setSearchParams({ car: camperId });
  };

  const totalSlides = selectedCamper.galleryImages.length;

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;

    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
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
              {selectedCamper.descriptionLines.map((line, index, lines) => (
                <React.Fragment key={index}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>

            <div className="camper-detail-cta-group">
              <div className="camper-detail-keywords">
                {selectedCamper.keywords.map((keyword) => (
                  <span key={keyword} className="camper-detail-keyword">
                    {keyword}
                  </span>
                ))}
              </div>

              <button type="button" className="camper-detail-reserve-btn">
                예약하기 →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="camper-detail-showcase"
        aria-label={`${selectedCamper.name} 상세 소개`}
      >
        <div className="camper-detail-showcase-inner">
          <div className="camper-detail-features-grid">
            {selectedCamper.features.map((feature) => (
              <div key={feature.id} className="camper-detail-feature-item">
                <span className="camper-detail-feature-icon-wrap">
                  <img
                    src={feature.icon}
                    alt=""
                    className="camper-detail-feature-icon"
                    width={feature.iconWidth}
                    height={feature.iconHeight}
                    aria-hidden="true"
                  />
                </span>
                <div className="camper-detail-feature-text">
                  <p className="camper-detail-feature-label">{feature.label}</p>
                  <p className="camper-detail-feature-value">{feature.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="camper-detail-gallery" aria-label="캠핑카 내부 이미지 슬라이드">
            <div className="camper-detail-slider-stage">
              <button
                type="button"
                className="camper-detail-slider-btn camper-detail-slider-btn--prev"
                aria-label="이전 내부 이미지"
                onClick={handlePrevSlide}
              >
                <img
                  src="/assets/images/icon/slide-left-icon.svg"
                  alt=""
                  width={13}
                  height={22}
                  aria-hidden="true"
                />
              </button>

              <div
                className="camper-detail-slider-viewport"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                <div
                  className="camper-detail-slider-track"
                  data-active-index={activeSlide}
                >
                  {selectedCamper.galleryImages.map((imgSrc, idx) => (
                    <div key={`${selectedCamper.id}-slide-${idx}`} className="camper-detail-slide-item">
                      <img
                        src={imgSrc}
                        alt={`${selectedCamper.name} 내부 이미지 ${idx + 1}`}
                        className="camper-detail-slide-img"
                        width={1440}
                        height={500}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="camper-detail-slider-btn camper-detail-slider-btn--next"
                aria-label="다음 내부 이미지"
                onClick={handleNextSlide}
              >
                <img
                  src="/assets/images/icon/slide-right-icon.svg"
                  alt=""
                  width={13}
                  height={22}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="camper-detail-anchors" role="tablist" aria-label="슬라이드 페이지 선택">
              {selectedCamper.galleryImages.map((_, idx) => {
                const isSlideActive = activeSlide === idx;
                return (
                  <button
                    key={`anchor-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={isSlideActive}
                    aria-label={`내부 이미지 ${idx + 1}`}
                    className={`camper-detail-anchor${isSlideActive ? ' is-active' : ''}`}
                    onClick={() => setActiveSlide(idx)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
