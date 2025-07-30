import { useCallback } from 'react'
import { useModal } from '@/context/ModalContext'
import type { AlertOptions } from '@/types/alert-options'

//* 메모이제이션을 위해 기본값을 미리 설정
const defaultOptions: AlertOptions = {
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  showCancel: false,
  onConfirm: () => {},
  onCancel: () => {},
}

export default function AlertModalContent({
  onConfirm = defaultOptions.onConfirm,
  onCancel = defaultOptions.onCancel,
  message = defaultOptions.message,
  cancelText = defaultOptions.cancelText,
  confirmText = defaultOptions.confirmText,
  showCancel = defaultOptions.showCancel,
  title = defaultOptions.title,
}: AlertOptions) {
  const { closeModal } = useModal()

  const handleConfirm = useCallback(() => {
    onConfirm?.()
    closeModal()
  }, [onConfirm, closeModal])

  const handleCancel = useCallback(() => {
    onCancel?.()
    closeModal()
  }, [onCancel, closeModal])

  return (
    <div className='react-useful-kit-alert-modal-content'>
      {title && <h3 className='react-useful-kit-alert-modal-title'>{title}</h3>}
      <p className='react-useful-kit-alert-modal-message'>{message}</p>
      <div className='react-useful-kit-alert-modal-button-container'>
        {showCancel && (
          <button onClick={handleCancel} className='react-useful-kit-alert-modal-cancel-button'>
            {cancelText}
          </button>
        )}
        <button onClick={handleConfirm} className='react-useful-kit-alert-modal-confirm-button'>
          {confirmText}
        </button>
      </div>
    </div>
  )
}
