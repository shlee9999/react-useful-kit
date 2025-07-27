import { useState } from 'react'
import Modal from '@/layouts/Modal'

function ModalExample() {
  const [count, setCount] = useState(0)

  return (
    <div className='ruk-example'>
      <div className='ruk-example-header'>
        <h2>🚪 Modal 컴포넌트</h2>
        <p>합성 컴포넌트 패턴으로 구현된 유연한 모달 컴포넌트입니다.</p>
      </div>

      <div className='ruk-example-section'>
        <h3>✨ 특징</h3>
        <ul>
          <li>합성 컴포넌트 패턴으로 직관적인 API 제공</li>
          <li>기존 onClick 이벤트와 자연스럽게 통합</li>
          <li>Portal을 사용한 body 레벨 렌더링</li>
          <li>CSS 클래스를 통한 완전한 커스터마이징 지원</li>
        </ul>
      </div>

      <div className='ruk-cards'>
        {/* 기본 모달 */}
        <div className='ruk-card'>
          <h3>기본 모달</h3>
          <p>가장 간단한 형태의 모달입니다.</p>
          <Modal>
            <Modal.Trigger>
              <button className='ruk-card-button primary'>기본 모달 열기</button>
            </Modal.Trigger>
            <Modal.Content>
              <h2>안녕하세요! 👋</h2>
              <p>이것은 React Useful Kit의 Modal 컴포넌트입니다.</p>
              <Modal.Close />
            </Modal.Content>
          </Modal>
        </div>

        {/* 커스텀 닫기 버튼 */}
        <div className='ruk-card'>
          <h3>커스텀 닫기</h3>
          <p>커스텀 닫기 버튼을 사용한 모달입니다.</p>
          <Modal>
            <Modal.Trigger>
              <button className='ruk-card-button secondary'>커스텀 모달 열기</button>
            </Modal.Trigger>
            <Modal.Content>
              <h2>커스텀 모달 🎨</h2>
              <p>닫기 버튼을 커스터마이징할 수 있습니다.</p>
              <div style={{ marginTop: '20px' }}>
                <Modal.Close>
                  <button
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    완료
                  </button>
                </Modal.Close>
              </div>
            </Modal.Content>
          </Modal>
        </div>

        {/* 기존 이벤트와 통합 */}
        <div className='ruk-card'>
          <h3>이벤트 통합</h3>
          <p>기존 onClick 이벤트와 자연스럽게 통합됩니다.</p>
          <Modal>
            <Modal.Trigger>
              <button
                className='ruk-card-button danger'
                onClick={() => {
                  setCount(prev => prev + 1)
                  console.log('카운터 증가!')
                }}
              >
                카운터 증가 & 모달 열기
              </button>
            </Modal.Trigger>
            <Modal.Content>
              <h2>카운터 모달 📊</h2>
              <p>
                현재 카운터: <strong>{count}</strong>
              </p>
              <p>버튼을 클릭하면 카운터가 증가하고 모달이 열립니다.</p>
              <div style={{ marginTop: '20px' }}>
                <Modal.Close>
                  <button
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px',
                    }}
                  >
                    확인
                  </button>
                </Modal.Close>
                <button
                  onClick={() => setCount(0)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  리셋
                </button>
              </div>
            </Modal.Content>
          </Modal>
        </div>

        {/* 오버레이 없는 모달 */}
        <div className='ruk-card'>
          <h3>오버레이 없음</h3>
          <p>배경 오버레이 없이 모달만 표시합니다.</p>
          <Modal>
            <Modal.Trigger>
              <button className='ruk-card-button' style={{ backgroundColor: '#17a2b8', color: 'white' }}>
                오버레이 없는 모달
              </button>
            </Modal.Trigger>
            <Modal.Content overlay={false}>
              <div
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #17a2b8',
                  borderRadius: '8px',
                  padding: '20px',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <h2>오버레이 없는 모달 🎯</h2>
                <p>배경이 어둡지 않습니다!</p>
                <Modal.Close />
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </div>

      <div className='ruk-example-section'>
        <h3>📋 사용 방법</h3>
        <pre className='ruk-code-block'>
          {`import { Modal } from 'react-useful-kit'

function App() {
  return (
    <Modal>
      <Modal.Trigger>
        <button>모달 열기</button>
      </Modal.Trigger>
      <Modal.Content>
        <h2>모달 제목</h2>
        <p>모달 내용입니다!</p>
        <Modal.Close />
      </Modal.Content>
    </Modal>
  )
}`}
        </pre>
      </div>

      <div className='ruk-example-section'>
        <h3>🎨 CSS 커스터마이징</h3>
        <pre className='ruk-code-block'>
          {`.react-useful-kit-modal-overlay {
  /* 오버레이 스타일 */
}
.react-useful-kit-modal-content {
  /* 모달 콘텐츠 스타일 */
}
.react-useful-kit-modal-close {
  /* 닫기 버튼 스타일 */
}`}
        </pre>
      </div>
    </div>
  )
}

export default ModalExample
