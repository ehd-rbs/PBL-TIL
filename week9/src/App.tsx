import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailPage } from './pages/DetailPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lions/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
