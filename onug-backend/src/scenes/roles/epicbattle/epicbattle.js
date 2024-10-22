import { SCENE } from "../../../constants"
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from "../../sceneUtils"
import { everyonemarkInteraction } from "../everyonemark/everyonemark.interaction"
import { random_easteregg_nobadguys, random_easteregg_nogoodguys } from "./epicbattle.constants"

export const epicbattle = (gamestate, title, hasEasterEgg, hasEpicBattle, totalPlayers, nogoodguys, nobadguys) => {
  if (hasEpicBattle) {
    return ['everyone_epic_intro_text']
  }
  
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = []
  const actionTime = 8

  if (hasEasterEgg) {
    if (totalPlayers === 12) {
      narration.push('easteregg_really_text', 'easteregg_whatever_text')
    } else if (nobadguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nobadguys), 'easteregg_whatever_text')
    } else if (nogoodguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nogoodguys), 'easteregg_whatever_text')
    }
  }

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemarkInteraction(newGamestate, token, title)

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
