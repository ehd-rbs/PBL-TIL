import { PART_OPTIONS, SORT_OPTIONS } from '../utils/lionUtils.js';

function ControlPanel({ filters, onChangeFilter, totalCount, visibleCount }) {
  return (
    <section className="panel control-panel" aria-label="명단 보기 옵션">
      <div>
        <p className="eyebrow">보기 옵션</p>
        <h2>명단 찾기</h2>
        <p className="description">
          검색어, 파트 필터, 정렬 방식은 URL 쿼리 파라미터와 함께 저장됩니다.
        </p>
      </div>

      <div className="control-grid">
        <label>
          검색어
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChangeFilter('search', event.target.value)}
            placeholder="이름, 소개, 기술 검색"
          />
        </label>

        <label>
          파트 필터
          <select value={filters.part} onChange={(event) => onChangeFilter('part', event.target.value)}>
            {PART_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          정렬 방식
          <select value={filters.sort} onChange={(event) => onChangeFilter('sort', event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="count-box">
        전체 {totalCount}명 중 현재 {visibleCount}명이 표시됩니다.
      </div>
    </section>
  );
}

export default ControlPanel;
