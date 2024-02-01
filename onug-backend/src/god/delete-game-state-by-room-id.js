const {logTrace} = require("../log")
const {repository} = require("../repository")
const {deleteGameStateByRoomId} = repository

exports.deleteGameStateByRoomId = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD delete game state by room_id endpoint triggered: ${JSON.stringify(body)}`)
    const {room_id} = req.query
    const response = await deleteGameStateByRoomId(room_id)

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorwithStack(error)
  }
}
