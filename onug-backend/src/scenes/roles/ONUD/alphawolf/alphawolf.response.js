import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateCardSelection } from '../../../validators'

export const alphawolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  const centerWolf = { ...gamestate.card_positions.center_wolf.card }
  const selectedCard = {
    ...gamestate.card_positions[selected_card_positions[0]].card
  }
  gamestate.card_positions.center_wolf.card = selectedCard
  gamestate.card_positions[selected_card_positions[0]].card = centerWolf

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_wolf']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_wolf'])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(ws, gamestate, token, title, action, narration)

  return gamestate
}
