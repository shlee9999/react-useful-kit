import '@/styles/test-page.css'
import AlertProviderExamples from './examples/index'

/**
 * AlertProvider 예시들을 보여주는 별도의 App 컴포넌트
 * 기존 App.tsx와 별도로 AlertProvider 사용법을 확인할 수 있습니다.
 */
function ExamplesApp() {
  return (
    <div className='test-page'>
      <AlertProviderExamples />
    </div>
  )
}

export default ExamplesApp
