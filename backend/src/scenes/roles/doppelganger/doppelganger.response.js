import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const doppelgangerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  gamestate.players[token].card.player_role_id = gamestate.positions.card_positions[selected_card_positions[0]].card.id

  if (gamestate.positions.card_positions[selected_card_positions[0]].card.id === 30 || gamestate.positions.card_positions[selected_card_positions[0]].card.id === 64) {
    gamestate.players[token].card.player_role = 'VILLAGER'
    gamestate.players[token].card.player_team = 'villager'
  } else {
    gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[0]].card.role
    gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[0]].card.team
  }

  gamestate.positions.card_positions[currentPlayerNumber].card.role = gamestate.positions.card_positions[selected_card_positions[0]].card.role
  gamestate.positions.card_positions[currentPlayerNumber].card.team = gamestate.positions.card_positions[selected_card_positions[0]].card.team

  const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0]])

  ;(gamestate.players[token].player_history[title].show_cards = showCards), (gamestate.players[token].new_role_id = gamestate.players[token].card.player_role_id)
  gamestate.players[token].card_or_mark_action = true //TODO check if there nay other solution for this line

  const private_message = ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_you_are_that_role', `role_${gamestate.players[token]?.card.player_role.toLowerCase()}`]

  const action = generateRoleAction(gamestate, token, title, {
    private_message,
    showCards,
    uniqueInformation: { viewed_cards: [selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
