import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const exposerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  const limit = gamestate.players[token].player_history[title].selectable_card_limit.center

  const cardPositions = selected_card_positions.slice(0, limit)
  const revealedCards = getCardIdsByPositions(gamestate.positions.card_positions, cardPositions)

  gamestate.positions.flipped_cards.push(...revealedCards)

  if (revealedCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_flipped_card', formatPlayerIdentifier(cardPositions)],
    showCards: revealedCards,
    uniqueInformation: { viewed_cards: cardPositions, flipped_cards: revealedCards },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
