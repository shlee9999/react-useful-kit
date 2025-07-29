import { AlertOptions } from './types/alert-options'

declare global {
  interface Window {
    modalAlert(options: AlertOptions | string): void
  }
}

declare function modalAlert(options: AlertOptions | string): void
