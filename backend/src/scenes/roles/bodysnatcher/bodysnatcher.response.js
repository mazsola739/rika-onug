import { getPlayerNumberWithMatchingToken, getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const bodysnatcherResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerCard = {
    ...gamestate.positions.card_positions[currentPlayerNumber].card
  }
  const selectedCard = {
    ...gamestate.positions.card_positions[selected_card_positions[0]].card
  }
  gamestate.positions.card_positions[currentPlayerNumber].card = selectedCard
  gamestate.positions.card_positions[selected_card_positions[0]].card = currentPlayerCard
  gamestate.positions.card_positions[currentPlayerNumber].card.team = 'alien'
  gamestate.positions.card_positions[currentPlayerNumber].card.role = 'ALIEN'

  gamestate.players[token].card.player_card_id = gamestate.positions.card_positions[currentPlayerNumber].card.id
  gamestate.players[token].card.player_team = gamestate.positions.card_positions[currentPlayerNumber].card.team
  gamestate.players[token].card.player_role = gamestate.positions.card_positions[currentPlayerNumber].card.role

  const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'action_own_card'],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
