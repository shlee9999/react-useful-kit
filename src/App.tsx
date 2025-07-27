import { useState } from 'react'
import DeepEffectExample from './examples/DeepEffectExample'
import AlertModalExample from './examples/AlertModalExample'

type TabType = 'overview' | 'deep-effect' | 'alert-modal'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs = [
    { id: 'overview', label: '🏠 개요', component: null },
    { id: 'deep-effect', label: '🔄 useDeepEffect', component: <DeepEffectExample /> },
    { id: 'alert-modal', label: '🔔 useAlertModal', component: <AlertModalExample /> },
  ] as const

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>React Useful Kit</h1>
        <p style={{ margin: '10px 0 0', fontSize: '1.1rem', opacity: 0.9 }}>React용 유용한 훅과 컴포넌트 모음집</p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          backgroundColor: '#34495e',
          padding: '0',
          borderBottom: '2px solid #2c3e50',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              style={{
                background: activeTab === tab.id ? '#3498db' : 'transparent',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#2980b9'
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {activeTab === 'overview' && (
          <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '20px' }}>🚀 환영합니다!</h2>
              <p style={{ fontSize: '1.2rem', color: '#7f8c8d', lineHeight: 1.6 }}>
                React 개발을 더욱 편리하게 만들어주는 유용한 도구들을 모았습니다.
                <br />각 탭을 클릭하여 실제 동작을 확인해보세요!
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                marginTop: '40px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ecf0f1',
                  padding: '25px',
                  borderRadius: '10px',
                  border: '2px solid #bdc3c7',
                }}
              >
                <h3 style={{ color: '#2c3e50', marginTop: 0 }}>🔄 useDeepEffect</h3>
                <p style={{ color: '#7f8c8d', lineHeight: 1.5 }}>
                  객체나 배열의 깊은 비교를 수행하는 useEffect입니다. 참조가 바뀌어도 실제 값이 같으면 실행되지
                  않습니다.
                </p>
                <button
                  onClick={() => setActiveTab('deep-effect')}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  예제 보기 →
                </button>
              </div>

              <div
                style={{
                  backgroundColor: '#ecf0f1',
                  padding: '25px',
                  borderRadius: '10px',
                  border: '2px solid #bdc3c7',
                }}
              >
                <h3 style={{ color: '#2c3e50', marginTop: 0 }}>🔔 useAlertModal</h3>
                <p style={{ color: '#7f8c8d', lineHeight: 1.5 }}>
                  함수 호출만으로 간편하게 모달을 띄울 수 있는 훅입니다. 상태 관리 없이 alert, confirm 스타일의 모달을
                  사용할 수 있습니다.
                </p>
                <button
                  onClick={() => setActiveTab('alert-modal')}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  예제 보기 →
                </button>
              </div>
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: '50px',
                padding: '30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
              }}
            >
              <h3 style={{ color: '#2c3e50' }}>📦 설치 방법</h3>
              <code
                style={{
                  backgroundColor: '#2c3e50',
                  color: '#ecf0f1',
                  padding: '15px 25px',
                  borderRadius: '5px',
                  fontSize: '1.1rem',
                  display: 'inline-block',
                }}
              >
                npm install react-useful-kit
              </code>
            </div>
          </div>
        )}

        {activeTab === 'deep-effect' && <div>{tabs.find(tab => tab.id === 'deep-effect')?.component}</div>}

        {activeTab === 'alert-modal' && <div>{tabs.find(tab => tab.id === 'alert-modal')?.component}</div>}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <p style={{ margin: 0, opacity: 0.8 }}>Made with ❤️ for React developers</p>
      </footer>
    </div>
  )
}

export default App
