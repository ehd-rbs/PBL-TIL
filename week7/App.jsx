import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { initialLions } from './data/lions.js';
import LionListPage from './pages/LionListPage.jsx';
import LionDetailPage from './pages/LionDetailPage.jsx';

function App() {
  const [lions, setLions] = useState(initialLions);

  const addLion = (newLion) => {
    setLions((prevLions) => [...prevLions, newLion]);
  };

  const deleteLion = (targetId) => {
    setLions((prevLions) => prevLions.filter((lion) => lion.id !== targetId));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LionListPage lions={lions} onAddLion={addLion} onDeleteLion={deleteLion} />}
      />
      <Route path="/lions/:id" element={<LionDetailPage lions={lions} />} />
    </Routes>
  );
}

export default App;
