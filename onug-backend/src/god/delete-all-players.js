const { logTrace } = require("../log")
const { repository } = require("../repository")
const { getInitWebSocketConnections } = require("../websocket/connections")
const { deleteAllPlayers } = repository

exports.deleteAllPlayers = async (req, res) => {
  const { body } = req
  logTrace(`GOD delete all players endpoint triggered: ${JSON.stringify(body)}`)
  const response = await deleteAllPlayers()
  getInitWebSocketConnections()()

  logTrace(`sending back game states: ${JSON.stringify(response)}`)
  
  return res.send(response)
}
