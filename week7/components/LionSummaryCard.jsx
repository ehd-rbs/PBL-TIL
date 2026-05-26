import { Link } from 'react-router-dom';
import { getPartLabel } from '../utils/lionUtils.js';

function LionSummaryCard({ lion, onDeleteLion }) {
  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDeleteLion(lion.id);
  };

  return (
    <Link className="summary-card" to={`/lions/${lion.id}`}>
      <article>
        <div className="card-top">
          <span className="part-badge">{getPartLabel(lion.part)}</span>
          <button className="delete-button" type="button" onClick={handleDelete}>
            삭제
          </button>
        </div>
        <h3>{lion.name}</h3>
        <p>{lion.message}</p>
        <div className="skill-row">
          {lion.skills.slice(0, 3).map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </article>
    </Link>
  );
}

export default LionSummaryCard;
