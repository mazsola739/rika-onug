import { logErrorWithStack, logTrace } from '../../log'
import { webSocketServerConnectionsPerRoom } from '../../websocket/connections'

export const broadCastToAllInRoom = async (req, res) => {
  try {
    const { message, room_id } = req.body
    logTrace('GOD broadcast to all endpoint triggered', `${room_id}: ${message}`)

    Object.values(webSocketServerConnectionsPerRoom[room_id]).forEach((ws) =>
      ws.send(JSON.stringify(message))
    )

    return res.send({
      messages: `has been sent to all players in room: ${room_id}. PlayerTokens: ${Object.keys(
        webSocketServerConnectionsPerRoom[room_id]
      )}`,
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
