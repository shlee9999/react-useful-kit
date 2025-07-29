import { useModal } from '@/context/ModalContext'
import useAlertModal from './hooks/useAlertModal'

function App() {
  const { alert } = useAlertModal()
  return (
    <div style={{ height: '120vh' }}>
      <button onClick={() => alert('Hello')}>Alert</button>
      <button onClick={() => alert({ content: <Content /> })}>Alert with content</button>
    </div>
  )
}

export default App

const Content = () => {
  const { closeModal } = useModal()
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={closeModal}>Close</button>
    </div>
  )
}
