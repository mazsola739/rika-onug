import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const exposerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  const limit = gamestate.players[token].player_history[title].selectable_card_limit.center
  const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)

  gamestate.positions.flipped_cards.push(...showCards)

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_flipped_card', ...formatPlayerIdentifier(selected_card_positions.slice(0, limit))],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
