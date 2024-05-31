import { useContext, useEffect, useState } from 'react'
import { useSocket } from '../hooks/usesocket'
import Chessboard from '../components/Chessboard'
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from '../constants'
import DummyBoard from '../components/DummyBoard'
import { ChessContext } from '../context/chessContext'

const Landing = () => {
  const { socket, handleMessage } = useSocket()
  const [chess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  const { chessData, setChessData } = useContext(ChessContext)

  console.log('socket', socket)

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('onmessage', message)

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board())
          setChessData((prev: any) => {
            return {
              ...prev,
              started: true,
              color: message.payload.message.color,
            }
          })

          break
        case MOVE:
          const { move } = message.payload
          chess.move(move)
          setBoard(chess.board())
          console.log('Move made')
          break
        case GAME_OVER:
          console.log('Game over')
          break
      }
    }
  }, [socket])

  const handleClick = () => {
    handleMessage({ type: INIT_GAME })
  }

  if (!socket) return <div>Connecting...</div>

  return (
    <div className="w-full h-full flex flex-row justify-center">
      {chessData.started ? (
        <Chessboard
          chess={chess}
          board={board}
          socket={socket}
          setBoard={setBoard}
        />
      ) : (
        <DummyBoard board={board} />
      )}
      <div className="w-full h-full flex justify-center">
        <button
          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Play
        </button>
      </div>
    </div>
  )
}

export default Landing
