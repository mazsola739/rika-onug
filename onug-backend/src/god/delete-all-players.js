const {logTrace, logErrorwithStack} = require("../log")
const {repository} = require("../repository")
const {initWebSocketConnections} = require("../websocket/connections")
const {deleteAllPlayers} = repository

exports.deleteAllPlayers = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD delete all players endpoint triggered: ${JSON.stringify(body)}`)
    const response = await deleteAllPlayers()
    initWebSocketConnections()

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorwithStack(error)
  }
}
