import type { Lion } from '../types/lion';

interface LionDetailPageProps {
  lion: Lion | undefined;
  onMoveList: () => void;
}

function LionDetailPage({ lion, onMoveList }: LionDetailPageProps) {
  if (!lion) {
    return (
      <main className="page">
        <h2>아기사자를 찾을 수 없습니다.</h2>
        <button type="button" onClick={onMoveList}>
          목록으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="page detail-page">
      <img src={lion.imageUrl} alt={lion.name} />

      <h2>{lion.name}</h2>
      <p>{lion.generation}기 아기사자</p>
      <p>나이: {lion.profile.age}</p>
      <p>전공: {lion.profile.major}</p>
      <p>MBTI: {lion.profile.mbti}</p>
      <p>좋아요 여부: {lion.isFavorite ? '좋아요' : '일반'}</p>

      <div className="skills">
        {lion.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <button type="button" onClick={onMoveList}>
        목록으로 돌아가기
      </button>
    </main>
  );
}

export default LionDetailPage;
