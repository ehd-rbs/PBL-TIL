function ExternalControls(props) {
  const isLoading = props.requestStatus === 'loading';

  return (
    <section className="external-section">
      <div className="section-heading">
        <h2>외부 데이터 불러오기</h2>
        <p className="status-text">{props.message}</p>
      </div>

      <div className="button-row">
        <button type="button" onClick={props.onAddOne} disabled={isLoading}>랜덤 1명 추가</button>
        <button type="button" onClick={props.onAddFive} disabled={isLoading}>랜덤 5명 추가</button>
        <button type="button" onClick={props.onRefreshAll} disabled={isLoading}>전체 새로고침</button>
        {props.requestStatus === 'error' && (
          <button type="button" onClick={props.onRetry}>재시도</button>
        )}
      </div>
    </section>
  );
}

export default ExternalControls;
