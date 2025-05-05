import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateCardSelection } from '../../../validators'

export const temptressResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const centerVillain = { ...gamestate.positions.card_positions.center_villain.card }
  const selectedCard = {
    ...gamestate.positions.card_positions[selected_card_positions[0]].card
  }
  gamestate.positions.card_positions.center_villain.card = selectedCard
  gamestate.positions.card_positions[selected_card_positions[0]].card = centerVillain

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_villain']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_villain'])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT']
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
