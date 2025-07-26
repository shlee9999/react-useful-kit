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
