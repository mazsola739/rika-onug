import { logErrorWithStack, logTrace } from '../../log'
import { readAllGamestates } from '../../repository'

export const checkGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check gamestates endpoint triggered: ${JSON.stringify(body)}`)
    const response = await readAllGamestates()

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
