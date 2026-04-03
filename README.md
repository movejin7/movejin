# movejin
바람의 나라

## Next.js Admin Dashboard 미리보기
이 저장소는 Next.js(App Router) + Tailwind CSS + Prisma + Socket.IO + OpenAI 기반의 관리자 대시보드 UI를 포함합니다.

### 1) 의존성 설치
```bash
npm install
```

### 2) 환경변수 설정
`.env` 파일에 다음을 설정하세요.

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/movejin"
OPENAI_API_KEY="your_openai_api_key"
OPENAI_MODEL="gpt-4o-mini"
```

### 3) Prisma 마이그레이션 실행
```bash
npx prisma migrate dev --name add_consult_ai_analysis
```

### 4) 개발 서버 실행 (Socket.IO 포함)
```bash
npm run dev
```

### 5) 브라우저에서 확인
- 기본 홈: `http://localhost:3000`
- 관리자 대시보드: `http://localhost:3000/admin`
- API: `http://localhost:3000/api/consult`

## AI 분석 + 실시간 업데이트
- consult 생성(`POST /api/consult`) 즉시 응답합니다. (non-blocking)
- 생성 후 백그라운드에서 OpenAI API로 description 분석을 요청합니다.
- 분석 JSON 결과(`category`, `summary`, `urgency`)를 DB에 저장합니다.
- 분석 완료 시 `consult-updated` 이벤트로 대시보드가 즉시 반영됩니다.

예시 요청:
```bash
curl -X POST http://localhost:3000/api/consult \
  -H "Content-Type: application/json" \
  -d '{"category":"General","description":"Patient reports chest tightness during exercise.","status":"PENDING"}'
```
