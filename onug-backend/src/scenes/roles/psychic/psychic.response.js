import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const psychicResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const limit = gamestate.players[token].player_history[title].selectable_card_limit.player
  const showCards = getCardIdsByPositions(gamestate?.card_positions, selected_card_positions.slice(0, limit))

  if (showCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
