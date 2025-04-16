import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const troublemakerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const [position1, position2] = selected_card_positions.slice(0, 2)
  const playerOneCard = { ...gamestate.card_positions[position1].card }
  const playerTwoCard = { ...gamestate.card_positions[position2].card }

  gamestate.card_positions[position1].card = playerTwoCard
  gamestate.card_positions[position2].card = playerOneCard

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [position1, position2],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([position1, position2])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
