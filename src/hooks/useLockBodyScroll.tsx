import { useEffect } from 'react'

/**
 * body 스크롤을 제어하는 훅
 * @param isLocked - true이면 스크롤을 잠그고, false이면 스크롤을 허용합니다.
 */
function useLockBodyScroll({ isLocked }: { isLocked: boolean }) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // cleanup: 컴포넌트가 언마운트될 때 스크롤을 복원
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLocked])
}

export default useLockBodyScroll
