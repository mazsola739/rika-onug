import { HYDRATE_GAME_PLAY, REDIRECT } from '../constant'
import { logTrace } from '../log'
import { readGameState } from '../repository'
import { isGamePlayStopped } from '../utils'

export const hydrateGamePlay = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)

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
      type: HYDRATE_GAME_PLAY,
      actual_scene,
    })
  )
}
