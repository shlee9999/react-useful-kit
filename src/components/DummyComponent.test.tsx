import { useDummy1 } from '@/context/DummyContext1.test'
import { useAlertModal } from '@/hooks/useAlertModal'

export function DummyComponent() {
  const modalAlert = useAlertModal()
  const num = useDummy1()

  return <button onClick={() => modalAlert({ content: <DummyComponent /> })}>{num ?? 'error'} click</button>
}
