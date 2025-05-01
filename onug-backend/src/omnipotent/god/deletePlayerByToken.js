import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const deletePlayerByToken = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD delete all players endpoint triggered: ${JSON.stringify(body)}`)
    const { token } = req.query
    const response = await repo[repositoryType].removePlayerByToken(token)

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
