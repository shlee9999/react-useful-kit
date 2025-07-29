import { useCallback, useMemo, useState, useEffect, type ReactNode } from 'react'
import AlertModalContent from '@/components/AlertModalContent'
import Modal from '@/layouts/Modal'
import type { AlertOptions } from '@/types/alert-options'
import { AlertContext, defaultOptions } from './AlertContext'

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ReactNode[]>([])

  // AlertModal을 자동으로 렌더링
  const renderAlertModal = useCallback((options: AlertOptions | string) => {
    function AlertModal() {
      if (typeof options === 'object' && 'content' in options) {
        return (
          <Modal>
            <Modal.Content isDefaultOpen overlay={options.overlay} onClose={options.onClose}>
              {options.content}
            </Modal.Content>
          </Modal>
        )
      }
      return (
        <Modal>
          <Modal.Content isDefaultOpen>
            <AlertModalContent
              {...(typeof options === 'string'
                ? { ...defaultOptions, message: options }
                : { ...defaultOptions, ...options })}
            />
          </Modal.Content>
        </Modal>
      )
    }
    setModals(prev => [...prev, <AlertModal />])
  }, [])

  const alert = useCallback(
    (options: AlertOptions | string) => {
      renderAlertModal(options)
    },
    [renderAlertModal]
  )

  // window.alert를 커스텀 alert로 대체
  useEffect(() => {
    // window.alert를 커스텀 alert로 override
    window.modalAlert = alert

    // cleanup 시 원래 alert로 복원
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).modalAlert
    }
  }, [alert])

  const value = useMemo(() => ({ alert, modals }), [alert, modals])
  return (
    <AlertContext.Provider value={value}>
      {children}
      {/* 모달 컨테이너. 모달이 여러개 있을 경우 모달이 겹치지 않도록 처리 */}
      <div className='react-useful-kit-modal-container'>
        {modals.map((modal, index) => (
          <div key={index} className='react-useful-kit-modal-container-item'>
            {modal}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  )
}
