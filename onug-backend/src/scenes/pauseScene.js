import { tick } from './tick'

export const pauseScene = gamestate => {
  const newGamestate = {...gamestate}
  newGamestate.game_paused = !newGamestate.game_paused

  const now = Date.now()
  if (newGamestate.game_paused) {
    const remainingTime = newGamestate.actual_scene.scene_end_time - now
    newGamestate.actual_scene.remaining_time = remainingTime
  } else {
    const newSceneEndTime = now + newGamestate.actual_scene.remaining_time
    newGamestate.actual_scene.scene_end_time = newSceneEndTime

    setTimeout(() => tick(newGamestate.room_id), newGamestate.actual_scene.remaining_time)
  }

  return newGamestate
}