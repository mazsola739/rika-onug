import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO neighbors
export const morticianResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  const limit = gamestate.players[token].player_history[title].selectable_card_limit.player
  const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', ...formatPlayerIdentifier(selected_card_positions.slice(0, limit))],
    uniqueInformation: { selected_card_positions },
    showCards
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
