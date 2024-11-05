import { COPY_PLAYER } from "../../../constants"
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { pickpocketInteraction } from './pickpocket.interaction'

export const pickpocket = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'pickpocket') {
      if (card.player_original_id === 36 || (card.player_role_id === 36 && COPY_PLAYER.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_pickpocket') {
      if (card.player_role_id === 36 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = pickpocketInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
