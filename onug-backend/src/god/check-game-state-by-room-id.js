const {logTrace} = require("../log")
const {repository} = require("../repository")
const {readGameStateByRoomId} = repository

exports.checkGameStateByRoomId = async (req, res) => {
    try {
        const {body} = req
        logTrace(`GOD check game state by room_id endpoint triggered: ${JSON.stringify(body)}`)
        const {room_id} = req.query
        const gameStates = await readGameStateByRoomId(room_id)

        logTrace(`sending back game states: ${JSON.stringify(gameStates)}`)

        return res.send({
            gameStates,
        })
    } catch (error) {
        logErrorWithStack(error)
    }
}
