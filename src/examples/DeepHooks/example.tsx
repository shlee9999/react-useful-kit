import { useDeepCallback, useDeepMemo } from '@/index'
import { useCallback, useMemo, useState } from 'react'

interface User {
  name: string
  age: number
  preferences: {
    theme: string
    language: string
  }
}

interface Item {
  id: number
  name: string
  category: string
}

export default function DeepHooksExample() {
  const [user, setUser] = useState<User>({
    name: 'John',
    age: 30,
    preferences: {
      theme: 'dark',
      language: 'ko',
    },
  })

  const [items] = useState<Item[]>([
    { id: 1, name: 'Apple', category: 'fruit' },
    { id: 2, name: 'Banana', category: 'fruit' },
    { id: 3, name: 'Carrot', category: 'vegetable' },
  ])

  const [filters, setFilters] = useState({
    category: 'all',
    price: { min: 0, max: 1000 },
  })

  // 일반 useMemo와 useDeepMemo 비교
  const expensiveValueNormal = useMemo(() => {
    console.log('🔄 일반 useMemo - 복잡한 계산 실행됨')
    return user.name.toUpperCase() + '_' + user.age
  }, [user]) // user 객체 참조가 바뀔 때마다 재계산

  const expensiveValueDeep = useDeepMemo(() => {
    console.log('✅ useDeepMemo - 복잡한 계산 실행됨')
    return user.name.toUpperCase() + '_' + user.age
  }, [user]) // user 객체의 실제 값이 변경될 때만 재계산

  // 일반 useCallback과 useDeepCallback 비교
  const handleSubmitNormal = useCallback(
    (data: string) => {
      console.log('🔄 일반 useCallback - 함수 재생성됨', data, user)
    },
    [user]
  ) // user 객체 참조가 바뀔 때마다 새 함수 생성

  const handleSubmitDeep = useDeepCallback(
    (data: string) => {
      console.log('✅ useDeepCallback - 함수 재생성됨', data, user)
    },
    [user]
  ) // user 객체의 실제 값이 변경될 때만 새 함수 생성

  // 필터링된 아이템들 (useDeepMemo 사용)
  const filteredItems = useDeepMemo(() => {
    console.log('📦 필터링 계산 실행됨')
    if (filters.category === 'all') return items
    return items.filter(item => item.category === filters.category)
  }, [items, filters])

  // 참조만 변경 (값은 동일)
  const changeUserReference = () => {
    setUser({ ...user }) // 같은 값으로 새 객체 생성
  }

  // 실제 값 변경
  const changeUserValue = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }))
  }

  // 필터 참조만 변경
  const changeFiltersReference = () => {
    setFilters({ ...filters }) // 같은 값으로 새 객체 생성
  }

  // 필터 값 변경
  const changeFiltersValue = () => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === 'all' ? 'fruit' : 'all',
    }))
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔄 Deep Hooks 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>👤 사용자 정보</h3>
        <p>이름: {user.name}</p>
        <p>나이: {user.age}</p>
        <p>테마: {user.preferences.theme}</p>
        <p>언어: {user.preferences.language}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>💰 계산된 값들</h3>
        <p>일반 useMemo 결과: {expensiveValueNormal}</p>
        <p>useDeepMemo 결과: {expensiveValueDeep}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📋 필터링된 아이템 ({filteredItems.length}개)</h3>
        <p>현재 필터: {filters.category}</p>
        {filteredItems.map(item => (
          <div key={item.id}>
            {item.name} ({item.category})
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>🎮 테스트 버튼들</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={changeUserReference} style={{ padding: '8px 16px' }}>
            👤 사용자 참조만 변경
          </button>
          <button onClick={changeUserValue} style={{ padding: '8px 16px' }}>
            👤 사용자 나이 +1
          </button>
          <button onClick={changeFiltersReference} style={{ padding: '8px 16px' }}>
            🔍 필터 참조만 변경
          </button>
          <button onClick={changeFiltersValue} style={{ padding: '8px 16px' }}>
            🔍 필터 값 변경
          </button>
          <button onClick={() => handleSubmitNormal('테스트 데이터')} style={{ padding: '8px 16px' }}>
            📤 일반 콜백 실행
          </button>
          <button onClick={() => handleSubmitDeep('테스트 데이터')} style={{ padding: '8px 16px' }}>
            📤 Deep 콜백 실행
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h4>📊 콘솔 로그 확인 방법:</h4>
        <ol>
          <li>브라우저 개발자 도구의 콘솔 탭을 열어주세요</li>
          <li>"사용자 참조만 변경" 버튼을 클릭하면:</li>
          <ul>
            <li>🔄 일반 useMemo는 재계산됩니다 (불필요한 계산)</li>
            <li>✅ useDeepMemo는 재계산되지 않습니다 (효율적)</li>
          </ul>
          <li>"사용자 나이 +1" 버튼을 클릭하면:</li>
          <ul>
            <li>🔄 일반 useMemo와 ✅ useDeepMemo 모두 재계산됩니다 (올바른 동작)</li>
          </ul>
          <li>필터 버튼들도 같은 방식으로 동작합니다</li>
        </ol>
      </div>
    </div>
  )
}
