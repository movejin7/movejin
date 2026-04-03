# movejin
바람의 나라

## Next.js Admin Dashboard 미리보기
이 저장소는 Next.js(App Router) + Tailwind CSS 기반의 관리자 대시보드 UI를 포함합니다.

### 1) 의존성 설치
```bash
npm install
```

### 2) 개발 서버 실행 (미리보기)
```bash
npm run dev
```

### 3) 브라우저에서 확인
- 기본 홈: `http://localhost:3000`
- 관리자 대시보드: `http://localhost:3000/admin`

## 포함된 UI
- KPI 카드
  - Total Consults
  - Completion Rate
- Consult List 테이블
- 재사용 컴포넌트
  - `components/KpiCard.tsx`
  - `components/Table.tsx`

## 참고
현재는 백엔드 연동 없이 `app/admin/page.tsx`의 목업 데이터로 동작합니다.
