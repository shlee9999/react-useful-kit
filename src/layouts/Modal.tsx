import {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/assets/icons/core'
import { ModalContext } from '@/context/ModalContext'
import '@/styles/modal.css'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false) // 모달 컴포넌트 내부인지 판단
  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])
  const value = useMemo(() => ({ isOpen, isModal, openModal, closeModal }), [isOpen, isModal, openModal, closeModal])

  useEffect(() => {
    setIsModal(true)
    return () => {
      setIsModal(false)
    }
  }, [])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function ModalTrigger({
  children,
}: {
  children: ReactElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void> }>
}) {
  const { openModal } = useContext(ModalContext)
  return cloneElement(children, {
    onClick: async (e: React.MouseEvent<HTMLElement>) => {
      // 기존 onClick이 있다면 실행 (비동기 지원)
      if (children.props.onClick) {
        await children.props.onClick(e)
      }
      openModal()
    },
  })
}

export type ModalContentProps = {
  children: ReactNode
  overlay?: boolean
  isDefaultOpen?: boolean
  onClose?: () => void
  containerRef?: React.RefObject<HTMLElement | null>
}
function ModalContent({ children, overlay = true, isDefaultOpen, onClose, containerRef }: ModalContentProps) {
  const { isOpen, openModal } = useContext(ModalContext)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  useLockBodyScroll({ isLocked: isOpen })

  useEffect(() => {
    if (isDefaultOpen) {
      openModal()
    }
  }, [isDefaultOpen, openModal])

  useEffect(() => {
    if (!isOpen && isMounted && onClose) {
      onClose()
    }
  }, [isOpen, onClose, isMounted])

  const content = <div className='react-useful-kit-modal-content'>{children}</div>

  if (!isOpen) return null
  return createPortal(
    <div className='react-useful-kit-modal-overlay' data-overlay={overlay}>
      {content}
    </div>,
    containerRef?.current ?? document.body
  )
}

function ModalClose({
  className,
  children,
}: {
  className?: string
  children?: ReactElement<{ onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void> }>
}) {
  const { closeModal } = useContext(ModalContext)
  if (!children)
    return <CloseIcon className={`react-useful-kit-modal-close ${className}`} onClick={closeModal} cursor='pointer' />
  return cloneElement(children, {
    onClick: async (e: React.MouseEvent<HTMLElement>) => {
      // 기존 onClick이 있다면 실행 (비동기 지원)
      if (children.props.onClick) {
        await children.props.onClick(e)
      }
      closeModal()
    },
  })
}

//* 합성 컴포넌트 인터페이스 정의

interface ModalComponent {
  ({ children }: { children: ReactNode }): React.JSX.Element
  /**
   * 자식 요소에 onClick 이벤트를 추가하여 모달을 엽니다.
   *
   * 자식 요소의 onClick 이벤트가 없다면 모달만 열립니다.
   *
   * 자식 요소의 onClick 이벤트가 있다면 실행 후 자동으로 모달을 엽니다.
   */
  Trigger: typeof ModalTrigger
  /**
   * 모달 컨텐츠를 렌더링하는 컴포넌트입니다.
   *
   * Modal 컴포넌트 내부에 위치해야 합니다.
   *
   * react-useful-kit-modal-overlay, react-useful-kit-modal-content 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
   */
  Content: typeof ModalContent
  /**
   * react-useful-kit-modal-close 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
   *
   * children이 없으면 기본 닫기 버튼을 렌더링합니다.
   *
   * children이 있으면 해당 요소를 렌더링하고 클릭 시 모달을 닫습니다.
   *
   * 자식 요소의 onClick 이벤트가 있다면 실행 후 자동으로 모달을 닫습니다.
   *
   * 자식 요소의 onClick 이벤트가 없다면 모달을 닫습니다.
   */
  Close: typeof ModalClose
}

//* 합성 컴포넌트 할당
/**
 * 모달 컨텍스트를 제공하는 컴포넌트입니다.
 *
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
const ModalWithSubComponents = Modal as ModalComponent
ModalWithSubComponents.Trigger = ModalTrigger
ModalWithSubComponents.Content = ModalContent
ModalWithSubComponents.Close = ModalClose

export default ModalWithSubComponents
