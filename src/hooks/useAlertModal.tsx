import { AlertContext } from '@/context/AlertContext'
import { useContext } from 'react'

/**
 * 함수로 모달을 호출하여 사용할 수 있습니다.
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
 */
export default function useAlertModal() {
  const { alert } = useContext(AlertContext)
  return { alert }
}
