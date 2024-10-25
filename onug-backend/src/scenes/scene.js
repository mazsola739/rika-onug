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

  newGamestate.actual_scene.scene_title = script[newGamestate.actual_scene.scene_number]?.scene_title

  const entries = sceneHandler(newGamestate)
  Object.entries(entries).forEach(([key, value]) => _.update(newGamestate, key, () => value))

  if (!entries['actual_scene.started']) {
    newGamestate.actual_scene.started = false
  }

  if (newGamestate.actual_scene) {
    newGamestate = sceneHandler(newGamestate)
    logDebug(`SCENE_NUMBER: ${newGamestate.actual_scene.scene_number} - Scene Interaction Processed`)
  } else {
    logDebug('No actual_scene found in gamestate.')
  }

  logDebug(`SCENE_NUMBER: ${newGamestate.actual_scene.scene_number}, STARTED: ${newGamestate.actual_scene.started}, TITLE: ${newGamestate.actual_scene.scene_title}`)

  return newGamestate
}
