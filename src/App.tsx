import { Layout } from './components/Layout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useRouter } from './hooks/useRouter';
import { FeedbackPage } from './pages/FeedbackPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TodosPage } from './pages/TodosPage';
import type { User } from './types';

function App() {
  const { path, navigate } = useRouter();
  const [user, setUser] = useLocalStorage<User | null>('assignment-user', null);

  const handleLogin = (email: string) => {
    setUser({ email });
    navigate('/todos');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={navigate}>
      {path === '/' && <HomePage onNavigate={navigate} />}
      {path === '/login' && <LoginPage user={user} onLogin={handleLogin} />}
      {path === '/todos' && <TodosPage />}
      {path === '/feedback' && <FeedbackPage />}
      {path === '/not-found' && <NotFoundPage onNavigate={navigate} />}
    </Layout>
  );
}

export default App;
