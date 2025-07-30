import React, { createContext, useContext } from 'react'
import { AlertProvider } from '@/context/AlertProvider'
import { useAlertModal } from '@/hooks/useAlertModal'

// 커스텀 Context 생성
const CustomContext = createContext<{ value: string } | null>(null)

// AlertProvider 내부의 컴포넌트 (정상 작동)
const InsideAlertProvider = () => {
  const alert = useAlertModal()
  const customContext = useContext(CustomContext)

  const handleAlert = () => {
    alert(`커스텀 Context 값: ${customContext?.value || '없음'}`)
  }

  return (
    <div style={{ padding: '15px', border: '2px solid green', borderRadius: '8px', margin: '10px' }}>
      <h4 style={{ color: 'green' }}>✓ AlertProvider 내부</h4>
      <p>이 컴포넌트는 AlertProvider와 CustomContext 모두에 접근할 수 있습니다.</p>
      <p>
        커스텀 Context 값: <strong>{customContext?.value || '없음'}</strong>
      </p>
      <button onClick={handleAlert}>알럴트 표시</button>
    </div>
  )
}

// AlertProvider 외부의 컴포넌트 (에러 발생)
const OutsideAlertProvider = () => {
  const customContext = useContext(CustomContext)

  const handleAlert = () => {
    window.alert(`
      에러: AlertProvider를 찾을 수 없습니다!
      
      이 컴포넌트는 AlertProvider 외부에 있어서 useAlertModal을 사용할 수 없습니다.
      실제로는 다음과 같은 에러가 발생합니다:
      
      "Cannot read properties of undefined (reading 'alert')"
      또는
      "useContext must be used within a Provider"
    `)
  }

  return (
    <div style={{ padding: '15px', border: '2px solid red', borderRadius: '8px', margin: '10px' }}>
      <h4 style={{ color: 'red' }}>✗ AlertProvider 외부</h4>
      <p>이 컴포넌트는 CustomContext에는 접근할 수 있지만 AlertProvider에는 접근할 수 없습니다.</p>
      <p>
        커스텀 Context 값: <strong>{customContext?.value || '없음'}</strong>
      </p>
      <p style={{ color: 'red', fontSize: '14px' }}>⚠️ useAlertModal을 사용하면 런타임 에러가 발생합니다</p>
      <button onClick={handleAlert}>알럴트 표시 시도 (에러 발생)</button>
    </div>
  )
}

// 잘못된 Context 배치 예시
const WrongContextOrder = () => {
  return (
    <div>
      <h3>❌ 잘못된 Context 배치</h3>
      <p style={{ color: 'red' }}>
        CustomContext 내부에 AlertProvider가 있지만, CustomContext 외부에 있는 컴포넌트는 AlertProvider에 접근할 수
        없습니다.
      </p>

      <CustomContext.Provider value={{ value: '커스텀 값' }}>
        <AlertProvider id='wrong-order-container'>
          <InsideAlertProvider />
        </AlertProvider>
        {/* 이 컴포넌트는 CustomContext에는 접근 가능하지만 AlertProvider에는 접근 불가 */}
        <OutsideAlertProvider />
      </CustomContext.Provider>
    </div>
  )
}

// 올바른 Context 배치 예시
const CorrectContextOrder = () => {
  return (
    <div>
      <h3>✅ 올바른 Context 배치</h3>
      <p style={{ color: 'green' }}>
        AlertProvider가 CustomContext보다 상위에 있어서 모든 하위 컴포넌트가 두 Context 모두에 접근할 수 있습니다.
      </p>

      <AlertProvider id='correct-order-container'>
        <CustomContext.Provider value={{ value: '커스텀 값' }}>
          <InsideAlertProvider />
          {/* 이제 이 컴포넌트도 AlertProvider에 접근 가능 */}
          <InsideAlertProviderToo />
        </CustomContext.Provider>
      </AlertProvider>
    </div>
  )
}

// AlertProvider에 접근 가능한 추가 컴포넌트
const InsideAlertProviderToo = () => {
  const alert = useAlertModal()
  const customContext = useContext(CustomContext)

  const handleAlert = () => {
    alert({
      title: '성공!',
      message: `올바른 Context 배치로 두 Context 모두 사용 가능합니다.\n커스텀 값: ${customContext?.value}`,
      showCancel: false,
    })
  }

  return (
    <div style={{ padding: '15px', border: '2px solid blue', borderRadius: '8px', margin: '10px' }}>
      <h4 style={{ color: 'blue' }}>✓ 올바른 배치에서의 컴포넌트</h4>
      <p>이 컴포넌트도 두 Context 모두에 접근할 수 있습니다.</p>
      <p>
        커스텀 Context 값: <strong>{customContext?.value || '없음'}</strong>
      </p>
      <button onClick={handleAlert}>알럴트 표시</button>
    </div>
  )
}

export const ContextBreakExample = () => {
  return (
    <div>
      <h2>컨텍스트가 끊어지는 경우의 예시</h2>
      <p>AlertProvider의 위치에 따라 하위 컴포넌트들이 useAlertModal에 접근할 수 있는지가 결정됩니다.</p>

      <div style={{ marginBottom: '30px' }}>
        <WrongContextOrder />
      </div>

      <div>
        <CorrectContextOrder />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px' }}>
        <h4>🚨 주의사항</h4>
        <ul>
          <li>
            <strong>AlertProvider는 useAlertModal을 사용하는 모든 컴포넌트보다 상위에 있어야 합니다</strong>
          </li>
          <li>다른 Context와 함께 사용할 때는 Context의 계층 구조를 신중히 고려하세요</li>
          <li>특정 Context 내에서만 Alert를 사용하려면 해당 Context 내부에 AlertProvider를 배치하세요</li>
          <li>전역적으로 Alert를 사용하려면 최상위(main.tsx)에 AlertProvider를 배치하세요</li>
        </ul>
      </div>
    </div>
  )
}

export default ContextBreakExample
