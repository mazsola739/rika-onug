import { formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const alphawolfResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const centerWolf = { ...newGamestate.card_positions.center_wolf.card }
  const selectedCard = {
    ...newGamestate.card_positions[selected_card_positions[0]].card
  }
  newGamestate.card_positions.center_wolf.card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = centerWolf

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_wolf']
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_wolf'])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
