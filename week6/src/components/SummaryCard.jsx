function SummaryCard(props) {
  return (
    <article className="summary-card">
      <div className="card-top">
        <h3>{props.lion.name}</h3>
        <span className={'badge badge-' + props.lion.part.toLowerCase()}>{props.lion.part}</span>
      </div>
      <p>{props.lion.motto}</p>
      <small>{props.lion.skill}</small>
    </article>
  );
}

export default SummaryCard;
