//@ts-check
import { HYDRATE_GAME_VOTE, REDIRECT } from '../constant'
import { logTrace } from '../log'
import { readGameState } from '../repository'

export const hydrateGameVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)
  const newGameState = {...gameState}

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME_VOTE,
    })
  )
}
