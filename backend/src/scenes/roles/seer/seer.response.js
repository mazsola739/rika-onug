import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const seerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  let showCards = []

  const playerCards = selected_card_positions.some(pos => pos.includes('player'))
  const centerCards = selected_card_positions.some(pos => pos.includes('center'))
  const playerHistory = gamestate.players[token].player_history[title].selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_card_positions[0])) {
    showCards = sawCards(gamestate, [selected_card_positions[0]], token)
  } else if (centerCards && !playerCards && selected_card_positions.every(position => playerHistory.includes(position))) {
    showCards = sawCards(gamestate, selected_card_positions.slice(0, 2), token)
  } else {
    return gamestate
  }
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
