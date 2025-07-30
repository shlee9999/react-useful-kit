import React from 'react'
import { useAlertModal } from '@/hooks/useAlertModal'

// 잘못된 사용법: AlertProvider 없이 useAlertModal 사용
const ProblematicComponent = () => {
  const alert = useAlertModal()

  const handleShowAlert = () => {
    try {
      alert('이 알럴트는 작동하지 않습니다!')
    } catch (error) {
      console.error('에러 발생:', error)
      window.alert('에러가 발생했습니다! 콘솔을 확인하세요.')
    }
  }

  return (
    <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
      <h3 style={{ color: 'red' }}>✗ 잘못된 사용법</h3>
      <p style={{ color: 'red' }}>
        이 컴포넌트는 AlertProvider 없이 useAlertModal을 사용하려고 합니다.
        <br />
        브라우저 콘솔에서 에러를 확인할 수 있습니다.
      </p>
      <button onClick={handleShowAlert}>알럴트 표시 시도 (에러 발생)</button>
    </div>
  )
}

// 잘못된 사용법 예시 - AlertProvider 없음
export const IncorrectUsage = () => {
  return (
    <div>
      <h2>잘못된 사용법 예시</h2>
      <p style={{ color: 'orange', fontWeight: 'bold' }}>
        ⚠️ 아래 컴포넌트는 AlertProvider로 감싸지지 않아서 에러가 발생합니다
      </p>
      {/* AlertProvider 없이 직접 사용 */}
      <ProblematicComponent />
    </div>
  )
}

export default IncorrectUsage
