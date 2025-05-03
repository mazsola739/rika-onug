import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const deleteGamestateByRoomId = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete gamestate by room_id endpoint triggered: ${JSON.stringify(body)}`)
    const { room_id } = req.query
    const response = await repo[repositoryType].removeRoomGamestateById(room_id)

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
