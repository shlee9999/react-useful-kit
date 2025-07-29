import { useModal } from '@/context/ModalContext'
import { deepEqual } from '@/utils/deepEqual'
import { omit, pick } from '@/utils/objectUtils'
import './styles/test-page.css'

function App() {
  return (
    <div className='test-page'>
      <div className='test-container'>
        <div className='test-header'>
          <h1 className='test-title'>React Useful Kit 테스트</h1>
          <p className='test-subtitle'>유용한 React 유틸리티들을 테스트해보세요</p>
        </div>

        <div className='test-sections'>
          {/* Modal & Alert 테스트 섹션 */}
          <div className='test-section'>
            <h2 className='section-title'>
              <div className='section-icon'></div>
              모달 & 알럴트 테스트
            </h2>
            <div className='button-grid'>
              <button className='test-button' onClick={() => alert('Hello')}>
                기본 알럴트
                <span className='test-button-description'>간단한 메시지 알럴트</span>
              </button>

              <button
                className='test-button'
                onClick={() =>
                  alert({
                    content: <Content />,
                    onClose: () => console.log('close 누름'),
                  })
                }
              >
                커스텀 콘텐츠 알럴트
                <span className='test-button-description'>React 컴포넌트가 포함된 알럴트</span>
              </button>

              <button className='test-button' onClick={() => alert('window.alert가 커스텀 모달로 대체되었습니다!')}>
                window.alert 테스트
                <span className='test-button-description'>브라우저 기본 alert 대신 커스텀 모달</span>
              </button>
            </div>
          </div>

          {/* Object Utils 테스트 섹션 */}
          <div className='test-section'>
            <h2 className='section-title'>
              <div className='section-icon'></div>
              객체 유틸리티 테스트
            </h2>
            <div className='button-grid'>
              <button
                className='test-button'
                onClick={() => alert(JSON.stringify(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])))}
              >
                pick 함수 테스트
                <span className='test-button-description'>객체에서 특정 키만 선택: {`{a: 1, b: 2}`}</span>
              </button>

              <button
                className='test-button'
                onClick={() => alert(JSON.stringify(omit({ a: 1, b: 2, c: 3 }, ['a', 'b'])))}
              >
                omit 함수 테스트
                <span className='test-button-description'>객체에서 특정 키 제외: {`{c: 3}`}</span>
              </button>
            </div>
          </div>

          {/* Deep Equal 테스트 섹션 */}
          <div className='test-section'>
            <h2 className='section-title'>
              <div className='section-icon'></div>
              깊은 비교(Deep Equal) 테스트
            </h2>
            <div className='button-grid'>
              <button
                className='test-button'
                onClick={() =>
                  alert(JSON.stringify(deepEqual({ a: 1, b: 2, c: { d: 3 } }, { a: 1, b: 2, c: { d: 3 } })))
                }
              >
                동일한 객체 비교
                <span className='test-button-description'>결과: true (완전히 같은 객체)</span>
              </button>

              <button
                className='test-button'
                onClick={() =>
                  alert(JSON.stringify(deepEqual({ a: 1, b: 2, c: { d: 3 } }, { a: 1, b: 2, c: { d: 4 } })))
                }
              >
                다른 값 비교
                <span className='test-button-description'>결과: false (d 값이 다름)</span>
              </button>

              <button
                className='test-button'
                onClick={() =>
                  alert(JSON.stringify(deepEqual({ a: 1, b: 2, c: { d: [] } }, { a: 1, b: 2, c: { d: [] } })))
                }
              >
                배열 포함 객체 비교
                <span className='test-button-description'>결과: true (빈 배열도 같음)</span>
              </button>

              <button
                className='test-button'
                onClick={() =>
                  alert(JSON.stringify(deepEqual({ a: 1, b: 2, c: { d: [] } }, { a: 1, b: 2, c: { d: 3 } })))
                }
              >
                타입 다른 값 비교
                <span className='test-button-description'>결과: false (배열 vs 숫자)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

const Content = () => {
  const { closeModal } = useModal()
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>안녕하세요!</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>이것은 커스텀 모달 콘텐츠입니다.</p>
      <button
        onClick={closeModal}
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        모달 닫기
      </button>
    </div>
  )
}
