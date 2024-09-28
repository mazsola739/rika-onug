import { HYDRATE_GAME, REDIRECT } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'
import { isGamePlayStopped } from '../utils'

export const hydrateGamePlay = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  if (isGamePlayStopped(gamestate))
    return ws.send(
      JSON.stringify({ type: REDIRECT, path: `/room/${room_id}` })
    )

  // TODO get actual scene based on scene_number and player token
  const actual_scene = newGamestate.actual_scene

  return ws.send(
    JSON.stringify({
      type: HYDRATE_GAME,
      actual_scene,
    })
  )
}
