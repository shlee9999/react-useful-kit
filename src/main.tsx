import App from '@/App'
import { AlertProvider } from '@/context/AlertProvider'
import '@/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <AlertProvider>
    <App />
  </AlertProvider>
)
