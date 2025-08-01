/**
 * 두 값이 깊은 비교에서 동일한지 확인합니다.
 *
 * @param a 비교할 첫 번째 값
 * @param b 비교할 두 번째 값
 * @returns 두 값이 깊은 비교에서 동일하면 true, 아니면 false
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  // 동일한 참조인 경우
  if (a === b) return true

  // null 또는 undefined 처리
  if (a == null || b == null) return a === b

  // 타입이 다른 경우
  if (typeof a !== typeof b) return false

  // 함수 처리
  if (typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString()
  }

  // 원시 타입인 경우 (이미 === 비교를 통과했으므로 false)
  if (typeof a !== 'object') return false

  // Date 객체 처리
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  // RegExp 객체 처리
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString()
  }

  // 배열 처리
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  // 배열과 객체가 섞인 경우
  if (Array.isArray(a) || Array.isArray(b)) return false

  // 객체 처리
  const aObj = a as Record<string, unknown>
  const bObj = b as Record<string, unknown>

  const aKeys = Object.keys(aObj)
  const bKeys = Object.keys(bObj)

  // 키의 개수가 다른 경우
  if (aKeys.length !== bKeys.length) return false

  // 모든 키와 값 비교
  for (const key of aKeys) {
    if (!bKeys.includes(key)) return false
    if (!deepEqual(aObj[key], bObj[key])) return false
  }

  return true
}
