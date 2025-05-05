import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { initWebSocketConnections } from '../../utils/connections.utils'

export const deleteAllPlayers = async (req, res) => {
  try {
    const { body } = req
    logTrace('GOD delete all players endpoint triggered', body)

    const response = await repo[repositoryType].removeAllPlayers()
    initWebSocketConnections()

    /* logTrace(`sending back gamestates: ${JSON.stringify(response)}`) */

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
