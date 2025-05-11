import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, swapCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const bodysnatcherResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)

  gamestate.positions.card_positions[currentPlayerNumber].card.team = 'alien'
  gamestate.positions.card_positions[currentPlayerNumber].card.role = 'ALIEN'

  gamestate.players[token].card.player_card_id = gamestate.positions.card_positions[currentPlayerNumber].card.id
  gamestate.players[token].card.player_team = gamestate.positions.card_positions[currentPlayerNumber].card.team
  gamestate.players[token].card.player_role = gamestate.positions.card_positions[currentPlayerNumber].card.role

  const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'action_own_card'],
    showCards,
    uniqueInformation:  { swapped_cards: [currentPlayerNumber, selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
