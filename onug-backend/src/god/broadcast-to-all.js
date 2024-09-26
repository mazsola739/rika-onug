import { logTrace, logErrorWithStack } from '../log'
import { websocketServerConnectionsPerRoom } from '../websocket/connections'

export const broadCastToAll = async (req, res) => {
  try {
    const { message } = req.body
    logTrace('GOD broadcast to all endpoint triggered', message)
    Object.keys(websocketServerConnectionsPerRoom).forEach(
      room => {
        Object.values(websocketServerConnectionsPerRoom[room])
          .forEach(ws => ws.send(JSON.stringify(message)))
      })
    

    return res.send({
      messages: 'has been sent to all players',
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
