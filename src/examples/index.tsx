import { AlertProvider } from '@/context/AlertProvider'
import ErrorBoundary from '@/examples/ErrorBoundary'
import { useState } from 'react'
import ContextBreakExample from './ContextBreakExample'
import CorrectUsage from './CorrectUsage'
import IncorrectUsage from './IncorrectUsage'
import MultipleProviderUsage from './MultipleProviderUsage'

type ExampleType = 'correct' | 'incorrect' | 'multiple' | 'context-break'

const ExampleSelector = () => {
  const [selectedExample, setSelectedExample] = useState<ExampleType>('correct')

  const examples = [
    { id: 'correct' as const, title: '✅ 올바른 사용법', description: 'AlertProvider를 올바르게 사용하는 방법' },
    {
      id: 'incorrect' as const,
      title: '❌ 잘못된 사용법',
      description: 'AlertProvider 없이 사용해서 에러가 발생하는 경우',
    },
    { id: 'multiple' as const, title: '🔄 다중 Provider', description: '여러 개의 AlertProvider를 사용하는 방법' },
    { id: 'context-break' as const, title: '🚨 컨텍스트 끊김', description: '컨텍스트가 끊어지는 다양한 시나리오' },
  ]

  const renderExample = () => {
    switch (selectedExample) {
      case 'correct':
        return (
          <AlertProvider id='examples-main-container'>
            <CorrectUsage />
          </AlertProvider>
        )
      case 'incorrect':
        // 잘못된 사용법은 AlertProvider 외부에서 렌더링
        return (
          <ErrorBoundary>
            <IncorrectUsage />
          </ErrorBoundary>
        )
      case 'multiple':
        return <MultipleProviderUsage />
      case 'context-break':
        return <ContextBreakExample />
      default:
        return <CorrectUsage />
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1>AlertProvider 사용 예시</h1>
        <p>
          AlertProvider의 다양한 사용법과 주의사항을 확인해보세요. 각 예시를 클릭하면 해당 시나리오를 볼 수 있습니다.
        </p>
      </div>

      {/* 예시 선택 버튼들 */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          borderBottom: '2px solid #eee',
          paddingBottom: '20px',
        }}
      >
        {examples.map(example => (
          <button
            key={example.id}
            onClick={() => setSelectedExample(example.id)}
            style={{
              padding: '12px 20px',
              border: selectedExample === example.id ? '2px solid #2196f3' : '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedExample === example.id ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              minWidth: '200px',
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{example.title}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{example.description}</div>
          </button>
        ))}
      </div>

      {/* 선택된 예시 렌더링 */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
        }}
      >
        {renderExample()}
      </div>

      {/* 전체적인 사용 가이드 */}
      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          borderLeft: '4px solid #2196f3',
        }}
      >
        <h3>📚 AlertProvider 사용 가이드</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h4>✅ 올바른 사용법</h4>
            <ul>
              <li>main.tsx에서 App을 AlertProvider로 감싸기</li>
              <li>여러 AlertProvider 사용 시 고유 ID 지정</li>
              <li>useAlertModal은 AlertProvider 내부에서만 사용</li>
            </ul>
          </div>
          <div>
            <h4>❌ 피해야 할 것</h4>
            <ul>
              <li>AlertProvider 없이 useAlertModal 사용</li>
              <li>AlertProvider 외부에서 useAlertModal 호출</li>
              <li>잘못된 Context 계층 구조</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// 전체 예시를 감싸는 Provider (기본 AlertProvider)
export const AlertProviderExamples = () => {
  return <ExampleSelector />
}

export default AlertProviderExamples
