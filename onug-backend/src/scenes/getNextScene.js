import { logErrorWithStack, logTrace } from '../log'
import { scene } from './scene'

export const getNextScene = gamestate => {
  try {
    if (gamestate.game_stopped || !gamestate.actual_scene) {
      logErrorWithStack(`Game in room ${gamestate.room_id} has stopped or has no actual scene.`)
      return gamestate
    }

    if (gamestate.game_paused) {
      logErrorWithStack(`Game in room ${gamestate.room_id} is paused. No scene progression allowed.`)
      return gamestate
    }

    if (gamestate.scene_locked) {
      logTrace(`Scene in room ${gamestate.room_id} is locked. Staying on the current scene.`)
      return gamestate
    }

    let newGamestate = { ...gamestate }

    newGamestate.actual_scene.scene_number++
    newGamestate = scene(newGamestate)

    //TODO vote the last?
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
