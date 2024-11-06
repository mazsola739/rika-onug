import { logError, logTrace } from '../log'
import { webSocketServerConnectionsPerRoom } from './connections'

export const reload = (ws, message) => {
  try {
    logTrace('reload happened on the client side')
    const { token } = message

    if (token && ws.token && ws.token === token) {
      logTrace(`refreshing websocket reference for token [${token}]`)

      const room_ids = Object.keys(webSocketServerConnectionsPerRoom)
      room_ids.forEach((room_id) => {
        if (webSocketServerConnectionsPerRoom[room_id][token])
          webSocketServerConnectionsPerRoom[room_id][token] = ws
      })
    }
  } catch (error) {
    logError(error)
  }
}
