export interface BenefitItem {
  id: number;
  title: string;
  descriptionLines: string[];
  characterImage: string;
  characterAlt: string;
  characterClass: string;
  width: number;
  height: number;
}

/**
 * 혜택 섹션 이벤트 카드 4종 데이터
 */
export const BENEFIT_LIST: BenefitItem[] = [
  {
    id: 1,
    title: '생일자 할인 10% OFF',
    descriptionLines: ['특별한 생일, 멜로우 웨이와 함께', '더욱 특별한 여행을 떠나보세요!'],
    characterImage: '/assets/images/melloway-character-1.png',
    characterAlt: '생일자 할인 캐릭터',
    characterClass: 'character-1',
    width: 69,
    height: 85,
  },
  {
    id: 2,
    title: '4인 이상 할인 15% OFF',
    descriptionLines: ['함께할 수록 커지는 즐거움,', '소중한 사람들과 더 가볍게 떠나보세요!'],
    characterImage: '/assets/images/melloway-character-2.png',
    characterAlt: '4인 이상 할인 캐릭터',
    characterClass: 'character-2',
    width: 71,
    height: 74,
  },
  {
    id: 3,
    title: '도그데이 할인 7% OFF',
    descriptionLines: ['우리 강아지와 함께 떠나는 여행,', '멜로우 웨이가 특별한 혜택을 더해드려요!'],
    characterImage: '/assets/images/melloway-character-3.png',
    characterAlt: '도그데이 할인 캐릭터',
    characterClass: 'character-3',
    width: 63,
    height: 72,
  },
  {
    id: 4,
    title: '신규 고객 5% OFF',
    descriptionLines: ['첫 캠핑의 설렘을 가볍게!', '신규 고객 첫 렌트 할인을 받아보세요!'],
    characterImage: '/assets/images/melloway-character-4.png',
    characterAlt: '신규 고객 할인 캐릭터',
    characterClass: 'character-4',
    width: 48,
    height: 72,
  },
];
