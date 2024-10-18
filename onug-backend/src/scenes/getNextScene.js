import { logErrorWithStack } from '../log'
import { webSocketServerConnectionsPerRoom } from '../websocket/connections'
import { scene } from './scene'

//TODO set tickTime each narration different

export const getNextScene = gamestate => {
  try {
    if (!gamestate.actual_scene) return // game already stopped

    let newGamestate = { ...gamestate }

    const startTime = Date.now()
    newGamestate.actual_scene.scene_start_time = startTime
    newGamestate.actual_scene.scene_number++

    newGamestate = scene(newGamestate)

    newGamestate.scene.forEach((item) => {
      webSocketServerConnectionsPerRoom[newGamestate.room_id][item.token].send(
        JSON.stringify(item)
      )
    })

    if (newGamestate.actual_scene.scene_title === 'VOTE') {
      newGamestate.game_stopped = true
      return newGamestate
    }

    if (!newGamestate.actual_scene.started) return getNextScene(newGamestate)

    return newGamestate
  } catch (error) {
    logErrorWithStack(error)
    return
  }
}
