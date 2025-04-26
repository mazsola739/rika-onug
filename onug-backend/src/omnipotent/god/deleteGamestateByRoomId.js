import { logErrorWithStack, logTrace } from '../../log'
import { removeRoomGamestateById, removeRoomGamestateById_ } from '../../repository'

export const deleteGamestateByRoomId = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete gamestate by room_id endpoint triggered: ${JSON.stringify(body)}`)
    const { room_id } = req.query
    const response = { gamestates: await removeRoomGamestateById(room_id), gamestates_: await removeRoomGamestateById_(room_id) }

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
