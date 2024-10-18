import { HYDRATE_VOTING } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  const player_history = newGamestate.players[token].player_history

  return ws.send(
    JSON.stringify({
      type: HYDRATE_VOTING,
      player_history
    })
  )
}
