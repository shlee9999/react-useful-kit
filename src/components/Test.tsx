import useAlertModal from '../hooks/useAlertModal'

export default function Test() {
  const { alert } = useAlertModal()

  const showSimpleAlert = () => {
    alert('간단한 알림 메시지입니다.')
  }

  const showConfirmAlert = () => {
    alert({
      title: '확인',
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      showCancel: true,
      onConfirm: () => {
        console.log('삭제 확인됨')
      },
      onCancel: () => {
        console.log('삭제 취소됨')
      },
    })
  }

  const showCustomAlert = () => {
    alert({
      title: '커스텀 알림',
      message: '이것은 커스텀 설정이 적용된 알림입니다.',
      confirmText: '좋아요',
      onConfirm: () => {
        console.log('사용자가 좋아요를 눌렀습니다.')
      },
    })
  }

  return (
    <div>
      <h1>Alert Modal 테스트</h1>
      <div className='space-y-2'>
        <button onClick={showSimpleAlert} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          간단한 알림
        </button>
      </div>

      <div className='space-y-2'>
        <button onClick={showConfirmAlert} className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
          확인/취소 알림
        </button>
      </div>

      <div className='space-y-2'>
        <button onClick={showCustomAlert} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
          커스텀 알림
        </button>
      </div>
    </div>
  )
}
