# React Useful Kit

유용한 React 컴포넌트와 훅들을 모아놓은 라이브러리입니다.

## 설치

```bash
npm install react-useful-kit
# 또는
yarn add react-useful-kit
# 또는
pnpm add react-useful-kit
```

## 사용법

### Modal 컴포넌트

```tsx
import React, { useState } from 'react'
import { Modal } from 'react-useful-kit'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>모달 내용입니다!</p>
      </Modal>
    </div>
  )
}
```

### Alert Modal 훅

```tsx
import React from 'react'
import { useAlertModal } from 'react-useful-kit'

function App() {
  const { showAlert } = useAlertModal()

  const handleClick = () => {
    showAlert({
      title: '확인',
      message: '정말로 삭제하시겠습니까?',
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
      <button onClick={handleClick}>Alert 표시</button>
    </div>
  )
}
```

## CSS 스타일

라이브러리의 CSS는 자동으로 포함됩니다. 별도의 CSS import는 필요하지 않습니다.

만약 CSS를 수동으로 import하고 싶다면:

```css
@import 'react-useful-kit/dist/react-useful-kit.css';
```

또는 JavaScript/TypeScript에서:

```tsx
import 'react-useful-kit/dist/react-useful-kit.css'
```

## 컴포넌트 목록

- **Modal**: 범용 모달 컴포넌트
- **useAlertModal**: 확인/취소 모달을 위한 훅

## 타입 지원

이 라이브러리는 TypeScript로 작성되었으며 완전한 타입 지원을 제공합니다.

## 라이센스

MIT
