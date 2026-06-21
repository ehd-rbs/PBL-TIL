import SummaryCard from './SummaryCard.jsx';

function SummaryGrid(props) {
  return (
    <section className="summary-section">
      <div className="section-heading">
        <h2>자기소개 요약 카드</h2>
        <p>현재 보기 옵션에 맞는 카드만 표시됩니다.</p>
      </div>

      {props.lions.length === 0 ? (
        <div className="empty-state">조건에 맞는 아기 사자가 없습니다.</div>
      ) : (
        <div className="card-grid">
          {props.lions.map(function (lion) {
            return <SummaryCard key={lion.id} lion={lion} />;
          })}
        </div>
      )}
    </section>
  );
}

export default SummaryGrid;
