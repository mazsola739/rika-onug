import { logErrorWithStack, logTrace } from '../../log'
import { readAllGamestates, readAllGamestates_, removeAllGamestates, removeAllGamestates_ } from '../../repository'

export const deleteAllGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete all gamestates endpoint triggered: ${JSON.stringify(body)}`)

    /* 'originally' here
    const response = await removeAllGamestates()
    const gamestates = await readAllGamestates()
    response.gamestates = gamestates
     */

    const response = {
      gamestates_: { ...await removeAllGamestates_(), ...await readAllGamestates_() },
      gamestates: { ...await removeAllGamestates(), ...await readAllGamestates() },
    }

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
