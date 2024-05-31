import { Chess, Color, PieceSymbol, Square } from 'chess.js'
import React, { useContext, useState } from 'react'
import { MOVE } from '../constants'
import { ChessContext } from '../context/chessContext'

const Chessboard = ({
  chess,
  board,
  socket,
  setBoard,
}: {
  chess: Chess
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square
        type: PieceSymbol
        color: Color
      } | null)[][]
    >
  >
  board: ({
    square: Square
    type: PieceSymbol
    color: Color
  } | null)[][]
  socket: WebSocket
}) => {
  const [from, setFrom] = useState<null | Square>(null)
  const { chessData } = useContext(ChessContext)

  return (
    <div className="w-full h-full">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                '' +
                (8 - i)) as Square

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      const res = chess.get(squareRepresentation)
                      console.log('res', res)
                      if (
                        chessData.color.charAt(0).toLowerCase() === res.color
                      ) {
                        setFrom(squareRepresentation)
                      } else {
                        console.log('wrong side color pick')
                      }
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      )

                      setFrom(null)
                      chess.move({
                        from,
                        to: squareRepresentation,
                      })
                      setBoard(chess.board())
                      console.log({
                        from,
                        to: squareRepresentation,
                      })
                    }
                  }}
                  key={j}
                  className={`w-20 h-20 ${
                    (i + j) % 2 === 0 ? 'bg-white' : 'bg-slate-500'
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-18"
                          src={`/assets/${
                            square?.color === 'b'
                              ? `b${square?.type}`
                              : `w${square?.type}`
                          }.png`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Chessboard
