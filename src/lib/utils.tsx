import { type ClassValue, clsx } from 'clsx'
import { createRoot } from 'react-dom/client'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderToBody(Component: React.ComponentType<any>, props: any) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  const removeContainer = () => {
    // React 19에서 반드시 root.unmount()로 언마운트합니다.
    root.unmount()
    document.body.removeChild(container)
  }

  // 기존 root에 컴포넌트를 렌더링
  root.render(<Component {...props} onClose={removeContainer} />)
}
