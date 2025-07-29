import type { ReactNode } from 'react'
import type { ModalContentProps } from '@/layouts/Modal'

/**
 * @param content: 모달 내용. content가 있으면 다른 옵션들(title, message 등)은 무시됩니다.
 * @param title: 모달 제목
 * @param message: 모달 메시지
 * @param confirmText: 확인 버튼 텍스트
 * @param cancelText: 취소 버튼 텍스트
 * @param onConfirm: 확인 버튼 클릭 시 실행할 함수
 * @param onCancel: 취소 버튼 클릭 시 실행할 함수
 * @param showCancel: 취소 버튼 표시 여부
 */
export interface AlertOptions extends Omit<ModalContentProps, 'children'> {
  title?: string
  message?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean

  /**
   * 있으면 AlertModalContent 대신 content를 렌더링합니다.
   */
  content?: ReactNode
}
