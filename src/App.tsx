import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './routes/Landing'
import Game from './routes/Game'
import { ChessContext } from './context/chessContext'
import { useState } from 'react'
import { Chess } from 'chess.js'
import { ChessDataState } from './types'

function App() {
  const [chessData, setChessData] = useState<ChessDataState>({
    started: false,
    color: null,
    chess: new Chess(),
    board: new Chess().board(),
    waiting: false,
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
