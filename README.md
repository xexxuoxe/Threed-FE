# 프로젝트 구조 설명서 (THREED)

이 문서는 `THREED` 프로젝트의 기본 폴더 구조 및 주요 파일의 역할에 대해 설명합니다.

---

## 📁 루트 디렉터리 구조
```
THREED/
├── .next/ # Next.js에서 자동 생성되는 빌드 결과물
├── node_modules/ # 설치된 NPM 패키지
├── public/ # 정적 파일 (이미지, 폰트 등)
├── src/ # 실제 프로젝트 소스 코드 폴더
├── .gitignore
├── next-env.d.ts # TypeScript용 Next.js 환경 타입 선언
├── eslint.config.mjs # 린트 설정
├── tsconfig.json # TypeScript 설정

page
├──home
├──├──components
├──├──constants
├──├──hooks
├──├──home.component.tsx
├──├──home.module.scss

```



---

## 📁 `public/`

- `images/` — 프로젝트에서 사용하는 정적 이미지 리소스
- `fonts/` — 웹폰트가 있을 경우 이곳에 저장

> 이 경로의 파일은 브라우저에서 `/images/파일명` 형식으로 접근할 수 있습니다.

---

## 📁 `src/`

### ✅ `app/`

- Next.js 13 이상의 App Router 기능을 사용하며, `page.tsx` 기반의 라우팅 구성
- `/login`, `/post` 등의 폴더가 각각의 페이지 라우트를 의미합니다.

> 예:
> - `/login/page.tsx` → `도메인.com/login`
> - `/post/page.tsx` → `도메인.com/post`

### ✅ `components/`

- 공통 컴포넌트를 저장하는 공간입니다.
- `page/home/components` 처럼 특정 페이지에 종속적인 컴포넌트는 해당 위치에 작성합니다.

### ✅ `styles/`

- `abstracts/`: SCSS 변수, 믹스인 등 공통 스타일 유틸
- `base/`: 리셋, 글로벌 스타일 정의
- `common.scss`: 전역에서 import되는 공통 스타일 파일

### ✅ `hooks/`

- 커스텀 훅(`useLoader.ts` 등)을 정의하는 공간입니다.

### ✅ `components/page/home/`

- 홈 페이지 관련 컴포넌트와 스타일을 관리합니다.
  - `home.component.tsx`: 홈 페이지의 핵심 UI
  - `home.module.scss`: 홈 컴포넌트의 모듈 스타일

---

## 📄 주요 파일 설명

- `layout.tsx`: App Router 기반의 공통 레이아웃 (헤더, 푸터 등 포함 가능)
- `globals.scss`: 전체 프로젝트 공통 스타일 파일 (SCSS 모듈 import 가능)
- `favicon.ico`: 브라우저 탭에 표시되는 아이콘
- `tsconfig.json`: TypeScript 프로젝트 설정 파일
- `.gitignore`: Git에서 추적하지 않을 파일 및 폴더 목록

---

## 🔧 작업 시 주의사항

- SCSS는 모듈 방식(`.module.scss`)을 기본으로 사용합니다.
- 컴포넌트는 **기능 단위**, **페이지 단위**로 나누어 구성합니다.
- 커스텀 훅은 `hooks/` 폴더 또는 특정 컴포넌트 하위에 위치할 수 있습니다.
- 이미지는 `public/images/` 경로에 저장하고, `import` 없이 URL(`/images/파일명`)로 접근합니다.

---

## ✏️ 기타 팁

- `@/components/...`, `@/styles/...` 등 경로 alias 설정이 되어 있어, import 시 경로를 간결하게 유지할 수 있습니다.
- 코드 정리 시 `eslint`, `prettier` 사용을 권장합니다.

---

## ⚙️ 개발 환경 설정

## 📦 필요한 도구

- Node.js (권장: 18 이상)
- yarn 설치
```javascript
npm install -g yarn
```

## 📥 패키지 설치


yarn install

## 🚀 개발 서버 실행
yarn dev
url : http://localhost:3000

## 🏗️ 프로젝트 빌드
yarn run build

## 🧪 빌드 후 실행
yarn run start

## 🧹 코드 정리 및 검사
yarn run lint
