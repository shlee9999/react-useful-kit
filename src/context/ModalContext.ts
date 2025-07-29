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

export const useModal = () => {
  const { isModal, isOpen, openModal, closeModal } = useContext(ModalContext)
  return { isModal, isOpen, openModal, closeModal }
}
