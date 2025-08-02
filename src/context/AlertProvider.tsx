import AlertModalContent from '@/components/AlertModalContent'
import Modal from '@/layouts/Modal'
import type { AlertOptions } from '@/types/alert-options'
import { Fragment, useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AlertContext } from './AlertContext'

/**
 * 기본적으로 main.tsx에서 App을 감싸주세요.
 * 특정 Context를 공유하고 싶다면, 해당 ContextProvider 내부에 AlertProvider를 사용하세요.
 * 즉, 다중 AlertProvider를 지원합니다. id를 지정하지 않으면 기본값으로 'react-useful-kit-alert-container'를 사용합니다.
 *
 * @example
 * ```tsx
 * <AlertProvider>
 *   <App /> //* 기본값으로 'react-useful-kit-alert-container'를 사용합니다.
 * </AlertProvider>
 * ```
 *
 * 다중 AlertProvider를 사용하고 싶다면, id를 지정하는 게 유지보수에 좋습니다.
 * @example
 * ```tsx
 * <SomeContext>
 *   <AlertProvider id='custom-alert-container'>
 *     <Child />
 *   </AlertProvider>
 * </SomeContext>
 * ```
 */
export const AlertProvider = ({ children, id }: { children: ReactNode; id?: string }) => {
  const [modals, setModals] = useState<{ modal: ReactNode; id: string }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const closeAlertModal = useCallback((modalId: string) => {
    setModals(prev => prev.filter(modal => modal.id !== modalId))
  }, [])

  const modalId = `react-useful-kit-alert-${new Date().getTime().toString()}` //* 모달 고유 id 자동 생성. 모달 닫을 때 사용
  const alert = useCallback(
    (options: AlertOptions | string) => {
      const onClose = () => {
        if (typeof options === 'object' && 'onClose' in options) {
          options.onClose?.()
        }
        closeAlertModal(modalId)
      }

      function AlertModal() {
        if (typeof options === 'object' && 'content' in options) {
          return (
            <Modal>
              <Modal.Content
                isDefaultOpen
                overlay={options.overlay}
                onClose={onClose}
                containerRef={options.containerRef ?? containerRef}
              >
                {options.content}
              </Modal.Content>
            </Modal>
          )
        }
        // string 타입일 경우
        return (
          <Modal>
            <Modal.Content isDefaultOpen containerRef={containerRef} onClose={onClose}>
              <AlertModalContent {...(typeof options === 'string' ? { message: options } : options)} />
            </Modal.Content>
          </Modal>
        )
      }

      setModals(prev => [...prev, { modal: <AlertModal />, id: modalId }])
    },
    [closeAlertModal, modalId]
  )

  //todo: id로 찾아서 닫기
  const close = useCallback(
    (id: string) => {
      closeAlertModal(id)
    },
    [closeAlertModal]
  )

  const value = useMemo(() => ({ alert, close }), [alert, close])

  function ModalContainer() {
    if (modals.length === 0) return null
    return (
      <div
        id={id ?? 'react-useful-kit-alert-container'}
        className='react-useful-kit-alert-container'
        ref={containerRef}
      >
        {modals.map(({ modal, id }) => (
          <Fragment key={id}>{modal}</Fragment>
        ))}
      </div>
    )
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
      {/* 모달 컨테이너. 모달이 여러개 있을 경우 모달이 겹치지 않도록 처리 */}
      {createPortal(<ModalContainer />, document.body)}
    </AlertContext.Provider>
  )
}
