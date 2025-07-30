import React from 'react'
import { AlertProvider } from '@/context/AlertProvider'
import { useAlertModal } from '@/hooks/useAlertModal'

// 첫 번째 영역의 컴포넌트
const FirstAreaComponent = () => {
  const alert = useAlertModal()

  const handleAlert = () => {
    alert({
      title: '첫 번째 영역',
      message: '이 알럴트는 "first-area-container"에서 표시됩니다.',
      showCancel: false,
    })
  }

  return (
    <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', margin: '10px 0' }}>
      <h4>첫 번째 AlertProvider 영역</h4>
      <p>ID: "first-area-container"</p>
      <button onClick={handleAlert}>첫 번째 영역 알럴트</button>
    </div>
  )
}

// 두 번째 영역의 컴포넌트
const SecondAreaComponent = () => {
  const alert = useAlertModal()

  const handleAlert = () => {
    alert({
      title: '두 번째 영역',
      message: '이 알럴트는 "second-area-container"에서 표시됩니다.',
      showCancel: false,
    })
  }

  return (
    <div style={{ padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '8px', margin: '10px 0' }}>
      <h4>두 번째 AlertProvider 영역</h4>
      <p>ID: "second-area-container"</p>
      <button onClick={handleAlert}>두 번째 영역 알럴트</button>
    </div>
  )
}

// 다중 AlertProvider 사용 예시
export const MultipleProviderUsage = () => {
  return (
    <div>
      <h2>다중 AlertProvider 사용 예시</h2>
      <p>
        각각 다른 ID를 가진 여러 개의 AlertProvider를 사용할 수 있습니다.
        <br />각 영역의 알럴트는 해당 영역의 컨테이너에서만 표시됩니다.
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 첫 번째 AlertProvider 영역 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <AlertProvider id='first-area-container'>
            <FirstAreaComponent />
          </AlertProvider>
        </div>

        {/* 두 번째 AlertProvider 영역 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <AlertProvider id='second-area-container'>
            <SecondAreaComponent />
          </AlertProvider>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
        <h4>💡 팁</h4>
        <ul>
          <li>각 AlertProvider는 독립적인 모달 컨테이너를 가집니다</li>
          <li>서로 다른 AlertProvider 영역의 알럴트는 서로 간섭하지 않습니다</li>
          <li>특정 Context를 공유하고 싶을 때 해당 Context 내부에 AlertProvider를 배치하세요</li>
        </ul>
      </div>
    </div>
  )
}

export default MultipleProviderUsage
