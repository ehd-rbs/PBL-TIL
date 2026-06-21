import { Link, useParams } from 'react-router-dom';
import { useLions } from '../hooks/useLions';

export function DetailPage() {
  const { id } = useParams();
  const { lions, loading, errorMessage } = useLions();

  const lion = lions.find((item) => item.id === id);

  if (loading) {
    return <main className="page"><p className="loading">데이터를 불러오는 중입니다...</p></main>;
  }

  if (errorMessage) {
    return <main className="page"><p className="error">{errorMessage}</p></main>;
  }

  if (!lion) {
    return (
      <main className="page narrow-page">
        <div className="card">
          <p>해당 아기 사자를 찾을 수 없습니다.</p>
          <Link to="/">목록으로 돌아가기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page narrow-page">
      <div className="card detail-card">
        <Link to="/" className="back-link">← 목록으로 돌아가기</Link>
        <h1>{lion.name}</h1>
        <p>기수: {lion.generation}</p>
        <p>파트: {lion.part}</p>
        <p>등록일: {lion.createdAt ? new Date(lion.createdAt).toLocaleString('ko-KR') : '정보 없음'}</p>
      </div>
    </main>
  );
}
