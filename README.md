# movejin
바람의 나라

## Next.js Admin Dashboard 미리보기
이 저장소는 Next.js(App Router) + Tailwind CSS + Prisma + Socket.IO 기반의 관리자 대시보드 UI를 포함합니다.

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

### 4) 개발 서버 실행 (Socket.IO 포함)
```bash
npm run dev
```

### 5) 브라우저에서 확인
- 기본 홈: `http://localhost:3000`
- 관리자 대시보드: `http://localhost:3000/admin`
- API: `http://localhost:3000/api/consult`

## 실시간 업데이트 테스트
새 consult 생성 시 `new-consult` 이벤트가 emit 되고 `/admin` 화면이 즉시 갱신됩니다.

예시 요청:
```bash
curl -X POST http://localhost:3000/api/consult \
  -H "Content-Type: application/json" \
  -d '{"category":"General","description":"First consult","status":"PENDING"}'
```

## Prisma 스키마
- `Consult`
  - `id`
  - `category`
  - `description`
  - `status`
  - `createdAt`
