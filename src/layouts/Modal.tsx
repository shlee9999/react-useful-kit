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

function ModalTrigger({ children }: { children: ReactElement<{ onClick?: () => void }> }) {
  const { setIsOpen } = useContext(ModalContext)
  return cloneElement(children, { onClick: () => setIsOpen(true) })
}

/**
 * modal-overlay, modal-content 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 */
function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useContext(ModalContext)
  if (!isOpen) return null

  return createPortal(
    <div className='modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className={cn('modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative', className)}>
        {children}
      </div>
    </div>,
    document.body
  )
}

/**
 * modal-close 클래스명을 사용하여 기본 스타일을 커스터마이징 할 수 있습니다.
 */
function ModalClose({ className }: { className?: string }) {
  const { setIsOpen } = useContext(ModalContext)
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
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
Modal.Close = ModalClose

export default Modal
