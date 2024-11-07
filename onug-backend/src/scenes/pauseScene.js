import { logTrace } from '../log'

export const pauseScene = gamestate => {
  gamestate.game_paused = !gamestate.game_paused

  if (gamestate.game_paused) {
    logTrace(`Game in room [${gamestate.room_id}] paused at scene ${gamestate.actual_scene.scene_title}`)
    gamestate.actual_scene.started = false
  } else {
    logTrace(`Game in room [${gamestate.room_id}] resumed at scene ${gamestate.actual_scene.scene_title}`)
    gamestate.actual_scene.started = true
  }

  return gamestate
}
