import { FormEvent, useState } from 'react';
import { StatusMessage } from '../components/StatusMessage';
import type { User } from '../types';

type LoginPageProps = {
  user: User | null;
  onLogin: (email: string) => void;
};

export function LoginPage({ user, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.includes('@')) {
      setError('올바른 이메일 형식으로 입력해 주세요.');
      return;
    }

    setError('');
    onLogin(email);
  };

  if (user) {
    return (
      <section className="card">
        <h1>로그인 완료</h1>
        <StatusMessage type="success" message={`${user.email} 계정으로 로그인되어 있습니다.`} />
      </section>
    );
  }

  return (
    <section className="card">
      <h1>로그인</h1>
      <p>실제 서버 없이 과제 동작 확인을 위해 브라우저 저장소에 로그인 상태를 저장합니다.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="example@email.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && <StatusMessage type="error" message={error} />}
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}
