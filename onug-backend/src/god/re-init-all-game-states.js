//@ts-check
import { logTrace, logErrorWithStack } from '../log'
import { reInitializeAllGameStates } from '../repository'

export const reInitAllGameStates = async (req, res) => {
  try {
    const {body} = req
    logTrace(`GOD re-initialize all game states endpoint triggered: ${JSON.stringify(body)}`)
    const response = {gameStates: await reInitializeAllGameStates()}

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
