import type { MouseEvent } from 'react';
import type { Lion } from '../types/lion';

interface LionCardProps {
  lion: Lion;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

function LionCard({
  lion,
  onSelect,
  onRemove,
  onToggleFavorite,
}: LionCardProps) {
  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove(lion.id);
  };

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleFavorite(lion.id);
  };

  return (
    <article className="lion-card" onClick={() => onSelect(lion.id)}>
      <img src={lion.imageUrl} alt={lion.name} />

      <h2>{lion.name}</h2>
      <p>{lion.generation}기 아기사자</p>
      <p>나이: {lion.profile.age}</p>
      <p>전공: {lion.profile.major}</p>
      <p>MBTI: {lion.profile.mbti}</p>

      <div className="skills">
        {lion.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="button-group">
        <button type="button" onClick={handleFavoriteClick}>
          {lion.isFavorite ? '좋아요 취소' : '좋아요'}
        </button>

        <button type="button" onClick={handleRemoveClick}>
          삭제
        </button>
      </div>
    </article>
  );
}

export default LionCard;
