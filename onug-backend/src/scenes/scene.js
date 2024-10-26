import _ from 'lodash'
import script from '../data/script.json'
import { logDebug, logTrace } from '../log'
import { sceneHandler } from './sceneHandler'
import { getNextScene } from './getNextScene'

//TODO RIPPLE
export const scene = (gamestate) => {
  logTrace(`Scene playing for players in room: ${gamestate.room_id}`)

  const currentScene = script.find(scene => scene.scene_number === gamestate.actual_scene.scene_number)
  if (!currentScene) {
    logDebug(`No scene found for scene number: ${gamestate.actual_scene.scene_number}`)
    return gamestate
  }

  let newGamestate = { ...gamestate, actual_scene: { ...gamestate.actual_scene, scene_title: currentScene.scene_title } }
  const entries = sceneHandler(newGamestate)
  Object.entries(entries).forEach(([key, value]) => _.update(newGamestate, key, () => value))
  newGamestate.actual_scene.started = !!entries['actual_scene.started']

  if (newGamestate.actual_scene.started) {
    const updatedGameState = getNextScene(newGamestate)
    logDebug(`Moving to next scene: ${updatedGameState.actual_scene.scene_title}`)
    return updatedGameState
  } else {
    logDebug('Current scene is still in progress.')
  }

  return newGamestate
}
