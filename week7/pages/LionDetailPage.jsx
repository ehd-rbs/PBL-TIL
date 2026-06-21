import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPartLabel } from '../utils/lionUtils.js';

function LionDetailPage({ lions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const lion = lions.find((item) => String(item.id) === id);

  if (!lion) {
    return (
      <main className="page-shell detail-page">
        <section className="panel not-found">
          <h1>해당 아기 사자를 찾을 수 없습니다.</h1>
          <p>목록에서 삭제되었거나 존재하지 않는 id입니다.</p>
          <button type="button" onClick={() => navigate('/')}>
            목록으로 돌아가기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">
      <section className="panel detail-card">
        <div className="detail-header">
          <button type="button" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
          <Link className="home-link" to="/">
            목록 페이지로 돌아가기
          </Link>
        </div>

        <span className="part-badge large">{getPartLabel(lion.part)}</span>
        <h1>{lion.name}</h1>

        <dl className="detail-list">
          <div>
            <dt>이름</dt>
            <dd>{lion.name}</dd>
          </div>
          <div>
            <dt>파트</dt>
            <dd>{getPartLabel(lion.part)}</dd>
          </div>
          <div>
            <dt>자기소개</dt>
            <dd>{lion.intro}</dd>
          </div>
          <div>
            <dt>연락처</dt>
            <dd>{lion.contact}</dd>
          </div>
          <div>
            <dt>관심 기술</dt>
            <dd className="skill-row detail-skills">
              {lion.skills.length > 0 ? lion.skills.map((skill) => <span key={skill}>{skill}</span>) : '미입력'}
            </dd>
          </div>
          <div>
            <dt>한 마디</dt>
            <dd>{lion.message}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

export default LionDetailPage;
