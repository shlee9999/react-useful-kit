import type { AlertOptions } from './types/alert-options'

/**
 * 전역 modalAlert 함수
 * AlertProvider에서 window.modalAlert로 등록된 함수를 사용합니다.
 */
export const modalAlert = (options: AlertOptions | string): void => {
  if (typeof window !== 'undefined' && window.modalAlert) {
    window.modalAlert(options)
  } else {
    console.warn('modalAlert is not available. Make sure AlertProvider is properly set up.')
  }
}
