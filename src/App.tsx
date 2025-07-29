import useAlertModal from './hooks/useAlertModal'

function App() {
  const { alert } = useAlertModal()
  return (
    <div style={{ height: '120vh' }}>
      <button onClick={() => alert('Hello')}>Alert</button>
    </div>
  )
}

export default App
