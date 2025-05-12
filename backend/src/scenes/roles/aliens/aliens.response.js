import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, sawCards, updateCardRoleAndTeam } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

   const { instruction: randomAlienInstruction } = gamestate.roles.aliens

  let showCards = []
  let new_alien = []
  let new_alien_helper = []
  let private_message = []

  switch (randomAlienInstruction) {
    case 'aliens_view':
    case 'aliens_allview':
      showCards = sawCards(gamestate, [selected_card_positions[0]], token)
      private_message = [...(randomAlienInstruction === 'aliens_allview' ? ['action_voted_together'] : []), 'action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break

    case 'aliens_newalien':
      updateCardRoleAndTeam(gamestate, selected_card_positions[0], 'ALIEN', 'alien')
      new_alien = [selected_card_positions[0]]
      private_message = ['action_voted_together', 'action_turned_newalien', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break

    case 'aliens_alienhelper':
      updateCardRoleAndTeam(gamestate, selected_card_positions[0], gamestate.positions.card_positions[selected_card_positions[0]].card.role, 'alien')
      new_alien_helper = [selected_card_positions[0]]
      private_message = ['action_voted_together', 'action_turned_alienhelper', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message,
    showCards,
    uniqueInformation: { new_alien, new_alien_helper },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
