function LionForm(props) {
  if (!props.isOpen) {
    return null;
  }

  const isLoading = props.requestStatus === 'loading';

  return (
    <section className="form-section">
      <h2>아기 사자 추가 폼</h2>
      <form onSubmit={props.onSubmit} className="lion-form">
        <label>
          이름
          <input name="name" value={props.form.name} onChange={props.onChange} />
        </label>

        <label>
          파트
          <select name="part" value={props.form.part} onChange={props.onChange}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </label>

        <label>
          나이
          <input name="age" value={props.form.age} onChange={props.onChange} />
        </label>

        <label>
          MBTI
          <input name="mbti" value={props.form.mbti} onChange={props.onChange} />
        </label>

        <label>
          좌우명
          <input name="motto" value={props.form.motto} onChange={props.onChange} />
        </label>

        <label>
          대표 기술
          <input name="skill" value={props.form.skill} onChange={props.onChange} />
        </label>

        <label>
          좋아하는 것
          <input name="favorite" value={props.form.favorite} onChange={props.onChange} />
        </label>

        <label className="wide-field">
          자기소개
          <textarea name="introduction" value={props.form.introduction} onChange={props.onChange} />
        </label>

        <div className="button-row wide-field">
          <button type="button" onClick={props.onFillRandom} disabled={isLoading}>랜덤 값 채우기</button>
          <button type="submit" disabled={!props.canSubmit}>추가하기</button>
          <button type="button" onClick={props.onCancel}>취소</button>
        </div>
      </form>
    </section>
  );
}

export default LionForm;
