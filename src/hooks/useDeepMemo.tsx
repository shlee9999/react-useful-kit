import { useRef } from 'react'
import { deepEqual } from '@/utils/deepEqual'

/**
 * 의존성 배열을 깊은 비교로 처리하는 useMemo 훅입니다.
 *
 * 일반적인 useMemo는 의존성 배열의 참조만 비교하지만,
 * useDeepMemo는 값 자체를 깊게 비교하여 실제로 값이 변경된 경우에만 새로운 값을 계산합니다.
 *
 * @param factory 메모이제이션할 값을 계산하는 함수
 * @param deps 의존성 배열 (깊은 비교가 적용됨)
 * @returns 메모이제이션된 값
 *
 * @example
 * ```tsx
 * const [filters, setFilters] = useState({ category: 'all', price: { min: 0, max: 1000 } })
 *
 * // 일반 useMemo는 filters 객체 참조가 바뀔 때마다 재계산하지만
 * // useDeepMemo는 filters 객체의 실제 값이 변경될 때만 재계산합니다
 * const expensiveValue = useDeepMemo(() => {
 *   return computeExpensiveValue(filters)
 * }, [filters])
 *
 * // 배열도 깊은 비교가 가능합니다
 * const processedItems = useDeepMemo(() => {
 *   return items.map(item => processItem(item))
 * }, [items])
 * ```
 */
export default function useDeepMemo<T>(factory: () => T, deps?: React.DependencyList): T {
  const prevDepsRef = useRef<React.DependencyList | undefined>(undefined)
  const memoizedValueRef = useRef<T | undefined>(undefined)
  const hasValueRef = useRef(false)

  // 첫 번째 렌더링이거나 깊은 비교에서 변경이 감지된 경우
  const hasChanged = prevDepsRef.current === undefined || !deepEqual(prevDepsRef.current, deps)

  if (hasChanged || !hasValueRef.current) {
    // 현재 의존성 저장
    prevDepsRef.current = deps ? [...deps] : deps

    // 새로운 값 계산
    memoizedValueRef.current = factory()
    hasValueRef.current = true
  }

  return memoizedValueRef.current as T
}
