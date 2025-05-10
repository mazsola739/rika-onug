import {  formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const drunkResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentPlayerCard = {
    ...gamestate.positions.card_positions[currentPlayerNumber].card
  }
  const selectedCard = {
    ...gamestate.positions.card_positions[selected_card_positions[0]].card
  }

  //TODO move it to the constants
  const specialVillagerIds = [30, 1, 29, 28, 64]
  if (specialVillagerIds.includes(selectedCard.id)) {
    selectedCard.role = 'VILLAGER'
    selectedCard.team = 'village'
  }

  gamestate.positions.card_positions[currentPlayerNumber].card = selectedCard
  gamestate.positions.card_positions[selected_card_positions[0]].card = currentPlayerCard

  gamestate.players[token].card.player_card_id = 87
  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
