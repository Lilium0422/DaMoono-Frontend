# 다무너 (DaMoono) 🐙

### AI 기반 통신사 요금제 추천 및 실시간 상담 서비스

**다무너(DaMoono)**는
사용자의 통신 사용 패턴과 성향을 분석해 최적의 요금제를 추천하고,
AI 챗봇과 실시간 상담사 연결을 결합하여
**상담 요약까지 제공하는 통합 요금제 상담 서비스**입니다.

---

## 📌 프로젝트 개요

| 항목     | 내용                                |
| ------ | --------------------------------- |
| 프로젝트명  | 다무너 (DaMoono)                     |
| 서비스 주제 | AI 기반 통신사 요금제 추천 · 실시간 상담 · 상담 요약 |
| 해결 방식  | AI 챗봇 및 요약 + 실시간 상담 병행                 |
| 개발 기간  | 2026.01.12 ~ 2026.01.30           |
| 팀 구성   | Frontend 5명 · Backend 1명          |

---

## 🔧 주요 기능

| 기능 미리보기                                              | 기능 설명 |
| ---------------------------------------------------- | ----- |
| 이미지 / GIF / 시연 영상                                    |       |
| **1. 🔐 소셜 로그인 & 인증 시스템 (OAuth + 인증 상태 관리)**<br><br> |       |

* Kakao OAuth 기반 소셜 로그인으로 초기 진입 장벽 최소화<br>
* 로그인 여부에 따라 접근 가능한 페이지 제어<br>
* 인증 정보는 보안성을 고려해 쿠키 기반으로 관리<br>
* 전역 상태 관리로 새로고침·페이지 이동 시 로그인 상태 유지<br>
* 인증 만료 또는 실패 시 로그인 페이지로 안전하게 리다이렉트 |

| 이미지 / GIF / 시연 영상 |
**2. 🧠 AI 챗봇 요금제 추천 (텍스트 / 음성)**<br><br>

* OpenAI 기반 챗봇과 대화하며 요금제 추천 제공<br>
* LangChain Conversation Chain 기반 대화 흐름 설계<br>
* 의도 분석 → 프롬프트 생성 → 요금제 후보 도출 → 카드형 응답 렌더링 구조<br>
* 텍스트 입력 / Web Speech API 기반 음성 입력 모두 지원<br>
* 성향 테스트 결과를 프롬프트 컨텍스트에 포함해 추천 정확도 향상<br>
* 정확 모드 / 자연 모드 전환 가능<br>
* 챗봇 이탈 후 재접속 시 대화 히스토리 유지 |

| 이미지 / GIF |
**3. 💬 실시간 1:1 상담 시스템 (WebSocket)**<br><br>

* AI 상담으로 해결되지 않는 경우를 대비한 실시간 상담사 연결 기능<br>
* Socket.IO 기반 WebSocket 통신으로 사용자–상담사 1:1 매칭<br>
* 상담 요청 → 대기 → 연결 → 종료 단계의 세션 상태 관리<br>
* Room 기반 메시지 중계 구조<br>
* 상담 종료 시 세션 및 소켓 정리로 안정적인 연결 유지 |

| 이미지 / GIF |
**4. 📊 요금제 탐색 및 비교 시각화**<br><br>

* 통신망(LTE/5G), 가격, 데이터, 혜택 기준 요금제 탐색<br>
* 요금제 공통 데이터 모델 정의로 필터·정렬 로직 단순화<br>
* Chart.js 기반 요금·데이터·혜택 비교 시각화<br>
* Flip Card UI로 핵심 정보 / 상세 정보 단계적 노출<br>
* Framer Motion으로 비교 모드 전환 애니메이션 구현 |

| 이미지 / GIF |
**5. 🎭 성향 테스트 기반 요금제 추천**<br><br>

* 데이터 사용량, 통화 빈도, 가격 민감도 등 6개 카테고리 질문 구성<br>
* 점수 기반 Rule System으로 사용자 성향 분류<br>
* 성향 결과를 AI 챗봇 프롬프트에 전달해 추천 로직과 연동<br>
* 질문 및 결과를 JSON 구조로 관리해 확장성 확보 |

| 이미지 / GIF |
**6. 📱 채팅 모드 분리 구조**<br><br>

* AI 채팅 / 상담 채팅 / 관리자 모드 / 가이드 모드로 채팅 구조 분리<br>
* AI 채팅: 요금제 추천 및 정보 제공<br>
* 상담 채팅: WebSocket 기반 실시간 1:1 상담<br>
* 관리자 모드: 상담 세션 관리 및 상담사 전용 UI<br>
* 가이드 모드: FAQ 및 서비스 이용 안내 제공 |

---

## ⚔️ 기술 스택

| 분야         | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend   | ![React](https://img.shields.io/badge/React-61DAFB?logo=react\&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white) ![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter) ![Vanilla Extract](https://img.shields.io/badge/Vanilla%20Extract-CB9DF0) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?logo=framer) |
| State / UI | ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io) ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs\&logoColor=white)                                                                                                                                                                                                                                                                                                                                       |
| Backend    | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express) ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io)                                                                                                                                                                                                                                                                       |
| AI         | ![LangChain](https://img.shields.io/badge/LangChain-4B0082) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai\&logoColor=white)                                                                                                                                                                                                                                                                                                                                                              |
| Dev Tools  | ![Git](https://img.shields.io/badge/Git-F05032?logo=git\&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github) ![Biome](https://img.shields.io/badge/Biome-60A5FA) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint)                                                                                                                                                                                                                                           |

---

## 📦 설치 및 실행

### 환경 변수 설정
**Frontend (.env)**
```env
VITE_API_URL=https://damoono-backend-production.up.railway.app
VITE_API_BASE_URL=https://damoono-backend-production.up.railway.app
```

**Backend (.env)**
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 설치 및 실행
```bash
cd DaMoono-Frontend
npm install
npm run dev
```

```bash
cd DaMoono-Backend
npm install
npm run dev
```


## 🏗️ 시스템 아키텍처

```
Frontend (React + Vite)
   ↕ REST API / WebSocket
Backend (Node.js + Express + Socket.IO)
   ↕
LangChain + OpenAI API
```


## 🔄 플로우 차트

**Service Flow**
(이미지 삽입)

**Admin Flow**
(이미지 삽입)

**상담 흐름**

1. 상담 요청
2. 대기 세션 등록
3. 상담사 매칭
4. 실시간 상담
5. 상담 종료 및 요약

---

## 👥 팀원 및 역할

| 프로필 | 이름 | 주요 역할 및 기여          |
| --- | -- | ------------------- |
| 이미지 | 이름 | AI 챗봇 UI · 대화 흐름 설계 |
| 이미지 | 이름 | 실시간 상담 WebSocket    |
| 이미지 | 이름 | 요금제 비교·시각화          |
| 이미지 | 이름 | 성향 테스트 로직           |
| 이미지 | 이름 | 프론트엔드 구조 설계         |
| 이미지 | 이름 | Backend · AI API 연동 |
