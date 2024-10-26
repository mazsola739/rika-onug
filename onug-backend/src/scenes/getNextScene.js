import script from '../data/script.json'
import { logDebug, logErrorWithStack, logTrace } from '../log'

export const getNextScene = (gamestate) => {
  logTrace(`Entering getNextScene for room ${gamestate.room_id} for ${gamestate.actual_scene.scene_title}`)
  try {
    if (gamestate.game_stopped || gamestate.game_paused || gamestate.scene_locked || !gamestate.actual_scene) {
      const status = gamestate.game_stopped
        ? 'stopped'
        : gamestate.game_paused
        ? 'paused'
        : 'locked or no actual scene'
      logErrorWithStack(`Game in room ${gamestate.room_id} is ${status}.`)
      return gamestate
    }

    logDebug(`Current scene in room ${gamestate.room_id} is ${JSON.stringify(gamestate.actual_scene)}`)

    const currentSceneIndex = script.findIndex(scene => scene.scene_number === gamestate.actual_scene.scene_number)
    if (currentSceneIndex === -1) {
      logErrorWithStack("Error: Current scene not found in script.")
      return gamestate
    }

    logDebug(`Current scene index is ${currentSceneIndex} for room ${gamestate.room_id}`)
  
    const nextScene = script[currentSceneIndex + 1]
    if (!nextScene) {
      logTrace("End of scenes reached.")
      return { ...gamestate, game_finished: true, actual_scene: { ...gamestate.actual_scene, scene_title: 'END' } }
    }

    logDebug(`Transitioning to next scene: ${JSON.stringify(nextScene)} for room ${gamestate.room_id}`)

    return {
      ...gamestate,
      actual_scene: {
        ...gamestate.actual_scene,
        scene_title: nextScene.scene_title,
        scene_number: nextScene.scene_number
      },
      scene_locked: true
    }

  } catch (error) {
    logErrorWithStack(error)
    return gamestate
  }
}


export const unlockScene = (gameState) => {
  return { ...gameState, scene_locked: false }
}

export const updateGameState = (currentGameState) => {
  logDebug("Attempting to progress to the next scene...")

  let updatedGameState = getNextScene(currentGameState)

  if (updatedGameState.actual_scene.scene_title !== currentGameState.actual_scene.scene_title) {
    logDebug(`Transitioned to new scene: ${updatedGameState.actual_scene.scene_title}`)
  } else {
    logDebug("Scene transition not permitted in current game state.")
  }

  return updatedGameState
}

export const readyNextScene = (currentGameState) => {
  return unlockScene(currentGameState) 
}
