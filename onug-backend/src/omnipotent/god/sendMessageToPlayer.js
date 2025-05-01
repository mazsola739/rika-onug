import { logErrorWithStack, logTrace } from '../../log'
import { sendMessage, webSocketServerConnectionsPerRoom } from '../../utils/connections.utils'

export const sendMessageToPlayer = async (req, res) => {
  try {
    const { message, token } = req.body
    logTrace('GOD send message to player endpoint triggered', `${message}, ${token}`)
    Object.keys(webSocketServerConnectionsPerRoom).forEach(room => {
      const connectionsEntry = Object.entries(webSocketServerConnectionsPerRoom[room])
      for (let [playerToken, ws] of connectionsEntry)
        if (playerToken === token) {
          sendMessage(ws, message)
          break
        }
    })
    return res.send({
      message: 'has been sent to player'
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
