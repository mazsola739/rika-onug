//@ts-check
import { logTrace, logDebug } from '../log';
import { sceneHandler } from './scene-handler';
import script from '../data/script.json';
import _ from 'lodash';

const scriptOrder = [
  script.twilight,
  script.dusk,
  script.night,
  script.ripple,
  script.day,
].flatMap((x) => x)

//TODO RIPPLE

export const scene = (gameState) => {
  const { room_id } = gameState
  logTrace(`Scene playing for players in room: ${room_id}`)

  let newGameState = { ...gameState }
  newGameState.scene = []
  newGameState.actual_scene.scene_title =
    scriptOrder[newGameState.actual_scene.scene_number].scene_title
  
  const entries = sceneHandler(newGameState)

  Object.entries(entries).forEach(([key, value]) => {
    _.update(newGameState, key, () => value)
  })

  if (!entries["actual_scene.started"]) {
    newGameState.actual_scene.started = false
  }

  if (newGameState.actual_scene) {
    newGameState = sceneHandler(newGameState)
    logDebug(`__INTERACTION__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number} role_interaction: ${JSON.stringify(newGameState?.scene)}`)
  } else {
    logDebug("No actual_scene found in gameState.")
    logDebug("gameState:", JSON.stringify(newGameState)) // Log the entire gameState object
  }

  logDebug(
    `__SCENE__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number
    } STARTED: ${newGameState.actual_scene.started} scene_title: ${scriptOrder[newGameState.actual_scene.scene_number].scene_title
    }`
  )

  return newGameState
}
