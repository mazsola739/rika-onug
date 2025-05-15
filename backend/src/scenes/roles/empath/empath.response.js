import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const empathResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_voted', ...formatPlayerIdentifier([selected_card_positions[0]])],
    uniqueInformation: { empath_vote: [selected_card_positions[0]] }
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
