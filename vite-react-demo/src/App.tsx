import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      App
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
