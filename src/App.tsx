import { useState } from 'react'
import ExampleCard from '@/components/ExampleCard'
import examples from './examples'
import './styles/app.css'

type TabType = 'overview' | keyof typeof examples

const tabs = [
  { id: 'overview', label: '🏠 개요', component: null },
  ...Object.entries(examples).map(([key, example]) => ({
    id: key,
    label: `${example.title}`,
    component: example.component,
  })),
] as const

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const renderActiveComponent = () => {
    if (activeTab === 'overview') return null

    const example = examples[activeTab]
    return example?.component ? <example.component /> : null
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
              {Object.entries(examples).map(([key, example]) => (
                <ExampleCard
                  key={key}
                  title={example.title}
                  description={example.description}
                  buttonText={example.buttonText}
                  onClick={() => setActiveTab(key as TabType)}
                />
              ))}
            </div>

            <div className='ruk-install-section'>
              <h3>📦 설치 방법</h3>
              <code className='ruk-install-code'>npm install react-useful-kit</code>
            </div>
          </div>
        )}
        <div className='ruk-example-container'>{renderActiveComponent()}</div>
      </main>

      {/* Footer */}
      <footer className='ruk-footer'>
        <p>Made with ❤️ for React developers</p>
      </footer>
    </div>
  )
}

export default App
