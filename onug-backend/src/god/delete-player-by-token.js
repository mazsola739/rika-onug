const { logTrace } = require("../log")
const { repository } = require("../repository")
const { deletePlayerByToken } = repository

exports.deletePlayerByToken = async (req, res) => {
  const { body } = req
  logTrace(`GOD delete all players endpoint triggered: ${JSON.stringify(body)}`)
  const { token } = req.query
  const response = await deletePlayerByToken(token)

  logTrace(`sending back game states: ${JSON.stringify(response)}`)
  
  return res.send(response)
}
