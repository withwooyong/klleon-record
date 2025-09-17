# Klleon Avatar Chat

React 애플리케이션으로 KlleonChat SDK를 사용하여 아바타와 대화 시뮬레이션 프로젝트입니다.

## 환경 설정

### 1. 환경변수 설정

프로젝트를 실행하기 전에 `.env` 파일을 생성하고 KlleonChat SDK 키를 설정해야 합니다.

```bash
# .env 파일 생성
cp .env.example .env
```

`.env` 파일을 열고 실제 SDK 키를 입력하세요:

```env
REACT_APP_KLLEON_SDK_KEY=your_actual_sdk_key_here
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인할 수 있습니다.

## 주요 기능

- **아바타 선택**: 다양한 아바타 중에서 선택하여 대화
- **실시간 채팅**: 아바타와 텍스트 기반 대화
- **엔터키 전송**: 텍스트 입력 후 엔터키로 메시지 전송

## 기술 스택

- React 18
- TypeScript
- KlleonChat SDK

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
