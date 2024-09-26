import { logTrace, logErrorWithStack } from '../log'
import { readAllGameStates } from '../repository'

export const checkGameStates = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD check game states endpoint triggered: ${JSON.stringify(body)}`)
    const gameStates = await readAllGameStates()

    logTrace(`sending back game states: ${JSON.stringify(gameStates)}`)

    return res.send({
      gameStates,
    })
  } catch
    (error) {
    logErrorWithStack(error)
  }
}
