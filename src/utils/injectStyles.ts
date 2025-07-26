const modalStyles = `
/* Modal Component Styles */
.react-useful-kit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.react-useful-kit-modal-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 28rem;
  width: 100%;
  margin: 0 1rem;
  position: relative;
}
.react-useful-kit-modal-close {
  width: 1.5rem;
  height: 1.5rem;
  color: #f3f4f6;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  cursor: pointer;
  transition: color 0.3s ease;
}
.react-useful-kit-modal-close:hover {
  color: #6b7280;
}

/* Alert Modal Component Styles */
.react-useful-kit-alert-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.react-useful-kit-alert-modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #196ef7;
  margin-bottom: 1rem;
}
.react-useful-kit-alert-modal-message {
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 1rem;
}
.react-useful-kit-alert-modal-button-container {
  display: flex;
  gap: 1rem;
}
.react-useful-kit-alert-modal-confirm-button {
  background-color: #196ef7;
  color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.react-useful-kit-alert-modal-cancel-button {
  background-color: #d7dde7;
  color: #6b7280;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
`

let stylesInjected = false

/**
 * 모달 스타일을 자동으로 head에 주입합니다.
 * 중복 주입을 방지합니다.
 */
export function injectModalStyles(): void {
  if (stylesInjected) return

  if (typeof document === 'undefined') return // SSR 대응

  const existingStyle = document.getElementById('react-useful-kit-modal-styles')
  if (existingStyle) {
    stylesInjected = true
    return
  }

  const styleElement = document.createElement('style')
  styleElement.id = 'react-useful-kit-modal-styles'
  styleElement.textContent = modalStyles

  document.head.appendChild(styleElement)
  stylesInjected = true
}
