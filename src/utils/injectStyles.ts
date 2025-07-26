import '../styles/modal.css'

let stylesInjected = false

/**
 * 모달 스타일을 자동으로 head에 주입합니다.
 * 중복 주입을 방지합니다.
 */
export function injectModalStyles(): void {
  if (stylesInjected) return

  if (typeof document === 'undefined') return // SSR 대응

  // CSS가 이미 import되어 있으므로 단순히 플래그만 설정
  stylesInjected = true
}
