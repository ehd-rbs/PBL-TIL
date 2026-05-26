import ControlPanel from '../components/ControlPanel.jsx';
import LionForm from '../components/LionForm.jsx';
import LionSummaryCard from '../components/LionSummaryCard.jsx';
import { useLionFilters } from '../hooks/useLionFilters.js';
import { filterAndSortLions } from '../utils/lionUtils.js';

function LionListPage({ lions, onAddLion, onDeleteLion }) {
  const { filters, updateFilter } = useLionFilters();
  const visibleLions = filterAndSortLions(lions, filters);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">Lion Track Week7</p>
        <h1>아기 사자 명단 관리</h1>
        <p>
          목록 페이지에서는 컨트롤 영역, 보기 옵션, 폼, 요약 카드 그리드만 표시됩니다.
          요약 카드를 클릭하면 상세 페이지로 이동합니다.
        </p>
      </header>

      <ControlPanel
        filters={filters}
        onChangeFilter={updateFilter}
        totalCount={lions.length}
        visibleCount={visibleLions.length}
      />

      <LionForm onAddLion={onAddLion} />

      <section className="panel">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">요약 카드 그리드</p>
            <h2>명단</h2>
          </div>
        </div>

        {visibleLions.length === 0 ? (
          <p className="empty-message">조건에 맞는 아기 사자가 없습니다.</p>
        ) : (
          <div className="card-grid">
            {visibleLions.map((lion) => (
              <LionSummaryCard key={lion.id} lion={lion} onDeleteLion={onDeleteLion} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default LionListPage;
