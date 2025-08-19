import { useState } from 'react'
import MiniStore from './components/MiniStore/MiniStore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MiniStore />
    </>
  )
}

export default App
