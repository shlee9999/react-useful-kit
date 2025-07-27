import { useState } from 'react'
import useDeepEffect from '@/hooks/useDeepEffect'

interface User {
  name: string
  age: number
  preferences: {
    theme: string
    language: string
  }
}

/**
 * useDeepEffect 훅의 사용 예제를 보여주는 컴포넌트입니다.
 */
export default function DeepEffectExample() {
  const [user, setUser] = useState<User>({
    name: 'John',
    age: 30,
    preferences: {
      theme: 'dark',
      language: 'ko',
    },
  })

  const [items, setItems] = useState([1, 2, 3])
  const [log, setLog] = useState<string[]>([])

  // 일반 useEffect 비교용 - 참조가 바뀔 때마다 실행됨
  // useEffect(() => {
  //   console.log('일반 useEffect - user 객체 참조 변경:', user)
  // }, [user])

  // useDeepEffect - 실제 값이 변경될 때만 실행됨
  useDeepEffect(() => {
    const message = `사용자 정보 변경: ${user.name}, ${user.age}세, 테마: ${user.preferences.theme}`
    console.log(message)
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`])
  }, [user])

  // 배열에 대한 깊은 비교
  useDeepEffect(() => {
    const message = `아이템 목록 변경: [${items.join(', ')}]`
    console.log(message)
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`])
  }, [items])

  const updateUserReference = () => {
    // 같은 값으로 새 객체 생성 (참조만 변경, 값은 동일)
    setUser({ ...user })
  }

  const updateUserValue = () => {
    // 실제 값 변경
    setUser(prev => ({
      ...prev,
      age: prev.age + 1,
    }))
  }

  const updateItemsReference = () => {
    // 같은 값으로 새 배열 생성 (참조만 변경, 값은 동일)
    setItems([...items])
  }

  const updateItemsValue = () => {
    // 실제 값 변경
    setItems(prev => [...prev, prev.length + 1])
  }

  const clearLog = () => {
    setLog([])
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>useDeepEffect 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>현재 상태:</h3>
        <p>
          <strong>사용자:</strong> {JSON.stringify(user)}
        </p>
        <p>
          <strong>아이템:</strong> [{items.join(', ')}]
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>테스트 버튼:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={updateUserReference} style={{ padding: '8px 12px' }}>
            사용자 참조만 변경 (깊은 비교 → 실행 안됨)
          </button>
          <button onClick={updateUserValue} style={{ padding: '8px 12px' }}>
            사용자 실제 값 변경 (깊은 비교 → 실행됨)
          </button>
          <button onClick={updateItemsReference} style={{ padding: '8px 12px' }}>
            아이템 참조만 변경 (깊은 비교 → 실행 안됨)
          </button>
          <button onClick={updateItemsValue} style={{ padding: '8px 12px' }}>
            아이템 실제 값 변경 (깊은 비교 → 실행됨)
          </button>
          <button onClick={clearLog} style={{ padding: '8px 12px', backgroundColor: '#f44336', color: 'white' }}>
            로그 지우기
          </button>
        </div>
      </div>

      <div>
        <h3>useDeepEffect 실행 로그:</h3>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '4px',
            maxHeight: '300px',
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

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <h4>💡 사용법 안내:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>"참조만 변경" 버튼: 같은 값으로 새 객체/배열을 만듭니다. useDeepEffect는 실행되지 않습니다.</li>
          <li>"실제 값 변경" 버튼: 객체/배열의 실제 내용을 변경합니다. useDeepEffect가 실행됩니다.</li>
          <li>일반 useEffect라면 참조 변경만으로도 실행되지만, useDeepEffect는 실제 값 변경에만 반응합니다.</li>
        </ul>
      </div>
    </div>
  )
}
