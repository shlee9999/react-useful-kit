import type { ReactNode } from 'react'
import type { ModalContentProps } from '@/layouts/Modal'

export interface AlertOptions extends Omit<ModalContentProps, 'children'> {
  title?: string
  message?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean

  /**
   * 있으면 AlertModalContent 대신 content를 렌더링합니다.
   */
  content?: ReactNode
}
