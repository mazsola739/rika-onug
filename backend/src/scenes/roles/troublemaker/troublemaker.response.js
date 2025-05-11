import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, swapCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const troublemakerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const [position1, position2] = selected_card_positions.slice(0, 2)

  swapCards(gamestate, position1, position2, token)

  const messageIdentifiers = formatPlayerIdentifier([position1, position2])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { swapped_cards: [position1, position2] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
