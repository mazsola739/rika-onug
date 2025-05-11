import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const apprenticeseerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
