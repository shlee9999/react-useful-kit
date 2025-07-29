import type { ReactNode } from 'react'

export interface AlertOptions {
  title?: string
  message: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean
}
