import { logErrorWithStack, logTrace } from '../../log'
import { webSocketServerConnectionsPerRoom } from '../../websocket/connections'

export const checkConnections = async (req, res) => {
  try {
    logTrace(`GOD check connections endpoint triggered`)
    const connectionsPerRoom = Object.keys(webSocketServerConnectionsPerRoom).map(room => {
      return { [room]: Object.keys(webSocketServerConnectionsPerRoom[room]) }
    })

    return res.send({
      connectionsPerRoom
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
