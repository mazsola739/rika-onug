import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, swapCards, updateCardRoleAndTeam, updatePlayerKnownCard } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const bodysnatcherResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)
  updateCardRoleAndTeam(gamestate, currentPlayerNumber, 'ALIEN', 'alien')

  const { id, role, team } = gamestate.positions.card_positions[currentPlayerNumber].card
  const { player_role_id } = gamestate.players[token].card
  updatePlayerKnownCard(gamestate, token, id, role, player_role_id, team)

  const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'action_own_card'],
    showCards,
    uniqueInformation: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
