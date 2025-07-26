import { cloneElement, useContext, useEffect, useMemo, useState, type ReactElement, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '../assets/icons/core'
import { ModalContext } from '../context/ModalContext'
import { cn } from '../utils/utils'

/**
 * 모달 컨텍스트를 제공하는 컴포넌트입니다.
 * Modal.Trigger, Modal.Content, Modal.Close와 함께 사용하세요.
 *
 * @example
 * ```tsx
 * <Modal>
 *   <Modal.Trigger>
 *     <button>모달 열기</button>
 *   </Modal.Trigger>
 *   <Modal.Content>
 *     <h2>모달 내용</h2>
 *     <Modal.Close />
 *   </Modal.Content>
 * </Modal>
 * ```
 */
function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false) // 모달 컴포넌트 내부인지 판단
  const value = useMemo(() => ({ isOpen, setIsOpen, isModal }), [isOpen, isModal])

  useEffect(() => {
    setIsModal(true)
    return () => {
      setIsModal(false)
    }
  }, [])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

/**
 * 자식 요소에 onClick 이벤트를 추가하여 모달을 엽니다.
 * 자식 요소의 onClick 이벤트가 없다면 모달만 열립니다.
 * 자식 요소의 onClick 이벤트가 있다면 실행 후 자동으로 모달을 엽니다.
 */
function ModalTrigger({
  children,
}: {
  children: ReactElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void> }>
}) {
  const { setIsOpen } = useContext(ModalContext)
  return cloneElement(children, {
    onClick: async (e: React.MouseEvent<HTMLElement>) => {
      // 기존 onClick이 있다면 실행 (비동기 지원)
      if (children.props.onClick) {
        await children.props.onClick(e)
      }
      setIsOpen(true)
    },
  })
}

/**
 * 모달 컨텐츠를 렌더링하는 컴포넌트입니다.
 * Modal 컴포넌트 내부에 위치해야 합니다.
 * react-useful-kit-modal-overlay, react-useful-kit-modal-content 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 */
function ModalContent({
  children,
  className,
  overlay = true,
  isDefaultOpen,
}: {
  children: ReactNode
  className?: string
  overlay?: boolean
  isDefaultOpen?: boolean
}) {
  const { isOpen, setIsOpen } = useContext(ModalContext)

  useEffect(() => {
    if (isDefaultOpen) {
      setIsOpen(true)
    }
  }, [isDefaultOpen, setIsOpen])

  const content = (
    <div
      className={cn(
        'react-useful-kit-modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative',
        className
      )}
    >
      {children}
    </div>
  )
  if (!isOpen) return null
  return createPortal(
    <div
      className={cn(
        'fixed inset-0  flex items-center justify-center',
        overlay && 'react-useful-kit-modal-overlay bg-black/50'
      )}
    >
      {content}
    </div>,
    document.body
  )
}

/**
 * react-useful-kit-modal-close 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 * children이 없으면 기본 닫기 버튼을 렌더링합니다.
 * children이 있으면 해당 요소를 렌더링하고 클릭 시 모달을 닫습니다.
 * 자식 요소의 onClick 이벤트가 있다면 실행 후 자동으로 모달을 닫습니다.
 * 자식 요소의 onClick 이벤트가 없다면 모달을 닫습니다.
 */
function ModalClose({
  className,
  children,
}: {
  className?: string
  children?: ReactElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void> }>
}) {
  const { setIsOpen } = useContext(ModalContext)
  if (!children)
    return (
      <CloseIcon
        className={cn(
          'react-useful-kit-modal-close w-6 h-6 text-gray-100 hover:text-gray-500 transition-colors duration-300 absolute top-3 right-3',
          className
        )}
        onClick={() => setIsOpen(false)}
        cursor='pointer'
      />
    )
  return cloneElement(children, {
    onClick: async (e: React.MouseEvent<HTMLElement>) => {
      // 기존 onClick이 있다면 실행 (비동기 지원)
      if (children.props.onClick) {
        await children.props.onClick(e)
      }
      setIsOpen(false)
    },
  })
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
Modal.Close = ModalClose

export default Modal
