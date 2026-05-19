function HeaderControls(props) {
  return (
    <section className="control-section">
      <div className="title-area">
        <h1>아기 사자 대시보드</h1>
        <p>외부 데이터를 불러와 명단을 갱신하는 인터랙티브 명단입니다.</p>
      </div>

      <div className="button-row">
        <button type="button" onClick={props.onToggleForm}>아기 사자 추가</button>
        <button type="button" onClick={props.onDeleteLast}>마지막 아기 사자 삭제</button>
        <strong className="count-text">총 {props.totalCount}명</strong>
      </div>
    </section>
  );
}

export default HeaderControls;
