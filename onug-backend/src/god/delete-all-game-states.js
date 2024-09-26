import { logTrace, logErrorWithStack } from '../log'
import { deleteAllGameStates, readAllGameStates } from '../repository'

export const delete_all_gamestates = async (req, res) => {
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
