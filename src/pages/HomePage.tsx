import type { RoutePath } from '../types';

type HomePageProps = {
  onNavigate: (path: RoutePath) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <section className="hero-card">
      <p className="eyebrow">React · TypeScript · Vite · Vercel</p>
      <h1>배포 과제 점검용 웹 애플리케이션</h1>
      <p>
        로컬 실행, 빌드, 프리뷰, 환경 변수, 로그인, 데이터 조회/추가/삭제,
        라우팅, 반응형 UI를 한 번에 확인할 수 있는 과제용 앱입니다.
      </p>
      <div className="button-row">
        <button type="button" onClick={() => onNavigate('/todos')}>데이터 기능 확인</button>
        <button type="button" className="secondary" onClick={() => onNavigate('/login')}>로그인 확인</button>
      </div>
    </section>
  );
}
