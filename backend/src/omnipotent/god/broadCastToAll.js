import { logErrorWithStack, logTrace } from '../../log'
import { sendMessage, webSocketServerConnectionsPerRoom } from '../../utils/connections.utils'

export const broadCastToAll = async (req, res) => {
  try {
    const { message } = req.body
    logTrace('GOD broadcast to all endpoint triggered', message)
    Object.keys(webSocketServerConnectionsPerRoom).forEach(room => {
      Object.values(webSocketServerConnectionsPerRoom[room]).forEach(ws => sendMessage(ws, message))
    })

    return res.send({
      messages: 'has been sent to all players'
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
