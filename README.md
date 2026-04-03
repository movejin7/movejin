# movejin
바람의 나라

## Next.js Admin Dashboard 미리보기
이 저장소는 Next.js(App Router) + Tailwind CSS + Prisma 기반의 관리자 대시보드 UI를 포함합니다.

### 1) 의존성 설치
```bash
npm install
```

### 2) 데이터베이스 환경변수 설정
`.env` 파일에 `DATABASE_URL`을 설정하세요.

예시:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/movejin"
```

### 3) Prisma 마이그레이션 실행
```bash
npx prisma migrate dev --name init_consult
```

### 4) 개발 서버 실행 (미리보기)
```bash
npm run dev
```

### 5) 브라우저에서 확인
- 기본 홈: `http://localhost:3000`
- 관리자 대시보드: `http://localhost:3000/admin`
- API: `http://localhost:3000/api/consult`

## 포함된 UI
- KPI 카드
  - Total Consults
  - Completion Rate
- Consult List 테이블
- 재사용 컴포넌트
  - `components/KpiCard.tsx`
  - `components/Table.tsx`

## Prisma 스키마
- `Consult`
  - `id`
  - `category`
  - `description`
  - `status`
  - `createdAt`
