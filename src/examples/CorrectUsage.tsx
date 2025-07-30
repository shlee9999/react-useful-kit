import React from 'react'
import { AlertProvider } from '@/context/AlertProvider'
import { useAlertModal } from '@/hooks/useAlertModal'

// 올바른 사용법: AlertProvider로 감싸진 컴포넌트에서 useAlertModal 사용
const ChildComponent = () => {
  const alert = useAlertModal()

  const handleShowAlert = () => {
    alert('AlertProvider가 올바르게 설정되어 작동합니다!')
  }

  const handleShowCustomAlert = () => {
    alert({
      title: '성공!',
      message: '컨텍스트가 정상적으로 연결되었습니다.',
      showCancel: false,
      onConfirm: () => console.log('확인 버튼 클릭됨'),
    })
  }

  return (
    <div style={{ padding: '20px', border: '2px solid green', borderRadius: '8px' }}>
      <h3 style={{ color: 'green' }}>✓ 올바른 사용법</h3>
      <p>이 컴포넌트는 AlertProvider 내부에 있어서 useAlertModal이 정상 작동합니다.</p>
      <button onClick={handleShowAlert} style={{ marginRight: '10px' }}>
        간단한 알럴트 표시
      </button>
      <button onClick={handleShowCustomAlert}>커스텀 알럴트 표시</button>
    </div>
  )
}

// 올바른 사용법 예시
export const CorrectUsage = () => {
  return (
    <div>
      <h2>올바른 사용법 예시</h2>
      <AlertProvider id='correct-example-container'>
        <ChildComponent />
      </AlertProvider>
    </div>
  )
}

export default CorrectUsage
