import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const psychicResponse = (gamestate, token, selected_card_positions, title) => {
  if (validateCardSelection(selected_card_positions, gamestate, token, title)) {
    return gamestate
  }

  const limit = gamestate.players[token].player_history[title].selectable_card_limit.player
  const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)
  //TODO private message
  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
