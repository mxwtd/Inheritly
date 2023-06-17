import { useState } from 'react'

const RenameModal = ({ isOpen, onRename, onCancel }) => {
  const [newName, setNewName] = useState('')

  const handleRename = () => {
    onRename(newName)
    setNewName('')
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='modal'>
      <h2>Rename File</h2>
      <input type='text' value={newName} onChange={e => setNewName(e.target.value)} />
      <button onClick={handleRename}>Rename</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default RenameModal
