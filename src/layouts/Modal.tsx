import {
  createContext,
  useContext,
  useMemo,
  useState,
  type SetStateAction,
  type Dispatch,
  type ReactNode,
  cloneElement,
  type ReactElement,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/utils'
import { CloseIcon } from '../assets/icons/core'

type ModalContextType = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

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
 * modal-overlay, modal-content 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 */
function ModalContent({
  children,
  className,
  overlay,
}: {
  children: ReactNode
  className?: string
  overlay?: boolean
}) {
  const { isOpen } = useContext(ModalContext)

  if (!isOpen) return null
  return createPortal(
    <div
      className={cn(
        'modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center',
        overlay && 'modal-overlay'
      )}
    >
      <div className={cn('modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative', className)}>
        {children}
      </div>
    </div>,
    document.body
  )
}

/**
 * modal-close 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 * children이 없으면 기본 닫기 버튼을 렌더링합니다.
 * children이 있으면 해당 요소를 렌더링하고 클릭 시 모달을 닫습니다.
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
          'modal-close w-6 h-6 text-gray-100 hover:text-gray-500 transition-colors duration-300 absolute top-3 right-3',
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
