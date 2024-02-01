const {logTrace, logErrorWithStack} = require("../log")
const {websocketServerConnectionsPerRoom} = require("../websocket/connections")

exports.checkConnections = async (req, res) => {
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
}
