function DetailCard(props) {
  return (
    <article className="detail-card">
      <div className="card-top">
        <h3>{props.lion.name}</h3>
        <span className={'badge badge-' + props.lion.part.toLowerCase()}>{props.lion.part}</span>
      </div>
      <p><strong>나이</strong> {props.lion.age}</p>
      <p><strong>MBTI</strong> {props.lion.mbti}</p>
      <p><strong>대표 기술</strong> {props.lion.skill}</p>
      <p><strong>좋아하는 것</strong> {props.lion.favorite}</p>
      <p><strong>좌우명</strong> {props.lion.motto}</p>
      <p>{props.lion.introduction}</p>
    </article>
  );
}

export default DetailCard;
