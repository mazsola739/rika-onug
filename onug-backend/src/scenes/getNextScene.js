import { logErrorWithStack } from '../log'
import { webSocketServerConnectionsPerRoom } from '../websocket/connections'
import { scene } from './scene'

export const getNextScene = gamestate => {
  try {
    if (gamestate.game_stopped || !gamestate.actual_scene) return

    if (gamestate.game_paused) {
      logErrorWithStack(`Game in room ${gamestate.room_id} is paused. No scene progression allowed.`)
      return gamestate
    }

    let newGamestate = { ...gamestate }

    newGamestate.actual_scene.scene_number++
    newGamestate = scene(newGamestate)

    newGamestate.scene.forEach((item) => {
      if (webSocketServerConnectionsPerRoom[newGamestate.room_id]?.[item.token]) {
        webSocketServerConnectionsPerRoom[newGamestate.room_id][item.token].send(
          JSON.stringify(item)
        )
      }
    })

    if (newGamestate.actual_scene.scene_title === 'VOTE') {
      newGamestate.game_finished = true
      return newGamestate
    }

    if (!newGamestate.actual_scene.started) return getNextScene(newGamestate)

    return newGamestate

  } catch (error) {
    logErrorWithStack(error)
    return
  }
}
