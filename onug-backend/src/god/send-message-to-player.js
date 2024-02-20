import { logTrace, logErrorWithStack } from '../log';
import { websocketServerConnectionsPerRoom } from '../websocket/connections';

export const sendMessageToPlayer = async (req, res) => {
  try {
    const { message, token } = req.body
    logTrace('GOD send message to player endpoint triggered', message, token)
    Object.keys(websocketServerConnectionsPerRoom).forEach(
      room => {
        const connectionsEntry = Object.entries(websocketServerConnectionsPerRoom[room])
        for (let [playerToken, ws] of connectionsEntry)
          if (playerToken === token) {
            ws.send(JSON.stringify(message))
            break
          }
      })
    return res.send({
      message: 'has been sent to player',
    })
  } catch (error) {
    logErrorWithStack(error)
  }
};
