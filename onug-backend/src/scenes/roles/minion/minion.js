import { ALL_COPY_PLAYER } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from "../../sceneUtils"
import { minionInteraction } from "./minion.interaction"

export const minion = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_minion_kickoff_text'
      : 'minion_kickoff_text',
    'minion_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 7 || (card.player_role_id === 7 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = minionInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
