import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, swapCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'



export const alphawolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  swapCards(gamestate, 'center_wolf', selected_card_positions[0], token)

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_wolf'])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { swapped_cards: [selected_card_positions[0], 'center_wolf'], new_werwolf: [selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
