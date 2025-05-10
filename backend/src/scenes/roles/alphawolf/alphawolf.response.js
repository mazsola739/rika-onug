import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const alphawolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const centerWolf = { ...gamestate.positions.card_positions.center_wolf.card }
  const selectedCard = {
    ...gamestate.positions.card_positions[selected_card_positions[0]].card
  }
  gamestate.positions.card_positions.center_wolf.card = selectedCard
  gamestate.positions.card_positions[selected_card_positions[0]].card = centerWolf

  gamestate.players[token].card_or_mark_action = true

  const uniqueInformation = {
    swapped_cards: [selected_card_positions[0], 'center_wolf']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_wolf'])

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    uniqueInformation,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
