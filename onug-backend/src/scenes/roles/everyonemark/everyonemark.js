import { SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { everyonemarkInteraction } from "./everyonemark.interaction"

export const everyonemark = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['everyone_mark_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemarkInteraction(newGamestate, token, title)

    newGamestate.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
