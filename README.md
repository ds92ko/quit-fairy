# 🧚🏻‍♀️ 칼퇴 요정

## 👀 Introduction
칼퇴 요정은 근무 시간 및 출퇴근 상태를 추적할 수 있는 출퇴근 관리 앱으로, 자율 출퇴근제를 시행하고 있는 회사에서 출근 시간을 종종 잊어버리는 문제를 해결하고자 시작된 토이 프로젝트입니다.

### 🌟 Features
**출근하기 / 퇴근하기**
- 간편한 버튼 클릭으로 출퇴근 시간을 기록하고 관리
- 반차 여부, 점심 식사 여부 설정으로 근무 시간 설정

**현재 근무 상태 추적**
- 출근 시간, 퇴근 시간 안내
- 현재 근무 현황 및 진행 상황을 실시간으로 확인
- 야근 여부 확인

**근무 로그 기록**
- 출퇴근 기록을 날짜별로 자동 저장
- 다양한 필터링 옵션을 통해 원하는 기록을 쉽게 검색

**알림 및 리마인더 설정**
- 퇴근 시간 알림 설정 가능
- 퇴근 시간 리마인더 설정 가능

**자동 출근 설정**
- 앱 실행 시 자동 출근 처리 설정 가능

<br />

## 🙌 About the Project

### 🛠️ Stacks

| **Category**      | **Stacks**                                                                                                                                                                                                                                                                                       |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Environment**   | <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> |
| **Config**        | <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> <img src="https://img.shields.io/badge/rollup-EC4A3F?style=for-the-badge&logo=rollup.js&logoColor=white">                                                                       |
| **Development**   | <img src="https://img.shields.io/badge/electron-47848F?style=for-the-badge&logo=electron&logoColor=white"> <img src="https://img.shields.io/badge/svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white"> |
| **Build Tools**   | <img src="https://img.shields.io/badge/rollup-EC4A3F?style=for-the-badge&logo=rollup.js&logoColor=white"> <img src="https://img.shields.io/badge/electron builder-000000?style=for-the-badge&logo=appveyor&logoColor=white">                                                               |
| **Utilities**     | <img src="https://img.shields.io/badge/concurrently-000000?style=for-the-badge&logo=concurrently&logoColor=white"> <img src="https://img.shields.io/badge/electron serve-47848F?style=for-the-badge&logo=electron&logoColor=white">                                                 |
| **Other Packages**| <img src="https://img.shields.io/badge/electron store-47848F?style=for-the-badge&logo=electron&logoColor=white">                                                |

<br/>

### 📅 Development Period
2025.01.03 ~ 2025.01.15

<br />

## 🪄 Getting Started

### 📌 Prerequisites
> 시작하기 전에 다음 사항들이 준비되어 있는지 확인하세요
- Node.js
- Yarn

<br/>

> Yarn이 설치되어 있지 않다면, 아래 명령어로 설치하세요
```bash
npm install --global yarn
```

### ⚙️ Setup
> 저장소를 클론한 후, 프로젝트 디렉토리로 이동하세요
```bash
$ git clone https://github.com/ds92ko/quit-fairy.git
$ cd quit-fairy
```

### 📦 Installation
> 프로젝트의 모든 종속성을 설치하세요
```bash
$ yarn
```

### 🏃 Run the Application
> 개발 모드로 애플리케이션을 실행하세요
```bash
$ yarn electron-dev
```

### 🎁 Package the Application
> 배포용으로 애플리케이션을 빌드하고 패키징하세요
```bash
$ yarn electron-pack
```