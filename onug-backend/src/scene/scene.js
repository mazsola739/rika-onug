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
  const { room_id } = gameState.room_id
  logTrace(`Scene playing for players in room: ${room_id}`)

  const newGameState = { ...gameState }
  newGameState.actual_scene.scene_title =
    scriptOrder[newGameState.actual_scene.scene_number].scene_title

  //? what this lodash update actually does: updates newGameState with nested levels of various fields.
  //? For example: 'actual_scene.started' key and the related value will be set inside newGameState.actual_scene.started = [something],
  //? also sometimes other fields, like: oracle_answer: 'some_oracle_answer' will be set as well.
  
  const entries = sceneHandler(newGameState)

  Object.entries(entries).forEach(([key, value]) => {
    _.update(newGameState, key, () => value)
  })
  //TODO null?
  if (!entries["actual_scene.started"]) {
    newGameState.actual_scene.started = false
  }

  logDebug(
    `__SCENE__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number
    } STARTED: ${newGameState.actual_scene.started} scene_title: ${scriptOrder[newGameState.actual_scene.scene_number].scene_title
    }`
  )

  return newGameState
};
