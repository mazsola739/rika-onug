import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const deleteAllGamestates = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete all gamestates endpoint triggered: ${JSON.stringify(body)}`)

    const response = { ...(await repo[repositoryType].removeAllGamestates()), ...(await repo[repositoryType].readAllGamestates()) }

    /* logTrace(`sending back gamestates: ${JSON.stringify(response)}`) */

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
