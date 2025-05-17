import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, sawCards, updateCardRoleAndTeam } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  const { instruction } = gamestate.roles.aliens

  let showCards = []
  let private_message = []

  switch (instruction) {
    case 'aliens_view':
    case 'aliens_allview':
      showCards = sawCards(gamestate, [selected_card_positions[0]], token)
      private_message = [...(instruction === 'aliens_allview' ? ['action_voted_together'] : []), 'action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break

    case 'aliens_newalien':
      updateCardRoleAndTeam(gamestate, selected_card_positions[0], 'ALIEN', 'alien')
      private_message = ['action_voted_together', 'action_turned_newalien', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break

    case 'aliens_alienhelper':
      updateCardRoleAndTeam(gamestate, selected_card_positions[0], gamestate.positions.card_positions[selected_card_positions[0]].card.role, 'alien')
      private_message = ['action_voted_together', 'action_turned_alienhelper', ...formatPlayerIdentifier([selected_card_positions[0]])]
      break
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message,
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
