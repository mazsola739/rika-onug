//@ts-check
import { HYDRATE_GAME_VOTE, REDIRECT } from '../constant'
import { logTrace } from '../log'
import { readGameState } from '../repository'
import { isGamePlayStopped } from '../utils'

export const hydrateGameVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)
  const newGameState = {...gameState}

  if (isGamePlayStopped(gameState))
    return ws.send(
      JSON.stringify({ type: REDIRECT, path: `/room/${room_id}` })
    )

  // TODO get actual scene based on scene_number and player token
  const actual_scene = newGameState.actual_scene

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME_VOTE,
      actual_scene,
    })
  )
}
