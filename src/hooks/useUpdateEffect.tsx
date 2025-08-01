import { deepEqual } from '@/utils/deepEqual'
import { useRef } from 'react'

export default function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  const prevDepsRef = useRef<React.DependencyList | undefined>(undefined)
  const effectRef = useRef<React.EffectCallback | undefined>(undefined)
  const cleanupRef = useRef<(() => void) | void>(undefined)
  const isMountedRef = useRef(false)

  const hasChanged = prevDepsRef.current === undefined || !deepEqual(prevDepsRef.current, deps)

  // 이전 cleanup 함수가 있다면 실행
  if (cleanupRef.current) {
    cleanupRef.current()
    cleanupRef.current = undefined
  }

  if (hasChanged) {
    prevDepsRef.current = deps
    effectRef.current = effect

    // 첫 렌더링이 아닌 경우에만 effect 실행
    if (isMountedRef.current) {
      const cleanup = effect()
      cleanupRef.current = cleanup
    }
  }

  // 첫 렌더링 완료 표시
  if (!isMountedRef.current) {
    isMountedRef.current = true
  }
}
