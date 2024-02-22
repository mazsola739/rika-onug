//@ts-check
import { logTrace, logErrorWithStack } from '../log';
import { deletePlayerByToken, repository } from '../repository';

export const delete_player_by_token = async (req, res) => {
  try {


    const {body} = req
    logTrace(`GOD delete all players endpoint triggered: ${JSON.stringify(body)}`)
    const {token} = req.query
    const response = await deletePlayerByToken(token)

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
};
