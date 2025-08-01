import AlertModalContent from '@/components/AlertModalContent'
import Modal from '@/layouts/Modal'
import type { AlertOptions } from '@/types/alert-options'
import { useCallback, useMemo, useState, useRef, type ReactNode, Fragment } from 'react'
import { AlertContext } from './AlertContext'
import { createPortal } from 'react-dom'

/**
 * 기본적으로 main.tsx에서 App을 감싸주세요.
 * 특정 Context를 공유하고 싶다면, 해당 ContextProvider 내부에 AlertProvider를 사용하세요.
 * 즉, 다중 AlertProvider를 지원합니다. id를 지정하지 않으면 기본값으로 'react-useful-kit-modal-container'를 사용합니다.
 *
 * @example
 * ```tsx
 * <AlertProvider>
 *   <App /> //* 기본값으로 'react-useful-kit-modal-container'를 사용합니다.
 * </AlertProvider>
 * ```
 *
 * 다중 AlertProvider를 사용하고 싶다면, id를 지정하는 게 유지보수에 좋습니다.
 * @example
 * ```tsx
 * <SomeContext>
 *   <AlertProvider id='custom-modal-container'>
 *     <Child />
 *   </AlertProvider>
 * </SomeContext>
 * ```
 */
export const AlertProvider = ({ children, id }: { children: ReactNode; id?: string }) => {
  const [modals, setModals] = useState<ReactNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const alert = useCallback((options: AlertOptions | string) => {
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
            <AlertModalContent {...(typeof options === 'string' ? { message: options } : options)} />
          </Modal.Content>
        </Modal>
      )
    }
    setModals(prev => [...prev, <AlertModal />])
  }, [])

  //todo: id로 찾아서 닫기
  const close = useCallback(() => {
    setModals(prev => prev.slice(0, -1))
  }, [])

  const value = useMemo(() => ({ alert, close }), [alert, close])

  function ModalContainer() {
    return (
      <div
        id={id ?? 'react-useful-kit-modal-container'}
        className='react-useful-kit-modal-container'
        ref={containerRef}
      >
        {modals.map((modal, index) => (
          <Fragment key={index}>{modal}</Fragment>
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
