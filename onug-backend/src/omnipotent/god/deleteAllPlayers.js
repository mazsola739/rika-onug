import { logTrace, logErrorWithStack } from "../../log"
import { removeAllPlayers } from "../../repository"
import { initWebSocketConnections } from "../../websocket/connections"

export const deleteAllPlayers = async (req, res) => {
  try {
    const { body } = req
    logTrace('GOD delete all players endpoint triggered', body)
    const response = await removeAllPlayers()
    initWebSocketConnections()

    logTrace(`sending back gamestates: ${JSON.stringify(response)}`)

    return res.send(response)
  } catch (error) {
    logErrorWithStack(error)
  }
}
