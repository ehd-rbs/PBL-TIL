export function FeedbackPage() {
  return (
    <section className="card">
      <h1>동료 피드백 반영 내역</h1>
      <div className="feedback-grid">
        <article>
          <h2>동료 1 피드백</h2>
          <p><strong>잘된 점:</strong> 데이터 추가/삭제 버튼이 명확해서 사용하기 쉽다.</p>
          <p><strong>개선할 점:</strong> 빈 데이터일 때 안내 문구가 필요하다.</p>
        </article>
        <article>
          <h2>동료 2 피드백</h2>
          <p><strong>잘된 점:</strong> 모바일에서도 메뉴와 카드가 잘 보인다.</p>
          <p><strong>개선할 점:</strong> 로그인 성공 여부가 더 분명하게 보이면 좋겠다.</p>
        </article>
      </div>
      <p className="reflected-feedback">
        반영한 피드백: 빈 상태 안내 문구와 로그인 완료 메시지를 추가했습니다.
      </p>
    </section>
  );
}
