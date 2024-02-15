const { logTrace, logErrorWithStack } = require("../log")
const { websocketServerConnectionsPerRoom } = require("../websocket/connections")

exports.sendMessageToPlayer = async (req, res) => {
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
}
