import { Chess, Color, PieceSymbol, Square } from 'chess.js'

export interface ChessDataState {
  started: boolean
  color: Color | null
  chess: Chess
  board: ({
    square: Square
    type: PieceSymbol
    color: Color
  } | null)[][]
  waiting: boolean
}
