import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import LionCard from '../components/LionCard';
import type { Lion } from '../types/lion';
import { filterLionsByKeyword } from '../utils/lionUtils';

interface LionListPageProps {
  lions: Lion[];
  onSelectLion: (id: number) => void;
  onRemoveLion: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

function LionListPage({
  lions,
  onSelectLion,
  onRemoveLion,
  onToggleFavorite,
}: LionListPageProps) {
  const [keyword, setKeyword] = useState<string>('');

  const filteredLions = filterLionsByKeyword(lions, keyword);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('검색어:', keyword);
    }
  };

  return (
    <main className="page">
      <h2>아기사자 명단</h2>

      <input
        className="search-input"
        value={keyword}
        onChange={handleKeywordChange}
        onKeyDown={handleKeyDown}
        placeholder="이름으로 검색"
      />

      <section className="lion-list">
        {filteredLions.map((lion) => (
          <LionCard
            key={lion.id}
            lion={lion}
            onSelect={onSelectLion}
            onRemove={onRemoveLion}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </section>
    </main>
  );
}

export default LionListPage;
