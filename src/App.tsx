import Test from './components/Test'
import Modal from './layouts/Modal'

function App() {
  return (
    <div className=''>
      React Stash
      <Modal>
        <Modal.Trigger>
          <button onClick={() => console.log('clicked')}>Open Modal</button>
        </Modal.Trigger>
        <Modal.Content>
          <Test />
          <Modal.Close />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default App
