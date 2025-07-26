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

## 특징

✅ **CSS 자동 주입**: 별도의 CSS import 없이 바로 사용 가능  
✅ **TypeScript 완전 지원**: 타입 안전성 보장  
✅ **SSR 호환**: Next.js 등 서버사이드 렌더링 환경에서 안전하게 동작  
✅ **경량**: 최소한의 의존성으로 번들 크기 최적화

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

🎉 **CSS가 자동으로 주입됩니다!** 별도의 CSS import는 필요하지 않습니다.

컴포넌트를 사용하면 필요한 스타일이 자동으로 `<head>`에 추가되어 즉시 사용할 수 있습니다.

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
.react-useful-kit-alert-modal-confirm-button {
  /* 확인 버튼 */
}
.react-useful-kit-alert-modal-cancel-button {
  /* 취소 버튼 */
}
```

## API 문서

### Modal 컴포넌트

- `Modal`: 모달 컨텍스트 제공
- `Modal.Trigger`: 모달을 여는 트리거 요소
- `Modal.Content`: 모달 내용 (props: `className?`, `overlay?`, `isDefaultOpen?`)
- `Modal.Close`: 모달을 닫는 요소

### useAlertModal 훅

```tsx
const { alert } = useAlertModal()

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

## 타입 지원

이 라이브러리는 TypeScript로 작성되었으며 완전한 타입 지원을 제공합니다. 모든 컴포넌트와 훅에 대한 타입 정의가 포함되어 있어 개발 시 자동완성과 타입 체크를 받을 수 있습니다.

## 라이센스

MIT
