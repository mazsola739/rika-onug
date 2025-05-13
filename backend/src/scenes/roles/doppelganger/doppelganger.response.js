import { getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, updateCardRoleAndTeam, updatePlayerKnownCard } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const doppelgangerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  //TODO check the logic of this line
  gamestate.players[token].card.player_role_id = gamestate.positions.card_positions[selected_card_positions[0]].card.id

  const { role, team } = gamestate.positions.card_positions[selected_card_positions[0]].card
  if (gamestate.positions.card_positions[selected_card_positions[0]].card.id === 30 || gamestate.positions.card_positions[selected_card_positions[0]].card.id === 64) {
    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, 'VILLAGER', player_role_id, 'villager')
  } else {
    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
  }

  updateCardRoleAndTeam(gamestate, currentPlayerNumber, role, team)

  const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0]])

  //TODO check if there nay other solution for this line
  //const showCards = sawCards(gamestate, [selected_card_positions[0]], token)
  //swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)
  ;(gamestate.players[token].player_history[title].show_cards = showCards), (gamestate.players[token].new_role_id = gamestate.players[token].card.player_role_id)
  gamestate.players[token].card_or_mark_action = true

  const private_message = ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]]), 'action_you_are_that_role', `role_${gamestate.players[token]?.card.player_role.toLowerCase()}`]

  const action = generateRoleAction(gamestate, token, title, {
    private_message,
    uniqueInformation: { selected_card_positions },
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
