import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const randomAlienInstruction = gamestate.alien.instruction

  let showCards = []
  let viewCards = []
  let new_alien = []
  let new_alien_helper = []
  let private_message = []

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
      showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
      if (gamestate.players[token].card.player_original_id === gamestate.card_positions[selected_card_positions[0]].card.id) {
        gamestate.players[token].card.player_card_id = 87
      }

      private_message = ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

      break
    case 'aliens_allview_text':
      gamestate.players[token].card_or_mark_action = true
      if (gamestate.players[token].card.player_original_id === gamestate.card_positions[selected_card_positions[0]].card.id) {
        gamestate.players[token].card.player_card_id = 87
      }
      showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
      viewCards = [selected_card_positions[0]]
      private_message = ['action_voted_together', 'action_saw_card', formatPlayerIdentifier([selected_card_positions[0]])[0]]

      break
    case 'aliens_newalien_text':
      gamestate.card_positions[selected_card_positions[0]].card.role = 'ALIEN'
      gamestate.card_positions[selected_card_positions[0]].card.team = 'alien'
      new_alien = [selected_card_positions[0]]
      private_message = ['action_voted_together', 'action_turned_newalien', formatPlayerIdentifier([selected_card_positions[0]])[0]]

      break
    case 'aliens_alienhelper_text':
      gamestate.card_positions[selected_card_positions[0]].card.team = 'alien'
      new_alien_helper = [selected_card_positions[0]]
      private_message = ['action_voted_together', 'action_turned_alienhelper', formatPlayerIdentifier([selected_card_positions[0]])[0]]

      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: viewCards,
    new_alien,
    new_alien_helper,
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message,
    showCards,
    uniqueInformation: { new_alien, new_alien_helper },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(ws, gamestate, token, title, action, narration)

  return gamestate
}
