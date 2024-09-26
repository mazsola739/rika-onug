import { HYDRATE_GAME_VOTE, REDIRECT } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateGameVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME_VOTE,
    })
  )
}
