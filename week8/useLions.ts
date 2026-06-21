import LionForm from '../components/LionForm';
import type { LionFormData } from '../types/lion';

interface LionFormPageProps {
  onAddLion: (formData: LionFormData) => void;
  onMoveList: () => void;
}

function LionFormPage({ onAddLion, onMoveList }: LionFormPageProps) {
  return (
    <main className="page">
      <h2>아기사자 추가</h2>

      <LionForm onAddLion={onAddLion} onMoveList={onMoveList} />
    </main>
  );
}

export default LionFormPage;
