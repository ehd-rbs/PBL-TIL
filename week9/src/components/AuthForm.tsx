import { useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'signup';

type AuthFormProps = {
  mode: AuthMode;
  onSuccess?: () => void;
};

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (password.length < 6) {
      setMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setIsSubmitting(true);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });

      setIsSubmitting(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage('회원가입이 완료되었습니다. 로그인해 주세요.');
      setEmail('');
      setPassword('');
      onSuccess?.();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);

    if (error) {
      setMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    onSuccess?.();
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? '로그인' : '회원가입'}</h2>

      <label>
        이메일
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        비밀번호
        <input
          type="password"
          placeholder="6자 이상"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  );
}
