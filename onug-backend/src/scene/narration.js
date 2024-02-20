const { logTrace, logDebug } = require("../log")
const { sceneHandler } = require("./scene-handler")
const script = require("../data/script.json")
const _ = require("lodash")

const scriptOrder = [
  script.twilight,
  script.dusk,
  script.night,
  script.ripple,
  script.day,
].flatMap((x) => x)

//TODO RIPPLE

exports.narration = (gameState) => {
  const { room_id } = gameState.room_id
  logTrace(`Narration playing for players in room: ${room_id}`)

  const newGameState = { ...gameState }
  newGameState.actual_scene.scene_title =
    scriptOrder[newGameState.actual_scene.scene_number].scene_title

  //? what this lodash update actually does: updates newGameState with nested levels of various fields.
  //? For example: 'actual_scene.narration' key and the related value will be set inside newGameState.actual_scene.narration = [something],
  //? also sometimes other fields, like: oracle_answer: 'some_oracle_answer' will be set as well.
  const entries = sceneHandler(newGameState)
  Object.entries(entries).forEach(([key, value]) => {
    _.update(newGameState, key, () => value)
  })
  //TODO null?
  if (!entries["actual_scene.narration"]) {
    newGameState.actual_scene.narration = null
  }

  logDebug(
    `__NARRATION__ SCENE_NUMBER: ${newGameState.actual_scene.scene_number
    } TEXT: ${newGameState.actual_scene.narration} scene_title: ${scriptOrder[newGameState.actual_scene.scene_number].scene_title
    }`
  )

  return newGameState
}
