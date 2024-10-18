import { IDS, SCENE } from "../../../constants"
import { getAllPlayerTokens, getSceneEndTime } from "../../sceneUtils"
import { auraseerInteraction } from "./auraseer.interaction"

export const auraseer = (gamestate, title, hasDoppelganger, hasMarks) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_auraseer_kickoff_text'
      : 'auraseer_kickoff_text',
    hasMarks ? 'auraseer_marks_and_cards_text' : 'auraseer_cards_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 72 || (card.player_role_id === 72 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = auraseerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
