import { logErrorWithStack, logTrace } from '../../log'
import { sendMessage, webSocketServerConnectionsPerRoom } from '../../utils/connections.utils'

export const broadCastToAllInRoom = async (req, res) => {
  try {
    const { message, room_id } = req.body
    logTrace('GOD broadcast to all endpoint triggered', `${room_id}: ${message}`)

    Object.values(webSocketServerConnectionsPerRoom[room_id]).forEach(ws => sendMessage(ws, message))

    return res.send({
      messages: `has been sent to all players in room: ${room_id}. PlayerTokens: ${Object.keys(webSocketServerConnectionsPerRoom[room_id])}`
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
