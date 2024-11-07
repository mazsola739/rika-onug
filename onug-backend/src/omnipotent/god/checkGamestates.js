import { logErrorWithStack, logTrace } from '../../log'
import { readAllGamestates } from '../../repository'

export const checkGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check gamestates endpoint triggered: ${JSON.stringify(body)}`)
    const gamestates = await readAllGamestates()

    logTrace(`sending back gamestates: ${JSON.stringify(gamestates)}`)

    return res.send({
      gamestates
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
