import { useState } from 'react';
import { PART_OPTIONS } from '../utils/lionUtils.js';

const initialForm = {
  name: '',
  part: 'frontend',
  intro: '',
  contact: '',
  skills: '',
  message: '',
};

function LionForm({ onAddLion }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert('이름을 입력해 주세요.');
      return;
    }

    const newLion = {
      id: Date.now(),
      name: form.name.trim(),
      part: form.part,
      intro: form.intro.trim() || '아직 자기소개가 입력되지 않았습니다.',
      contact: form.contact.trim() || '연락처 미입력',
      skills: form.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      message: form.message.trim() || '함께 성장하겠습니다.',
    };

    onAddLion(newLion);
    setForm(initialForm);
  };

  return (
    <section className="panel" aria-label="아기 사자 추가 폼">
      <p className="eyebrow">폼</p>
      <h2>아기 사자 추가</h2>

      <form className="lion-form" onSubmit={handleSubmit}>
        <label>
          이름
          <input name="name" value={form.name} onChange={handleChange} placeholder="예: 홍길동" />
        </label>

        <label>
          파트
          <select name="part" value={form.part} onChange={handleChange}>
            {PART_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          자기소개
          <textarea
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="간단한 자기소개를 입력하세요."
          />
        </label>

        <label>
          연락처
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </label>

        <label>
          관심 기술
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, JavaScript, CSS"
          />
        </label>

        <label>
          한 마디
          <input
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="한 마디를 입력하세요."
          />
        </label>

        <button type="submit">명단 추가</button>
      </form>
    </section>
  );
}

export default LionForm;
