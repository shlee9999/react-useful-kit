import { useCallback } from 'react'
import AlertModalContent from '../components/AlertModalContent'
import Modal from '../layouts/Modal'
import { renderToBody } from '../utils/utils'

export interface AlertOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean
}

const defaultOptions: AlertOptions = {
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  showCancel: false,
}

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
  // AlertModal을 자동으로 렌더링
  const renderAlertModal = useCallback((options: AlertOptions | string) => {
    function AlertModal() {
      return (
        <Modal>
          <Modal.Content isDefaultOpen>
            <AlertModalContent
              {...(typeof options === 'string' ? { ...defaultOptions, message: options } : (options ?? defaultOptions))}
            />
          </Modal.Content>
        </Modal>
      )
    }
    return renderToBody(AlertModal, {})
  }, [])

  const alert = useCallback(
    (options: AlertOptions | string) => {
      renderAlertModal(options)
    },
    [renderAlertModal]
  )

  return {
    alert,
  }
}
