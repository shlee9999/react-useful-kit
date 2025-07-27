import { useState } from 'react'
import useAlertModal from '@/hooks/useAlertModal'

/**
 * useAlertModal 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function AlertModalExample() {
  const { alert } = useAlertModal()
  const [log, setLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`])
  }

  const handleSimpleAlert = () => {
    alert('간단한 알림 메시지입니다!')
    addLog('간단한 알림 호출')
  }

  const handleConfirmAlert = () => {
    alert({
      title: '확인 필요',
      message: '정말로 이 작업을 수행하시겠습니까?',
      showCancel: true,
      onConfirm: () => addLog('확인 버튼 클릭'),
      onCancel: () => addLog('취소 버튼 클릭'),
    })
  }

  const handleCustomAlert = () => {
    alert({
      title: '사용자 정의 알림',
      message: '버튼 텍스트를 커스터마이징할 수 있습니다.',
      confirmText: '동의합니다',
      cancelText: '거부합니다',
      showCancel: true,
      onConfirm: () => addLog('동의 버튼 클릭'),
      onCancel: () => addLog('거부 버튼 클릭'),
    })
  }

  const handleJSXAlert = () => {
    alert({
      title: 'JSX 지원',
      message: (
        <div>
          <p>
            메시지에 <strong>JSX</strong>를 사용할 수 있습니다!
          </p>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li>리스트 아이템 1</li>
            <li>리스트 아이템 2</li>
          </ul>
        </div>
      ),
      confirmText: '멋지네요!',
      onConfirm: () => addLog('JSX 알림 확인'),
    })
  }

  const clearLog = () => {
    setLog([])
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>useAlertModal 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>테스트 버튼:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={handleSimpleAlert} style={{ padding: '8px 12px' }}>
            간단한 알림
          </button>
          <button onClick={handleConfirmAlert} style={{ padding: '8px 12px' }}>
            확인/취소 알림
          </button>
          <button onClick={handleCustomAlert} style={{ padding: '8px 12px' }}>
            커스텀 버튼 텍스트
          </button>
          <button onClick={handleJSXAlert} style={{ padding: '8px 12px' }}>
            JSX 메시지
          </button>
          <button onClick={clearLog} style={{ padding: '8px 12px', backgroundColor: '#f44336', color: 'white' }}>
            로그 지우기
          </button>
        </div>
      </div>

      <div>
        <h3>이벤트 로그:</h3>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          {log.length === 0 ? (
            <p style={{ color: '#666', margin: 0 }}>아직 로그가 없습니다. 버튼을 클릭해보세요!</p>
          ) : (
            log.map((entry, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                {entry}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        <h4>💡 사용법 안내:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>
            <strong>간단한 사용:</strong> <code>alert('메시지')</code>
          </li>
          <li>
            <strong>옵션 사용:</strong> 제목, 버튼 텍스트, 콜백 함수 등을 커스터마이징
          </li>
          <li>
            <strong>JSX 지원:</strong> 메시지에 React 컴포넌트를 전달 가능
          </li>
          <li>
            <strong>함수형 호출:</strong> 상태 관리 없이 함수만 호출하면 모달 표시
          </li>
        </ul>
      </div>
    </div>
  )
}
