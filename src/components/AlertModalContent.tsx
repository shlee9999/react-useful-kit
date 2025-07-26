import { useCallback } from 'react'
import { useModal } from '../context/ModalContext'
import { type AlertOptions } from '../context/useAlertModal'

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
    console.log('onConfirm')
    onConfirm?.()
    setIsOpen(false)
  }, [onConfirm, setIsOpen])

  const handleCancel = useCallback(() => {
    console.log('onCancel')
    onCancel?.()
    setIsOpen(false)
  }, [onCancel, setIsOpen])

  return (
    <div className='text-center'>
      {title && <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>}
      <p className='text-sm text-gray-600 mb-6'>{message}</p>
      <div className='flex gap-2 justify-center'>
        {showCancel && (
          <button
            onClick={handleCancel}
            className='react-useful-kit-alert-modal-cancel-button px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
          >
            {cancelText}
          </button>
        )}
        <button
          onClick={handleConfirm}
          className='react-useful-kit-alert-modal-confirm-button px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          {confirmText}
        </button>
      </div>
    </div>
  )
}
