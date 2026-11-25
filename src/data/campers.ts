export interface CamperItem {
  id: string;
  name: string;
  info: string;
  image: string;
  width: number;
  height: number;
}

/**
 * 4종 캠핑카 마스터 데이터
 */
export const CAMPER_LIST: CamperItem[] = [
  {
    id: 'ravy',
    name: 'RAVY',
    info: '2인승 · 취침 2인 · 무시동 냉난방',
    image: '/assets/images/ravy.png',
    width: 707,
    height: 403,
  },
  {
    id: 'adventure-van',
    name: 'ADVENTURE VAN',
    info: '4인승 · 취침 4인 · 무시동 냉난방',
    image: '/assets/images/adventure-van.png',
    width: 862,
    height: 404,
  },
  {
    id: 'retro-home',
    name: 'RETRO HOME',
    info: '4인승 · 취침 4인 · 무시동 냉난방',
    image: '/assets/images/retro-home.png',
    width: 854,
    height: 390,
  },
  {
    id: 'grand-cruiser',
    name: 'GRAND CRUISER',
    info: '6인승 · 취침 6인 · 무시동 냉난방',
    image: '/assets/images/grand-cruiser.png',
    width: 865,
    height: 402,
  },
];
