import DetailCard from './DetailCard.jsx';

function DetailList(props) {
  return (
    <section className="detail-section">
      <div className="section-heading">
        <h2>상세 자기소개 정보</h2>
        <p>요약 카드와 동일한 명단 상태를 사용합니다.</p>
      </div>

      {props.lions.length === 0 ? (
        <div className="empty-state">상세 정보를 표시할 아기 사자가 없습니다.</div>
      ) : (
        <div className="detail-list">
          {props.lions.map(function (lion) {
            return <DetailCard key={lion.id} lion={lion} />;
          })}
        </div>
      )}
    </section>
  );
}

export default DetailList;
