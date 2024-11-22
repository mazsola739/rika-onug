import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const exposerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.center)
  const revealedCards = getCardIdsByPositions(gamestate.card_positions, cardPositions)

  gamestate.flipped_cards.push(...revealedCards)

  if (revealedCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: cardPositions,
    flipped_cards: revealedCards,
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_flipped_card', formatPlayerIdentifier(cardPositions)],
    showCards: revealedCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
