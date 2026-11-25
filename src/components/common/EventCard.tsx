import React from 'react';
import { BenefitItem } from '@/data/benefits';

export interface EventCardProps {
  item: BenefitItem;
}

/**
 * MELLOWAY 혜택 이벤트 카드 공통 컴포넌트
 */
export const EventCard: React.FC<EventCardProps> = ({ item }) => {
  return (
    <div className={`event-card event-card-${item.id}`}>
      <div className="event-card-content">
        <h3 className="event-card-title">{item.title}</h3>
        <p className="event-card-desc">
          {item.descriptionLines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < item.descriptionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
      <img
        src={item.characterImage}
        alt={item.characterAlt}
        className={`event-card-character ${item.characterClass}`}
        width={item.width}
        height={item.height}
      />
    </div>
  );
};
