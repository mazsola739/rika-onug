import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const mysticwolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedPositionCard = gamestate.card_positions[selected_card_positions[0]].card
  const viewCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])

  if (gamestate.players[token]?.card?.original_id === selectedPositionCard.id) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
    showCards: viewCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
