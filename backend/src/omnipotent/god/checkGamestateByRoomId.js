import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const checkGamestateByRoomId = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check gamestate by room_id endpoint triggered: ${JSON.stringify(body)}`)
    const { room_id } = req.query
    const response = await repo[repositoryType].readGamestateByRoomId(room_id)

    /* logTrace(`sending back gamestates: ${JSON.stringify(response)}`) */

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
