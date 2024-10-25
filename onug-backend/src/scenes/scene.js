import _ from 'lodash'
import script from '../data/script.json'
import { logDebug, logTrace } from '../log'
import { sceneHandler } from './sceneHandler'

//TODO RIPPLE
export const scene = gamestate => {
  const { room_id } = gamestate
  logTrace(`Scene playing for players in room: ${room_id}`)

  let newGamestate = { ...gamestate }
  newGamestate.scene = []

  const currentSceneNumber = newGamestate.actual_scene.scene_number
  const currentScene = script[currentSceneNumber]

  if (!currentScene) {
    logDebug(`No scene found for scene number: ${currentSceneNumber}`)
    return newGamestate
  }

  newGamestate.actual_scene.scene_title = currentScene.scene_title

  const entries = sceneHandler(newGamestate)
  Object.entries(entries).forEach(([key, value]) => _.update(newGamestate, key, () => value))

  newGamestate.actual_scene.started = !!entries['actual_scene.started']

  logDebug(`SCENE_NUMBER: ${newGamestate.actual_scene.scene_number} - Scene Interaction Processed`)

  if (newGamestate.actual_scene.started) {
    newGamestate.actual_scene.scene_number++
    const nextScene = script[newGamestate.actual_scene.scene_number]
    
    if (nextScene) {
      newGamestate.actual_scene.scene_title = nextScene.scene_title
      logDebug(`Moving to next scene: ${nextScene.scene_title}`)
    } else {
      logDebug(`No more scenes available. Game might be finished.`)
      // TODO VOTE
    }
  } else {
    logDebug('Current scene is still in progress.')
  }

  logDebug(`SCENE_NUMBER: ${newGamestate.actual_scene.scene_number}, STARTED: ${newGamestate.actual_scene.started}, TITLE: ${newGamestate.actual_scene.scene_title}`)

  return newGamestate
}
