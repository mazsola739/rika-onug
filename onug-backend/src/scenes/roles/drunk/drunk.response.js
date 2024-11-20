import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const drunkResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerCard = {
    ...gamestate.card_positions[currentPlayerNumber].card
  }
  const selectedCard = {
    ...gamestate.card_positions[selected_card_positions[0]].card
  }

  const specialVillagerIds = [30, 1, 29, 28, 64]
  if (specialVillagerIds.includes(selectedCard.id)) {
    selectedCard.role = 'VILLAGER'
    selectedCard.team = 'village'
  }

  gamestate.card_positions[currentPlayerNumber].card = selectedCard
  gamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard

  gamestate.players[token].card.player_card_id = 87
  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
