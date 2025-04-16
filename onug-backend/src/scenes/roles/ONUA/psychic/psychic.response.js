import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateCardSelection } from '../../../validators'

export const psychicResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const limit = gamestate.players[token].player_history[title].selectable_card_limit.player
  const showCards = getCardIdsByPositions(gamestate?.card_positions, selected_card_positions.slice(0, limit))

  if (showCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
    gamestate.players[token].card.player_card_id = 87
  }
  const viewCards = showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: viewCards,
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
