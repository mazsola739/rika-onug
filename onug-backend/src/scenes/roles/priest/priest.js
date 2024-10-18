import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { priestInteraction } from "./priest.interaction"

export const priest = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'priest') {
      if (card.player_original_id === 37 || (card.player_role_id === 37 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = priestInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (card.player_role_id === 37 && card.player_original_id === 1) {
        interaction = priestInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
