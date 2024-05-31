import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './routes/Landing'
import Game from './routes/Game'
import { ChessContext } from './context/chessContext'
import { useState } from 'react'

function App() {
  const [chessData, setChessData] = useState({
    started: false,
    color: null,
  })

  return (
    <>
      <ChessContext.Provider value={{ chessData, setChessData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path={'/game'} element={<Game />} />
          </Routes>
        </BrowserRouter>
      </ChessContext.Provider>
    </>
  )
}

export default App