import { Color, PieceSymbol, Square } from 'chess.js'

const DummyBoard = ({
  board,
}: {
  board: ({
    square: Square
    type: PieceSymbol
    color: Color
  } | null)[][]
}) => {
  return (
    <div className="w-full h-full">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              return (
                <div
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
                          src={`src/assets/${
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

export default DummyBoard
