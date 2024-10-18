import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { curatorInteraction } from "./curator.interaction"

export const curator = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'curator_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'curator') {
      if (card.player_original_id === 20 || (card.player_role_id === 20 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = curatorInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_curator') {
      if (card.player_role_id === 20 && card.player_original_id === 1) {
        interaction = curatorInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
