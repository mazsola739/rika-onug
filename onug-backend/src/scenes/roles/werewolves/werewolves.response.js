import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const werewolvesResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
  const selectedPositionCard = gamestate.card_positions[selected_card_positions[0]].card

  if (gamestate.players[token].card.player_original_id === selectedPositionCard.id) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  const private_message = ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
    private_message,
    obligatory: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message,
    showCards,
    obligatory: true,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(ws, gamestate, token, title, action, narration)

  return gamestate
}
