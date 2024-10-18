import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from "../../utils"
import { randomBodysnatcherInstructions, bodysnatcherKeys } from "./bodysnatcher.constants"
import { bodysnatcherInteraction } from "./bodysnatcher.interaction"

export const bodysnatcher = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
 //todo better narration
  const actionTime = 8

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

/*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'bodysnatcher') {
      if (card.player_original_id === 74 || (card.player_role_id === 74 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
