import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { LionFormData } from '../types/lion';

interface LionFormProps {
  onAddLion: (formData: LionFormData) => void;
  onMoveList: () => void;
}

function LionForm({ onAddLion, onMoveList }: LionFormProps) {
  const [formData, setFormData] = useState<LionFormData>({
    name: '',
    generation: 12,
    imageUrl: 'https://via.placeholder.com/300',
    profile: {
      age: 20,
      major: '',
      mbti: '',
    },
    skills: [],
  });

  const [skillInput, setSkillInput] = useState<string>('');

  const handleBasicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'generation' ? Number(value) : value,
    }));
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: name === 'age' ? Number(value) : value,
      },
    }));
  };

  const handleSkillInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() === '') return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));

    setSkillInput('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddLion(formData);
    onMoveList();
  };

  return (
    <form className="lion-form" onSubmit={handleSubmit}>
      <label>
        이름
        <input
          name="name"
          value={formData.name}
          onChange={handleBasicChange}
          required
        />
      </label>

      <label>
        기수
        <input
          name="generation"
          type="number"
          value={formData.generation}
          onChange={handleBasicChange}
          required
        />
      </label>

      <label>
        이미지 URL
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleBasicChange}
          required
        />
      </label>

      <label>
        나이
        <input
          name="age"
          type="number"
          value={formData.profile.age}
          onChange={handleProfileChange}
          required
        />
      </label>

      <label>
        전공
        <input
          name="major"
          value={formData.profile.major}
          onChange={handleProfileChange}
          required
        />
      </label>

      <label>
        MBTI
        <input
          name="mbti"
          value={formData.profile.mbti}
          onChange={handleProfileChange}
          required
        />
      </label>

      <label>
        기술 스택
        <input
          value={skillInput}
          onChange={handleSkillInputChange}
          placeholder="예: React"
        />
      </label>

      <button type="button" onClick={handleAddSkill}>
        기술 추가
      </button>

      <div className="skills">
        {formData.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <button type="submit">아기사자 추가</button>
    </form>
  );
}

export default LionForm;
