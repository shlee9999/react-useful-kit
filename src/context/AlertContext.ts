import type { AlertOptions } from '@/types/alert-options'
import { createContext } from 'react'

export const AlertContext = createContext<{
  alert: (options: AlertOptions | string) => void
  close: () => void
} | null>(null)
