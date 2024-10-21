import { HYDRATE_GAME, REDIRECT } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'
import { isGameStopped } from '../utils'

export const hydrateGame = async (ws, message) => {
  logTrace(`hydrate game play ${JSON.stringify(message)}`)

  const { room_id } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  if (isGameStopped(gamestate))
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
