# <img width="64" height="64" alt="logo192" src="https://github.com/user-attachments/assets/b5b0adee-edb7-4afe-a0a8-9156ca5e285b" /> 마음의 날씨 - 감정 기록 플랫폼

**마음의 날씨**는 LLM 기반 감정 분석과 심리 상담 기능을 도입한 일기 웹 앱입니다.  
사용자가 감정을 기록하고 심리적 도움을 얻을 수 있도록 지원하며, 캘린더와 해시태그, 일기 검색 기능으로 작성한 일기를 편리하게 관리할 수 있습니다.  

**AI**가 분석한 감정과 해시태그를 기반으로 사용자는 자신의 감정을 더 깊이 인식하고 표현할 수 있습니다.

---

## 🧭 프로젝트 개요

- **기간:** 2024.09 ~ 2024.12  
- **유형:** Team Project (4 members) / Web Frontend
- **담당:** UI / UX 구현, Firebase Auth 로그인 구현, Context 기반 상태 관리로 백엔드 API 연동 로직 구현, 프론트엔드 배포

---

## 🛠 기술 스택

| 구분 | 기술 스택 |
|------|------|
| Frontend | HTML5, CSS3, JavaScript, React |
| Backend | Node.js, Firebase Auth, OpenAI API, OpenWeather API |
| Database | MySQL |
| Infra & Deployment | AWS EC2 (Ubuntu), Firebase Hosting |
| Collaboration & Versioning | GitHub, Figma, Notion |

---

## 🎯 주요 기능

### 📱 전화번호 기반 간편 로그인
별도의 이메일이나 비밀번호 입력 없이 전화번호 인증만으로 간편하게 가입과 로그인이 동시에 이루어지며, 간결하고 빠른 사용자 경헙을 제공합니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/c1c2bc39-7c35-467b-8af8-23ff1dff9cd1" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/c96802cc-7ddb-439b-a159-298e47a14cec" width="49%"/>
</p>
<br>

### 📝 감정 중심 일기 작성 및 분석
사용자는 자신의 감정을 자유롭게 일기 형태로 기록하고 이미지 또한 업로드할 수 있으며, 작성된 내용은 OpenAI API를 통해 감정 분석이 이루어집니다. 분석 결과에 따라 자동으로 해시태그가 생성되고, 감정에 맞는 피드백과 심리 상담을 받을 수 있습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/d90c7343-9aaa-4775-a5bc-777c370e4d71" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/df4d123d-9513-41cf-9544-fe5612c172d0" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/aef5cc97-16f6-418c-a00e-7028525fc0fc "width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/08828171-2ca2-4cd3-9601-7f39840727a1" width="49%"/>
</p>
<br>

### ☁️ 날씨 정보 자동 연동
OpenWeather API를 통해 불러온 날씨 데이터는 화면 오른쪽 상단에 위젯 형태로 표시됩니다. 일기 작성 화면에서는 사용 시점의 날씨 정보가 함께 제공되어, 감정 상태를 날씨와 연관 지으며 더욱 몰입감 있는 감정 기록을 남길 수 있습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/e75e0de4-4f71-4a8d-9814-dc361a5b26cd" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/b3730101-adcd-4ea5-a765-ea2c68a5e637" width="49%"/>
</p>
<br>

### 📅 캘린더 기반 일기 관리
캘린더를 통해 날짜별 일기와 감정 상태를 직관적으로 확인할 수 있으며, 원하는 일자를 클릭하면 해당 일기의 내용을 조회, 수정, 삭제할 수 있습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/b9ebf3c1-72e4-4c1a-804a-eaaf6ee78b40" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/867d7903-07cf-4185-aa8a-29e796e3b693" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/47caa74a-eb90-4330-bffa-34a7bd96532f" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/25a9a740-bfa2-44fc-982a-3ca9e303654e" width="49%"/>
</p>
<br>

### 💬 심리 상담 기능 (선택적)
작성된 일기의 감정 유형에 따라, 선택적으로 AI 기반 심리 상담을 받을 수 있으며, 사용자에게 맞는 조언이나 피드백이 제공됩니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/a2dcb279-43f9-4dee-826e-485e4af0a2bd" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/0845d274-fd33-4b79-9243-9eefb3545954" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/96960966-3ab1-430a-a6e0-3c22406dec1c" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/d7323ee8-7071-490d-919e-f0a6da38165a" width="49%"/>
</p>
<br>

### 📎 해시태그 기반 검색 및 시각화
생성된 해시태그를 기반으로 주제별 일기를 빠르게 분류·검색할 수 있으며, 검색 결과는 해당 일자가 캘린더에서 하이라이팅되어 시각적으로 확인할 수 있습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/9ec0a333-00ae-4cf5-9d6e-9f721a2359db" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/922116db-535a-45b1-9a25-4663767cd421" width="49%"/>
</p>

---

## 📎 기타 정보
본 문서는 주요 기능, 구조, 핵심 기술 중심으로 구성되어 있습니다.  
개발 배경 및 문제 해결 과정, 배운 점 등은 [포트폴리오 사이트](https://mesel7.dev/projects/weather-diary)에서 확인하실 수 있습니다.
