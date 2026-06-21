import type { ReactNode } from 'react';
import type { RoutePath, User } from '../types';

type LayoutProps = {
  children: ReactNode;
  user: User | null;
  onLogout: () => void;
  onNavigate: (path: RoutePath) => void;
};

export function Layout({ children, user, onLogout, onNavigate }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" type="button" onClick={() => onNavigate('/')}>
          {import.meta.env.VITE_APP_TITLE || 'Vercel 배포 과제 앱'}
        </button>
        <nav className="nav-menu" aria-label="주요 메뉴">
          <button type="button" onClick={() => onNavigate('/todos')}>데이터 관리</button>
          <button type="button" onClick={() => onNavigate('/feedback')}>동료 피드백</button>
          {user ? (
            <button type="button" onClick={onLogout}>로그아웃</button>
          ) : (
            <button type="button" onClick={() => onNavigate('/login')}>로그인</button>
          )}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
}
