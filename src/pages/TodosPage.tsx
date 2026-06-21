import { FormEvent, useMemo, useState } from 'react';
import { StatusMessage } from '../components/StatusMessage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Todo } from '../types';

const defaultTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: 'yarn build 성공 확인하기',
    createdAt: new Date().toISOString()
  }
];

export function TodosPage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('assignment-todos', defaultTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [todos]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('추가할 내용을 입력해 주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    const nextTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      createdAt: new Date().toISOString()
    };

    setTodos([nextTodo, ...todos]);
    setTitle('');
    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className="card">
      <h1>데이터 조회 / 추가 / 삭제</h1>
      <p>배포 환경에서도 브라우저 저장소를 이용해 데이터 기능을 확인할 수 있습니다.</p>
      <form className="form inline-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="예: Vercel 환경 변수 설정하기"
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">추가</button>
      </form>
      {isLoading && <StatusMessage type="loading" message="데이터를 처리하고 있습니다." />}
      {error && <StatusMessage type="error" message={error} />}
      {sortedTodos.length === 0 ? (
        <StatusMessage type="empty" message="아직 등록된 데이터가 없습니다." />
      ) : (
        <ul className="todo-list">
          {sortedTodos.map((todo) => (
            <li key={todo.id}>
              <div>
                <strong>{todo.title}</strong>
                <span>{new Date(todo.createdAt).toLocaleString('ko-KR')}</span>
              </div>
              <button type="button" className="danger" onClick={() => handleDelete(todo.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
