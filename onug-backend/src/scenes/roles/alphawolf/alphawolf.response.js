import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

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

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}

/* const responseAction = ( gamestate, token, selected_card_position, title) => {
  const centerWolf = { ...gamestate.card_positions.center_wolf.card }
  const selectedCard = {
    ...gamestate.card_positions[selected_card_position].card
  }
  gamestate.card_positions.center_wolf.card = selectedCard
  gamestate.card_positions[selected_card_position].card = centerWolf

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    swapped_cards: [selected_card_position, 'center_wolf']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_position, 'center_wolf'])

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    scene_end: true
  })
}
 */
