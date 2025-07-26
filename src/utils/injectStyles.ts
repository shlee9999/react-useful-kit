const modalStyles = fetch('/styles/modal.css').then(res => res.text())

let stylesInjected = false

/**
 * 모달 스타일을 자동으로 head에 주입합니다.
 * 중복 주입을 방지합니다.
 */
export async function injectModalStyles(): Promise<void> {
  if (stylesInjected) return

  if (typeof document === 'undefined') return // SSR 대응

  const existingStyle = document.getElementById('react-useful-kit-modal-styles')
  if (existingStyle) {
    stylesInjected = true
    return
  }

  const styleElement = document.createElement('style')
  styleElement.id = 'react-useful-kit-modal-styles'
  styleElement.textContent = await modalStyles

  document.head.appendChild(styleElement)
  stylesInjected = true
}
