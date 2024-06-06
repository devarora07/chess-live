import { useEffect, useState } from 'react'
import { INIT_GAME, MOVE } from '../constants'

// const WS_URL = 'ws://localhost:5050'
const WS_URL = 'wss://animeselfie.com/chess/'

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const handleMessage = (message: any) => {
    if (!socket) return
    switch (message.type) {
      case INIT_GAME:
        {
          socket.send(
            JSON.stringify({
              type: INIT_GAME,
            })
          )
        }
        break
      case MOVE:
        {
          socket.send(
            JSON.stringify({
              type: MOVE,
              payload: {
                move: {
                  to: message.to,
                  from: message.from,
                },
              },
            })
          )
        }
        break

      default:
        console.log('no type found..')
    }
  }

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    ws.onopen = () => {
      setSocket(ws)
    }

    ws.onclose = () => {
      setSocket(null)
    }

    return () => {
      ws.close()
    }
  }, [])

  return { socket, handleMessage }
}
