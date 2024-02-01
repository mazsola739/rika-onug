const {logTrace, logErrorWithStack} = require("../log")
const {repository} = require("../repository")
const {deleteAllGameStates, readAllGameStates} = repository

exports.deleteAllGameStates = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD delete all game states endpoint triggered: ${JSON.stringify(body)}`)
    const response = await deleteAllGameStates()
    const gameStates = await readAllGameStates()
    response.gameStates = gameStates

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
