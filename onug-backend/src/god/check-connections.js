//@ts-check
import { logTrace, logErrorWithStack } from '../log';
import { websocketServerConnectionsPerRoom } from '../websocket/connections';

export const checkConnections = async (req, res) => {
  try {
    logTrace(`GOD check connections endpoint triggered`)
    const connectionsPerRoom = Object.keys(websocketServerConnectionsPerRoom).map(
      room => {
        return {[room]: Object.keys(websocketServerConnectionsPerRoom[room])}
      }
    )

    return res.send({
      connectionsPerRoom,
    })
  } catch (error) {
    logErrorWithStack(error)
  }
};
