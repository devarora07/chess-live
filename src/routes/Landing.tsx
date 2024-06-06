import { useContext, useEffect, useState } from 'react'
import { useSocket } from '../hooks/usesocket'
import Chessboard from '../components/ChessBoard'
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE, PENDING_USER } from '../constants'
import { ChessContext } from '../context/chessContext'
import Wrapper from '../components/Wrapper'
import Loader from '../components/Loader'
import { TailSpin, ThreeDots } from 'react-loader-spinner'

const Landing = () => {
  const { socket, handleMessage } = useSocket()
  const [chess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  const [waiting, setWaiting] = useState(false)
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
          setWaiting(false)
          setBoard(chess.board())
          setChessData((prev: any) => {
            return {
              ...prev,
              started: true,
              color: message.payload.message.color,
            }
          })

          break
        case PENDING_USER:
          console.log('pending user called')
          setWaiting(true)
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

  if (!socket)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )

  return (
    <Wrapper>
      {chessData.started ? (
        <Chessboard
          started={chessData.started}
          chess={chess}
          board={board}
          socket={socket}
          setBoard={setBoard}
        />
      ) : (
        <Chessboard board={board} started={chessData.started} />
      )}
      <div className=" w-full h-full flex items-center justify-center bg-slate-300">
        {chessData.started ? (
          <div>
            <p className="text-xl">Good Luck!</p>
            <p className="text-xl">You are {chessData.color}</p>
          </div>
        ) : waiting ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl pb-10">Waiting for player to join</p>
            <TailSpin
              color="#64748b"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              height={30}
              width={30}
            />
          </div>
        ) : (
          <button
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Play
          </button>
        )}
      </div>
    </Wrapper>
  )
}

export default Landing
