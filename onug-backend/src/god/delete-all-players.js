import { logTrace, logErrorWithStack } from '../log'
import { deleteAllPlayers } from '../repository'
import { initWebSocketConnections } from '../websocket/connections'

export const delete_all_players = async (req, res) => {
  try {
    const { body } = req
    logTrace('GOD delete all players endpoint triggered', body)
    const response = await deleteAllPlayers()
    initWebSocketConnections()

    logTrace(`sending back game states: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
