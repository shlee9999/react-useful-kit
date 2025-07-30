import App from '@/App'
import ExamplesApp from '@/ExamplesApp'
import { AlertProvider } from '@/context/AlertProvider'
import '@/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// AlertProvider 예시를 보려면 아래 주석을 바꿔주세요
const showExamples = true // true: 예시 앱, false: 기본 앱

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showExamples ? (
      // AlertProvider 예시들 (자체적으로 AlertProvider 포함)
      <ExamplesApp />
    ) : (
      // 기본 앱 (AlertProvider로 감싸서 사용)
      <AlertProvider>
        <App />
      </AlertProvider>
    )}
  </StrictMode>
)
