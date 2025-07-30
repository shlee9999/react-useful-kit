import { AlertContext } from '@/context/AlertContext'
import type { AlertOptions } from '@/types/alert-options'
import { useContext } from 'react'

type ModalAlert = {
  (options: AlertOptions | string): void
  close: () => void
}

/**
 * 모달 외부에서 함수로 모달을 호출하는 훅입니다.
 * 모달 내부에서 사용하는 훅은 useModal을 사용해야 합니다.
 *
 * @example
 * ```tsx
 * const { alert } = useAlertModal()
 *
 * alert('간단한 메시지')
 * // 또는
 * alert({
 *   title: '확인',
 *   message: '정말 삭제하시겠습니까?',
 *   showCancel: true,
 *   onConfirm: () => console.log('확인'),
 *   onCancel: () => console.log('취소')
 * })
 * ```
 *
 * @param options: AlertOptions
 * @returns { alert: (options: AlertOptions | string) => void }
 */
export function useAlertModal() {
  const { alert, close } = useContext(AlertContext)
  const modalAlert = alert as ModalAlert
  modalAlert.close = close
  return modalAlert
}
