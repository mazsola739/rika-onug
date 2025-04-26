import { logErrorWithStack, logTrace } from '../../log'
import { readAllGamestates, readAllGamestates_, removeAllGamestates, removeAllGamestates_ } from '../../repository'

export const deleteAllGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete all gamestates endpoint triggered: ${JSON.stringify(body)}`)

    const response = {
      ...await removeAllGamestates(),
      ...await removeAllGamestates_(),
      gamestates: await readAllGamestates(),
      gamestates_: await readAllGamestates_()
    }

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
