import { createContext, useContext } from 'react'

export type ModalContextType = {
  isModal?: boolean
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
  isModal: false,
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

/**
 * 모달 내부에 띄워진 컴포넌트에서 사용하는 훅입니다.
 * @param isModal: 현재 컴포넌트가 모달에 띄워진 상태인지 확인할 수 있습니다.
 * @param isOpen: 모달이 열려있는지 확인할 수 있습니다.
 * @param closeModal: 모달을 닫을 수 있습니다.
 */
export const useModal = () => {
  const { isModal, isOpen, openModal, closeModal } = useContext(ModalContext)
  return { isModal, isOpen, openModal, closeModal }
}
