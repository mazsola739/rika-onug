import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const temptressResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const centerVillain = { ...gamestate.card_positions.center_villain.card }
  const selectedCard = {
    ...gamestate.card_positions[selected_card_positions[0]].card
  }
  gamestate.card_positions.center_villain.card = selectedCard
  gamestate.card_positions[selected_card_positions[0]].card = centerVillain

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_villain']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_villain'])

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers]
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
