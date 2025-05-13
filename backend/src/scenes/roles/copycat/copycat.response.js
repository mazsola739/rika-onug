import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, updatePlayerKnownCard, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const copycatResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const { id, role, team } = gamestate.positions.card_positions[selected_card_positions[0]].card
  const { player_card_id, player_role_id, player_role } = gamestate.players[token].card

  if (id === 1 || id === 30 || id === 64) {
    updatePlayerKnownCard(gamestate, token, id, 'VILLAGER', id, 'villager')
  } else {
    updatePlayerKnownCard(gamestate, token, player_card_id, role, id, team)
  }
  const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

  gamestate.players[token].new_role_id = player_role_id

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]]), 'action_you_are_that_role', `${player_role}`],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
