import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="page narrow-page">
      <Link to="/" className="back-link">← 목록으로 돌아가기</Link>
      <AuthForm mode="login" onSuccess={() => navigate('/')} />
    </main>
  );
}
