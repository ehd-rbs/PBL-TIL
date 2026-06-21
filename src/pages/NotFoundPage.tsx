import type { RoutePath } from '../types';

type NotFoundPageProps = {
  onNavigate: (path: RoutePath) => void;
};

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section className="card center-card">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소를 다시 확인하거나 홈으로 이동해 주세요.</p>
      <button type="button" onClick={() => onNavigate('/')}>홈으로 이동</button>
    </section>
  );
}
