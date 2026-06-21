# React Vite Vercel 배포 과제

React, TypeScript, Vite로 만든 배포 과제 점검용 웹 애플리케이션입니다.

## 로컬 실행

```bash
yarn install
yarn dev
```

## 빌드 및 프리뷰

```bash
yarn build
yarn preview
```

`yarn preview`는 `yarn build` 후 생성되는 `dist` 폴더를 확인합니다.

## 환경 변수

로컬에서는 `.env.example`을 복사해서 `.env.local`을 만듭니다.

```bash
cp .env.example .env.local
```

Vercel 배포 환경에서는 Project Settings > Environment Variables에 아래 값을 추가합니다.

```text
VITE_APP_TITLE=Vercel 배포 과제 앱
```

## 주요 기능

- 로그인 / 로그아웃
- 데이터 조회 / 추가 / 삭제
- 홈 / 로그인 / 데이터 관리 / 동료 피드백 라우팅
- 모바일 / 태블릿 / 데스크톱 반응형 레이아웃
- 로딩 / 에러 / 빈 상태 안내
- TypeScript strict 모드 빌드
