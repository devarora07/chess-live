import { useContext, useEffect } from 'react'
import { useSocket } from '../hooks/usesocket'
import Chessboard from '../components/ChessBoard'
import { GAME_OVER, INIT_GAME, MOVE, PENDING_USER } from '../constants'
import { ChessContext } from '../context/chessContext'
import Wrapper from '../components/Wrapper'
import Loader from '../components/Loader'
import { TailSpin } from 'react-loader-spinner'

const Landing = () => {
  const { socket, handleMessage } = useSocket()
  const { chessData, setChessData } = useContext(ChessContext)

  console.log('socket', socket)

  useEffect(() => {
    setChessData((prevState) => {
      return { ...prevState, board: chessData.chess.board() }
    })
  }, [])

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('onmessage', message)

      switch (message.type) {
        case INIT_GAME:
          setChessData((prevState: any) => {
            return {
              ...prevState,
              waiting: false,
              board: prevState.chess.board(),
            }
          })
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
          setChessData((prevState) => {
            return { ...prevState, waiting: true }
          })
          break

        case MOVE:
          const { move } = message.payload
          chessData.chess.move(move)
          console.log('move called', move)
          setChessData((prevState) => {
            return {
              ...prevState,
              board: chessData.chess.board(),
            }
          })
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

  const setBoard = (board) => {
    setChessData((prevState) => {
      return { ...prevState, board: board }
    })
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
          chess={chessData.chess}
          board={chessData.board}
          socket={socket}
          setBoard={setBoard}
        />
      ) : (
        <Chessboard board={chessData.board} started={chessData.started} />
      )}
      <div className=" w-full h-full flex items-center justify-center bg-slate-300">
        {chessData.started ? (
          <div>
            <p className="text-xl">Good Luck!</p>
            <p className="text-xl">You are {chessData.color}</p>
          </div>
        ) : chessData.waiting ? (
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
