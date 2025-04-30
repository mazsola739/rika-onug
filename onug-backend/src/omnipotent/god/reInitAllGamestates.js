import { logErrorWithStack, logTrace } from '../../log'
import { reInitializeAllGamestates } from '../../repository'

export const reInitAllGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD re-initialize all gamestates endpoint triggered: ${JSON.stringify(body)}`)
    const response =await reInitializeAllGamestates()

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
