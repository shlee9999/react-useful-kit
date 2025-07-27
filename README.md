# React Useful Kit

유용한 React 컴포넌트와 훅들을 모아놓은 라이브러리입니다.

[![npm version](https://badge.fury.io/js/react-useful-kit.svg)](https://badge.fury.io/js/react-useful-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 설치

```bash
npm install react-useful-kit
# 또는
yarn add react-useful-kit
# 또는
pnpm add react-useful-kit
```

## 요구사항

- React 19.0.0 이상
- React DOM 19.0.0 이상

## 특징

✅ **CSS 수동 주입**: CSS 파일을 선택적으로 import하여 커스터마이징 용이  
✅ **TypeScript 완전 지원**: 타입 안전성 보장  
✅ **경량**: 최소한의 의존성으로 번들 크기 최적화  
✅ **합성 컴포넌트 패턴**: 유연하고 직관적인 API 제공

## 사용법

### Modal 컴포넌트

합성 컴포넌트 패턴을 사용하여 유연하고 직관적인 모달을 구현할 수 있습니다.

```tsx
import React from 'react'
import { Modal } from 'react-useful-kit'

function App() {
  return (
    <div>
      <Modal>
        <Modal.Trigger>
          <button>모달 열기</button>
        </Modal.Trigger>
        <Modal.Content>
          <h2>모달 제목</h2>
          <p>모달 내용입니다!</p>
          <Modal.Close />
        </Modal.Content>
      </Modal>
    </div>
  )
}
```

### useAlertModal 훅

함수 호출만으로 간편하게 확인/취소 모달을 표시할 수 있습니다.

```tsx
import React from 'react'
import { useAlertModal } from 'react-useful-kit'

function App() {
  const { alert } = useAlertModal()

  const handleSimpleAlert = () => {
    alert('간단한 알림 메시지')
  }

  const handleConfirmAlert = () => {
    alert({
      title: '확인',
      message: '정말로 삭제하시겠습니까?',
      showCancel: true,
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        console.log('삭제됨')
      },
      onCancel: () => {
        console.log('취소됨')
      },
    })
  }

  return (
    <div>
      <button onClick={handleSimpleAlert}>간단한 Alert</button>
      <button onClick={handleConfirmAlert}>확인/취소 Alert</button>
    </div>
  )
}
```

## CSS 스타일

CSS 파일을 수동으로 import하여 사용하세요:

```typescript
import 'react-useful-kit/dist/react-useful-kit.css'
```

이렇게 하면 사용자가 원하는 시점에 스타일을 로드할 수 있고, 커스터마이징도 더 쉽게 할 수 있습니다.

### 커스터마이징

다음 CSS 클래스를 사용하여 스타일을 커스터마이징할 수 있습니다:

```css
/* Modal 스타일 */
.react-useful-kit-modal-overlay {
  /* 오버레이 */
}
.react-useful-kit-modal-content {
  /* 모달 콘텐츠 */
}
.react-useful-kit-modal-close {
  /* 닫기 버튼 */
}

/* Alert Modal 스타일 */
.react-useful-kit-alert-modal-content {
  /* Alert 콘텐츠 */
}
.react-useful-kit-alert-modal-title {
  /* Alert 제목 */
}
.react-useful-kit-alert-modal-message {
  /* Alert 메시지 */
}
.react-useful-kit-alert-modal-button-container {
  /* 버튼 컨테이너 */
}
.react-useful-kit-alert-modal-confirm-button {
  /* 확인 버튼 */
}
.react-useful-kit-alert-modal-cancel-button {
  /* 취소 버튼 */
}
```

## API 문서

### Modal 컴포넌트

합성 컴포넌트 패턴으로 구현된 모달 컴포넌트입니다.

#### `Modal`

모달 컨텍스트를 제공하는 루트 컴포넌트입니다.

#### `Modal.Trigger`

모달을 여는 트리거 요소입니다.

- 자식 요소에 `onClick` 이벤트를 추가하여 모달을 엽니다
- 기존 `onClick` 이벤트가 있다면 먼저 실행한 후 모달을 엽니다

#### `Modal.Content`

모달 내용을 렌더링하는 컴포넌트입니다.

**Props:**

- `className?`: string - 추가 CSS 클래스
- `overlay?`: boolean - 오버레이 표시 여부 (기본값: true)
- `isDefaultOpen?`: boolean - 초기 열림 상태 (기본값: false)

#### `Modal.Close`

모달을 닫는 요소입니다.

- `children`이 없으면 기본 닫기 버튼을 렌더링합니다
- `children`이 있으면 해당 요소에 클릭 이벤트를 추가하여 모달을 닫습니다

**Props:**

- `className?`: string - 추가 CSS 클래스
- `children?`: ReactElement - 커스텀 닫기 요소

### useAlertModal 훅

함수형 모달을 위한 훅입니다.

```tsx
const { alert } = useAlertModal()
```

// 간단한 사용법
alert('메시지')

// 상세한 옵션
alert({
title?: string
message: string
confirmText?: string
cancelText?: string
showCancel?: boolean
onConfirm?: () => void
onCancel?: () => void
})

```

### 추가 Exports

#### `useModal`

모달 컨텍스트에 접근할 수 있는 훅입니다.

#### `renderToBody`

컴포넌트를 document.body에 렌더링하는 유틸리티 함수입니다.

#### `AlertOptions` (타입)

useAlertModal에서 사용하는 옵션 타입입니다.

## 타입 지원

이 라이브러리는 TypeScript로 작성되었으며 완전한 타입 지원을 제공합니다. 모든 컴포넌트와 훅에 대한 타입 정의가 포함되어 있어 개발 시 자동완성과 타입 체크를 받을 수 있습니다.

## 기여하기

이슈나 풀 리퀘스트는 [GitHub 저장소](https://github.com/shlee9999/react-useful-kit)에서 환영합니다.

## 라이센스

MIT © [shlee9999](https://github.com/shlee9999)
```
