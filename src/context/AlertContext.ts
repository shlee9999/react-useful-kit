import type { AlertOptions } from '@/types/alert-options'
import { createContext } from 'react'

export const defaultOptions: AlertOptions = {
  title: '',
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  showCancel: false,
}

export const AlertContext = createContext<{
  alert: (options: AlertOptions | string) => void
}>({
  alert: () => {},
})
