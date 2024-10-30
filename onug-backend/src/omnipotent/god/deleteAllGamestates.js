import { logErrorWithStack, logTrace } from '../../log'
import { readAllGamestates, removeAllGamestates } from '../../repository'

export const deleteAllGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(
      `GOD delete all gamestates endpoint triggered: ${JSON.stringify(body)}`
    )
    const response = await removeAllGamestates()
    const gamestates = await readAllGamestates()
    response.gamestates = gamestates

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
