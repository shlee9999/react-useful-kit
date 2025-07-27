import { useRef } from 'react'
import { deepEqual } from '@/utils/deepEqual'

/**
 * 의존성 배열을 깊은 비교로 처리하는 useCallback 훅입니다.
 *
 * 일반적인 useCallback은 의존성 배열의 참조만 비교하지만,
 * useDeepCallback은 값 자체를 깊게 비교하여 실제로 값이 변경된 경우에만 새로운 콜백을 반환합니다.
 *
 * @param callback 메모이제이션할 콜백 함수
 * @param deps 의존성 배열 (깊은 비교가 적용됨)
 * @returns 메모이제이션된 콜백 함수
 *
 * @example
 * ```tsx
 * const [config, setConfig] = useState({ theme: 'dark', language: 'ko' })
 *
 * // 일반 useCallback은 config 객체 참조가 바뀔 때마다 새 함수를 생성하지만
 * // useDeepCallback은 config 객체의 실제 값이 변경될 때만 새 함수를 생성합니다
 * const handleSubmit = useDeepCallback((data) => {
 *   submitWithConfig(data, config)
 * }, [config])
 *
 * // 배열도 깊은 비교가 가능합니다
 * const handleItemsChange = useDeepCallback((newItems) => {
 *   processItems(newItems, items)
 * }, [items])
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDeepCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps?: React.DependencyList
): T {
  const prevDepsRef = useRef<React.DependencyList | undefined>(undefined)
  const callbackRef = useRef<T | undefined>(undefined)
  const hasCallbackRef = useRef(false)

  // 첫 번째 렌더링이거나 깊은 비교에서 변경이 감지된 경우
  const hasChanged = prevDepsRef.current === undefined || !deepEqual(prevDepsRef.current, deps)

  if (hasChanged || !hasCallbackRef.current) {
    // 현재 의존성 저장
    prevDepsRef.current = deps ? [...deps] : deps

    // 새로운 콜백 저장
    callbackRef.current = callback
    hasCallbackRef.current = true
  }

  return callbackRef.current as T
}
