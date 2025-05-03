import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const checkGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check gamestates endpoint triggered: ${JSON.stringify(body)}`)
    const response = await repo[repositoryType].readAllGamestates()

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
