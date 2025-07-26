import { type Dispatch, type SetStateAction, createContext, useContext } from 'react'

export type ModalContextType = {
  isModal?: boolean
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({
  isModal: false,
  isOpen: false,
  setIsOpen: () => {},
})

export const useModal = () => {
  const { isModal, isOpen, setIsOpen } = useContext(ModalContext)
  return { isModal, isOpen, setIsOpen }
}
