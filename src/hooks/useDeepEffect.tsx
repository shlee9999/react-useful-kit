import { useEffect, useRef } from 'react'
import { deepEqual } from '@/utils/deepEqual'

/**
 * 의존성 배열을 깊은 비교로 처리하는 useEffect 훅입니다.
 *
 * 일반적인 useEffect는 의존성 배열의 참조만 비교하지만,
 * useDeepEffect는 값 자체를 깊게 비교하여 실제로 값이 변경된 경우에만 effect를 실행합니다.
 *
 * @param effect 실행할 effect 함수
 * @param deps 의존성 배열 (깊은 비교가 적용됨)
 *
 * @example
 * ```tsx
 * const [user, setUser] = useState({ name: 'John', age: 30 })
 *
 * // 일반 useEffect는 user 객체 참조가 바뀔 때마다 실행되지만
 * // useDeepEffect는 user 객체의 실제 값이 변경될 때만 실행됩니다
 * useDeepEffect(() => {
 *   console.log('User 정보가 변경되었습니다:', user)
 * }, [user])
 *
 * // 배열도 깊은 비교가 가능합니다
 * useDeepEffect(() => {
 *   console.log('Items가 변경되었습니다:', items)
 * }, [items])
 * ```
 */
export default function useDeepEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  const prevDepsRef = useRef<React.DependencyList | undefined>(undefined)
  const effectRef = useRef<React.EffectCallback | undefined>(undefined)

  // 최신 effect 함수를 ref에 저장
  effectRef.current = effect

  useEffect(() => {
    // 첫 번째 렌더링이거나 깊은 비교에서 변경이 감지된 경우
    const hasChanged = prevDepsRef.current === undefined || !deepEqual(prevDepsRef.current, deps)

    if (hasChanged) {
      // 현재 의존성 저장
      prevDepsRef.current = deps ? [...deps] : deps

      // effect 실행
      if (effectRef.current) {
        return effectRef.current()
      }
    }
  }, [deps])
}
