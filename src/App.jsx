import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Lobby from './Lobby.jsx'
import { Routes,Route } from 'react-router-dom'
import Room from './Room.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="App">
    <Routes>
    <Route path='/' element={<Lobby/>} />
      <Route path='/room/:roomId' element={<Room/>} />
    </Routes>
  </div>
  )
}

export default App
