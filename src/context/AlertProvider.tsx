import AlertModalContent from '@/components/AlertModalContent'
import Modal from '@/layouts/Modal'
import type { AlertOptions } from '@/types/alert-options'
import { useCallback, useMemo, useState, useRef, type ReactNode, Fragment } from 'react'
import { AlertContext, defaultOptions } from './AlertContext'

export const AlertProvider = ({ children, id }: { children: ReactNode; id?: string }) => {
  const [modals, setModals] = useState<ReactNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  // AlertModal을 자동으로 렌더링
  const renderAlertModal = useCallback((options: AlertOptions | string) => {
    function AlertModal() {
      if (typeof options === 'object' && 'content' in options) {
        return (
          <Modal>
            <Modal.Content
              isDefaultOpen
              overlay={options.overlay}
              onClose={options.onClose}
              containerRef={options.containerRef ?? containerRef}
            >
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

  //todo: id로 찾아서 닫기
  const close = useCallback(() => {
    setModals(prev => prev.slice(0, -1))
  }, [])

  const value = useMemo(() => ({ alert, close }), [alert, close])

  return (
    <AlertContext.Provider value={value}>
      {children}
      {/* 모달 컨테이너. 모달이 여러개 있을 경우 모달이 겹치지 않도록 처리 */}
      <div
        id={id ?? 'react-useful-kit-modal-container'}
        className='react-useful-kit-modal-container'
        ref={containerRef}
      >
        {modals.map((modal, index) => (
          <Fragment key={index}>{modal}</Fragment>
        ))}
      </div>
    </AlertContext.Provider>
  )
}
