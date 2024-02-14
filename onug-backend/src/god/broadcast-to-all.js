const { logTrace, logErrorWithStack } = require("../log")
const { websocketServerConnectionsPerRoom } = require("../websocket/connections")

exports.broadCastToAll = async (req, res) => {
  try {
    logTrace(`GOD broadcast to all endpoint triggered`)
    const { message } = req.body
    Object.keys(websocketServerConnectionsPerRoom).forEach(
      room => {
        Object.values(websocketServerConnectionsPerRoom[room])
          .forEach(ws =>
            ws.send(message))
      }
    )

    return res.send({
      messages: 'has been sent to all players',
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
