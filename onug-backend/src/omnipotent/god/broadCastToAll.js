import { logErrorWithStack, logTrace } from '../../log'
import { webSocketServerConnectionsPerRoom } from '../../websocket/connections'

export const broadCastToAll = async (req, res) => {
  try {
    const { message } = req.body
    logTrace('GOD broadcast to all endpoint triggered', message)
    Object.keys(webSocketServerConnectionsPerRoom).forEach((room) => {
      Object.values(webSocketServerConnectionsPerRoom[room]).forEach((ws) =>
        ws.send(JSON.stringify(message))
      )
    })

    return res.send({
      messages: 'has been sent to all players',
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
