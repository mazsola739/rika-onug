import { ALL_COPY_PLAYER, MASONS } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { masonsInteraction } from './masons.interaction'

export const masons = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['masons_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (MASONS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER].includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = masonsInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
