# 제출 전 체크리스트

## 1. 로컬 실행

- [ ] `yarn install` 성공
- [ ] `yarn dev` 실행 후 로컬 화면 확인
- [ ] `yarn build` 에러 없이 완료
- [ ] `yarn preview` 실행 후 빌드 결과 확인

## 2. GitHub / Vercel 배포

- [ ] GitHub 저장소 생성
- [ ] main 브랜치에 코드 push
- [ ] Vercel에서 GitHub 저장소 Import
- [ ] Framework Preset: Vite 확인
- [ ] Build Command: `yarn build` 확인
- [ ] Output Directory: `dist` 확인
- [ ] main 브랜치 push 시 자동 배포 확인
- [ ] 배포 URL에서 앱 정상 동작 확인

## 3. 환경 변수

- [ ] `.env.local`은 GitHub에 올리지 않음
- [ ] `.env.example`만 GitHub에 올림
- [ ] Vercel Project Settings > Environment Variables에 `VITE_APP_TITLE` 등록
- [ ] 환경 변수 변경 후 Redeploy 실행

## 4. 프로덕션 동작 확인

- [ ] 데이터 조회 정상
- [ ] 데이터 추가 정상
- [ ] 데이터 삭제 정상
- [ ] 로그인 정상
- [ ] 로그아웃 정상
- [ ] 메뉴 이동 정상
- [ ] URL 직접 입력 / 새로고침 시 화면 정상 표시

## 5. UI/UX 점검

- [ ] 모바일 화면 정상
- [ ] 태블릿 화면 정상
- [ ] 데스크톱 화면 정상
- [ ] 로딩 안내 표시
- [ ] 에러 안내 표시
- [ ] 빈 상태 안내 표시
- [ ] 브라우저 콘솔 불필요한 에러 없음

## 6. 코드 품질

- [ ] 사용하지 않는 변수 없음
- [ ] 사용하지 않는 import 없음
- [ ] 개발용 console.log 없음
- [ ] TypeScript 타입 에러 없음
- [ ] 불필요한 주석 없음

## 7. 동료 피드백

- [ ] 동료 2명 이상에게 서비스 테스트 요청
- [ ] 잘된 점 최소 1개 기록
- [ ] 개선할 점 또는 버그 최소 1개 기록
- [ ] 받은 피드백 중 최소 1개 반영
