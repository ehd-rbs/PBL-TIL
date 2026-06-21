function ViewOptions(props) {
  return (
    <section className="option-section">
      <label>
        파트 필터
        <select name="part" value={props.viewOptions.part} onChange={props.onChange}>
          <option value="전체">전체</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
        </select>
      </label>

      <label>
        정렬 방식
        <select name="sort" value={props.viewOptions.sort} onChange={props.onChange}>
          <option value="latest">최신추가순</option>
          <option value="name">이름순</option>
        </select>
      </label>

      <label>
        이름 검색
        <input
          name="search"
          value={props.viewOptions.search}
          onChange={props.onChange}
          placeholder="이름을 입력하세요"
        />
      </label>
    </section>
  );
}

export default ViewOptions;
