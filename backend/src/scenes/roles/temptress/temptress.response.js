import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, swapCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const temptressResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  swapCards(gamestate, selected_card_positions[0], 'center_villain', token)

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_villain'])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { swapped_cards: [selected_card_positions[0], 'center_villain'], new_villain: [selected_card_positions[0]] }
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
