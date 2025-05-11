import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { sawCards } from '../../sceneUtils/sawCards'
import { validateCardSelection } from '../../validators'

export const werewolvesResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

  const private_message = ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

  const action = generateRoleAction(gamestate, token, title, {
    private_message,
    showCards,
    obligatory: true,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
