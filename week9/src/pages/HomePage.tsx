import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { useLions } from '../hooks/useLions';

export function HomePage() {
  const {
    filteredLions,
    loading,
    errorMessage,
    searchKeyword,
    setSearchKeyword,
    partFilter,
    setPartFilter,
    sortOrder,
    setSortOrder,
    partOptions,
    addLion,
    deleteLion,
  } = useLions();

  const { user, isLoggedIn, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [generation, setGeneration] = useState(13);
  const [part, setPart] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const query = searchParams.get('q') ?? '';
    const partParam = searchParams.get('part') ?? 'all';
    const sortParam = searchParams.get('sort');

    setSearchKeyword(query);
    setPartFilter(partParam);

    if (sortParam === 'oldest' || sortParam === 'name' || sortParam === 'newest') {
      setSortOrder(sortParam);
    }
  }, []);

  function updateQuery(next: {
    q?: string;
    part?: string;
    sort?: 'newest' | 'oldest' | 'name';
  }) {
    const current = {
      q: searchKeyword,
      part: partFilter,
      sort: sortOrder,
      ...next,
    };

    const params = new URLSearchParams();

    if (current.q) params.set('q', current.q);
    if (current.part !== 'all') params.set('part', current.part);
    if (current.sort !== 'newest') params.set('sort', current.sort);

    setSearchParams(params);
  }

  async function handleAddLion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');

    if (!isLoggedIn) {
      setNotice('로그인한 사용자만 데이터를 추가할 수 있습니다.');
      return;
    }

    const isSuccess = await addLion({ name, generation, part });

    if (isSuccess) {
      setName('');
      setGeneration(13);
      setPart('');
      setNotice('아기 사자 데이터가 추가되었습니다.');
    }
  }

  async function handleDeleteLion(id: string) {
    setNotice('');

    if (!isLoggedIn) {
      setNotice('로그인한 사용자만 데이터를 삭제할 수 있습니다.');
      return;
    }

    const isSuccess = await deleteLion(id);

    if (isSuccess) {
      setNotice('아기 사자 데이터가 삭제되었습니다.');
    }
  }

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1>아기 사자 명단</h1>
          <p>Supabase에서 데이터를 조회하고 로그인 사용자만 추가/삭제할 수 있습니다.</p>
        </div>

        <div className="auth-box">
          {isLoggedIn ? (
            <>
              <p>로그인 사용자: <strong>{user?.email}</strong></p>
              <button type="button" onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <p>로그인하지 않았습니다.</p>
              <Link to="/login" className="button-link">로그인</Link>
            </>
          )}
        </div>
      </header>

      {!isLoggedIn && (
        <section className="grid-two">
          <AuthForm mode="signup" />
          <div className="card guide-card">
            <h2>비로그인 상태 안내</h2>
            <p>목록 조회, 검색, 필터, 정렬은 로그인하지 않아도 사용할 수 있습니다.</p>
            <p>추가와 삭제는 Supabase 로그인 후 사용할 수 있습니다.</p>
          </div>
        </section>
      )}

      <section className="card form-section">
        <h2>아기 사자 추가</h2>
        <form className="inline-form" onSubmit={handleAddLion}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="이름"
            required
          />
          <input
            type="number"
            value={generation}
            onChange={(event) => setGeneration(Number(event.target.value))}
            placeholder="기수"
            required
          />
          <input
            value={part}
            onChange={(event) => setPart(event.target.value)}
            placeholder="파트"
            required
          />
          <button type="submit" disabled={!isLoggedIn}>추가</button>
        </form>
        {!isLoggedIn && <p className="message">로그인한 사용자만 추가할 수 있습니다.</p>}
      </section>

      <section className="card controls">
        <input
          value={searchKeyword}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
            updateQuery({ q: event.target.value });
          }}
          placeholder="이름, 기수, 파트 검색"
        />

        <select
          value={partFilter}
          onChange={(event) => {
            setPartFilter(event.target.value);
            updateQuery({ part: event.target.value });
          }}
        >
          <option value="all">전체 파트</option>
          {partOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(event) => {
            const value = event.target.value as 'newest' | 'oldest' | 'name';
            setSortOrder(value);
            updateQuery({ sort: value });
          }}
        >
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="name">이름순</option>
        </select>
      </section>

      {notice && <p className="notice">{notice}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {loading && <p className="loading">데이터를 불러오는 중입니다...</p>}

      {!loading && filteredLions.length === 0 && (
        <p className="empty">표시할 아기 사자가 없습니다.</p>
      )}

      <ul className="lion-list">
        {filteredLions.map((lion) => (
          <li className="lion-item" key={lion.id}>
            <Link to={`/lions/${lion.id}`}>
              <strong>{lion.name}</strong>
              <span>{lion.generation}기</span>
              <span>{lion.part}</span>
            </Link>

            <button
              type="button"
              onClick={() => handleDeleteLion(lion.id)}
              disabled={!isLoggedIn}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
