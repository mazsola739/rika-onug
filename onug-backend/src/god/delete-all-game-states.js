const { logTrace } = require("../log")
const { repository } = require("../repository")
const { deleteAllGameStates } = repository

exports.deleteAllGameStates = async (req, res) => {
  const { body } = req
  logTrace(`GOD delete all game states endpoint triggered: ${JSON.stringify(body)}`)
  const response = await deleteAllGameStates()

  logTrace(`sending back game states: ${JSON.stringify(response)}`)
  return res.send(response)
}
