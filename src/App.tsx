import Modal from './layouts/Modal'

function App() {
  return (
    <div className=''>
      React Stash
      <Modal>
        <Modal.Trigger>
          <button>Open Modal</button>
        </Modal.Trigger>
        <Modal.Content>
          <h1>Modal</h1>
          <p>This is a modal</p>
          <Modal.Close />
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default App
