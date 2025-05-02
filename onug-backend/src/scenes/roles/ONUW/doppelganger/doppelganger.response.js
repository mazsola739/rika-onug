import { getPlayerNumberWithMatchingToken, getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateCardSelection } from '../../../validators'

export const doppelgangerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const playerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  gamestate.players[token].card.player_role_id = gamestate.card_positions[selected_card_positions[0]].card.id

  if (gamestate.card_positions[selected_card_positions[0]].card.id === 30 || gamestate.card_positions[selected_card_positions[0]].card.id === 64) {
    gamestate.players[token].card.player_role = 'VILLAGER'
    gamestate.players[token].card.player_team = 'villager'
  } else {
    gamestate.players[token].card.player_role = gamestate.card_positions[selected_card_positions[0]].card.role
    gamestate.players[token].card.player_team = gamestate.card_positions[selected_card_positions[0]].card.team
  }

  gamestate.card_positions[playerNumber].card.role = gamestate.card_positions[selected_card_positions[0]].card.role
  gamestate.card_positions[playerNumber].card.team = gamestate.card_positions[selected_card_positions[0]].card.team

  const showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])

  ;(gamestate.players[token].player_history[title].show_cards = showCards), (gamestate.players[token].new_role_id = gamestate.players[token].card.player_role_id)
  gamestate.players[token].card_or_mark_action = true

  const private_message = ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_you_are_that_role', `role_${gamestate.players[token]?.card.player_role.toLowerCase()}`]

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: [selected_card_positions[0]],
    private_message,
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message,
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(ws, gamestate, token, title, action, narration)

  return gamestate
}
