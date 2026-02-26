# ㈜태멘 B2B 홈페이지 패키지 (정적/0원)

이 폴더는 **서버 없이 동작하는 정적 홈페이지**입니다. (HTML/CSS/JS + PDF 다운로드 + mailto 문의)
- 목적: 지하주차장·피난동선 등 지하공간 결로/습기/오염 문제 해결 공법을 소개하는 **B2B 영업/입찰/지명원 대체용 사이트**
- 타깃: 건설사 구매/외주, 시공사 공무/견적, 설계/CM/감리, 공공 발주 실무자

## 1) 폴더 구조
```
tamen_website_READY/
├─ index.html                  # 메인(원페이지)
├─ drainage.html               # 공법 개요(별도 페이지)
├─ smc.html                    # SMC · C.S 불연 TM 벽체배수판(제품 상세)
├─ pvc.html                    # PVC 메가블록(제품 상세)
├─ styles.css                  # 공통 스타일
├─ main.js                     # 공통 스크립트(모바일 메뉴/라이트박스 등)
├─ README_START_HERE.md        # 이 문서
├─ NEW_CHAT_PROMPT.md          # 새 채팅방에 붙여넣는 작업 가이드
└─ assets/
   ├─ logo.jpg
   ├─ hero-*.jpg / site-*.jpg / hero.svg / og-image.svg
   ├─ company-front-placeholder.svg     # 회사 전경(추후 교체)
   ├─ spec-500-*.svg / spec-730-*.svg   # 규격 참고 이미지(추후 교체)
   ├─ catalog.pdf
   ├─ company-profile.pdf
   └─ credit-report.pdf
```

## 2) 페이지 구성(Information Architecture)

### A. index.html (원페이지)
- 상단 메뉴: 회사소개 / 제품·공법 / 공법 개요(별도 페이지) / 시공사례 / 규격 / 자료실 / 견적·상담
- 히어로(첫 화면): **“지하이중벽 · 배수판 전문 솔루션”** + CTA(견적·상담, 카다로그 다운로드)
- 회사소개(#company)
  - 회사/사업영역 요약
  - **회사 전경 사진 영역**: 현재 placeholder(assets/company-front-placeholder.svg)
  - 주소 + **전화/팩스(추후 입력)/이메일**
  - 인증/특허/벤처/R&D 강조
- 제품·공법(#solutions)
  - 제품 카드 2종: SMC/CS(불연 TM) / PVC 메가블록
  - 공법 개요: 이격형(배수·환기 논리)
- 시공사례(#projects)
  - 라벨 문구 정리 반영:
    - 안내 사인 적용
    - B1, B2 등 층 표기
    - IN/OUT 방향 유도
    - 방향 표기
    - 포인트 벽면
    - 기업 로고/포인트 디자인
- 규격(#spec)
  - 두께 표기 반영:
    - 500×500: 30T, 45T, 70T, 120T, 200T 지정제품
    - 730×2,200: 30T, 45T, 70T 지정제품
  - **규격 참고 이미지 영역**
    - 500: 3장 placeholder
    - 730: 2장 placeholder
- 자료실(#resources): PDF 3종 다운로드(assets 폴더)
- 견적·상담(#consult): tel / mailto / 폼(mailto 방식)

### B. drainage.html (공법 개요)
- 공법 논리(배수·환기·결로 저감) 요약
- 관련 자료 PDF 다운로드(assets 경로)

### C. smc.html (SMC 상세)
- 제목/문구 변경 반영:
  - “SMC · C.S 불연 TM 벽체배수판”
  - “불연 · 준불연” 표기
- 65형 스터드 문구: 포함되지 않도록 구성(요구사항 반영)

### D. pvc.html (PVC 상세)
- 문구 변경 반영:
  - “전면 환기 구조 기반의 지하 이중 벽체 시스템”
  - “탈부착방식으로 유지관리 및 보수가 쉽고, 효율을 높일 수 있도록 설계됩니다.”

## 3) 이미지/자료 교체 방법(필수)
- 회사 전경 사진 교체:
  - `assets/company-front-placeholder.svg` 를 실제 사진 파일로 교체하거나
  - 동일 파일명을 유지하고 내용만 바꾸면 코드 수정 없이 자동 반영
- 규격 이미지 교체:
  - `assets/spec-500-1.svg` ~ `spec-500-3.svg`
  - `assets/spec-730-1.svg` ~ `spec-730-2.svg`
  - 동일 파일명으로 실제 사진/도면을 넣으면 자동 반영(확장자 변경 시 HTML도 함께 수정)

- PDF 교체:
  - `assets/catalog.pdf`
  - `assets/company-profile.pdf`
  - `assets/credit-report.pdf`

## 4) 미리보기 방법(가장 쉬운 방식)
1. `index.html` 을 브라우저로 직접 열기
2. 수정 후 저장(Ctrl+S) → 브라우저 새로고침(F5)

