import { useState } from 'react'
import * as examples from './examples'
import './styles/app.css'

type TabType = 'overview' | keyof typeof examples

const tabs = [
  { id: 'overview', label: '🏠 개요', component: null },
  ...Object.entries(examples).map(([key, component]) => ({
    id: key,
    label: `🚪 ${key.slice(0, -7)}`,
    component,
  })),
] as const

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const renderActiveComponent = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab)
    return currentTab?.component ? <currentTab.component /> : null
  }

  return (
    <div className='ruk-app'>
      {/* Header */}
      <header className='ruk-header'>
        <h1>React Useful Kit</h1>
        <p>React용 유용한 훅과 컴포넌트 모음집</p>
      </header>

      {/* Navigation */}
      <nav className='ruk-nav'>
        <div className='ruk-nav-container'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`ruk-nav-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className='ruk-main'>
        {activeTab === 'overview' && (
          <div className='ruk-overview'>
            <div className='ruk-overview-header'>
              <h2 className='ruk-overview-title'>
                <span className='ruk-overview-title-icon'>🚀</span> 환영합니다!
              </h2>
              <p className='ruk-overview-description'>
                React 개발을 더욱 편리하게 만들어주는 유용한 도구들을 모았습니다.
                <br />각 탭을 클릭하여 실제 동작을 확인해보세요!
              </p>
            </div>

            <div className='ruk-cards'>
              <div className='ruk-card'>
                <h3>🚪 Modal</h3>
                <p>
                  합성 컴포넌트 패턴으로 구현된 유연한 모달 컴포넌트입니다. 직관적인 API로 쉽게 모달을 구현할 수
                  있습니다.
                </p>
                <button onClick={() => setActiveTab('ModalExample')} className='ruk-card-button primary'>
                  예제 보기 →
                </button>
              </div>

              <div className='ruk-card'>
                <h3>🔄 useDeepEffect</h3>
                <p>
                  객체나 배열의 깊은 비교를 수행하는 useEffect입니다. 참조가 바뀌어도 실제 값이 같으면 실행되지
                  않습니다.
                </p>
                <button onClick={() => setActiveTab('DeepEffectExample')} className='ruk-card-button secondary'>
                  예제 보기 →
                </button>
              </div>

              <div className='ruk-card'>
                <h3>⚡ Deep Hooks</h3>
                <p>useDeepMemo와 useDeepCallback을 체험해보세요. 일반 훅과의 차이점을 실시간으로 비교할 수 있습니다.</p>
                <button onClick={() => setActiveTab('DeepHooksExample')} className='ruk-card-button secondary'>
                  예제 보기 →
                </button>
              </div>

              <div className='ruk-card'>
                <h3>🔔 useAlertModal</h3>
                <p>
                  함수 호출만으로 간편하게 모달을 띄울 수 있는 훅입니다. 상태 관리 없이 alert, confirm 스타일의 모달을
                  사용할 수 있습니다.
                </p>
                <button onClick={() => setActiveTab('AlertModalExample')} className='ruk-card-button danger'>
                  예제 보기 →
                </button>
              </div>
            </div>

            <div className='ruk-install-section'>
              <h3>📦 설치 방법</h3>
              <code className='ruk-install-code'>npm install react-useful-kit</code>
            </div>
          </div>
        )}
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className='ruk-footer'>
        <p>Made with ❤️ for React developers</p>
      </footer>
    </div>
  )
}

export default App
