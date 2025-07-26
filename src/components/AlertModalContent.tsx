import { useCallback } from 'react'
import { useModal } from '../context/ModalContext'
import { type AlertOptions } from '../hooks/useAlertModal'

export default function AlertModalContent({
  onConfirm,
  onCancel,
  message,
  cancelText,
  confirmText,
  showCancel,
  title,
}: AlertOptions) {
  const { setIsOpen } = useModal()

  const handleConfirm = useCallback(() => {
    onConfirm?.()
    setIsOpen(false)
  }, [onConfirm, setIsOpen])

  const handleCancel = useCallback(() => {
    onCancel?.()
    setIsOpen(false)
  }, [onCancel, setIsOpen])

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
