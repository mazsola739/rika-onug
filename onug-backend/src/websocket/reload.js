//@ts-check
import { logError, logTrace } from '../log'
import { websocketServerConnectionsPerRoom } from './connections'

export const reload = (ws, message) => {
  try {
    logTrace("reload happened on the client side")
    const { token } = message

    if (token && ws.token && ws.token === token) {
      logTrace(`refreshing websocket reference for token [${token}]`)

      const room_ids = Object.keys(websocketServerConnectionsPerRoom)
      room_ids.forEach((room_id) => {
        if (websocketServerConnectionsPerRoom[room_id][token]) websocketServerConnectionsPerRoom[room_id][token] = ws
      })
    }
  } catch (error) {
    logError(error)
  }
}
