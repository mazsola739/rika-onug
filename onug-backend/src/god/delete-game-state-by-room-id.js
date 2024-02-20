import { logTrace } from '../log';
import { repository } from '../repository';
const {deleteGameStateByRoomId} = repository

export const deleteGameStateByRoomId = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD delete game state by room_id endpoint triggered: ${JSON.stringify(body)}`)
    const {room_id} = req.query
    const response = await deleteGameStateByRoomId(room_id)

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
};
